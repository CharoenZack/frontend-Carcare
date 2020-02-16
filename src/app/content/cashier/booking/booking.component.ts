import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/shared/services/booking.service';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map
} from 'rxjs/operators';
import { MemberService } from 'src/app/shared/services/member.service';
import { TypecarService } from 'src/app/shared/services/typecar.service';
import { CleanService } from 'src/app/shared/services/clean.service';
import { CarWashService } from 'src/app/shared/services/car-wash.service';
import * as moment from 'moment';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { Message } from 'primeng/api';
import { CarService } from 'src/app/shared/services/car.service';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  display = false;
  date: Date;
  results = [];
  typeCar = [];
  cleanList = [];
  carWashList = [{ label: 'โปรดเลือกช่องล้างรถ', value: 0 }];
  carList: any[] = [{ label: 'โปรดเลือกรถ', value: 0 }];
  reservation = [];
  msgs: Message[] = [];
  public cols: any[];
  public book: any[];
  cleanServiceFromControl;
  public form: FormGroup;
  cleanServiceArray: FormArray;
  cleanServiceGroup: FormGroup;
  formBooking: FormGroup;
  public formError = {
    member: '',
    typeCar: '',
    cleanService: '',
    license: '',
    carWash: '',
    reserveDateTime: ''
  };
  public validationMassages = {
    member: {
      required: '*กรุณากรอกสมาชิก'
    },
    typeCar: {
      required: '*กรุณาเลือกประเภทรถ'
    },
    cleanService: {
      required: '*กรุณาเลือกบริการ'
    },
    license: {
      required: '*กรุณากรอกเลขทะเบียนรถ'
    },
    carWash: {
      required: '*กรุณากรอกช่องล้างรถ'
    },
    reserveDateTime: {
      required: '*วันที่และเวลาจอง'
    }
  };
  constructor(
    private router: Router,
    private memberService: MemberService,
    private typeCarService: TypecarService,
    private cleanService: CleanService,
    private carWashService: CarWashService,
    private bookingService: BookingService,
    private reservationService: ReservationService,
    private carService: CarService
  ) {}

  ngOnInit() {
    this.getAllReservation();
    this.initFormBooking();
    this.getAllTypeCar();
    // this.getAllCleanService();
    this.getAllcarWash();
  }

  bookingCarWash() {
    this.display = true;
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
              status = 'รอการดำเนินการ';
            } else if (res.reserv_status === 1) {
              status = 'กำลังดำเนินการ';
            } else if (res.reserv_status === 2) {
              status = 'เสร็จสิ้นการดำเนินการ';
            }
            return { ...res, ...{ status } };
          })
        ];
      });
  }

  changeCarWash() {
    const { carWash } = this.formBooking.getRawValue();
    const payload = {
      employee_id: localStorage.getItem('userId'),
      car_wash_id: carWash.value
    };
    this.reservationService
      .getAllReservationByCarWash(payload)
      .subscribe((rs: any[]) => {
        if (typeof rs !== 'undefined' && rs.length > 0) {
          rs.map(res => {
            if (res.queue_date === moment(new Date()).format('YYYY-MM-DD')) {
              this.formBooking.get('reserveTime').setValue(res.end_date);
            } else {
              this.formBooking.get('reserveTime').setValue('09:00');
            }
          });
        } else {
          this.formBooking.get('reserveTime').setValue('09:00');
        }
      });
  }

  search(event) {
    this.memberService.getAllmembers(event.query).subscribe(rs => {
      rs.map(res => {
        this.results = [
          this.results,
          { name: res.members_fname, value: res.members_id }
        ];
      });
    });
  }

  selectMember(event) {
    this.carService.getCarByMember(event.value).subscribe(rs => {
      rs.map(res => {
        console.log(res);
        this.carList = [
          ...this.carList,
          {
            label: res.model_name + ' ' + res.brand + ' ' + res.size,
            value: res.car_detail_id
          }
        ];
      });
    });
  }

  changeCar() {
    this.cleanList = [];
    const { car } = this.formBooking.getRawValue();
    this.formBooking.get('cleanServiceForm').reset();
    this.cleanService.getCleanServiceByTypeCar(car.value).subscribe(rs => {
      rs.map(res => {
        this.cleanList = [
          ...this.cleanList,
          { label: res.service_name, value: res.clean_service_detail_id }
        ];
      });
    });
  }

  initFormBooking() {
    this.formBooking = new FormGroup({
      member: new FormControl(null, Validators.required),
      car: new FormControl(null, Validators.required),
      cleanServiceForm: new FormControl(null, Validators.required),
      carWash: new FormControl(null, Validators.required),
      reserveDate: new FormControl(moment(new Date()).format('YYYY-MM-DD')),
      reserveTime: new FormControl(null, Validators.required),
      cashierId: new FormControl(localStorage.getItem('userId'))
    });
    this.formBooking.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.onValueChange());
  }

  submitFormBooking() {
    this.reservation = [];
    if (this.formBooking.valid) {
      const {
        member,
        car,
        cleanServiceForm,
        carWash,
        reserveDate,
        reserveTime,
        cashierId
      } = this.formBooking.getRawValue();
      const payload = {
        members_id: member.value,
        car_detail_id: car.value,
        clean_service_detail_id: cleanServiceForm,
        carwash: carWash.value,
        reserveDate,
        reserveTime,
        employee_id: cashierId
      };
      this.bookingService
        .booking(payload)
        .pipe(
          switchMap(rs => {
            this.display = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Booking Complete',
              detail: 'Booking Complete'
            });
            return this.reservationService
              .getAllReservation(localStorage.getItem('userId'))
              .pipe(
                map(rs => {
                  this.reservation = [
                    ...this.reservation,
                    ...rs.map(res => {
                      if (res.reserv_status === 0) {
                        status = 'รอการดำเนินการ';
                      } else if (res.reserv_status === 1) {
                        status = 'กำลังดำเนินการ';
                      } else if (res.reserv_status === 2) {
                        status = 'เสร็จสิ้นการดำเนินการ';
                      }
                      return { ...res, ...{ status } };
                    })
                  ];
                })
              );
          })
        )
        .subscribe();
    } else {
      this.onValueChange();
    }
  }

  private onValueChange() {
    if (!this.formBooking) {
      return;
    }
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formBooking.get(field);
      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  getAllTypeCar() {
    this.typeCarService.getAllTypeCar().subscribe(rs => {
      rs.map(res => {
        this.typeCar = [
          ...this.typeCar,
          { label: res.size, value: res.type_car_id }
        ];
      });
    });
  }

  // getAllCleanService() {
  //   // let cleanServiceForm;
  //   this.cleanService.getAllcleanService().subscribe(rs => {
  //     rs.map(res => {
  //       this.cleanList = [
  //         ...this.cleanList,
  //         { label: res.service_name, value: res.clean_service_detail_id }
  //       ];
  //     });
  //   });
  // }

  getAllcarWash() {
    this.carWashService.getAllcarWash().subscribe(rs => {
      rs.map(res => {
        this.carWashList = [
          ...this.carWashList,
          { label: res.car_wash_name, value: res.car_wash_id }
        ];
      });
    });
  }

  updateStatusReserve(data) {
    let status = '';
    this.reservation = [];
    const payload = {
      reserv_status: data.reserv_status,
      queue_id: data.queue_id
    };
    this.reservationService
      .updateStatusReserve(payload)
      .pipe(
        switchMap(rs => {
          this.msgs.push({
            severity: 'info',
            summary: 'Update Status Complete',
            detail: 'Update Status Complete'
          });
          return this.reservationService
            .getAllReservation(localStorage.getItem('userId'))
            .pipe(
              map(rs => {
                this.reservation = [
                  ...this.reservation,
                  ...rs.map(res => {
                    if (res.reserv_status === 0) {
                      status = 'รอการดำเนินการ';
                    } else if (res.reserv_status === 1) {
                      status = 'กำลังดำเนินการ';
                    } else if (res.reserv_status === 2) {
                      status = 'เสร็จสิ้นการดำเนินการ';
                    }
                    return { ...res, ...{ status } };
                  })
                ];
              })
            );
        })
      )
      .subscribe();
  }
}
