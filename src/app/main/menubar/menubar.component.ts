import { Router, ActivatedRoute } from '@angular/router';
import { ManagePositionService } from '../../shared/services/manage-position.service';
import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  menuSideBar: MenuItem[];

  public userId: string;
  public role: string;
  public personalId: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.personalId = this.route.snapshot.paramMap.get('id');
    this.userId = localStorage.getItem('userId');
    this.menubar(localStorage.getItem('position'));

    this.authService.getRole().subscribe(res => (this.role = res));
  }

  menubar(position) {
    switch (+position) {
      case 1:
        this.menuSideBar = [
          {
            label: 'จัดการเจ้าของร้าน',
            icon: 'pi pi-fw pi-users',
            routerLink: '/content/admin/manageManager'
          }
        ];
        break;
      case 2:
        this.menuSideBar = [
          {
            label: 'ข้อมูลส่วนตัว',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/content/manager/manageEmployee', this.userId]
          },
          {
            label: 'จัดการพนักงาน',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: '/content/manager/manageEmployee'
          },
          {
            label: 'จัดการประเภทรถ',
            icon: 'pi pi-fw pi-mobile',
            routerLink: '/content/manager/car'
          },
          {
            label: 'จัดการบริการรถ',
            icon: 'pi pi-fw pi-mobile',
            routerLink: '/content/manager/manageCarservice'
          },
          {
            label: 'จัดการอุปการณ์ล้างรถ',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: '/content/manager/manageTool'
          },
          {
            label: 'จัดการโปรโมชัน',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: '/content/manager/managePromotion'
          },
          {
            label: 'รายงานสรุปยอด',
            icon: 'pi pi-fw pi-file',
            routerLink: '/content/cashier/report'
          },
        ];
        break;
      case 3:
        this.menuSideBar = [
          {
            label: 'จัดการโปรไฟล์',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/content/cashier/', this.userId]
          },
          {
            label: 'จัดการพนักงาน',
            icon: 'pi pi-fw pi-users',
            routerLink: '/content/cashier/manageEmployee'
          },
          {
            label: 'จัดการสมาชิก',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: '/content/cashier/manageMember'
          },
          {
            label: 'จัดการการจองคิว',
            icon: 'pi pi-fw pi-calendar',
            routerLink: '/content/cashier/manageBooking'
          },
          { label: 'ตรวจสอบโปรโมชั่น', icon: 'pi pi-fw pi-copy', routerLink: '/content/cashier/checkPromotion' },
          { label: 'ตรวจสอบคิวล้างรถ', icon: 'pi pi-fw pi-table', routerLink: '/content/cashier/manageQueue' },
          { label: 'ชำระเงิน', icon: 'pi pi-fw pi-money-bill', routerLink: '/content/cashier/payment' },
          { label: 'รายงานสรุปยอด', icon: 'pi pi-fw pi-file', routerLink: '/content/cashier/report' },

        ];
        break;
      default:
        this.menuSideBar = [
          {
            label: 'จัดการโปรไฟล์',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/content/staff/', this.userId]
          },
          {
            label: 'ลงชื่อเข้างาน',
            icon: 'pi pi-fw pi-users',
            routerLink: '/content/cashier/manageEmployee'
          },
          {
            label: 'ตรวจสอบคิวล้างรถ',
            icon: 'pi pi-fw pi-users',
            routerLink: '/content/staff/checkqueue'
          },
          // {
          //   label: 'จัดการคิวล้างรถ',
          //   icon: 'pi pi-fw pi-users',
          //   routerLink: '/content/staff/editQueue'
          // },
          { label: 'อุปกรณ์', icon: 'pi pi-fw pi-users', routerLink: '/content/staff/tool' },
          { label: 'เบิกอุปกรณ์ล้างรถ', icon: 'pi pi-fw pi-users', routerLink: '/content/staff/withdraw' }
        ];
        break;
    }
  }

  // showHomeMenu(...role) {
  //   console.log(role.includes(this.role));
  //   return role.includes(this.role);
  // }
}
