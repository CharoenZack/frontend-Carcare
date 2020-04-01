import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarWashService {

  constructor(private http: HttpClient) { }

  getAllcarWash() {
    return this.http.get('/app/getAllCar_wash', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs: any) => {
      return rs.data;
    }))
  }

  getAllcarWashDetail() {
    return this.http.get('/app/getAllCar_wash_detail', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs: any) => {
      return rs.data;
    }))
  }

  getEmployeeWNotCarWash() {
    return this.http.get('/app/getEmployeeWNotCarWash', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs: any) => {
      return rs.data;
    }))
  }
  crateStaff(data) {
    const payload = {
      employee_id: data.name.value,
      car_wash_id: data.channel.value,
    };
    console.log(payload);

    return this.http
      .post('/app/insertEmployeeToCar_wash', payload, {
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
  // getAllcarWashByEmp(){
  //   return this.http.get('/app/getAllCar_washByEmpId' , {
  //     headers: {
  //       Authorization: `${localStorage.getItem('access-token')}`
  //     }
  //   }).pipe(map((rs : any)=>{
  //     return rs.data;
  //   }))
  // }
}
