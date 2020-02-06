import { Position } from 'src/app/shared/interfaces/position';
import { Employee } from './../../shared/interfaces/employee';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MenuItem, Message, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userData: any[];
  public userId: string;
  public formEditProfile: FormGroup;
  public displayDialog = false;
  public employee: Employee;
  public msgs: Message[] = [];
  // NGModel
  public fname: string;
  public lname: string;
  public tel: string;
  public role: Position;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manageUser: ManageUserService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getData();
    this.userId = localStorage.getItem('userId');
    this.createForm();
  }
  createForm() {
    this.formEditProfile = new FormGroup({
      editImage : new FormControl(null , Validators.required),
      editFname : new FormControl(null , Validators.required),
      editLname : new FormControl(null , Validators.required),
      editTel : new FormControl(null , Validators.required)
    })
  }
  getData() {
    this.route.params.pipe(map(res => res.id)).subscribe(id => {
      this.manageUser.getProfile(id).subscribe(
        res=>{
          res.map(rs=>{
            this.userData = rs;
          })
        }
      );
    });
  }
  showEdit(id) {
    this.displayDialog = true;
    this.route.params.pipe(map(res => res.id)).subscribe(id => {
      this.manageUser.getProfile(id).subscribe(
        res=>{
          res.map(rs=>{
            const formEdit = {
              editFname : rs.employee_fname,
              editLname : rs.employee_lname,
              editTel : rs.employee_tel
            }
            this.formEditProfile.patchValue(formEdit);
          })
        }
      );
    });
    // this.employee = this.userData.filter(e => e.employee_id === id)[0];
    // this.fname = this.employee['employee_fname'];
    // this.lname = this.employee['employee_lname'];
    // this.tel = this.employee['employee_tel']
  }
  update() {
    this.manageUser.updateProfile(this.formEditProfile.getRawValue()).subscribe(rs=>{
      console.log(rs);
    })
    // this.msgs = [];
    // this.confirmationService.confirm({
    //   message: 'ยืนยันการแก้ไข',
    //   header: 'ข้อความจากระบบ',
    //   accept: () => {
    //     const time = formatDate(this.duration, 'h:mm:ss', 'en')
    //     const data = {
    //       clean_service_id: this.service['clean_service_id'],
    //       service_name: this.name,
    //       service_price: this.price,
    //       service_duration: time,
    //       type_car_id: this.size['type_car_id']
    //     };
    //     console.log(data);
    //     this.manageCar.updateService(data)
    //       .subscribe(res => {
    //         if (res['status'] === 'Success') {
    //           this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการสำเร็จ' });
    //           const index = this.clean.findIndex(e => e.clean_service_id === res['data']['clean_service_id']);
    //           // this.car[index].brand = res['data']['brand'];
    //         }
    //       },
    //         (e) => {
    //           console.log(e['error']['message']);
    //           this.msgs.push({ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการไม่สำเร็จ' });
    //         }
    //       );
    //     this.clear();
    //   },
    //   reject: () => {

    //   }
    // });
  }

  uploadImage(event){
    let formData = new FormData();
    formData.append('file' , event.files);
    console.log(formData);
  }

  clear() {
    this.employee = {};
    this.displayDialog = false;
    this.formEditProfile.reset();
  }
}
