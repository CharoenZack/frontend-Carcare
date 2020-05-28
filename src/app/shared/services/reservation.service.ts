import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient) { }

  getAllReservation(id) {
    return this.http
      .get(
        `/app/getAllReservationsJEmployeeJMembersJCar_washJType_carJPosition/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem('access-token')}`
          }
        }
      )
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );
  }

  createReservation(data) {
    return this.http
      .post('/app/create', data, {
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

  getAllReservationByCarWash(data) {
    return this.http
      .post('/app/getReservationsWcwidORrsidDESC/', data, {
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

  getQueue(id) {
    return this.http
      .get(
        `/app/getReservationByCashier/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem('access-token')}`
          }
        }
      )
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );
  }

  updateStatusReserve(data) {
    return this.http
      .patch('/app/updateReservationsSrsWrsid', data, {
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

  getQueurById(id) {
    return this.http
      .get(
        `/app/getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWqeidGsd/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem('access-token')}`
          }
        }
      )
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );
  }

  getQueueByEmployeeId(id) {
    return this.http
      .get(
        `/app/getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWcwidGsd/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem('access-token')}`
          }
        }
      )
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );
  }

  getReservationForPayment() {
    return this.http
      .get(
        `app/getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWrs3`,
        {
          headers: {
            Authorization: `${localStorage.getItem('access-token')}`
          }
        }
      )
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );
  }
  getReservationForReport(data) {
    const date = {
      date: data
    }
    console.log(data)
    return this.http
      .post(
        'app/getAllReservationWReport', date,
        {
          headers: {
            Authorization: `${localStorage.getItem('access-token')}`
          }
        }
      )
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );

  }
  getAllReservationWReportSelectMonth(data) {
    const date = {
      code: data.code
    }
    console.log(date)
    return this.http
      .post(
        'app/getAllReservationWReportSelectMonth', date,
        {
          headers: {
            Authorization: `${localStorage.getItem('access-token')}`
          }
        }
      )
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );

  }

  updateStatusReservationByStaff(reservation) {
    return this.http
      .post('app/updateStatusReservationByStaff/', reservation, {
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
