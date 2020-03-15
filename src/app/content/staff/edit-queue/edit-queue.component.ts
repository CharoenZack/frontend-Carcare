import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { Message } from 'primeng/api';
import { CarWashService } from 'src/app/shared/services/car-wash.service';
@Component({
  selector: 'app-edit-queue',
  templateUrl: './edit-queue.component.html',
  styleUrls: ['./edit-queue.component.css']
})
export class EditQueueComponent implements OnInit {
  reservation = [];
  msgs: Message[] = [];
  carWashList = [];
  constructor(
    private reservationService: ReservationService,
    private carWashService: CarWashService
  ) { }

  ngOnInit() {
    this.getAllReservation();
    this.getAllCarWash();
  }
  getAllCarWash() {
    this.carWashService.getAllcarWashDetail().subscribe(rs => {
      rs.map(res => {
        // console.log(typeof(res.employee_id) +"="+ parseInt(localStorage.getItem('userId')))
        console.log(rs);

        this.carWashList.push({ label: res.car_wash_name, value: res.car_wash_id });
      });
    });
  }

  getAllReservation() {
    let status = '';
    this.reservation = [];
    this.reservationService
      .getAllReservationsWCleaner(localStorage.getItem('userId'))
      .subscribe(rs => {
        this.reservation = [
          ...this.reservation,
          ...rs.map(res => {
            if (res.reserv_status === 0) {
              status = 'จองคิว';
            } else if (res.reserv_status === 1) {
              status = 'กำลังล้าง';
            } else if (res.reserv_status === 2) {
              status = 'รอการชำระเงิน';
            }
            return { ...res, ...{ status } };
          })
        ];
      });
  }

}
