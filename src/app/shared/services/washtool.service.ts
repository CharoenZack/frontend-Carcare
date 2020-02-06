import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WashtoolService {

  constructor(private http : HttpClient) { }

  getAllWashTool(){
    return this.http.get('/app/getAllWash_tool' , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }))
  }

  createWashTool(data){
    const payload = {
      tool_name : data.tool,
      amount : data.amount,
      tool_status : data.status,
      employee_id : data.employeeId
    }
    return this.http.post('/app/insertWash_tool' , payload , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs : any)=>{
      return rs.data;
    }))
  }

  updateWashTool(data){
    const payload = {
      tool_name : data.editTool,
      amount : data.editAmount,
      tool_status : data.editStatus,
      wash_tool_id : data.id
    }
    return this.http.patch('/app/updateWash_toolStn_am_tsWwtid' , payload , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs : any)=>{
      return rs.data;
    }))
  }

  deleteWashTool(id){
    return this.http.delete(`/app/deleteWash_toolWwtid/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs:any)=>{
      return rs.data;
    }))
  }
}
