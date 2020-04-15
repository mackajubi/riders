import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { MaterialModule } from './material.module';
import { InlineMatSpinnerComponent } from '../components/inline-mat-spinner/inline-mat-spinner.component';
import { ConfirmYesNoComponent } from '../dialogs/confirm-yes-no/confirm-yes-no.component';


@NgModule({
    declarations: [
        SnackbarComponent,
        InlineMatSpinnerComponent,
        ConfirmYesNoComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        SnackbarComponent,
        InlineMatSpinnerComponent,
        ConfirmYesNoComponent,
    ],
    entryComponents: [
        SnackbarComponent,
        ConfirmYesNoComponent
    ],
})
export class SharedModule {}
