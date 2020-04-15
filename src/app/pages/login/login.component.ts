import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppService, User } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  processing = false;
  togglePassword = false;

  email = new FormControl('', [ Validators.required, Validators.email ]);
  password = new FormControl('', Validators.required);

  constructor(private api: AppService, private router: Router) { }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Please provide your email' :
      this.email.hasError('email') ? 'Please enter a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Please provide your password' : '';
  }

  onLogin() {
    this.processing = true;
    let loggedInUser: User;

    let loginSuccess = false;
    this.api.getUsers().filter((user: User) => {
      if (user.email === this.email.value && user.password === this.password.value) {
        user.loggedIn = true;
        loginSuccess = true;
        loggedInUser = user;
      }
    });

    if (loginSuccess) {
      this.api.openSnackBar('Login successful', 'suc');
      this.processing = false;
      this.api.onLogin(loggedInUser);
      setTimeout(() => {
        this.router.navigate([ this.api.getUser().rider ? '/home/futureRides' : '/home/rides']);
      }, 1000);
    } else {
      setTimeout(() => {
        this.processing = false;
        this.api.openSnackBar('Invalid Email / Password', 'err');
        this.password.reset();
      }, 1000);
    }
  }

}
