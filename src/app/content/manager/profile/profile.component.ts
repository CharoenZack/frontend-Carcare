import { Position } from 'src/app/shared/interfaces/position';
import { Employee } from '../../../shared/interfaces/employee';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { MenuItem, Message, ConfirmationService } from 'primeng/api';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  public imageUrls;
  // NGModel
  public fname: string;
  public lname: string;
  public tel: string;
  public role: Position;
  constructor(
    private route: ActivatedRoute,
    private manageUser: ManageUserService,
    private sanitization: DomSanitizer
  ) {}

  ngOnInit() {
    this.getData();
    this.userId = localStorage.getItem('userId');
    this.createForm();
  }
  createForm() {
    this.formEditProfile = new FormGroup({
      editImage: new FormControl(null, Validators.required),
      editFname: new FormControl(null, Validators.required),
      editLname: new FormControl(null, Validators.required),
      editTel: new FormControl(null, Validators.required),
      id: new FormControl(localStorage.getItem('userId'))
    });
  }
  getData() {
    this.route.params.pipe(map(res => res.id)).subscribe(id => {
      this.manageUser.getProfile(id).subscribe(rs => {
        rs.map(res => {
          this.userData = res;
          this.imageUrls = this.sanitization.bypassSecurityTrustUrl(
            '' + res.employee_image
          );
        });
      });
    });
  }
  showEdit(id) {
    this.displayDialog = true;
    this.manageUser.getProfile(id).subscribe(rs => {
      rs.map(res=>{
        const formEdit = {
          editFname: res.employee_fname,
          editLname: res.employee_lname,
          editTel: res.employee_tel,
          editImage : res.employee_image
        };
        this.formEditProfile.patchValue(formEdit);
      })
    });
  }
  update() {
    const { id } = this.formEditProfile.getRawValue();
    this.manageUser
      .updateProfile(this.formEditProfile.getRawValue())
      .pipe(
        switchMap(rs => {
          this.displayDialog = false;
          return this.manageUser.getProfile(id).pipe(
            map((rs: any) => {
              rs.map(res => {
                this.userData = res;
                this.imageUrls = this.sanitization.bypassSecurityTrustUrl(
                  '' + res.employee_image
                );
              });
              return rs;
            })
          );
        })
      )
      .subscribe();
  }

  uploadImage(event) {
    if (event.files.length > 0) {
      const file = event.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formEditProfile.get('editImage').setValue(reader.result);
      };
      //
      // console.log(file);
      // formData.append('file' , file);
    }
    //console.log(formData);
  }

  clear() {
    this.employee = {};
    this.displayDialog = false;
    this.formEditProfile.reset();
  }
}
