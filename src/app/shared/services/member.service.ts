import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http: HttpClient) {}

  insertMember(data) {
    return this.http
      .post('/app/insertMember', data, {
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

  getMemberByCashierId(id) {
    return this.http
      .get(`/app/getMemberWcid/${id}`, {
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
      fname: data.editfname,
      lname: data.editlname,
      address: data.editaddress,
      tel: data.editTel,
      id: data.editId
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
}
