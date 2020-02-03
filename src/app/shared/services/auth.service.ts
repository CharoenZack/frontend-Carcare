import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';


@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<string>('manager');

  constructor(
    private router: Router,
    private http: HttpClient
  ) {

  }

  getRole(): BehaviorSubject<string> {
    console.log(this.role);
    return this.role;


  }

  setRole(role: string) {
    this.role.next(role);
    console.log(role);

  }

  login(username, password) {
    const body = {
      username, password
    };
    return this.http.post('/employee/login', body);
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }
}
