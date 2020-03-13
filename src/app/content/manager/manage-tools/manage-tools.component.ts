import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { WashtoolService } from 'src/app/shared/services/washtool.service';
import { PositionService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-manage-tools',
  templateUrl: './manage-tools.component.html',
  styleUrls: ['./manage-tools.component.css']
})
export class ManageToolsComponent implements OnInit {
  display = false;
  displayEdit = false;
  formTool: FormGroup;
  formEditTool: FormGroup;
  tool: any[];
  positionList = [];
  msgs: Message[] = [];
  public formError = {
    tool: '',
    amount: '',
    position: '',
  };
  public validationMassages = {
    username: {
      required: '*กรูณากรอกอุปกรณ์'
    },
    password: {
      required: '*กรุณากรอกจำนวน'
    },
    position: {
      required: '*กรุณาเลือกตำแหน่ง'
    }
  };
  constructor(private washToolService: WashtoolService,
    private confirmationService: ConfirmationService,
    private positionService: PositionService) { }

  ngOnInit() {
    this.loadData();
    this.initForm();
    this.getPosition();
    //this.getPosition();
    this.formEditTool = new FormGroup({
      editTool: new FormControl(null, Validators.required),
      editAmount: new FormControl(null, Validators.required),
      editStatus: new FormControl(null, Validators.required),
      id: new FormControl(null)
    });
  }

  addTool() {
    this.display = true;
  }

  getPosition() {
    this.positionService.getAllPositionNotAM().subscribe(rs => {
      rs.map(res => {
        console.log(res);
        this.positionList = [
          ...this.positionList,
          { label: res.position_role + ' ' + res.position_work, value: res.position_id }
        ];
      })
    })
  }

  initForm() {
    this.formTool = new FormGroup({
      tool: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      status: new FormControl(null),
      employeeId: new FormControl(localStorage.getItem('userId')),
      position: new FormControl(null, Validators.required),
    });
    this.formTool
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => this.onValueChange());
  }

  submitFormTool() {
    if (this.formTool.valid) {
      this.msgs = [];
      this.washToolService
        .createWashTool(this.formTool.getRawValue())
        .pipe(
          switchMap(rs => {
            this.display = false;
            this.msgs.push({ severity: 'info', summary: 'Insert Tool', detail: 'Insert Success' });
            return this.washToolService.getAllWashTool().pipe(map(rs => {
              return this.tool = rs;
            }))
          })
        )
        .subscribe();
    } else {
      this.onValueChange()
    }
  }

  private onValueChange() {
    if (!this.formTool) {
      return;
    }
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formTool.get(field);
      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  editTool(event) {
    this.displayEdit = true;
    this.formEditTool.patchValue({
      editTool: event.tool_name,
      editAmount: event.amount,
      editStatus: event.tool_status,
      id: event.wash_tool_id
    });
  }

  updateTool() {
    this.msgs = [];
    this.washToolService
      .updateWashTool(this.formEditTool.getRawValue())
      .pipe(
        switchMap(rs => {
          this.displayEdit = false;
          this.msgs.push({ severity: 'info', summary: 'Update Tool', detail: 'Update Success' });
          return this.washToolService.getAllWashTool().pipe(map(rs => {
            return this.tool = rs;
          }))
        })
      )
      .subscribe();
  }

  confirm(id) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'คุณต้องการลบข้อมูลอุปกรณ์ล้างรถนี้ใช่หรือไม่',
      accept: () => {
        this.washToolService.deleteWashTool(id).pipe(switchMap(rs => {
          this.msgs.push({ severity: 'info', summary: 'Delete Success', detail: 'Delete Success' });
          return this.washToolService.getAllWashTool().pipe(map(rs => {
            return this.tool = rs;
          }))
        })).subscribe()
      }
    });
  }

  loadData() {
    this.washToolService.getWashTool().subscribe(rs => {
      this.tool = rs;
    });
  }
}
