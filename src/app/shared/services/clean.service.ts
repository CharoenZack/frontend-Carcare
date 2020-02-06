import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CleanService {

  constructor(private http : HttpClient) { }

  getAllcleanService(){
    return this.http.get('/app/getAllClean_serviceJClean_service_detail' , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs : any)=>{
      return rs.data;
    }))
  }
  
  getService(){
    return this.http.get('/app/getAllClean_service' , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs : any) =>{
      return rs.data;
    }))
  }

  createCleanServiceDetail(data){
    const payload = {
      clean_service_id : data.service.value,
      service_price : data.price,
      service_duration : data.timeService,
      type_car_id : data.typeCar.value
    }
    return this.http.post('/app/insertClean_service_detail' ,  payload ,{
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs : any) =>{
      return rs.data;
    }))
  }

  getAllCleanServiceDetailFull(){
    return this.http.get('/app/getAllClean_service_detailJClean_serviceJType_car' , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs : any)=>{
      return rs.data;
    }))
  }

  updateCleanServiceDetail(data){
    const payload = {
      clean_service_id : data.editservice.value,
      service_price : data.editprice,
      service_duration : data.edittimeService,
      type_car_id : data.editTypeCar.value,
      clean_service_detail_id : data.id
    }
    return this.http.patch('/app/updateClean_service_detailSsp_esd_csid_tcidWcsdid' , payload , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.result
    }))
  }

  deleteCleanServiceDetail(id){
    return this.http.delete(`/app/deleteClean_service_detailWcsdid/${id}` , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs : any)=>{
      return rs.result;
    }))
  }
}
