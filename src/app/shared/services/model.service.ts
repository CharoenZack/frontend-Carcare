import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http : HttpClient) { }

  getAllModel(){
    return this.http.get('/app/getAllModel' , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs : any)=>{
      return rs.data;
    }))
  }
}
