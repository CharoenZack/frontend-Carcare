import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { WithdrawReturnService } from 'src/app/shared/services/withdraw-return.service';
import { switchMap, map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-return',
  templateUrl: './manage-return.component.html',
  styleUrls: ['./manage-return.component.css']
})
export class ManageReturnComponent implements OnInit {

  returnData = [];
  msgs : Message[] = [];
  constructor(private withDrawReturnService: WithdrawReturnService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.withDrawReturnService.getAllWithDrawReturn().subscribe(rs => {
      this.returnData = rs.filter(res => {
        if(res.approve_status === 1 && res.status_action === 2){
            return res;
        }
        });
      });
  }

  allowReturn(data , approve_number){
    const payload = {
      withdraw_return_id: data.withdraw_return_id,
      approve_status: approve_number,
      amount : data.withdraw_amount,
      wash_tool_id : data.wash_tool_id,
      date_end : moment(new Date()).format('YYYY-MM-DD'),
    };
    this.withDrawReturnService
      .updateManagerReturn(payload)
      .pipe(
        switchMap(rs => {
          this.msgs.push({
            severity: 'info',
            summary: 'Approve Return Success',
            detail: 'Approve Return Success'
          });
          return this.withDrawReturnService.getAllWithDrawReturn().pipe(
            map(res => {
              this.returnData = res.filter(result => {
                if (result.approve_status === 1 && result.status_action === 2) {
                  return result;
                }
              });
            })
          );
        })
      )
      .subscribe();
  }



}
