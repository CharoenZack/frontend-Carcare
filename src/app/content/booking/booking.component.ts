import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/shared/services/booking.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MemberService } from 'src/app/shared/services/member.service';
import { TypecarService } from 'src/app/shared/services/typecar.service';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { CleanService } from 'src/app/shared/services/clean.service';
import { CarWashService } from 'src/app/shared/services/car-wash.service';

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
  carWashList = [];
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
    reserveDateTime: '',
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
    private bookingService : BookingService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'ชื่อผู้จอง' },
      { field: 'reserv_date', header: 'วันที่จอง' },
      { field: 'dateTime', header: 'เวลาที่จอง' },
      { field: 'car', header: 'ข้อมูลรถ' },
      { field: 'service', header: 'บริการ' },
      { field: 'price', header: 'ค่าบริการ' },
      { field: 'duration', header: 'ระยะเวลาบริการ' }
    ];
    this.initFormBooking();
    this.getAllTypeCar();
    this.getAllCleanService();
    this.getAllcarWash();
  }

  bookingCarWash() {
    this.display = true;
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
  public onRowSelect(e) {
    // console.log(e.data);
    // this.router.navigate(['/manageBooking/detail', book.reserv_id]);
  }

  initFormBooking() {
    this.formBooking = new FormGroup({
      member: new FormControl(null, Validators.required),
      typeCar: new FormControl(null, Validators.required),
      cleanServiceForm: new FormControl(null, Validators.required),
      license: new FormControl(null, Validators.required),
      carWash: new FormControl(null, Validators.required),
      reserveDateTime: new FormControl(null, Validators.required),
      cashierId: new FormControl(localStorage.getItem('userId'))
    });
    this.formBooking.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.onValueChange());
  }

  submitFormBooking() {
    if (this.formBooking.valid) {
      const {
        member,
        typeCar,
        cleanServiceForm,
        license,
        carWash,
        reserveDateTime,
        cashierId
      } = this.formBooking.getRawValue();
      console.log(cleanServiceForm)
      const payload = {
        members_id: member.value,
        type_car_id: typeCar.value,
        clean_service : cleanServiceForm,
        license,
        carwash: carWash.value,
        reserveDateTime,
        employee_id : cashierId
      };
      this.bookingService.booking(payload).subscribe(rs=>{
        console.log(rs);
      })
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

  getAllCleanService() {
    // let cleanServiceForm;
    this.cleanService.getAllcleanService().subscribe(rs => {
      rs.map(res => {
        this.cleanList = [
          ...this.cleanList,
          { label: res.service_name, value: res.clean_service_detail_id }
        ];
      });
    });
  }

  get cleanServiceForm(): FormArray {
    return this.formBooking.get('cleanServiceForm') as FormArray;
  }

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
}
