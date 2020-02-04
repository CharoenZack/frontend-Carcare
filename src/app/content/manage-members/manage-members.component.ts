import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map
} from 'rxjs/operators';
import { MemberService } from 'src/app/shared/services/member.service';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.css']
})
export class ManageMembersComponent implements OnInit {
  display = false;
  displayEdit = false;
  formMember: FormGroup;
  formEditMember: FormGroup;
  members = []
  msgs: Message[] = [];
  constructor(
    private memberService: MemberService,
    private confirmationService: ConfirmationService
  ) {}

  public formError = {
    username: '',
    password: '',
    fname: '',
    lname: '',
    address: '',
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
    address: {
      required: '*กรุณากรอกที่อยู่'
    },
    tel: {
      required: '*กรุณากรอกเบอร์โทรศัพท์'
    }
  };

  ngOnInit() {
    this.memberService
    .getMemberByCashierId(localStorage.getItem('userId'))
    .subscribe(rs => {
      this.members = rs;
    });
    this.initFormMember();
    this.initFormEditMember();
  }

  addMember() {
    this.display = true;
  }

  initFormMember() {
    this.formMember = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      tel: new FormControl(null, Validators.required),
      cashier_id: new FormControl(localStorage.getItem('userId'))
    });
    this.formMember.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.onValueChange());
  }

  initFormEditMember() {
    this.formEditMember = new FormGroup({
      editfname: new FormControl(null, Validators.required),
      editlname: new FormControl(null, Validators.required),
      editaddress: new FormControl(null, Validators.required),
      editTel: new FormControl(null, Validators.required),
      editId: new FormControl(null)
    });
  }

  submitFormMember() {
    if (this.formMember.valid) {
      this.memberService
        .insertMember(this.formMember.getRawValue())
        .pipe(
          switchMap(rs => {
            this.display = false;
            this.msgs.push({severity:'info', summary:'Insert Employee', detail:'Insert Success'});
            return this.memberService
              .getMemberByCashierId(localStorage.getItem('userId'))
              .pipe(
                map(res => {
                  return (this.members = res);
                })
              );
          })
        )
        .subscribe();
    } else {
      this.onValueChange();
    }
  }

  editMember(data) {
    const datas = {
      editfname : data.members_fname,
      editlname : data.members_lname,
      editaddress : data.members_address,
      editTel : data.members_tel,
      editId : data.members_id
    }
    this.formEditMember.patchValue(datas);
    this.displayEdit = true;
  }

  private onValueChange() {
    if (!this.formMember) {
      return;
    }
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formMember.get(field);
      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  updateMember() {
    if (this.formEditMember.valid) {
      this.memberService
        .updateMember(this.formEditMember.getRawValue())
        .pipe(
          switchMap(rs => {
            this.displayEdit = false;
            this.msgs.push({severity:'info', summary:'Update Employee', detail:'Update Success'});
            return this.memberService
              .getMemberByCashierId(localStorage.getItem('userId'))
              .pipe(
                map(res => {
                  return (this.members = res);
                })
              );
          })
        )
        .subscribe();
    }
  }

  deleteMember(id) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'คุณต้องการลบข้อมูลสมาชิกคนนี้ใช่หรือไม่',
      accept: () => {
        this.memberService
          .deleteMember(id)
          .pipe(
            switchMap(rs => {
              this.msgs.push({
                severity: 'info',
                summary: 'Delete Success',
                detail: 'Delete Success'
              });
              return this.memberService
                .getMemberByCashierId(localStorage.getItem('userId'))
                .pipe(
                  map(rs => {
                    return (this.members = rs);
                  })
                );
            })
          )
          .subscribe();
      }
    });
  }
}
