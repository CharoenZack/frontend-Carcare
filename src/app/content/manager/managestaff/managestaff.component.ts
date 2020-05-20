import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message, ConfirmationService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';
import { PositionService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-managestaff',
  templateUrl: './managestaff.component.html',
  styleUrls: ['./managestaff.component.css']
})
export class ManagestaffComponent implements OnInit {
  display = false;
  displayEdit = false;
  displayWarningEmployee = false;
  formStaff: FormGroup;
  formEditStaff: FormGroup;
  staff: any[];
  positionList = [];
  msgs: Message[] = [];
  public formError = {
    username: '',
    password: '',
    fname: '',
    lname: '',
    tel: '',
    position: '',
  };
  public validationMassages = {
    username: {
      required: '*กรุณากรอกชื่อผู้ใช้'
    },
    password: {
      required: '*กรุณากรอกรหัสผ่าน'
    },
    fname: {
      required: '*กรุณากรอกชื่อ'
    },
    lname: {
      required: '*กรุณากรอกนามสกุล'
    },
    tel: {
      required: '*กรุณากรอกเบอร์โทรศัพท์'
    },
    position: {
      required: '*กรุณาเลือกตำแหน่ง'
    }
  };
  constructor(
    private manageStaffService: ManageUserService,
    private confirmationService: ConfirmationService,
    private positionService: PositionService
  ) { }

  ngOnInit() {
    this.loadData();
    this.initForm();
    this.getPosition();
    this.formEditStaff = new FormGroup({
      editfname: new FormControl(null, Validators.required),
      editlname: new FormControl(null, Validators.required),
      editTel: new FormControl(null, Validators.required),
      id: new FormControl(null)
    });
  }

  addStaff() {
    this.display = true;
  }

  initForm() {
    this.formStaff = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      tel: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required)
    });
    this.formStaff
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => this.onValueChange());
  }

  submitFormStaff() {
    if (this.formStaff.valid) {
      this.msgs = [];
      this.manageStaffService
        .crateStaff(this.formStaff.getRawValue())
        .pipe(
          switchMap(rs => {
            if (rs.emp === false) {
              this.displayWarningEmployee = true;
            } else {
              console.log(rs.emp)
              this.display = false;
              this.formStaff.reset();
              this.msgs.push({ severity: 'info', summary: 'เพิ่มพนักงาน', detail: 'เพิ่มพนักงานสำเร็จ' });
              return this.manageStaffService.getAllStaff().pipe(map(rs => {
                return this.staff = rs;
              }))
            }
          })
        )
        .subscribe();
    } else {
      this.onValueChange()
    }
  }

  private onValueChange() {
    if (!this.formStaff) {
      return;
    }
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formStaff.get(field);
      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  editStaff(event) {
    this.displayEdit = true;
    this.formEditStaff.patchValue({
      editfname: event.employee_fname,
      editlname: event.employee_lname,
      editTel: event.employee_tel,
      id: event.employee_id
    });
  }

  updateStaff() {
    this.msgs = [];
    this.manageStaffService
      .updateStaff(this.formEditStaff.getRawValue())
      .pipe(
        switchMap(rs => {
          this.displayEdit = false;
          this.msgs.push({ severity: 'info', summary: 'อัปเดตข้อมูลพนักงาน', detail: 'อัปเดตข้อมูลพนักงานสำเร็จ' });
          return this.manageStaffService.getAllStaff().pipe(map(rs => {
            return this.staff = rs;
          }))
        })
      )
      .subscribe();
  }

  confirm(id) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'คุณต้องการลบข้อมูลพนักงานคนนี้ใช่หรือไม่',
      accept: () => {
        this.manageStaffService.deleteStaff(id).pipe(switchMap(rs => {
          this.msgs.push({ severity: 'info', summary: 'ลบข้อมูลพนักงาน', detail: 'ลบข้อมูลพนักงานสำเร็จ' });
          return this.manageStaffService.getAllStaff().pipe(map(rs => {
            return this.staff = rs;
          }))
        })).subscribe()
      }
    });
  }

  loadData() {
    this.manageStaffService.getAllStaff().subscribe(rs => {
      this.staff = rs;
    });
  }

  getPosition() {
    this.positionService.getAllPositionNotAM().subscribe(rs => {
      rs.map(res => {
        console.log(res);
        this.positionList = [
          ...this.positionList,
          { label: res.position_work, value: res.position_id }
        ];
      })
    })
  }


}






