import { Component, OnInit } from '@angular/core';
import { WithdrawReturnService } from 'src/app/shared/services/withdraw-return.service';
import { Message } from 'primeng/api';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-manage-withdraw',
  templateUrl: './manage-withdraw.component.html',
  styleUrls: ['./manage-withdraw.component.css']
})
export class ManageWithdrawComponent implements OnInit {
  withdraw = [];
  msgs: Message[] = [];
  constructor(private withDrawReturnService: WithdrawReturnService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.withDrawReturnService.getAllWithDrawReturn().subscribe(rs => {
      this.withdraw = rs.filter(res => {
        if (res.approve_status === 1 && res.status_action === 1) {
          return res;
        }
      });
    });
  }

  allowWithDraw(data, approve_number) {
    const payload = {
      withdraw_return_id: data.withdraw_return_id,
      approve_status: approve_number,
      amount : data.withdraw_amount,
      wash_tool_id : data.wash_tool_id
    };
    this.withDrawReturnService
      .updateManageWithDraw(payload)
      .pipe(
        switchMap(rs => {
          this.msgs.push({
            severity: 'info',
            summary: 'Approve WithDraw Success',
            detail: 'Approve WithDraw Success'
          });
          return this.withDrawReturnService.getAllWithDrawReturn().pipe(
            map(res => {
              this.withdraw = res.filter(result => {
                if (result.approve_status === 1 && result.status_action === 1) {
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
