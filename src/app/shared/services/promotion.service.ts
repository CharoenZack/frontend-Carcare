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
    let formData = new FormData();
    formData.append('promoDetail', data.promoDetail);
    formData.append('startDate', moment(data.startDate).format('YYYY-MM-DD'));
    formData.append('endDate', moment(data.endDate).format('YYYY-MM-DD'));
    formData.append('discount', data.discount);
    formData.append('promo_img', data.promoImg);
    return this.http
      .post('/app/insertPromotion', formData, {
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
    let formData = new FormData();
    formData.append('promoDetail', data.editPromoDetail);
    formData.append(
      'startDate',
      moment(data.editStartDate).format('YYYY-MM-DD')
    );
    formData.append('endDate', moment(data.editEndDate).format('YYYY-MM-DD'));
    formData.append('discount', data.editDiscount);
    formData.append('promo_img', data.editPromoImg);
    return this.http
      .patch('/app/updatePromotionWpmid', formData, {
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
