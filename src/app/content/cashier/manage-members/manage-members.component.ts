import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  concatMap
} from 'rxjs/operators';
import { MemberService } from 'src/app/shared/services/member.service';
import { ConfirmationService, Message } from 'primeng/api';
import { TypecarService } from 'src/app/shared/services/typecar.service';
import { ProvinceService } from 'src/app/shared/services/province.service';

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
  members = [];
  msgs: Message[] = [];
  displayWarningMember = false;
  displayWarningLicense = false;
  showCar: any[] = [
  ];
  carDetail: any[] = [
    {
      label: 'กรุณาเลือกรถ',
      value: 0
    }
  ];
  provinceList: any[] = [
    {
      label: 'กรุณาเลือกจังหวัด',
      value: 0
    }
  ];
  constructor(
    private memberService: MemberService,
    private confirmationService: ConfirmationService,
    private typeCarService: TypecarService,
    private provinceService: ProvinceService
  ) { }

  public formError = {
    username: '',
    password: '',
    fname: '',
    lname: '',
    address: '',
    tel: '',
    license: '',
    car: ''
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
    },
    license: {
      required: '*กรุณากรอกป้ายทะเบียน'
    },
    car: {
      required: '*กรุณาเลือกรถ'
    }
  };

  ngOnInit() {
    this.memberService
      .getMemberByCashierId(localStorage.getItem('userId'))
      .subscribe(rs => {
        this.members = rs;
      });
    this.initFormMember();
    this.getAllCarDetail();
    this.initFormEditMember();
    this.getAllProvince();
  }

  addMember() {
    this.display = true;
  }

  addCar() {
    this.funcCarList.push(
      new FormGroup({
        car: new FormControl(null),
        license: new FormControl(null),
        province: new FormControl(null)
      })
    );
  }

  removeCar(arrayIndex) {
    this.funcCarList.removeAt(arrayIndex);
  }

  get funcCarList(): FormArray {
    return this.formMember.get('carList') as FormArray;
  }

  initFormMember() {
    this.formMember = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      tel: new FormControl(null, Validators.required),
      cashier_id: new FormControl(localStorage.getItem('userId')),
      carList: new FormArray([])
    });
    this.formMember.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.onValueChange());
  }

  initFormEditMember() {
    this.formEditMember = new FormGroup({
      editUsername: new FormControl(null),
      editPassword: new FormControl(null),
      editMemberCashierId: new FormControl(null),
      editfname: new FormControl(null, Validators.required),
      editlname: new FormControl(null, Validators.required),
      editaddress: new FormControl(null, Validators.required),
      editTel: new FormControl(null, Validators.required),
      editCarList: new FormArray([]),
      editId: new FormControl(null)
    });
  }

  submitFormMember() {
    if (this.formMember.valid) {
      this.memberService
        .insertMember(this.formMember.getRawValue())
        .pipe(
          switchMap(rs => {
            if (rs.member === false) {
              this.displayWarningMember = true;
            }
            if (rs.license === false) {
              this.displayWarningLicense = true;
            } else {
              this.display = false;
              this.msgs.push({
                severity: 'info',
                summary: 'Insert Employee',
                detail: 'Insert Success'
              });
              this.formMember.reset();
              return this.memberService
                .getMemberByCashierId(localStorage.getItem('userId'))
                .pipe(
                  map(res => {
                    console.log(this.memberService);
                    return (this.members = res);

                  })
                );
            }
          })
        )
        .subscribe();
    } else {
      this.onValueChange();
    }
  }

  editMember(data) {
    let editCarListValue = [];
    const existingItems = this.formEditMember.get('editCarList') as FormArray;
    while (existingItems.length) {
      existingItems.removeAt(0);
    }
    this.memberService.getMemberForEdit(data.members_id).subscribe(rs => {
      rs.map(res => {
        this.funcEditCarList.push(
          new FormGroup({
            editcar: new FormControl(null),
            editlicense: new FormControl(null),
            editprovince: new FormControl(null),
            editDetailId: new FormControl(null)
          })
        );
        editCarListValue.push({
          editcar: {
            label: res.model_name + ' ' + res.brand + ' ' + res.size,
            value: res.car_detail_id
          },
          editlicense: res.member_license,
          editprovince: {
            label: res.province_name,
            value: res.province_id
          },
          editDetailId: res.members_detail_id
        });
        const editMember = {
          editUsername: res.members_username,
          editPassword: res.members_password,
          editMemberCashierId: res.member_cashier_id,
          editfname: res.members_fname,
          editlname: res.members_lname,
          editaddress: res.members_address,
          editTel: res.members_tel,
          editId: res.members_id
        };
        this.formEditMember.patchValue(editMember);
      });
      this.formEditMember.get('editCarList').setValue(editCarListValue);
    });
    this.displayEdit = true;
  }

  get funcEditCarList(): FormArray {
    return this.formEditMember.get('editCarList') as FormArray;
  }

  addCarEdit() {
    this.funcEditCarList.push(
      new FormGroup({
        editcar: new FormControl(null),
        editlicense: new FormControl(null),
        editprovince: new FormControl(null)
      })
    );
  }

  removeCarEdit(arrayIndex) {
    this.funcEditCarList.removeAt(arrayIndex);
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
            this.msgs.push({
              severity: 'info',
              summary: 'Update Employee',
              detail: 'Update Success'
            });
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

  getAllCarDetail() {
    this.typeCarService.getAllCarDetail().subscribe(rs => {
      rs.map(res => {
        this.carDetail.push({
          label: res.model_name + ' ' + res.brand + ' ' + res.size,
          value: res.car_detail_id
        });
      });
    });
  }
  getCarDetailById(id) {
    console.log(id.value.value);
    this.typeCarService.getAllCarDetailById(id.value.value).subscribe(rs => {
      rs.map(res => {
        this.showCar.push({
          label: res.brand
        });
        console.log(this.showCar);
      });
    });
  }
  getAllProvince() {
    this.provinceService.getAllProvince().subscribe(rs => {
      rs.map(res => {
        this.provinceList.push({
          label: res.province_name,
          value: res.province_id
        });
      });
    });
  }
}
