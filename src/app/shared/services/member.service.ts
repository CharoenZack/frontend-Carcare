import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http: HttpClient) { }

  insertMember(data) {
    const payload = {
      username: data.username,
      password: data.password,
      fname: data.fname,
      lname: data.lname,
      address: data.address,
      tel: data.tel,
      cashier_id: data.cashier_id,
      car_detail_id: data.carList
    }
    console.log(data);
    return this.http
      .post('/app/insertMember', payload, {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map((rs: any) => {
          return rs.result;
        })
      );
  }

  getMemberByCashierId() {
    return this.http
      .get(`/app/getMemberWcid`, {
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

  getMemberForEdit(id) {
    return this.http
      .get(`/app/getMemberForEdit/${id}`, {
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

  updateMember(data) {
    const payload = {
      username: data.editUsername,
      password: data.editPassword,
      cashier_id: data.editMemberCashierId,
      fname: data.editfname,
      lname: data.editlname,
      address: data.editaddress,
      tel: data.editTel,
      id: data.editId,
      car_detail_id: data.editCarList
    };
    return this.http
      .patch('/app/updateMemberSef_el_etWeid', payload, {
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

  deleteMember(id) {
    return this.http
      .delete(`/app/deleteMemberWeid/${id}`, {
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

  getAllmembers() {
    return this.http.get(`/app/getAllMember`, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs: any) => {
      return rs.data;
    }))
  }
}
