import { Car } from 'src/app/shared/interfaces/car';
import { Component, OnInit } from '@angular/core';
import { ManageCarcareService } from 'src/app/shared/services/manage-carcare.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { MenuItem, Message, ConfirmationService } from 'primeng/api';
import { Time, formatDate } from '@angular/common';
import { TypeCar } from 'src/app/shared/interfaces/type-car';
import * as moment from 'moment';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map
} from 'rxjs/operators';
import { CleanService } from 'src/app/shared/services/clean.service';
import { TypecarService } from 'src/app/shared/services/typecar.service';

@Component({
  selector: 'app-manage-carservice',
  templateUrl: './manage-carservice.component.html',
  styleUrls: ['./manage-carservice.component.css']
})
export class ManageCarserviceComponent implements OnInit {
  display = false;
  displayEdit = false;
  formClean: FormGroup;
  formEditClean: FormGroup;
  clean: any[];
  typeCarList = [];
  serviceList = [];
  msgs: Message[] = [];
  public formError = {
    service: '',
    price: '',
    timeService: '',
    typeCar: ''
  };
  public validationMassages = {
    service: {
      required: '*โปรดเลือกบริการล้างรถ'
    },
    price: {
      required: '*โปรดกรอกราคา'
    },
    timeService: {
      required: '*โปรดกรอกระยะเวลาล้าง'
    },
    typeCar: {
      required: '*โปรดเลือกประเภทของรถ'
    }
  };
  constructor(
    private cleanService: CleanService,
    private confirmationService: ConfirmationService,
    private typeCarService: TypecarService
  ) {}

  ngOnInit() {
    this.loadData();
    this.initForm();
    this.getService();
    this.getAllTypeCar();
    this.formEditClean = new FormGroup({
      editservice: new FormControl(null),
      editprice: new FormControl(null),
      edittimeService: new FormControl(null),
      editTypeCar: new FormControl(null),
      id: new FormControl(null)
    });
  }

  addCleanService() {
    this.display = true;
  }

  initForm() {
    this.formClean = new FormGroup({
      service: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      timeService: new FormControl(null, Validators.required),
      typeCar: new FormControl(null, Validators.required)
    });
    this.formClean.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.onValueChange());
  }

  submitFormCleanService() {
    if (this.formClean.valid) {
      this.msgs = [];
      this.cleanService
        .createCleanServiceDetail(this.formClean.getRawValue())
        .pipe(
          switchMap(rs => {
            this.display = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Insert Service',
              detail: 'Insert Success'
            });
            return this.cleanService.getAllCleanServiceDetailFull().pipe(
              map(rs => {
                return (this.clean = rs);
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
    if (!this.formClean) {
      return;
    }
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formClean.get(field);
      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  editCleanService(event) {
    this.displayEdit = true;
    this.cleanService
      .getService()
      .pipe(
        switchMap((rs: any) => {
          rs.filter((rs: any) => {
            if (rs.clean_service_id === event.clean_service_id) {
              const dropdownClean = {
                label: rs.service_name,
                value: rs.clean_service_id
              };
              this.formEditClean.get('editservice').patchValue(dropdownClean);
              return dropdownClean;
            }
          });
          return this.typeCarService.getAllTypeCar().pipe(
            map((typeCar: any) => {
              typeCar.filter((typeCarRs: any) => {
                if (typeCarRs.type_car_id === event.type_car_id) {
                  const dropdownTypeCar = {
                    label: typeCarRs.size,
                    value: typeCarRs.type_car_id
                  };
                  this.formEditClean
                    .get('editTypeCar')
                    .patchValue(dropdownTypeCar);
                  return typeCarRs;
                }
              });
              this.formEditClean.patchValue({
                editprice: event.service_price,
                edittimeService: event.service_duration,
                id: event.clean_service_detail_id
              });
            })
          );
        })
      )
      .subscribe();
  }

  updateCleanService() {
    this.msgs = [];
    this.cleanService
      .updateCleanServiceDetail(this.formEditClean.getRawValue())
      .pipe(
        switchMap(rs => {
          this.displayEdit = false;
          this.msgs.push({
            severity: 'info',
            summary: 'Update Employee',
            detail: 'Update Success'
          });
          return this.cleanService.getAllCleanServiceDetailFull().pipe(
            map(rs => {
              return (this.clean = rs);
            })
          );
        })
      )
      .subscribe();
  }

  confirm(id) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'คุณต้องการลบข้อมูลผู้จัดการร้านคนนี้ใช่หรือไม่',
      accept: () => {
        this.cleanService
          .deleteCleanServiceDetail(id)
          .pipe(
            switchMap(rs => {
              this.msgs.push({
                severity: 'info',
                summary: 'Delete Success',
                detail: 'Delete Success'
              });
              return this.cleanService.getAllCleanServiceDetailFull().pipe(
                map(rs => {
                  return (this.clean = rs);
                })
              );
            })
          )
          .subscribe();
      }
    });
  }

  loadData() {
    this.cleanService.getAllCleanServiceDetailFull().subscribe(rs => {
      this.clean = rs;
    });
  }

  getAllTypeCar() {
    this.typeCarService.getAllTypeCar().subscribe(rs => {
      rs.map(res => {
        this.typeCarList = [
          ...this.typeCarList,
          { label: res.size, value: res.type_car_id }
        ];
      });
    });
  }

  getService() {
    this.cleanService.getService().subscribe(rs => {
      rs.map(res => {
        this.serviceList = [
          ...this.serviceList,
          { label: res.service_name, value: res.clean_service_id }
        ];
      });
    });
  }
}
