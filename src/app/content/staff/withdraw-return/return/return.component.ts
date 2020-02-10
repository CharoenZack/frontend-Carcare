import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { WashtoolService } from 'src/app/shared/services/washtool.service';
import { WithdrawReturnService } from 'src/app/shared/services/withdraw-return.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {

  display = false;
  formReturn : FormGroup;
  returnData = [];
  msgs: Message[];
  washTool = [{ label : 'เลือกอุปกรณ์' , value : 0}];
  constructor(private washToolService : WashtoolService , private withDrawReturnService : WithdrawReturnService) { }

  public formError = {
    washTool: '',
    amount: '',
    dateEnd: ''
  };
  public validationMassages = {
    washTool: {
      required: '*กรุณาเลือกอุปกรณ์'
    },
    amount: {
      required: '*กรุณากรอกจำนวน'
    },
    dateEnd: {
      required: '*กรุณากรอกวันที่คืน'
    }
  };
  ngOnInit() {
    this.initFormReturn();
    this.getAllWashTool();
    this.loadData();
  }

  returnTool(){
    this.display = true;
  }
  initFormReturn(){
    this.formReturn = new FormGroup({
      washTool : new FormControl(null , Validators.required),
      amount : new FormControl(null , Validators.required),
      dateEnd : new FormControl(null , Validators.required)
    });
    this.formReturn.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.onValueChange());
  }

  private onValueChange() {
    if (!this.formReturn) {
      return;
    }
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formReturn.get(field);
      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  submitReturn(){
    if(this.formReturn.valid){
      this.withDrawReturnService.updateWithdraw(this.formReturn.getRawValue()).subscribe(rs=>{
        this.returnData = rs.filter(res => {
          if(res.status_action === 2){
              if (res.approve_status === 1) {
                res.approve_status = 'รออนุมัติ';
              } else {
                res.approve_status = 'อนุมัติ';
              }
              return res;
              }
          });
      })
    }else{
      this.onValueChange()
    }
  }

  getAllWashTool(){
    this.washToolService.getAllWashTool().subscribe(rs=>{
      rs.map(res=>{
        this.washTool = [...this.washTool , {label : res.tool_name , value : res.wash_tool_id }]
      })
    })
  }

  loadData() {
    this.withDrawReturnService.getAllWithDrawReturn().subscribe(rs => {
      this.returnData = rs.filter(res => {
        if(res.status_action === 2){
            if (res.approve_status === 1) {
              res.approve_status = 'รออนุมัติ';
            } else {
              res.approve_status = 'อนุมัติ';
            }
            return res;
            }
        });
      });
  }

}
