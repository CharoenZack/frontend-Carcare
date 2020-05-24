import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { CarWashService } from 'src/app/shared/services/car-wash.service';
import * as moment from 'moment';

@Component({
  selector: 'app-check-queue',
  templateUrl: './check-queue.component.html',
  styleUrls: ['./check-queue.component.css']
})
export class CheckQueueComponent implements OnInit {
  display = false;
  carWashList = [];
  emp = null;
  reservationList = [];
  public queueDetail = {
    license: null,
    total_price: null,
    members_name: null,
    brandCar: null,
    sizeCar: null,
    modelCar: null,
    service: null,
    province: null,
    queueId: 0,
    reservStatus: null
  };
  constructor(
    private reservationService: ReservationService,
    private carWashService: CarWashService
  ) { }

  ngOnInit() {
    this.getAllCarWash();
    this.getAllReservation();
    this.emp = localStorage.getItem('position');
    console.log(this.emp)
  }

  getAllCarWash() {
    this.carWashService.getAllcarWashDetail().subscribe(rs => {
      rs.map(res => {
        // console.log(typeof(res.employee_id) +"="+ parseInt(localStorage.getItem('userId')))
        if (res.employee_id === parseInt(localStorage.getItem('userId').toString())) {
          this.carWashList.push({ label: res.car_wash_name, value: res.car_wash_id });
        }
      });
    });
  }

  getAllReservation() {
    this.reservationService
      .getQueueByEmployeeId(localStorage.getItem('userId'))
      .subscribe(rs => {
        rs.map(res => {
          console.log(res);
          if (
            res.car_detail.resultReserve.queue_date ===
            moment(new Date()).format('YYYY-MM-DD')
          ) {
            this.reservationList.push(res);
          }
        })
      });
  }

  getDerailReservation(data) {
    this.display = true;
    this.queueDetail = {
      license: data.member.member_license,
      total_price: data.car_detail.resultReserve.total_price,
      members_name: data.member.members_fname + ' ' + data.member.members_lname,
      modelCar: data.car_detail.resultReserve.model_name,
      brandCar: data.car_detail.resultReserve.brand,
      sizeCar: data.car_detail.resultReserve.size,
      service: data.car_detail.service,
      province: data.member.province_name,
      queueId: data.car_detail.resultReserve.queue_id,
      reservStatus: data.car_detail.resultReserve.reserv_status
    };
    console.log(this.queueDetail.service);
  }

  updateStatus(queue) {
    const payload = {
      status: queue.reservStatus,
      queue_id: queue.queueId,
      service: queue.service,
      employee_id: localStorage.getItem('userId')
    };
    console.log(payload)
    this.reservationService.updateStatusReservationByStaff(payload).subscribe(rs => {
      this.display = false;
      location.reload();
    });
  }
}
