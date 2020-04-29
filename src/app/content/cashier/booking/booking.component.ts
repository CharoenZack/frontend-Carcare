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
  results = [{ label: 'โปรดเลือกสมาชิก', value: 0 }];
  typeCar = [];
  cleanList = [];
  carWashList = [{ label: 'โปรดเลือกช่องล้างรถ', value: 0 }];
  carList: any[] = [{ label: 'โปรดเลือกรถ', value: 0 }];
  aboutCar: any[];
  reservation = [];
  msgs: Message[] = [];
  public cols: any[];
  public book: any[];
  cleanServiceFromControl;
  public form: FormGroup;
  cleanServiceArray: FormArray;
  cleanServiceGroup: FormGroup;
  formBooking: FormGroup;
  displayWarningBooking = false;
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
  ) { }

  ngOnInit() {
    this.getAllReservation();
    this.initFormBooking();
    this.getAllTypeCar();
    // this.getAllCleanService();
    this.getAllcarWash();
    this.getAllmember();
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
              status = 'จองคิว';
            } else if (res.reserv_status === 1) {
              status = 'กำลังล้าง';
            } else if (res.reserv_status === 2) {
              status = 'เสร็จสิ้นการดำเนินการ';
            }
            return { ...res, ...{ status } };
          })
        ];
      });
  }

  changeCarWash(event) {
    const carWash = event.value;
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    const currentTime = moment.utc(
      moment(new Date()).format('HH:mm'),
      'HH:mm'
    );
    const payload = {
      employee_id: localStorage.getItem('userId'),
      car_wash_id: carWash.value
    };
    this.reservationService
      .getAllReservationByCarWash(payload)
      .subscribe((rs: any[]) => {
        if (typeof rs !== 'undefined' && rs.length > 0) {
          rs.forEach(res => {
            if (res.queue_date === currentDate) {
              const start = moment.utc(res.start_date, 'HH:mm');
              console.log('start' + res.start_date)
              const end = moment.utc(res.end_date, 'HH:mm');
              const diffTimeSE = moment.duration(end.diff(start));
              console.log(end.diff(start) + '1')
              const totalTimeSE =
                diffTimeSE.get('hours') * 60 + diffTimeSE.get('minutes');
              const diffTimeEC = moment.duration(currentTime.diff(start));
              console.log(currentTime.diff(start) + '2')
              const totalTimeEC =
                diffTimeEC.get('hours') * 60 + diffTimeEC.get('minutes');
              if (totalTimeEC > totalTimeSE) {
                this.formBooking.get('reserveTime').setValue(moment(new Date()).format('HH:mm'));
              } else {
                this.formBooking.get('reserveTime').setValue(res.end_date);
              }
            } else {
              const initial = moment.utc('09:00', 'HH:mm');
              const diffTimeIC = moment.duration(currentTime.diff(initial));
              const totalTimeIC =
                diffTimeIC.get('hours') * 60 + diffTimeIC.get('minutes');
              if (totalTimeIC > 0) {
                this.formBooking.get('reserveTime').setValue(moment(new Date()).format('HH:mm'));
              } else {
                this.formBooking.get('reserveTime').setValue('09:00');
              }
            }
          });
        } else {
          const initial = moment.utc('09:00', 'HH:mm');
          const current = moment.utc(
            moment(new Date()).format('HH:mm'),
            'HH:mm'
          );
          const diffTimeIC = moment.duration(current.diff(initial));
          const totalTimeIC =
            diffTimeIC.get('hours') * 60 + diffTimeIC.get('minutes');
          if (totalTimeIC > 0) {
            this.formBooking.get('reserveTime').setValue(moment(new Date()).format('HH:mm'));
          } else {
            this.formBooking.get('reserveTime').setValue('09:00');
          }
        }
      });
  }

  getAllmember() {
    this.memberService.getAllmembers().subscribe(rs => {
      rs.map(res => {
        this.results = [
          ...this.results,
          { label: res.members_fname, value: res.members_id }
        ];
      });
    });
  }

  selectMember(event) {
    this.carList = [{ label: 'โปรดเลือกรถ', value: 0 }];
    this.carService.getCarByMember(event.value.value).subscribe(rs => {
      rs.map(res => {
        console.log(res.members_id)
        this.carList = [
          ...this.carList,
          {
            label: res.model_name,
            // label: res.model_name + ' ' + res.brand + ' ' + res.size,
            value: res.car_detail_id,
            value_member: res.members_id,
            type_car: res.type_car_id
          }

        ];
      });
      console.log(this.carList);
    });
  }

  selectCar(event) {
    this.carService.getCarByMember(event.value.value_member).subscribe(rs => {
      rs.map(res => {
        this.aboutCar = [
          ...this.aboutCar,
          {
            brand: res.brand,
            model: res.model_name,
            size: res.size,
            // label: res.model_name + ' ' + res.brand + ' ' + res.size,
            value: res.car_detail_id,

            type_car: res.type_car_id
          }
        ];
      });
      console.log(this.carList);
    });
  }

  changeCar(event) {
    this.aboutCar = [];
    this.cleanList = [];
    const { car } = this.formBooking.getRawValue();
    this.formBooking.get('cleanServiceForm').reset();
    this.cleanService.getCleanServiceByTypeCar(car.type_car).subscribe(rs => {
      rs.map(res => {
        this.cleanList = [
          ...this.cleanList,
          {
            label: res.service_name + ' ' + 'ราคา' + ' ' + res.service_price + ' ' + 'บาท' + ' ' + 'ใช้เวลาประมาณ ' + res.service_duration + ' นาที',
            value: res.clean_service_detail_id
          }
        ];
      });
    });
    this.carService.getCarByMember(event.value.value_member).subscribe(rs => {
      console.log(event.value.value_member);

      rs.map(res => {
        console.log(...this.aboutCar)
        this.aboutCar = [
          ...this.aboutCar,
          {
            brand: res.member_license,
            model: res.brand,
            size: res.size,
            // label: res.model_name + ' ' + res.brand + ' ' + res.size,
            value: res.car_detail_id,

            type_car: res.type_car_id
          }

        ];
      });
      console.log(this.aboutCar);
    });

  }

  initFormBooking() {
    this.formBooking = new FormGroup({
      member: new FormControl(null, Validators.required),
      car: new FormControl(null, Validators.required),
      cleanServiceForm: new FormControl(null, Validators.required),
      carWash: new FormControl(null, Validators.required),
      reserveDate: new FormControl(moment(new Date()).format('YYYY-MM-DD')),
      reserveTime: new FormControl(moment(new Date()).format('HH:mm')),
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
      console.log(payload)
      this.bookingService
        .booking(payload)
        .pipe(
          switchMap(rs => {
            if (rs.checkBooking === false) {
              this.displayWarningBooking = true;
            } else {
              this.display = false;
              this.msgs.push({
                severity: 'info',
                summary: 'Booking Complete',
                detail: 'Booking Complete'
              });
              this.formBooking.reset();
              return this.reservationService
                .getAllReservation(localStorage.getItem('userId'))
                .pipe(
                  map(rs => {
                    this.reservation = [
                      ...this.reservation,
                      ...rs.map(res => {
                        if (res.reserv_status === 0) {
                          status = 'จองคิว';
                        } else if (res.reserv_status === 1) {
                          status = 'กำลังล้าง';
                        } else if (res.reserv_status === 2) {
                          status = 'เสร็จสิ้นการล้าง';
                        }
                        return { ...res, ...{ status } };
                      })
                    ];
                  })
                );
            }
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
                      status = 'จองคิว';
                    } else if (res.reserv_status === 1) {
                      status = 'กำลังล้าง';
                    } else if (res.reserv_status === 2) {
                      status = 'เสร็จสิ้นการล้าง';
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
