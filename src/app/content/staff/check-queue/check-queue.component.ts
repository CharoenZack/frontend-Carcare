import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { CarWashService } from 'src/app/shared/services/car-wash.service';

@Component({
  selector: 'app-check-queue',
  templateUrl: './check-queue.component.html',
  styleUrls: ['./check-queue.component.css']
})
export class CheckQueueComponent implements OnInit {
  display = false;
  carWashList = [];
  reservationList = [];
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
        // console.log(typeof(res.employee_id) +"="+ parseInt(localStorage.getItem('userId')))
        if(res.employee_id === parseInt(localStorage.getItem('userId').toString())){
          this.carWashList.push({label : res.car_wash_name , value : res.car_wash_id });
        }
        console.log(this.carWashList);
      });
    });
  }

  getAllReservation() {
    this.reservationService
      .getQueueByEmployeeId(localStorage.getItem('userId'))
      .subscribe(rs => {
        rs.map(res=>{
          this.reservationList.push(res);
        })
      });
  }

  getDerailReservation(id){
    this.display = true;
    let service = '';
    this.reservationService.getQueurById(id).subscribe(rs=>{
      rs.map(res=>{
        if(service === ''){
          service += res.service_name;
        }else{
          service += ","+res.service_name;
        }

        this.queueDetail = {
          license : res.license,
          total_price : res.total_price,
          members_name : res.members_fname+" "+res.members_lname,
          typeCar : res.size,
          service
        }
      })
      console.log(this.queueDetail);
    })
  }
}
