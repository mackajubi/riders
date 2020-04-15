import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { RidesComponent } from './rides/rides.component';
import { ProfileComponent } from './profile/profile.component';
import { FutureRidesComponent } from './future-rides/future-rides.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rides'
      },
      {
        path: 'rides',
        component: RidesComponent,
      },
      {
        path: 'futureRides',
        component: FutureRidesComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
