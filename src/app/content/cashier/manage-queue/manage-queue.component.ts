import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { CarWashService } from 'src/app/shared/services/car-wash.service';
import { map } from 'rxjs/internal/operators/map';
import { Message } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-queue',
  templateUrl: './manage-queue.component.html',
  styleUrls: ['./manage-queue.component.css']
})
export class ManageQueueComponent implements OnInit {
  carWashList = [];
  reservationList = [];
  reservationForm: FormGroup;
  display = false;
  public queueDetail = {
    license: null,
    total_price: null,
    members_name: null,
    brandCar: null,
    sizeCar: null,
    modelCar: null,
    service: null,
    province: null
  };
  constructor(
    private reservationService: ReservationService,
    private carWashService: CarWashService
  ) {}

  ngOnInit() {
    this.getAllCarWash();
    this.getAllReservation();
  }

  getAllCarWash() {
    this.carWashService.getAllcarWash().subscribe(rs => {
      rs.map(res => {
        this.carWashList.push({
          label: res.car_wash_name,
          value: res.car_wash_id
        });
      });
    });
  }

  getAllReservation() {
    this.reservationService
      .getQueue(localStorage.getItem('userId'))
      .subscribe(rs => {
        rs.map((res: any) => {
          if (
            res.car_detail.resultReserve.queue_date ===
            moment(new Date()).format('YYYY-MM-DD')
          ) {
            this.reservationList.push(res);
          }
        });
      });
  }
  getDetailReservation(data) {
    this.display = true;
    let service = '';
    // this.reservationService.getQueurById(id).subscribe(rs=>{
    //   rs.map(res=>{
    this.queueDetail = {
      license: data.member.member_license,
      total_price: data.car_detail.resultReserve.total_price,
      members_name: data.member.members_fname + ' ' + data.member.members_lname,
      modelCar: data.car_detail.resultReserve.model_name,
      brandCar: data.car_detail.resultReserve.brand,
      sizeCar: data.car_detail.resultReserve.size,
      service: data.car_detail.service,
      province : data.member.province_name
    };
    // })
    // })
  }
}
