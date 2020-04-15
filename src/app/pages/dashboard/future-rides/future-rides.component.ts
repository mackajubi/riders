import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService, User } from 'src/app/services/app.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Booking } from 'src/app/models/users.model';

@Component({
  selector: 'app-future-rides',
  templateUrl: './future-rides.component.html',
  styleUrls: ['./future-rides.component.scss'],
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
    ])
  ]
})
export class FutureRidesComponent implements OnInit {
  dataSource: MatTableDataSource<Booking>;
  dataLoading = true;
  processing = false;
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
    let bookings: Booking[];
    this.api.getUsers().filter((user: User) => {
      if (user.id === this.user.id) {
        bookings = user.bookings;
      }
    });

    this.dataSource = new MatTableDataSource(bookings);

    setTimeout(() => {
      this.dataLoading = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 3000);
  }

  onStartTrip(user: Booking) {
    this.processing = true;
    this.dataSource.data.filter((item) => {
      setTimeout(() => {
        item.startTrip = item.id === user.id ? true : false;
        this.processing = false;
      }, 2000);
    });
  }
}
