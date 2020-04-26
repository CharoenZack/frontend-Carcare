import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  constructor(private http: HttpClient) {}

  getAllPosition() {
    return this.http.get('/app/getAllPosition', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs : any)=>{
      return rs.data;
    }))
  }

  getAllPositionNotAM(){
    return this.http.get('/app/getPositionWN1A2' , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }))
  }

  getAllPositionNotAM2(){
    return this.http.get('/app/getPositionWN1A3' , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }))
  }
}
