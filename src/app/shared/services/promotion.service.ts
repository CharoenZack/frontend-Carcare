import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  constructor(private http: HttpClient) {}

  getAllPromotion() {
    return this.http
      .get('/app/getAllPromotion', {
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

  createPromotion(data) {
    const payload = {
      promoDetail : data.promoDetail,
      startDate : moment(data.startDate).format('YYYY-MM-DD'),
      endDate : moment(data.endDate).format('YYYY-MM-DD'),
      discount : data.discount
    };
    return this.http
      .post('/app/insertPromotion', payload, {
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

  updatePromotion(data) {
    const payload = {
      promoDetail : data.editPromoDetail,
      startDate : moment(data.editStartDate).format('YYYY-MM-DD'),
      endDate : moment(data.editEndDate).format('YYYY-MM-DD'),
      discount : data.editDiscount,
      promotion_id : data.id
    };
    return this.http
      .patch('/app/updatePromotionWpmid', payload, {
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

  deletePormotion(id) {
    return this.http
      .delete(`/app/deletePromotionWpmid/${id}`, {
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
