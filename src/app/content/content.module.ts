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
import { CheckPromotionComponent } from './cashier/check-promotion/check-promotion.component';
import { ManageMembersComponent } from './cashier/manage-members/manage-members.component';
import { PaymentComponent } from './cashier/payment/payment.component';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { ManageCarserviceComponent } from './manager/manage-carservice/manage-carservice.component';
import { ManagePromotionComponent } from './manager/manage-promotion/manage-promotion.component';
import { ManageToolsComponent } from './manager/manage-tools/manage-tools.component';
import { ManageTypecarComponent } from './manager/manage-typecar/manage-typecar.component';
import { ManagestaffComponent } from './manager/managestaff/managestaff.component';
import { ProfileComponent } from './manager/profile/profile.component';
import { WithdrawReturnComponent } from './staff/withdraw-return/withdraw-return.component';
import { CheckQueueComponent } from './staff/check-queue/check-queue.component';
import { WashStatusComponent } from './staff/wash-status/wash-status.component';
import { ToolComponent } from './staff/tool/tool.component';
import { ManageQueueComponent } from './cashier/manage-queue/manage-queue.component';
import { ManageReceiptComponent } from './cashier/manage-receipt/manage-receipt.component';
import { TabViewModule } from 'primeng/tabview';
import { WithdrawComponent } from './staff/withdraw-return/withdraw/withdraw.component';
import { ReturnComponent } from './staff/withdraw-return/return/return.component';
import { WithdrawReturnService } from '../shared/services/withdraw-return.service';
import { ManageWithdrawComponent } from './manager/manage-withdraw/manage-withdraw.component';
import { ManageReturnComponent } from './manager/manage-return/manage-return.component';
import { ProfileStaffComponent } from './staff/profile-staff/profile-staff.component';
import { ProfileCashierComponent } from './cashier/profile-cashier/profile-cashier.component';
import { ManageCleanerComponent } from './cashier/manage-cleaner/manage-cleaner.component';
import { EditQueueComponent } from './staff/edit-queue/edit-queue.component';
import { ReportComponent } from './cashier/report/report.component';
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
    ManageMembersComponent,
    ManagestaffComponent,
    CheckPromotionComponent,
    CheckQueueComponent,
    WashStatusComponent,
    ToolComponent,
    PaymentComponent,
    ManageQueueComponent,
    ManageReceiptComponent,
    WithdrawComponent,
    ReturnComponent,
    ManageWithdrawComponent,
    ManageReturnComponent,
    ProfileStaffComponent,
    ProfileCashierComponent,
    ManageCleanerComponent,
    EditQueueComponent,
    ReportComponent
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
    FileUploadModule,
    TabViewModule,
    ButtonModule
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
    ModelService,
    WithdrawReturnService
  ],
  exports: [ContentComponent]
})
export class ContentModule { }
