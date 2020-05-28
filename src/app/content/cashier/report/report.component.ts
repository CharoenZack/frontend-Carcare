import { ExcelServiceService } from './../../../shared/services/excel-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

interface Month {
  name: string;
  code: number;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportData = [];
  formReport: FormGroup;
  public reset = false;
  dates: Date;
  totalReport = 0;
  count = 0;
  manage = null;
  month: Month[];
  selectMonth: Month;
  constructor(
    private reservationService: ReservationService,

  ) {
    this.month = [
      { name: 'มกราคม', code: 1 },
      { name: 'กุมภาพันธ์', code: 2 },
      { name: 'มีนาคม', code: 3 },
      { name: 'เมษายน', code: 4 },
      { name: 'พฤษภาคม', code: 5 },
      { name: 'มิถุนายน', code: 6 },
      { name: 'กรกฎาคม', code: 7 },
      { name: 'สิงหาคม', code: 8 },
      { name: 'กันยายน', code: 9 },
      { name: 'ตุลาคม', code: 10 },
      { name: 'พฤศจิกายน', code: 11 },
      { name: 'ธันวาคม', code: 12 },
    ]
  }


  ngOnInit() {
    this.manage = localStorage.getItem('userId');
  }

  onDateSelect(event) {
    this.reportData = [];
    event = this.dates;
    event = moment(this.dates).format('YYYY-MM-DD');
    console.log(event);
    this.reservationService.getReservationForReport(event).subscribe(rs => {
      let total = 0;
      this.reset = true;
      rs.map(res => {
        this.reportData = [...this.reportData, {
          license: res.resultReserve.member_license,
          car: res.resultReserve.model_name + ' ' + res.resultReserve.brand + ' ' + res.resultReserve.size,
          total_price: res.resultReserve.total_price,
          members_name: res.resultReserve.members_fname + ' ' + res.resultReserve.members_lname,
          queue_date: moment(res.resultReserve.queue_date).format('DD-MM-YYYY') ,
          service: res.service,
          // reserv_status: res.resultReserve.reserv_status,
          // reserv_id: res.resultReserve.reserv_id,
          // queue_id: res.resultReserve.queue_id
        }];
        total += res.resultReserve.total_price;
      });
      console.log(total);
      this.totalReport = total;
    });
  }
  onMonthSelect(event) {
    this.reportData = [];
    event = this.selectMonth;
    console.log(event);
    this.reservationService.getAllReservationWReportSelectMonth(event).subscribe(rs => {
      let total = 0;
      this.reset = true;
      rs.map(res => {
        this.reportData = [...this.reportData, {
          license: res.resultReserve.member_license,
          car: res.resultReserve.model_name + ' ' + res.resultReserve.brand + ' ' + res.resultReserve.size,
          total_price: res.resultReserve.total_price,
          members_name: res.resultReserve.members_fname + ' ' + res.resultReserve.members_lname,
          queue_date: moment(res.resultReserve.queue_date).format('DD-MM-YYYY') ,
          service: res.service,
          // reserv_status: res.resultReserve.reserv_status,
          // reserv_id: res.resultReserve.reserv_id,
          // queue_id: res.resultReserve.queue_id
        }];
        total += res.resultReserve.total_price;
      });
      console.log(total);
      this.totalReport = total;
    });
  }
  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getCars());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'primengTable');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  getCars() {
    let report = [];
    for (let r of this.reportData) {
      r.queue_date = r.queue_date.toString();
      report.push(r);
    }
    return report;
  }

}
