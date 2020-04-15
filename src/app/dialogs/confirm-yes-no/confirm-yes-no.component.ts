import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface Message {
  msg: string;
  saveLabel: string;
  noLabel: string;
}

@Component({
  selector: 'app-confirm-yes-no',
  templateUrl: './confirm-yes-no.component.html',
  styleUrls: ['./confirm-yes-no.component.scss']
})
export class ConfirmYesNoComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmYesNoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: Message) {
  }

  ngOnInit() { }

  onCancel() {
    this.dialogRef.close(false);
  }

  onSave() {
    this.dialogRef.close(true);
  }
}
