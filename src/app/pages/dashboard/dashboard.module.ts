import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/modules/shared-module.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { RidesComponent } from './rides/rides.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { FutureRidesComponent } from './future-rides/future-rides.component';

@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        RidesComponent,
        ProfileComponent,
        FutureRidesComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
    ],
    providers: [
        DatePipe
    ]
})
export class DashboardModule { }
