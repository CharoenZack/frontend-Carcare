import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http : HttpClient) { }

  getAllReservation(id){
    return this.http.get(`/app/getAllReservationsJEmployeeJMembersJCar_washJType_carJPosition/${id}` , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }))
  }

  createReservation(data){
    return this.http.post('/app/create' , data , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }))
  }

  getAllReservationByCarWash(data){
    return this.http.post('/app/getReservationsWcwidORrsidDESC/' , data , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }))
  }

  getQueue(id){
    return this.http.get(`/app/getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWmbidGsd/${id}` ,{
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }))
  }

  updateStatusReserve(data){
    return this.http.patch('/app/updateReservationsSrsWrsid' , data , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }))
  }

  getQueurById(id){
    return this.http.get(`/app/getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWqeidGsd/${id}` , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }))
  }

  getQueueByEmployeeId(id){
    return this.http.get(`/app/getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWcwidGsd/${id}` ,{
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }))
  }

  getReservationForPayment(id){
    return this.http.get(`app/getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWrs3/${id}` , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }));
  }
}
