import { PositionService } from 'src/app/shared/services/position.service';
import { Component, OnInit } from '@angular/core';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message, ConfirmationService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CarWashService } from 'src/app/shared/services/car-wash.service';


@Component({
  selector: 'app-manage-cleaner',
  templateUrl: './manage-cleaner.component.html',
  styleUrls: ['./manage-cleaner.component.css']
})
export class ManageCleanerComponent implements OnInit {
  staff1: any[];
  staff2: any[];
  display = false;
  displayEdit = false;
  positionList = [];
  formStaff: FormGroup;
  formEditStaff: FormGroup;
  msgs: Message[] = [];
  nameList: any[] = [{ label: 'โปรดเลือกพนักงาน', value: 0 }];
  channelList: any[] = [{ label: 'โปรดเลือกช่องล้าง', value: 0 }];
  public formError = {
    name: '',
    channel: ''
  };
  public validationMassages = {
    name: {
      required: '*กรุณาเลือกพนักงาน'
    },
    channel: {
      required: '*กรุณาเลือกช่องล้าง'
    }
  };
  constructor(
    private manageStaffService: ManageUserService,
    private confirmationService: ConfirmationService,
    private positionService: PositionService,
    private carWashService: CarWashService,
  ) { }

  ngOnInit() {
    this.loadData();
    this.getPosition();
    this.loadData2();
    this.getAllcarWash();
    this.getAllcarWashDetail();
    this.initForm();
    this.formEditStaff = new FormGroup({
      editchannel: new FormControl(null, Validators.required)
    });
  }

  initForm() {
    this.formStaff = new FormGroup({
      name: new FormControl(null, Validators.required),
      channel: new FormControl(null, Validators.required)
    });
    this.formStaff
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => this.onValueChange());
  }
  addStaff() {
    this.display = true;
  }

  loadData() {
    this.manageStaffService.getEmployeeWCar_wash().subscribe(rs => {
      rs.map(res => {
        this.staff1 = rs;
      })

      console.log(this.staff1);


    });
  }

  loadData2() {
    this.manageStaffService.getEmployeeWCar_wash2().subscribe(rs => {
      this.staff2 = rs;
    });
  }

  getPosition() {
    this.positionService.getAllPositionNotAM().subscribe(rs => {
      rs.map(res => {
        console.log(res);
        this.positionList = [
          ...this.positionList,
          { label: res.position_role + ' ' + res.position_work, value: res.position_id }
        ];
      })
    })
  }
  getTabViewStatus(event) {
    if (event.index === 0) {
      this.loadData()
    } else if (event.index === 1) {
      this.loadData2();
    }
  }

  getAllcarWash() {
    this.carWashService.getAllcarWash().subscribe(rs => {
      rs.map(res => {
        this.channelList = [
          ...this.channelList,
          { label: res.car_wash_name, value: res.car_wash_id }
        ];
      });
    });
  }

  getAllcarWashDetail() {
    this.carWashService.getEmployeeWNotCarWash().subscribe(rs => {
      rs.map(res => {
        this.nameList = [
          ...this.nameList,
          { label: res.employee_fname + ' ' + res.employee_lname, value: res.employee_id }
        ];
        console.log(this.nameList);

      });
    });
  }

  editStaff(event) {
    this.displayEdit = true;
    this.formEditStaff.patchValue({
      editchannel: event.car_wash_name
    });
  }

  submitFormStaff() {
    if (this.formStaff.valid) {
      this.msgs = [];
      this.carWashService
        .crateStaff(this.formStaff.getRawValue())
        .pipe(
          switchMap(rs => {
            this.display = false;
            this.msgs.push({ severity: 'info', summary: 'Insert Employee', detail: 'Insert Success' });
            return this.manageStaffService.getEmployeeWCar_wash().pipe(map(rs => {
              return this.staff1 = rs;
            }))
          })
        )
        .subscribe();
    } else {
      this.onValueChange();
    }
  }
  confirm(id) {
    this.msgs = [];
    console.log(id);

    this.confirmationService.confirm({
      message: 'คุณต้องการลบข้อมูลพนักงานคนนี้ใช่หรือไม่',
      accept: () => {
        this.manageStaffService.deleteEmployeeFormCar_wash(id).pipe(switchMap(rs => {
          this.msgs.push({ severity: 'info', summary: 'Delete Success', detail: 'Delete Success' });
          return this.manageStaffService.getEmployeeWCar_wash().pipe(map(rs => {
            return this.staff1 = rs;
          }))
        })).subscribe()
      }
    });
  }
  private onValueChange() {
    if (!this.formStaff) {
      return;
    }
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formStaff.get(field);
      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

}
