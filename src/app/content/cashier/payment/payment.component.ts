import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { Message } from 'primeng/api';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import * as moment from 'moment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],

})
export class PaymentComponent implements OnInit {

  constructor(private reservationService: ReservationService) { }
  public payment = [];
  msgs: Message[] = [];
  ngOnInit() {
    this.reservationService.getReservationForPayment().subscribe(rs => {
      rs.map(res => {
        this.payment = [...this.payment, {
          license: res.resultReserve.member_license,
          car: res.resultReserve.model_name + ' ' + res.resultReserve.brand + ' ' + res.resultReserve.size,
          total_price: res.resultReserve.total_price,
          members_name: res.resultReserve.members_fname + ' ' + res.resultReserve.members_lname,
          queue_date: moment(res.resultReserve.queue_date).format('DD-MM-YYYY') ,
          end_date: res.resultReserve.end_date,
          service: res.service,
          reserv_status: res.resultReserve.reserv_status,
          reserv_id: res.resultReserve.reserv_id,
          queue_id: res.resultReserve.queue_id
        }]
      })
      console.log(this.payment)
    })
  }

  updateStatusPayment(data) {
    let status = '';
    let service = '';
    const payload = {
      reserv_status: data.reserv_status,
      queue_id: data.queue_id
    };
    this.reservationService.updateStatusReserve(payload).pipe(
      switchMap(rs => {
        this.msgs.push({
          severity: 'info',
          summary: 'Update Status Complete',
          detail: 'Update Status Complete'
        });
        return this.reservationService.getReservationForPayment().pipe(map(rs => {
          rs.map(res => {
            this.payment = [{
              license: res.resultReserve.member_license,
              car: res.resultReserve.model_name + ' ' + res.resultReserve.brand + ' ' + res.resultReserve.size,
              total_price: res.resultReserve.total_price,
              members_name: res.resultReserve.members_fname + ' ' + res.resultReserve.members_lname,
              queue_date: moment(res.resultReserve.queue_date).format('DD-MM-YYYY') ,
              end_date: res.resultReserve.end_date,
              service: res.service,
              reserv_status: res.resultReserve.reserv_status,
              reserv_id: res.resultReserve.reserv_id,
              queue_id: res.resultReserve.queue_id
            }]
            location.reload();
          })
        }))
      })
    ).subscribe()
  }



}
