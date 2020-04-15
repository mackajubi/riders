import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService, User } from 'src/app/services/app.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import '../../../../assets/js/smtp.js';
import { Booking } from 'src/app/models/users.model.js';

declare let Email: any;

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', [
          style({
            opacity: 0,
            transform: 'translateY(50px)',
          }),
          stagger('50ms', [
            animate('200ms ease-in-out', style({
              opacity: 1,
              transform: 'translateY(0px)'
            }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeInRight', [
      transition('* => *', [
        query('.fade-in-right', style({ opacity: 0 }), { optional: true }),
        query('.fade-in-right', [
          style({
            opacity: 0,
            transform: 'translateX(50px)',
          }),
          stagger('100ms', [
            animate('400ms ease-in-out', style({
              opacity: 1,
              transform: 'translateX(0px)'
            }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class RidesComponent implements OnInit {
  displayedColumns: string[] = ['count', 'driver', 'capacity', 'origin', 'destination', 'booking'];
  dataSource: MatTableDataSource<User>;
  dataLoading = true;
  processing = false;
  riders: User[] = [];
  userBookedRides: User[] = [];
  user: User;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private api: AppService) {
    this.user = this.api.getUser();
  }

  ngOnInit() {
    this.onFetch();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFetch() {
    this.api.getUsers().filter((user: User) => {
      // A rider cannot book their own ride.
      if (user.rider && user.capacity && (user.id !== this.user.id)) {
        this.riders.push(user);
        if (user.bookings.length) {
          this.userBookedRides.push(user);
        }
      }
    });

    this.dataSource = new MatTableDataSource(this.riders);

    setTimeout(() => {
      this.dataLoading = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 3000);
  }

  hasBookedRide(row: User) {
    let state = false;
    row.bookings.filter((booking: Booking) => {
      if (booking.userId === this.user.id) {
        state =  true;
      }
    });
    return state;
  }

  onBook(ride: User, index: number) {
    this.api.openConfirmationWindow('Do you want to book ' + ride.name + '\'s ride?');

    this.api.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.processing = true;
        Email.send({
          Host : this.api.getEmailConfig().host,
          Username : this.api.getEmailConfig().username,
          Password : this.api.getEmailConfig().password,
          To : this.user.email,
          From : this.api.getEmailConfig().username,
          Subject : 'IBI Africa Ride Booking',
          Body : `
            <h2> Hi ${this.user.name},</h2>

            <p>You can reach your driver on this number: +257-+${ride.tel}. <i>(${ride.name})</i></p>

            <p>Thank you for using ride.</p>
          `
        }).then((message) => {
          if (message === 'OK') {
            ride.bookings.push({
              id: ride.bookings.length + 1,
              userId: this.user.id,
              name: this.user.name,
              tel: this.user.tel,
              email: this.user.email,
              date: new Date(),
              image: this.user.image,
            });
            --ride.capacity;
            this.userBookedRides.push(ride);

            // Update the list of available rides.
            this.riders.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.riders);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });

            this.api.openSnackBar(
              'Please check your email for further details. Check in spam mails incase it\'s not in the inbox.',
              'suc-lg'
            );
          } else {
            this.api.openSnackBar('Operation Unsuccessful::' + message, 'err-lg');
          }
          this.processing = false;
        });
      }
    });
  }

  onRemove(user: User, index: number) {
    this.processing = true;

    this.api.getUsers().filter((rider) => {
      if (rider.id === user.id) {
        ++rider.capacity;
        rider.bookings.filter((book: Booking, i: number) => {
          if (user.bookings.filter((item) => item.userId === book.userId)) {
            rider.bookings.splice(i, 1);
          }
        });
        this.riders.push(rider);
      }
    });

    this.userBookedRides.splice(index, 1);

    this.dataSource = new MatTableDataSource(this.riders);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.processing = false;
  }
}
