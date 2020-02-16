import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map
} from 'rxjs/operators';
import { WashtoolService } from 'src/app/shared/services/washtool.service';
import { WithdrawReturnService } from 'src/app/shared/services/withdraw-return.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  withdraw = [];
  display = false;
  msgs: Message[] = [];
  washTool = [{ label: 'เลือกอุปกรณ์', value: 0 }];
  formWithdraw: FormGroup;
  constructor(
    private washToolService: WashtoolService,
    private withDrawReturnService: WithdrawReturnService,
    private messageService: MessageService
  ) {}

  public formError = {
    washTool: '',
    amount: '',
    dateStart: ''
  };
  public validationMassages = {
    washTool: {
      required: '*กรุณาเลือกอุปกรณ์'
    },
    amount: {
      required: '*กรุณากรอกจำนวน'
    },
    dateStart: {
      required: '*กรุณากรอกวันที่ยืม'
    }
  };
  ngOnInit() {
    this.initFormWithdraw();
    this.getAllWashTool();
    this.loadData();
  }

  withDraw() {
    this.display = true;
  }

  initFormWithdraw() {
    this.formWithdraw = new FormGroup({
      washTool: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      dateStart: new FormControl(null, Validators.required)
    });
    this.formWithdraw.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.onValueChange());
  }

  private onValueChange() {
    if (!this.formWithdraw) {
      return;
    }
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formWithdraw.get(field);
      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  submitWithDraw() {
    if (this.formWithdraw.valid) {
      this.withDrawReturnService
        .createWithDraw(this.formWithdraw.getRawValue())
        .pipe(
          switchMap(rs => {
            if (rs.result === 'success') {
              this.msgs.push({
                severity: 'info',
                summary: 'Insert Success',
                detail: 'Insert Success'
              });
              this.display = false;
              return this.withDrawReturnService.getAllWithDrawReturn().pipe(
                map(rs=>{
                  this.withdraw = rs.filter(res => {
                    if(res.status_action === 1){
                      if (res.approve_status === 1) {
                        res.approve_status = 'รออนุมัติ';
                      } else {
                        res.approve_status = 'อนุมัติ';
                      }
                      return res;
                    }
                  });
              }));
            } else {
              this.messageService.clear();
              this.messageService.add({
                key: 'c',
                sticky: true,
                severity: 'warn',
                summary: rs.result
              });
            }
          })
        )
        .subscribe((rs: any) => {});
    } else {
      this.onValueChange();
    }
  }

  updateWithDraw(data) {
    this.withDrawReturnService.updateWithdraw(data).pipe(
      switchMap(rs => {
        this.msgs.push({
          severity: 'info',
          summary: 'Return Success',
          detail: 'Return Success'
        });
        return this.withDrawReturnService.getAllWithDrawReturn().pipe(
          map(rs => {
            this.withdraw = rs.filter(res => {
              if (res.status_action === 1) {
                if (res.approve_status === 1) {
                  res.approve_status = 'รออนุมัติ';
                } else {
                  res.approve_status = 'อนุมัติ';
                }
                return res;
              }
            });
          })
        );
      })
    ).subscribe()
  }

  loadData() {
    this.withDrawReturnService.getAllWithDrawReturn().subscribe(rs => {
      this.withdraw = rs.filter(res => {
        if(res.status_action === 1){
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

  getAllWashTool() {
    this.washToolService.getAllWashTool().subscribe(rs => {
      rs.map(res => {
        this.washTool = [
          ...this.washTool,
          { label: res.tool_name, value: res.wash_tool_id }
        ];
      });
    });
  }

  onReject() {
    this.messageService.clear('c');
  }
}
