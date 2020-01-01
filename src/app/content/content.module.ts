import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ContentRoutingModule } from './content-routing.module';
import { HomeComponent } from './home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ManageManagerComponent } from './manage-manager/manage-manager.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ManageTypecarComponent } from './manage-typecar/manage-typecar.component';
import { ManageCarserviceComponent } from './manage-carservice/manage-carservice.component';
import { ManagePromotionComponent } from './manage-promotion/manage-promotion.component';
import { ManageToolsComponent } from './manage-tools/manage-tools.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BookingComponent } from './booking/booking.component';
import { ProfileComponent } from './profile/profile.component';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { AuthService } from '../shared/services/auth.service';
import { AuthGuard } from '../shared/guard/auth.guard';
import { HttpClientService } from '../shared/services/http-client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContentComponent,
    HomeComponent,
    ManageManagerComponent,
    ManageEmployeeComponent,
    ManageTypecarComponent,
    ManageCarserviceComponent,
    ManagePromotionComponent,
    ManageToolsComponent,
    BookingComponent,
    ProfileComponent,
    BookingDetailComponent,
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    NgxSpinnerModule,
    TableModule,
    ButtonModule,
    CardModule,
    CalendarModule,
    InputTextModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, HttpClientService],
})
export class ContentModule { }
