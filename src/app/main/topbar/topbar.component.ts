import { Employee } from '../../shared/interfaces/employee';
import { AuthGuard } from '../../shared/guard/auth.guard';
import {Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
    public userData: Employee;
    public userDisplayName1 = '';
    public name = '';
    public isLoggedin : string;

    public userDisplayName = new Subject<any>();
    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private manageUser: ManageUserService,
        private authGuard: AuthGuard,
        private routes : Router
    ) {
    }

    ngOnInit() {
      this.isLoggedin = localStorage.getItem('isLoggedIn');
        this.name = localStorage.getItem('name');
        this.authService.isLoggedIn().subscribe(res => this.getData());
    }

    logout() {
      localStorage.clear();
      this.routes.navigate(['/login']);
    }

     getData() {
        this.userDisplayName1 = localStorage.getItem('username');

    }
}
