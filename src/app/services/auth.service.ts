import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Login, Register } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  public onLogin(user: any) {
    this.email = user.email;
    return this.http
      .post<Login>(environment.backendUri + 'api/login', user, {
        observe: 'response',
      })
      .subscribe((response) => {
        if (response.status == 200) {
          let token = response.body?.access_token;
          if (token) {
            localStorage.setItem('access_token', token);
            this.router.navigate(['']);
          }
        }
      });
  }
  public onRegister(user: any) {
    return this.http
      .post<Register>(environment.backendUri + 'api/register', user, {
        observe: 'response',
      })
      .subscribe((response) => {
        if (response.status == 200) {
          this.router.navigate(['logIn']);
        }
      });
  }
  public onLogout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/redirect'], {skipLocationChange: true}).then(() => this.router.navigate(['/']));
  }
}
