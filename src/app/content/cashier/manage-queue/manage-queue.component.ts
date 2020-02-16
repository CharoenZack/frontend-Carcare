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
  reservationForm : FormGroup;
  display = false;
  public queueDetail = {
    license : null,
    total_price : null,
    members_name : null,
    typeCar : null,
    service : null
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
        this.carWashList.push({label : res.car_wash_name , value : res.car_wash_id });
      });
    });
  }

  getAllReservation() {
    this.reservationService
      .getQueue(localStorage.getItem('userId'))
      .subscribe(rs => {
        rs.map(res=>{
          if (res.queue_date === moment(new Date()).format('YYYY-MM-DD')) {
            this.reservationList.push(res);
          }
        })
      });
  }

  getDetailReservation(id){
    this.display = true;
    let service = '';
    this.reservationService.getQueurById(id).subscribe(rs=>{
      rs.map(res=>{
        if(service === ''){
          service = res.service_name;
        }else{
          if(service !== res.service_name){
            service = ","+res.service_name;
          }
        }

        this.queueDetail = {
          license : res.member_license,
          total_price : res.total_price,
          members_name : res.members_fname+" "+res.members_lname,
          typeCar : res.model_name+' '+res.brand+' '+res.size,
          service
        }
      })
    })
  }
}
