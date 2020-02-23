import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarWashService {

  constructor(private http : HttpClient) { }

  getAllcarWash(){
    return this.http.get('/app/getAllCar_wash' , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs : any)=>{
      return rs.data;
    }))
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
