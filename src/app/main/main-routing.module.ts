import { EditQueueComponent } from '../content/staff/edit-queue/edit-queue.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageManagerComponent } from '../content/admin/manage-manager/manage-manager.component';
import { BookingComponent } from '../content/cashier/booking/booking.component';
import { CheckPromotionComponent } from '../content/cashier/check-promotion/check-promotion.component';
import { ManageMembersComponent } from '../content/cashier/manage-members/manage-members.component';
import { ManageReceiptComponent } from '../content/cashier/manage-receipt/manage-receipt.component';
import { PaymentComponent } from '../content/cashier/payment/payment.component';
import { ManageCarserviceComponent } from '../content/manager/manage-carservice/manage-carservice.component';
import { ManagePromotionComponent } from '../content/manager/manage-promotion/manage-promotion.component';
import { ManageToolsComponent } from '../content/manager/manage-tools/manage-tools.component';
import { ManageTypecarComponent } from '../content/manager/manage-typecar/manage-typecar.component';
import { ManagestaffComponent } from '../content/manager/managestaff/managestaff.component';
import { MainComponent } from './main.component';
import { ProfileComponent } from '../content/manager/profile/profile.component';
import { ManageQueueComponent } from '../content/cashier/manage-queue/manage-queue.component';
import { CheckQueueComponent } from '../content/staff/check-queue/check-queue.component';
import { WashStatusComponent } from '../content/staff/wash-status/wash-status.component';
import { ToolComponent } from '../content/staff/tool/tool.component';
import { WithdrawReturnComponent } from '../content/staff/withdraw-return/withdraw-return.component';
import { ManageWithdrawComponent } from '../content/manager/manage-withdraw/manage-withdraw.component';
import { ManageReturnComponent } from '../content/manager/manage-return/manage-return.component';
import { ProfileStaffComponent } from '../content/staff/profile-staff/profile-staff.component';
import { ProfileCashierComponent } from '../content/cashier/profile-cashier/profile-cashier.component';
import { ManageCleanerComponent } from '../content/cashier/manage-cleaner/manage-cleaner.component';

const routes: Routes = [
  {
    path: 'content',
    data: { isLoggedin : 'false', position : 0},
    component : MainComponent,
    children : [
      {
        path : 'admin',
        children : [
          {
              path: 'manageManager',
              component: ManageManagerComponent,
          }
        ]
      },
      {
        path : 'manager',
        children : [
          {
            path: 'car',
            component: ManageTypecarComponent,
          },
          {
            path: 'manageCarservice',
            component: ManageCarserviceComponent,
          },
          {
            path: 'manageTool',
            component: ManageToolsComponent,
          },
          {
            path: 'manageEmployee',
            children: [
              {
                path: '',
                component: ManagestaffComponent
              },
              {
                path: ':id',
                component: ProfileComponent
              }
            ]
          },
          {
            path: 'managePromotion',
            component: ManagePromotionComponent
          },
          {
            path: 'manageWithdraw',
            component: ManageWithdrawComponent,
          },
          {
            path: 'manageReturn',
            component: ManageReturnComponent,
          },
        ]
      },
      {
        path : 'cashier',
        children : [
          {
            path: 'manageBooking',
            children: [
              {
                path: '',
                component: BookingComponent
              }
            ]
          },
          {
            path : 'checkPromotion',
            component : CheckPromotionComponent
          },
          {
            path: 'manageEmployee',
            component : ManageCleanerComponent
          },
          {
            path: 'manageMember',
            component : ManageMembersComponent
          },
          {
            path : 'manageQueue',
            component : ManageQueueComponent
          },
          {
            path : 'manageReceipt',
            component : ManageReceiptComponent
          },
          {
            path : 'payment',
            component : PaymentComponent
          },
          {
            path : ':id',
            component : ProfileCashierComponent
          },
        ]
      },
      {
        path : 'staff',
        children : [
          {
            path : 'checkqueue',
            component : CheckQueueComponent
          },
          {
            path : 'washStatus',
            component : WashStatusComponent
          },
          {
            path : 'tool',
            component : ToolComponent
          },
          {
            path: 'withdraw',
            component: WithdrawReturnComponent
          },
          {
            path : 'editQueue',
            component : EditQueueComponent
          },
          {
            path : ':id',
            component : ProfileStaffComponent
          }

        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRouingModule {}
