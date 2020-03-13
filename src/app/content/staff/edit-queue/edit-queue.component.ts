import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-edit-queue',
  templateUrl: './edit-queue.component.html',
  styleUrls: ['./edit-queue.component.css']
})
export class EditQueueComponent implements OnInit {
  reservation = [];
  msgs: Message[] = [];
  constructor(
    private reservationService: ReservationService,
  ) { }

  ngOnInit() {
    this.getAllReservation();
  }

  getAllReservation() {
    let status = '';
    this.reservation = [];
    this.reservationService
      .getAllReservation(localStorage.getItem('userId'))
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
