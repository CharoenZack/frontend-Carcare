import { Position } from 'src/app/shared/interfaces/position';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';
import { ManagePositionService } from 'src/app/shared/services/manage-position.service';
import { MessageService, MenuItem, ConfirmationService, Message } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-edit-data-employee',
  templateUrl: './edit-data-employee.component.html',
  styleUrls: ['./edit-data-employee.component.css']
})
export class EditDataEmployeeComponent implements OnInit {
  public formEdit: FormGroup;
  public personalId: string;
  public position: Position[];
  public role: any[];
  public roles: Position[]
  public messageback: string;
  public urlback: string;
  public detailWarning: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private positionService: ManagePositionService,
    private manageUserService: ManageUserService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.personalId = this.route.snapshot.paramMap.get('id');
    this.positionService.showPosition().subscribe(
      res => {
        this.role = res;
      },
      err => {
        console.log(err['error']['message']);
      }
    )
    this.settingForm();
  }
  createForm() {
    this.formEdit = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      tel: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      role: ['', Validators.required],
      work: ['']
    });
  }

  settingForm() {
    this.manageUserService.getUser(this.personalId).subscribe(res => {
      console.log(res);
      const position = {
        position_id: res['data'][0]['position_id'],
        position_role: res['data'][0]['position_role'],
        position_work: res['data'][0]['position_work'],
      };
      console.log(res['data'][0]['position_work']);

      this.formEdit.controls['role'].patchValue(position.position_role);
      console.log(this.formEdit.controls['role'].patchValue(position));
      this.formEdit.controls['fname'].setValue(res.data['0']['employee_fname']);
      this.formEdit.controls['lname'].setValue(res.data['0']['employee_lname']);
      this.formEdit.controls['tel'].setValue(res.data['0']['employee_tel'])
    },
      err => console.log(err['error']['message'])
    );
  }
  setBack() {
    this.urlback = this.route.snapshot.data.urlback;
    this.messageback = this.route.snapshot.data.messageback;
  }

  onReject() {
    this.router.navigateByUrl(`/manageEmployee`);
    this.messageService.clear('systemMessage');
  }
  showCancelConfirm() {
    let message;
    message = 'ยกเลิกการแก้ไขข้อมูล';
    const type = 'cancle';
    this.showDialog(message, type);
  }

  showDialog(message, type) {
    this.confirmationService.confirm({
      message: message,
      header: 'ข้อความจากระบบ',
      accept: () => {
        this.actionAccept(type);
      },
      reject: () => {
      }
    });
  }

  onSubmit(e) {
    console.log('onsubmit');
    if (!this.formEdit.valid) {
      this.subscribeInputMessageWaring();
    } else {
      this.submitMessage(e);
    }
  }
  subscribeInputMessageWaring() {
    this.formEdit
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
  }
  submitMessage(e) {
    const message = 'ยืนยันการแก้ไขข้อมูลส่วนตัว ?';
    const type = 'submit';
    this.showDialog(message, type);
  }
  actionAccept(type) {
    switch (type) {
      case 'cancle': {
        this.router.navigateByUrl(`/manageEmployee`);
        break;
      }
      case 'submit': {
        const position = this.formEdit.get('role').value;
        const dataEmp = {
          employee_fname: this.formEdit.get('fname').value,
          employee_lname: this.formEdit.get('lname').value,
          employee_tel: this.formEdit.get('tel').value,
          position_id: +(position.position_id),
        };
        console.log(dataEmp);

        // this.manageUserService.updateEmployee(this.personalId, dataEmp).subscribe(
        //   res => {
        //     if (res['status'] === 'Success') {
        //       this.showToast('alertMessage', 'แก้ไขข้อมูลสำเร็จ');
        //     } else {
        //       this.showToast('alertMessage', 'แก้ไขข้อมูลไม่สำเร็จ');
        //     }
        //   },
        //   err => {
        //     console.log(err);
        //   }
        // );
        break;
      }
      default: { break; }
    }
  }
  showToast(key, detail) {
    this.messageService.clear();
    this.messageService.add(
      {
        key: key,
        sticky: true,
        summary: 'ข้อความจากระบบ',
        detail: detail
      }
    );
  }
}
