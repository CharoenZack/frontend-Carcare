import { NgModule, ContentChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { MainComponent } from './main.component';
import { ManageManagerComponent } from '../content/manage-manager/manage-manager.component';
import { HomeComponent } from '../content/home/home.component';
import { ManageTypecarComponent } from '../content/manage-typecar/manage-typecar.component';
import { ManageCarserviceComponent } from '../content/manage-carservice/manage-carservice.component';
import { ManageToolsComponent } from '../content/manage-tools/manage-tools.component';
import { ManageEmployeeComponent } from '../content/manage-employee/manage-employee.component';
import { EditFormComponent } from '../content/edit-form/edit-form.component';
import { EditDataEmployeeComponent } from '../content/edit-data-employee/edit-data-employee.component';
import { ProfileComponent } from '../content/profile/profile.component';
import { ManagePromotionComponent } from '../content/manage-promotion/manage-promotion.component';
import { BookingComponent } from '../content/booking/booking.component';
import { BookingFormComponent } from '../content/booking-form/booking-form.component';
import { BookingDetailComponent } from '../content/booking-detail/booking-detail.component';
import { WithdrawReturnComponent } from '../content/withdraw-return/withdraw-return.component';
import { ManageWithdrawReturnComponent } from '../content/manage-withdraw-return/manage-withdraw-return.component';
import { ScheduleComponent } from '../content/schedule/schedule.component';
import { ManageChannelComponent } from '../content/manage-channel/manage-channel.component';
import { ManageMembersComponent } from '../content/manage-members/manage-members.component';

const routes: Routes = [
  {
    path: 'content',
    data: { isLoggedin : 'false', position : 0},
    component : MainComponent,
    children : [
      {
        path: '',
        component: HomeComponent,
      },
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
            component: ManageEmployeeComponent,
          },
          {
            path: 'create',
            component: EditFormComponent,
            data: {
              urlback: '/manageEmployee',
              messageback: 'กลับสู่หน้าจัดการพนักงาน'
            }
          },
          {
            path: 'edit/:id',
            component: EditDataEmployeeComponent,
            data: {
              urlback: '/manageEmployee',
              messageback: 'กลับสู่หน้าจัดการพนักงาน'
            }
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
          },
          {
            path: 'create',
            component: BookingFormComponent,
            data: {
              urlback: '/manageBooking',
            }
          },
          {
            path: 'detail/:id',
            component: BookingDetailComponent,
          }
        ]
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
        path: 'schedule',
        component: ScheduleComponent,
      },
      {
        path: 'manageChannel',
        component: ManageChannelComponent
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
