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
  ) {}

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
            routerLink: '/content/manageManager'
          }
        ];
        break;
      case 2:
        this.menuSideBar = [
          {
            label: 'ข้อมูลส่วนตัว',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/content/manageEmployee', this.userId]
          },
          {
            label: 'จัดการพนักงาน',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: '/content/manageEmployee'
          },
          {
            label: 'จัดการประเภทรถ',
            icon: 'pi pi-fw pi-mobile',
            routerLink: '/content/car'
          },
          {
            label: 'จัดการบริการรถ',
            icon: 'pi pi-fw pi-mobile',
            routerLink: '/content/manageCarservice'
          },
          {
            label: 'จัดการอุปการณ์ล้างรถ',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: '/content/manageTool'
          },
          {
            label: 'จัดการโปรโมชั่น',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: '/content/managePromotion'
          },
          {
            label: 'จัดการการเบิกอุปกรณ์',
            icon: 'pi pi-fw pi-users',
            routerLink: '/content/withdraw'
          },
          {
            label: 'จัดการการคินอุปกรณ์',
            icon: 'pi pi-fw pi-users',
            routerLink: '/content/manageWithdraw'
          }
        ];
        break;
      case 3:
        this.menuSideBar = [
          {
            label: 'จัดการสมาชิก',
            icon: 'pi pi-fw pi-users',
            routerLink: '/content/manageMember'
          },
          {
            label: 'จัดการการจองคิว',
            icon: 'pi pi-fw pi-users',
            routerLink: '/content/manageBooking'
          },
          { label: 'ตรวจสอบโปรโมชั่น', icon: 'pi pi-fw pi-users' },
          { label: 'ตรวจสอบคิวล้างรถ', icon: 'pi pi-fw pi-users' },
          { label: 'จัดการใบรับรถ', icon: 'pi pi-fw pi-users' },
          { label: 'ชำระเงิน', icon: 'pi pi-fw pi-users' }
        ];
        break;
      default:
        this.menuSideBar = [
          {
            label: 'จัดการสมาชิก',
            icon: 'pi pi-fw pi-users',
            routerLink: '/content/manageMember'
          },
          {
            label: 'ตรวจสอบคิดล้างรถ',
            icon: 'pi pi-fw pi-users',
            routerLink: '/content/manageBooking'
          },
          { label: 'สถานะการล้างรถ', icon: 'pi pi-fw pi-users' },
          { label: 'อุปกรณ์', icon: 'pi pi-fw pi-users' },
          { label: 'เบิกอุปกรณ์ล้างรถ', icon: 'pi pi-fw pi-users' }
        ];
        break;
    }
  }

  // showHomeMenu(...role) {
  //   console.log(role.includes(this.role));
  //   return role.includes(this.role);
  // }
}
