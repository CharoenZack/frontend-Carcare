import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { Message } from 'primeng/api';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private reservationService : ReservationService) { }
  public payment = [];
  msgs : Message[] = [];
  ngOnInit() {
    let service = '';
    this.reservationService.getReservationForPayment(localStorage.getItem('userId')).subscribe(rs=>{
      rs.map(res=>{
        this.payment = [ ...this.payment , {
          license : res.member_license,
          car : res.model_name+' '+res.brand+' '+res.size,
          total_price : res.total_price,
          members_name : res.members_fname+" "+res.members_lname,
          end_date : res.end_date,
          service : res.service_name,
          reserv_status : res.reserv_status,
          reserv_id : res.reserv_id,
          queue_id : res.queue_id
        }]
      })
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
        return this.reservationService.getReservationForPayment(localStorage.getItem('userId')).pipe(map(rs=>{
          rs.map(res=>{
            if(service === ''){
              service += res.service_name;
            }else{
              service += ","+res.service_name;
            }
            this.payment = [{
              license : res.member_license,
              car : res.model_name+' '+res.brand+' '+res.size,
              total_price : res.total_price,
              members_name : res.members_fname+" "+res.members_lname,
              end_date : res.end_date,
              service,
              reserv_status : res.reserv_status,
              reserv_id : res.reserv_id,
              queue_id : res.queue_id
            }]
          })
          }))
        })
    ).subscribe()
  }

  

}
