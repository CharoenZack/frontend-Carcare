import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http: HttpClient) {}
  getAllCar() {
    return this.http
      .get('/app/getAllCar', {
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

  createCar(data) {
    return this.http
      .post('/app/insertCar', data, {
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

  updateCar(data) {
    return this.http
      .patch('/app/updateCar', data, {
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

  deleteCar(id) {
    return this.http
      .delete(`/app/deleteCar/${id}`, {
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
  getCarByMember(id){
    return this.http.get(`/app/getDetailCarByMember/${id}` ,{
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }))
  }
}
