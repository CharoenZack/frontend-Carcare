import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpClientService
  ) { }

  getUser(id) {
    return this.http
      .get(ApiConstants.baseURl + `/manageEmployee/edit/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map(res => {
          console.log(res['data'][0]);
          return {
            status: res['result'],
            data: res['data'][0]
          };
        })
      );
  }
  getProfile(id) {
    return this.http
      .get(`/app/getEmployeeWeid/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }
  createEmployee(data) {
    const payload = {
      username: data.username,
      password: data.password,
      fname: data.fname,
      lname: data.lname,
      tel: data.tel,
      status: 1,
      position: 2
    };
    return this.http
      .post('/app/insertEmployee', payload, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map(res => {
          return {
            status: res['result']
          };
        })
      );
  }
  updateEmployee(data) {
    const payload = {
      fname: data.editfname,
      lname: data.editlname,
      tel: data.editTel,
      id: data.id
    };
    return this.http
      .patch(`/app/updateEmployeeSef_el_etWeid`, payload, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map(res => {
          return {
            status: res['result']
          };
        })
      );
  }
  getAllEmployee() {
    return this.http
      .get('/app/getEmployeeWpid2', {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map(res => {
          return res['data'];
        })
      );
  }
  deleteEmployee(id) {
    return this.http
      .delete(`/app/deleteEmployeeWeid/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map(res => {
          return {
            status: res['result']
          };
        })
      );
  }

  getAllStaff() {
    return this.http
      .get('/app/getEmployeeWpidN12/', {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );
  }

  getEmployeeWCar_wash() {
    return this.http
      .get('/app/getEmployeeWCar_wash/', {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );
  }
  getEmployeeWCar_wash2() {
    return this.http
      .get('/app/getEmployeeWCar_wash2/', {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );
  }

  crateStaff(data) {
    const payload = {
      username: data.username,
      password: data.password,
      fname: data.fname,
      lname: data.lname,
      tel: data.tel,
      status: 1,
      position: data.position.value
    };
    return this.http
      .post('/app/insertEmployee', payload, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map(res => {
          return {
            status: res['result']
          };
        })
      );
  }
  updateStaff(data) {
    const payload = {
      fname: data.editfname,
      lname: data.editlname,
      tel: data.editTel,
      id: data.id
    };
    return this.http
      .patch(`/app/updateEmployeeSef_el_etWeid`, payload, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  updateStatusEmployee(data) {
    return this.http
      .patch('app/updateEmployeeByRegister/', data , {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );
  }


  deleteStaff(id) {
    return this.http
      .delete(`/app/deleteEmployeeWeid/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map(res => {
          return {
            status: res['result']
          };
        })
      );
  }
  deleteEmployeeFormCar_wash(id) {
    return this.http
      .delete(`/app/deleteEmployeeFormCar_wash/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map(res => {
          return {
            status: res['result']
          };
        })
      );
  }
  updateProfile(data) {
    let formData = new FormData();
    formData.append('editFname', data.editFname);
    formData.append('editLname', data.editLname);
    formData.append('editTel', data.editTel);
    formData.append('editImage', data.editImage);
    formData.append('id', data.id);
    return this.http
      .post('/app/updateProfile', formData, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );
  }
}
