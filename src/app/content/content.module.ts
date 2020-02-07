import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListboxModule } from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { AuthGuard } from '../shared/guard/auth.guard';
import { AuthService } from '../shared/services/auth.service';
import { CarWashService } from '../shared/services/car-wash.service';
import { CarService } from '../shared/services/car.service';
import { CleanService } from '../shared/services/clean.service';
import { HttpClientService } from '../shared/services/http-client.service';
import { ManageUserService } from '../shared/services/manage-user.service';
import { MemberService } from '../shared/services/member.service';
import { ModelService } from '../shared/services/model.service';
import { PositionService } from '../shared/services/position.service';
import { TypecarService } from '../shared/services/typecar.service';
import { WashtoolService } from '../shared/services/washtool.service';
import { ManageManagerComponent } from './admin/manage-manager/manage-manager.component';
import { BookingComponent } from './cashier/booking/booking.component';
import { ManageMembersComponent } from './cashier/manage-members/manage-members.component';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { ManageCarserviceComponent } from './manager/manage-carservice/manage-carservice.component';
import { ManagePromotionComponent } from './manager/manage-promotion/manage-promotion.component';
import { ManageToolsComponent } from './manager/manage-tools/manage-tools.component';
import { ManageTypecarComponent } from './manager/manage-typecar/manage-typecar.component';
import { ManageWithdrawReturnComponent } from './manager/manage-withdraw-return/manage-withdraw-return.component';
import { ManagestaffComponent } from './manager/managestaff/managestaff.component';
import { ProfileComponent } from './manager/profile/profile.component';
import { WithdrawReturnComponent } from './staff/withdraw-return/withdraw-return.component';
import { CheckPromotionComponent } from './cashier/check-promotion/check-promotion.component';
@NgModule({
  declarations: [
    ContentComponent,
    ManageManagerComponent,
    ManageTypecarComponent,
    ManageCarserviceComponent,
    ManagePromotionComponent,
    ManageToolsComponent,
    BookingComponent,
    ProfileComponent,
    WithdrawReturnComponent,
    ManageWithdrawReturnComponent,
    ManageMembersComponent,
    ManagestaffComponent,
    CheckPromotionComponent
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
    ReactiveFormsModule,
    DialogModule,
    InputMaskModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ToastModule,
    AutoCompleteModule,
    CheckboxModule,
    MultiSelectModule,
    OrderListModule,
    ListboxModule,
    TooltipModule,
    KeyFilterModule,
    FileUploadModule
  ],
  providers: [
    AuthService,
    ManageUserService,
    AuthGuard,
    HttpClientService,
    ConfirmationService,
    MemberService,
    TypecarService,
    CleanService,
    CarWashService,
    PositionService,
    WashtoolService,
    CarService,
    ModelService
  ],
  exports: [ContentComponent]
})
export class ContentModule {}
