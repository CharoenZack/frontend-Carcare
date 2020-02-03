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
  createEmployee(dataUser) {
    return this.http.post(ApiConstants.baseURl + '/employee/create',
      dataUser, {
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
  updateEmployee(id, dataUser) {
    const data = {
      ...dataUser
    };
    console.log(data);
    return this.http.put(ApiConstants.baseURl + `/manageEmployee/edit/${id}`, data, {
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
    console.log(localStorage.getItem('access-token'));
    return this.http.get(ApiConstants.baseURl + '/employee', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map(res => {
        return {
          status: res['result'],
          data: res['data'][0]
        };
      })
    );
  }
  deleteEmployee(id) {
    return this.http.delete(ApiConstants.baseURl + `/manageEmployee/${id}`, {
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
