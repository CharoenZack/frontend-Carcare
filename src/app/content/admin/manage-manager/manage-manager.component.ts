import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';
import { switchMap, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmationService, Message } from 'primeng/api/';

@Component({
  selector: 'app-manage-manager',
  templateUrl: './manage-manager.component.html',
  styleUrls: ['./manage-manager.component.css']
})
export class ManageManagerComponent implements OnInit {
  display = false;
  displayEdit = false;
  formEmployee: FormGroup;
  formEditEmployee: FormGroup;
  user: any[];
  cols: any[];
  msgs: Message[] = [];
  public formError = {
    username: '',
    password: '',
    fname: '',
    lname: '',
    tel: ''
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
    }
  };
  constructor(private manageManagerSerivice: ManageUserService,private confirmationService : ConfirmationService) {}

  ngOnInit() {
    this.loadData();
    this.initForm();
    this.cols = [
      { field: 'name', header: 'ชื่อ-นามสกุล' },
      { field: 'tel', header: 'เบอร์โทร' },
      { field: 'date', header: 'วันที่สร้าง' },
      { field: 'operation', header: 'ดำเนินการ' }
    ];
    this.formEditEmployee = new FormGroup({
      editfname: new FormControl(null , Validators.required),
      editlname: new FormControl(null , Validators.required),
      editTel: new FormControl(null , Validators.required),
      id: new FormControl(null)
    });
  }

  addManager() {
    this.display = true;
  }

  initForm() {
    this.formEmployee = new FormGroup({
      username: new FormControl(null , Validators.required),
      password: new FormControl(null , Validators.required),
      fname: new FormControl(null , Validators.required),
      lname: new FormControl(null , Validators.required),
      tel: new FormControl(null , Validators.required)
    });
    this.formEmployee
    .valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(() => this.onValueChange());
  }

  submitFormEmployee() {
    if(this.formEmployee.valid){
    this.msgs = [];
    this.manageManagerSerivice
      .createEmployee(this.formEmployee.getRawValue())
      .pipe(
        switchMap(rs => {
          this.display = false;
          this.msgs.push({severity:'info', summary:'Insert Employee', detail:'Insert Success'});
          return this.manageManagerSerivice.getAllUsers().pipe(map(rs=>{
            return this.user = rs;
          }))
        })
      )
      .subscribe();
      }else{
        this.onValueChange()
      }
  }

  private onValueChange() {
    if (!this.formEmployee) {
      return;
    }
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formEmployee.get(field);
      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  editEmployee(event) {
    this.displayEdit = true;
    this.formEditEmployee.patchValue({
      editfname: event.employee_fname,
      editlname: event.employee_lname,
      editTel: event.employee_tel,
      id: event.employee_id
    });
  }

  updateEmployee() {
      this.msgs = [];
      this.manageManagerSerivice
        .updateEmployee(this.formEditEmployee.getRawValue())
        .pipe(
          switchMap(rs => {
            this.displayEdit = false;
            this.msgs.push({severity:'info', summary:'Update Employee', detail:'Update Success'});
            return this.manageManagerSerivice.getAllUsers().pipe(map(rs=>{
              return this.user = rs;
            }))
          })
        )
        .subscribe();
  }

  confirm(id) {
    this.msgs = [];
    this.confirmationService.confirm({
        message: 'คุณต้องการลบข้อมูลผู้จัดการร้านคนนี้ใช่หรือไม่',
        accept: () => {
          this.manageManagerSerivice.deleteEmployee(id).pipe(switchMap(rs=>{
            this.msgs.push({severity:'info', summary:'Delete Success', detail:'Delete Success'});
            return this.manageManagerSerivice.getAllUsers().pipe(map(rs=>{
              return this.user = rs;
            }))
          })).subscribe()
        }
    });
  }

  loadData() {
    this.manageManagerSerivice.getAllUsers().subscribe(rs => {
      this.user = rs;
    });
  }
}
