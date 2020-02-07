import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ManageCarcareService } from './../../shared/services/manage-carcare.service';
import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService, SelectItem } from 'primeng/api';
import { TypeCar } from 'src/app/shared/interfaces/type-car';
import { Car } from 'src/app/shared/interfaces/car';
import { TypecarService } from 'src/app/shared/services/typecar.service';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CarService } from 'src/app/shared/services/car.service';
import { ModelService } from 'src/app/shared/services/model.service';

@Component({
  selector: 'app-manage-typecar',
  templateUrl: './manage-typecar.component.html',
  styleUrls: ['./manage-typecar.component.css']
})
export class ManageTypecarComponent implements OnInit {
  display = false;
  displayEdit = false;
  formTypeCar: FormGroup;
  formEditTypeCar: FormGroup;
  carDetail: any[];
  carList = [];
  typeCarList = [];
  modelList = [];
  msgs: Message[] = [];
  public formError = {
    model: '',
    car: '',
    typeCar: ''
  };
  public validationMassages = {
    model: {
      required: '*โปรดกรอกยี่ห้อรถ'
    },
    car: {
      required: '*โปรดเลือกรุ่นรถ'
    },
    typeCar: {
      required: '*โปรดเลือกประเภทรถ'
    }
  };
  constructor(
    private typeCarService: TypecarService,
    private confirmationService: ConfirmationService,
    private carService : CarService,
    private modelService : ModelService
  ) {}

  ngOnInit() {
    this.loadData();
    this.initForm();
    this.getCar();
    this.getTypeCar();
    this.getModel();
    this.formEditTypeCar = new FormGroup({
      editModel: new FormControl(null, Validators.required),
      editCar: new FormControl(null, Validators.required),
      editTypeCar: new FormControl(null, Validators.required),
      id: new FormControl(null)
    });
  }

  addTypeCar() {
    this.display = true;
  }

  initForm() {
    this.formTypeCar = new FormGroup({
      model: new FormControl(null, Validators.required),
      car: new FormControl(null, Validators.required),
      typeCar: new FormControl(null, Validators.required),
    });
    this.formTypeCar.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.onValueChange());
  }

submitFormTypeCar() {
    if (this.formTypeCar.valid) {
      this.msgs = [];
      this.typeCarService
        .insertTypeCar(this.formTypeCar.getRawValue())
        .pipe(
          switchMap(rs => {
            this.display = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Insert Employee',
              detail: 'Insert Success'
            });
            return this.typeCarService.getAllCarDetail().pipe(
              map(rs => {
                return this.carDetail = rs;
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
    if (!this.formTypeCar) {
      return;
    }
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formTypeCar.get(field);
      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  editTypeCar(event) {
    this.displayEdit = true;
    this.carService.getAllCar().pipe(switchMap(rs=>{
      rs.map(res=>{
        if(res.car_id === event.car_id){
          const car = {label : res.brand , value : res.car_id }
          this.formEditTypeCar.get('editCar').patchValue(car);
          return res;
        }
      })
      return this.typeCarService.getAllTypeCar().pipe(switchMap(rs=>{
        rs.map(res=>{
          if(res.type_car_id === event.type_car_id){
            const typeCar = { label : res.size , value : res.type_car_id }
            this.formEditTypeCar.get('editTypeCar').patchValue(typeCar);
            return typeCar;
          }
        })
        return this.modelService.getAllModel().pipe(map(rs=>{
          rs.map(res=>{
            if(res.model_id === event.model_id){
              const modelDropdown = { label : res.model_name , value : res.model_id }
              this.formEditTypeCar.get('editModel').patchValue(modelDropdown);
              return modelDropdown;
            }
          })
        }))
      }))
    })).subscribe()
    this.formEditTypeCar.patchValue({
      id: event.car_detail_id
    });
  }

  updateTypeCar() {
    this.msgs = [];
    this.typeCarService
      .updateTypeCar(this.formEditTypeCar.getRawValue())
      .pipe(
        switchMap(rs => {
          this.displayEdit = false;
          this.msgs.push({
            severity: 'info',
            summary: 'Update Employee',
            detail: 'Update Success'
          });
          return this.typeCarService.getAllCarDetail().pipe(
            map(rs => {
              return (this.carDetail = rs);
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
        this.typeCarService
          .deleteCarDetail(id)
          .pipe(
            switchMap(rs => {
              this.msgs.push({
                severity: 'info',
                summary: 'Delete Success',
                detail: 'Delete Success'
              });
              return this.typeCarService.getAllCarDetail().pipe(
                map(rs => {
                  return (this.carDetail = rs);
                })
              );
            })
          )
          .subscribe();
      }
    });
  }

  loadData() {
    this.typeCarService.getAllCarDetail().subscribe(rs => {
      this.carDetail = rs;
    });
  }

  getCar() {
    this.carService.getAllCar().subscribe(rs => {
      rs.map(res => {
        console.log(res);
        this.carList = [
          ...this.carList,
          { label: res.brand, value: res.car_id }
        ];
      });
    });
  }

  getTypeCar() {
    this.typeCarService.getAllTypeCar().subscribe(rs => {
      rs.map(res => {
        this.typeCarList = [
          ...this.typeCarList,
          { label: res.size, value: res.type_car_id }
        ];
      });
    });
  }

  getModel(){
    this.modelService.getAllModel().subscribe(rs=>{
      rs.map(res=>{
        this.modelList = [
          ...this.modelList,
          { label: res.model_name, value: res.model_id }
        ];
      })
    })
  }
}
