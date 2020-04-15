import { Component, OnInit } from '@angular/core';
import { AppService, User } from 'src/app/services/app.service';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('fadeInLeft', [
      transition('* => *', [
        query('.fade-in-left', style({ opacity: 0 }), { optional: true }),
        query('.fade-in-left', [
          style({
            opacity: 0,
            transform: 'translateX(-50px)',
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
export class SidebarComponent implements OnInit {
  user: User;

  constructor( private api: AppService) {
    this.user = this.api.getUser();
  }

  ngOnInit() {
  }

  onLogOut() {
    this.api.logOut();
  }
}
