import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/shared/interfaces/employee';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ActivatedRoute } from '@angular/router';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-staff',
  templateUrl: './profile-staff.component.html',
  styleUrls: ['./profile-staff.component.css']
})
export class ProfileStaffComponent implements OnInit {

  public userData: any[];
  public userId: string;
  public userRole: string;
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
    this.userRole = localStorage.getItem('position');
    console.log('id ' + this.userId + 'role ' + this.userRole);

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
      console.log(id);
      this.manageUser.getProfile(id).subscribe(rs => {
        rs.map(res=>{
          this.userData = res;
          this.imageUrls = this.sanitization.bypassSecurityTrustUrl(
            '' + res.employee_image
          );
        })
      });
    });
  }
  showEdit(id) {
    this.displayDialog = true;
    this.route.params.pipe(map(res => res.id)).subscribe(id => {
      this.manageUser.getProfile(id).subscribe(rs => {
        rs.map(res=>{
          const formEdit = {
            editFname: res.employee_fname,
            editLname: res.employee_lname,
            editTel: res.employee_tel,
            editImage : res.employee_image
          };
          this.formEditProfile.patchValue(formEdit);
        });
      });
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
              rs.map(res=>{
                this.userData = res;
                this.imageUrls = this.sanitization.bypassSecurityTrustUrl(
                  '' + res.employee_image
                );
              })
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
