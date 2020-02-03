import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isSumitted = false;
  public formError = {
    username: '',
    password: '',
  };
  public validationMassages = {
    username: {
      required: '*กรุณากรอกชื่อผู้ใช้'
    },
    password: {
      required: '*กรุณากรอกรหัสผ่าน'
    }
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private messageService: MessageService

  ) { }

  ngOnInit() {
    this.createForm();
  }
  get formControls() { return this.form.controls; }

  private createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.form
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => this.onValueChange());
    this.onValueChange();
  }
  onSubmit(e) {
    e.preventDefault();
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;
    console.log(username, password);
    // check accessToken
    if (this.form.valid) {
      this.spinner.show();
      this.authService.login(username, password).toPromise().then(res => {
        if (res['result'] === true) {
          const accessToken = res['token'];
          localStorage.setItem('access-token', accessToken);
          localStorage.setItem('name', res['fname']);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('position', res['position']);
          localStorage.setItem('userId' , res['id']);
          this.router.navigate(['/content' , { isLoggedin : 'true' , position : res['position'] } ]);
        }
      }).catch(err => {
        this.messageService.add({
          key: 'alert',
          sticky: true,
          severity: 'error',
          summary: err['error']['errorMessage']
        });
        this.form.setValue({ 'password': '' });
      }).finally(() => this.spinner.hide());
    } else {
      this.onValueChange();
    }
  }
  private onValueChange() {
    if (!this.form) {
      return;
    }
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.form.get(field);
      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }
  onConfirm() {
    this.messageService.clear('alert');
  }
}
