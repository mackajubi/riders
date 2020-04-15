import { Injectable } from '@angular/core';
import { users, Booking, } from '../models/users.model';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { locations } from '../models/locations.model';
import { Router } from '@angular/router';
import { ConfirmYesNoComponent } from '../dialogs/confirm-yes-no/confirm-yes-no.component';

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  tel: string;
  image: string;
  loggedIn?: boolean;
  rider: boolean;
  capacity?: number;
  origin?: string;
  destination?: string;
  bookings?: Booking[];
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private user: User;
  private emailConfig = {
    host: 'smtp.elasticemail.com',
    username: 'mactechlabs1@gmail.com',
    password: '48E61F5E3E9F3FC1C7ACA9126598465F806F'
  };

  dialogRef;

  userImages = [
    'user1.fw.png',
    'user2.fw.png',
    'user4.fw.png',
    'user5.fw.png',
    'user6.fw.png',
    'user7.fw.png',
    'user8.fw.png',
    'user9.fw.png'
  ];

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) { }

  onLogin(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  logOut() {
    this.user = null;
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.user.loggedIn;
  }

  getUsers() {
    return users;
  }

  registerUser(user) {
   users.push(user);
  }

  getEmailConfig() {
    return this.emailConfig;
  }

  openConfirmationWindow(message: string) {
    this.dialogRef = this.dialog.open(ConfirmYesNoComponent, {
      data: {
        msg: message,
        saveLabel: 'Yes',
        noLabel: 'No'
      }
    });
  }

  updateUser(user: User) {
    users.filter((item: User) => {
      if (item.id === user.id) {
        item.email = user.email;
        item.tel = user.tel;
        item.password = user.password;
        item.rider = user.rider;
        item.capacity = user.capacity;
        item.origin = user.origin;
        item.destination = user.destination;
      }
    });
    this.onLogin(user);
  }

  getLocations() {
    return locations.sort();
  }

  createConfig(message: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'right';
    config.duration = 2000;
    config.panelClass = ['snackBar-cust'];
    config.data = message;
    return config;
  }

  createErrorConfig(message: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'right';
    config.duration = 4000;
    config.panelClass = ['snackBar-err-cust'];
    config.data = message;
    return config;
  }

  createConfigSucWithLong(message: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'right';
    config.panelClass = ['snackBar-cust'];
    config.data = message;
    return config;
  }

  createConfigErrLong(message: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'right';
    config.panelClass = ['snackBar-err-cust'];
    config.data = message;
    return config;
  }

  openSnackBar(message: string, type: string) {
    let config;
    if (type === 'suc') {
      config = this.createConfig(message);
    } else if (type === 'err') {
      config = this.createErrorConfig(message);
    } else if (type === 'suc-lg') {
      config = this.createConfigSucWithLong(message);
    } else if (type === 'err-lg') {
      config = this.createConfigErrLong(message);
    }

    this.snackBar.openFromComponent(SnackbarComponent, config);
  }

}
