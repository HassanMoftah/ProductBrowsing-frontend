import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MDUser } from 'src/app/models/MDUser.model';
import { UserService } from 'src/app/services/UserService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  User: MDUser = new MDUser();
  IsLoading = false;
  constructor(
    private UserSRV: UserService,
    private router: Router,
    private Toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.IsLoading = true;
    this.UserSRV.login(this.User).subscribe(
      (res) => {
        this.UserSRV.CurrentUser.next(res);
        this.router.navigate(['products']);
      },
      (err) => {
        this.IsLoading = false;
         this.Toastr.error("invalid username or password");
      }
    );
  }
}
