import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageManagerComponent } from '../content/admin/manage-manager/manage-manager.component';
import { BookingComponent } from '../content/cashier/booking/booking.component';
import { ManageMembersComponent } from '../content/cashier/manage-members/manage-members.component';
import { ManageCarserviceComponent } from '../content/manager/manage-carservice/manage-carservice.component';
import { ManagePromotionComponent } from '../content/manager/manage-promotion/manage-promotion.component';
import { ManageToolsComponent } from '../content/manager/manage-tools/manage-tools.component';
import { ManageTypecarComponent } from '../content/manager/manage-typecar/manage-typecar.component';
import { ManageWithdrawReturnComponent } from '../content/manager/manage-withdraw-return/manage-withdraw-return.component';
import { ManagestaffComponent } from '../content/manager/managestaff/managestaff.component';
import { ProfileComponent } from '../content/manager/profile/profile.component';
import { WithdrawReturnComponent } from '../content/staff/withdraw-return/withdraw-return.component';
import { MainComponent } from './main.component';
import { CheckPromotionComponent } from '../content/cashier/check-promotion/check-promotion.component';

const routes: Routes = [
  {
    path: 'content',
    data: { isLoggedin : 'false', position : 0},
    component : MainComponent,
    children : [
      {
        path: 'manageManager',
        component: ManageManagerComponent,
      },

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
        path: 'withdraw',
        component: WithdrawReturnComponent,
      },
      {
        path: 'manageWithdraw',
        component: ManageWithdrawReturnComponent,
      },
      {
        path: 'manageMember',
        component : ManageMembersComponent
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
