import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppService, User } from 'src/app/services/app.service';
import { Location } from 'src/app/models/locations.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {
  processing = false;
  rider = false;
  locations: Location[];
  originFilteredOptions: Observable<Location[]>;
  destinationFilteredOptions: Observable<Location[]>;
  togglePassword = false;
  toggleConfirmPassword = false;
  invalidPassword = false;

  name = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+[ ]{1}[a-zA-Z]+$/) ]);
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

  constructor( private api: AppService, private router: Router ) {
    this.locations = this.api.getLocations();
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

  onClearForm() {
    this.name.reset();
    this.email.reset();
    this.mobilenumber.reset();
    this.password.reset();
    this.confirmedPassword.reset();
    this.rider = false;
    this.capacity.reset();
    this.origin.reset();
    this.destination.reset();
  }

  onRegister() {
    this.processing = true;
    // A user should register only once.
    let accountExists = false;
    this.api.getUsers().filter((user: User) => {
      if (user.email === this.email.value) {
        this.api.openSnackBar('Your account already exists. Please login', 'err');
        accountExists = true;
      }
    });

    if (!accountExists) {
      let user: User = {
        id: this.api.getUsers().length + 1,
        name: this.name.value,
        password: this.password.value,
        email: this.email.value,
        tel: this.mobilenumber.value,
        image: this.api.userImages[Math.floor(Math.random() * this.api.userImages.length)],
        rider: this.rider,
        capacity: this.capacity.value,
        origin: this.origin.value ? this.origin.value : null,
        destination : this.destination.value ? this.destination.value : null,
        bookings: [],
      };

      this.api.registerUser(user);
      this.onClearForm();
      this.api.openSnackBar('Account created. Please login', 'suc-lg');
      this.processing = false;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    } else {
      this.processing = false;
    }
  }
}
