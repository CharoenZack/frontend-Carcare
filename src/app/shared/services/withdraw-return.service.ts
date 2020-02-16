import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WithdrawReturnService {
  constructor(private http: HttpClient) {}

  getAllWithDrawReturn() {
    return this.http
      .get('/app/getAllWithdraw_returnJWash_toolJEmployee', {
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

  createWithDraw(data) {
    const payload = {
      status_action : 1,
      wash_tool_id : data.washTool.value,
      amount : data.amount,
      date_start : moment(data.dateStart).format('YYYY-MM-DD'),
      approve_status : 1,
      employee_id : localStorage.getItem('userId'),
    }
    return this.http
      .post('/app/insertWithdraw_return', payload, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map((rs: any) => {
          return rs;
        })
      );
  }

  updateWithdraw(data) {
    const payload = {
      status_action : 2,
      withdraw_return_id : data.withdraw_return_id,
      approve_status : 1
    }
    return this.http
      .post('/app/updateWash_toolSedWwrid', payload, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map((rs: any) => {
          return rs;
        })
      );
  }

  updateManageWithDraw(data){
    return this.http.post('/app/updatWithdraw_returnSasWwrid' , data , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map(rs=>{
      return rs;
    }))
  }

  updateManagerReturn(data){
    return this.http.post('/app/updatWithdraw_returnSasWwridReturn' , data , {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map(rs=>{
      return rs;
    }))
  }


}
