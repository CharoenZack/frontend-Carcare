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
    return this.http.get(ApiConstants.baseURl + `/manageEmployee/edit/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map((res) => {
        console.log(res['data'][0]);
        return {
          status: res['result'],
          data: res['data'][0]
        };

      })
    );
  }
  getProfile(id) {
    console.log(id);
    return this.http.get(ApiConstants.baseURl + `/manageEmployee/editprofile/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(

      map((res) => {
        console.log(res['data']);
        return {
          status: res['result'],
          data: res['data']
        };
      })
    );
  }
  createEmployee(data) {
    const payload = {
      username : data.username,
      password : data.password,
      fname : data.fname,
      lname : data.lname,
      tel : data.tel,
      status : 1,
      position : 2
    }
    return this.http.post('/employee/create',
    payload, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map(res => {
        return {
          status: res['result'],
        };
      }
      )
    );
  }
  updateEmployee(data) {
    const payload = {
      fname : data.editfname,
      lname : data.editlname,
      tel : data.editTel,
      id : data.id
    }
    return this.http.patch(`/employee/edit`, payload, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map(res => {
        return {
          status: res['result'],
        };
      }
      )
    );

  }
  getAllUsers() {
    return this.http.get('/employee', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map(res => {
        console.log(res);
        return res['data']
      })
    );
  }
  deleteEmployee(id) {
    return this.http.delete(`/employee/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map(res => {
        return {
          status: res['result']
        };
      })
    );
  }
}
