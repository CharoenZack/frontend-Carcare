import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { CarService } from 'src/app/shared/services/car.service';
import { ModelService } from 'src/app/shared/services/model.service';
import { TypecarService } from 'src/app/shared/services/typecar.service';



@Component({
  selector: 'app-manage-typecar',
  templateUrl: './manage-typecar.component.html',
  styleUrls: ['./manage-typecar.component.css']
})
export class ManageTypecarComponent implements OnInit {
  brands: string;
  display = false;
  displayEdit = false;
  displayCar = false;
  displayModel = false;
  formTypeCar: FormGroup;
  formAddCar: FormGroup;
  formAddModel: FormGroup;
  formEditTypeCar: FormGroup;
  carDetail: any[];
  carList: any[] = [
    {
      label: 'เลือกยี่ห้อรถ',
      value: 0,
    },
  ];
  brand = [];
  typeCarList = [];
  modelList: any[] = [
    {
      label: 'เลือกรุ่นรถ',
      value: 0,
    },
  ];
  msgs: Message[] = [];
  value: boolean = false;
  values: boolean = false;
  displayWarningBrand = false;
  displayWarningModel = false;
  public formError = {
    model: '',
    car: '',
    typeCar: '',
    addBrand: '',
    addModel: '',
  };
  public validationMassages = {
    model: {
      required: '*โปรดระบุยี่ห้อรถ'
    },
    car: {
      required: '*โปรดระบุรุ่นรถ'
    },
    addModel: {
      required: '*โปรดระบุยี่ห้อรถ'
    },
    addBrand: {
      required: '*โปรดระบุรุ่นรถ'
    },
    typeCar: {
      required: '*โปรดเลือกประเภทรถ'
    }
  };
  constructor(
    private typeCarService: TypecarService,
    private confirmationService: ConfirmationService,
    private carService: CarService,
    private modelService: ModelService
  ) { }

  ngOnInit() {
    this.loadData();
    this.initForm();
    this.getCar();
    this.getTypeCar();
    this.getModel();
    this.CarForm();
    this.ModelForm();
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
  addCar() {
    this.displayCar = true;
  }
  CarForm() {
    this.formAddCar = new FormGroup({
      car: new FormControl(null, Validators.required)
    });
  }
  ModelForm() {
    this.formAddModel = new FormGroup({
      model: new FormControl(null, Validators.required)
    });
  }
  addModel() {
    this.displayModel = true;
  }
  initForm() {
    this.formTypeCar = new FormGroup({
      model: new FormControl(0, Validators.required),
      car: new FormControl(0, Validators.required),
      addBrand: new FormControl(''),
      addModel: new FormControl(''),
      typeCar: new FormControl(null, Validators.required),
    });
    this.formTypeCar.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.onValueChange());
  }
  submitFormTypeCar() {
    console.log(this.formTypeCar.value)
    if (this.formTypeCar.valid) {
      this.msgs = [];
      this.typeCarService
        .insertTypeCar(this.formTypeCar.getRawValue())
        .pipe(
          switchMap(rs => {
            if (rs.brandCar === false) {
              this.displayWarningBrand = true;
            } else if (rs.modelCar === false) {
              this.displayWarningModel = true;
            } else {
              this.display = false;
              this.msgs.push({
                severity: 'info',
                summary: 'Insert Typecar',
                detail: 'Insert Success'
              });
              return this.typeCarService.getAllCarDetail().pipe(
                map(rs => {
                  return this.carDetail = rs;
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
    this.carService.getAllCar().pipe(switchMap(rs => {
      rs.map(res => {
        if (res.car_id === event.car_id) {
          const car = { label: res.brand, value: res.car_id }
          this.formEditTypeCar.get('editCar').patchValue(car);
          return res;
        }
      })
      return this.typeCarService.getAllTypeCar().pipe(switchMap(rs => {
        rs.map(res => {
          if (res.type_car_id === event.type_car_id) {
            const typeCar = { label: res.size, value: res.type_car_id }
            this.formEditTypeCar.get('editTypeCar').patchValue(typeCar);
            return typeCar;
          }
        })
        return this.modelService.getAllModel().pipe(map(rs => {
          rs.map(res => {
            if (res.model_id === event.model_id) {
              const modelDropdown = { label: res.model_name, value: res.model_id }
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
  filterBrands(event) {
    this.brand = [];
    for (let i = 0; i < this.carList.length; i++) {
      let brand = this.carList[i].label;
      console.log(brand);
      if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.brand.push(this.carList[i]);
      }
    }
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

  getModel() {
    this.modelService.getAllModel().subscribe(rs => {
      rs.map(res => {
        this.modelList = [
          ...this.modelList,
          { label: res.model_name, value: res.model_id }
        ];
      })
    })
  }
}
