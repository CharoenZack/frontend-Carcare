import { PositionService } from 'src/app/shared/services/position.service';
import { Component, OnInit } from '@angular/core';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';

@Component({
  selector: 'app-manage-cleaner',
  templateUrl: './manage-cleaner.component.html',
  styleUrls: ['./manage-cleaner.component.css']
})
export class ManageCleanerComponent implements OnInit {
  staff: any[];
  positionList = [];
  constructor(
    private manageStaffService: ManageUserService,
    private positionService: PositionService
  ) { }

  ngOnInit() {
    this.loadData();
    this.getPosition();
    this.loadData2();
  }

  loadData() {
    this.manageStaffService.getEmployeeWCar_wash().subscribe(rs => {
      this.staff = rs;
    });
  }

  loadData2() {
    this.manageStaffService.getEmployeeWCar_wash2().subscribe(rs => {
      this.staff = rs;
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


}
