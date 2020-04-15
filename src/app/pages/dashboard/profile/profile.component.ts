import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppService, User } from 'src/app/services/app.service';
import { Location } from 'src/app/models/locations.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition('* => *', [
        query('.fade-in-up', style({ opacity: 0 }), { optional: true }),
        query('.fade-in-up', [
          style({
            opacity: 0,
            transform: 'translateY(50px)',
          }),
          stagger('50ms', [
            animate('300ms ease-in-out', style({
              opacity: 1,
              transform: 'translateY(0px)'
            }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {
  processing = false;
  rider = false;
  locations: Location[];
  originFilteredOptions: Observable<Location[]>;
  destinationFilteredOptions: Observable<Location[]>;
  togglePassword = false;
  toggleConfirmPassword = false;
  invalidPassword = false;
  user: User;

  name = new FormControl({value: '', disabled: true}, [Validators.required, Validators.pattern(/^[a-zA-Z]+[ ]{1}[a-zA-Z]+$/) ]);
  email = new FormControl('', [Validators.required, Validators.email]);
  mobilenumber = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(10),
    Validators.pattern(/^([0-9]{2})([\-]{1})([0-9]{3})([\-]{1})([0-9]{3})+$/)]);
  password = new FormControl('', Validators.required);
  confirmedPassword = new FormControl('');
  capacity = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]);
  origin = new FormControl('', Validators.required);
  destination = new FormControl('', Validators.required);

  constructor( private api: AppService ) {
    this.locations = this.api.getLocations();
    this.user = this.api.getUser();
    this.name.patchValue(this.user.name);
    this.email.patchValue(this.user.email);
    this.mobilenumber.patchValue(this.user.tel);
    this.password.patchValue(this.user.password);
    this.confirmedPassword.patchValue(this.user.password);
    this.capacity.patchValue(this.user.capacity);
    this.origin.patchValue(this.user.origin);
    this.destination.patchValue(this.user.destination);
    this.rider = this.user.rider;
  }

  ngOnInit() {
    this.originFilteredOptions = this.origin.valueChanges
    .pipe(
      startWith(''),
      map(value => this.onFilterLocations(value))
    );

    this.destinationFilteredOptions = this.destination.valueChanges
    .pipe(
      startWith(''),
      map(value => this.onFilterLocations(value))
    );

    this.password.valueChanges.subscribe((value) => {
      if (value !== this.confirmedPassword.value) {
        this.invalidPassword = true;
        this.confirmedPassword.setErrors({required: true});
      } else {
        this.invalidPassword = false;
        this.confirmedPassword.clearValidators();
      }
    });

    this.confirmedPassword.valueChanges.subscribe((value) => {
      if (value !== this.password.value) {
        this.invalidPassword = true;
        this.confirmedPassword.setErrors({required: true});
      } else {
        this.invalidPassword = false;
        this.confirmedPassword.clearValidators();
      }
    });
  }

  /* Error Handling */
  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Please provide your full name' :
      this.name.hasError('pattern') ? 'Please enter a valid name' : '';
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Please provide your email' :
      this.email.hasError('email') ? 'Please enter a valid email' : '';
  }

  getMobileNumberErrorMessage() {
    return this.mobilenumber.hasError('required') ? 'Please provide your email' :
    this.mobilenumber.hasError('minlength') || this.mobilenumber.hasError('maxlength') ||
    this.mobilenumber.hasError('pattern') ? 'Please enter a valid phone number' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Please provide a password' : '';
  }

  getCapacityErrorMessage() {
    return this.capacity.hasError('required') ? 'Please specify your ride\'s capacity' :
    this.capacity.hasError('pattern') ? 'Please enter the right amount' : '';
  }

  getOriginErrorMessage() {
    return this.origin.hasError('required') ? 'Please specify your origin' : '';
  }

  getDestinationErrorMessage() {
    return this.destination.hasError('required') ? 'Please specify your destination' : '';
  }

  onFilterLocations(value: any): Location[] {
    const filterValue = value ? value.toLowerCase() : value;
    return this.locations.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onChkboxChange(event: MatCheckboxChange) {
    this.rider = event.checked;
    if (!this.rider) {
      this.capacity.reset();
      this.origin.reset();
      this.destination.reset();
    }
  }

  onUpdateAccount() {
    this.processing = true;
    // A user should register only once.
    let accountExists = false;
    this.api.getUsers().filter((user: User) => {
      if (user.email === this.email.value && user.id !== this.user.id) {
        this.api.openSnackBar('Another account with that email address already exists.', 'err');
        accountExists = true;
      }
    });

    if (!accountExists) {
      let user: User = {
        id: this.user.id,
        name: this.user.name,
        password: this.password.value,
        email: this.email.value,
        loggedIn: this.user.loggedIn,
        tel: this.mobilenumber.value,
        image: this.user.image,
        rider: this.rider,
        capacity: this.capacity.value,
        origin: this.origin.value ? this.origin.value : null,
        destination : this.destination.value ? this.destination.value : null,
        bookings: this.user.bookings,
      };

      this.api.updateUser(user);
      setTimeout(() => {
        this.api.openSnackBar('Operation successful. Account updated', 'suc-lg');
        this.processing = false;
      }, 2000);
    } else {
      this.processing = false;
    }
  }
}
