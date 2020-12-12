import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MDUser } from '../models/MDUser.model';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class UserService {
  apiUrl = environment.backend + 'User/';

  CurrentUser: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient,private router:Router) {}

  login(credential: MDUser) {
    let apiUrl = this.apiUrl + 'Login';
    return this.http
      .post<string>(apiUrl, credential)
      .pipe(catchError(this.errorhandler));
  }
  logout(){
    this.CurrentUser.next(null);
    this.router.navigate(['login']);
  }
  isAuthUser():boolean {
    let token = null;
    this.CurrentUser.subscribe((res) => {
      token = res;
    });
    if (token == null) {
      return false;
    } else {
      return true;
    }
  }
  errorhandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
