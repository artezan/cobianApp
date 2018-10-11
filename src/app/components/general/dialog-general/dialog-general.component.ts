import {
  Component,
  OnInit,
  Inject,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-general',
  templateUrl: './dialog-general.component.html',
  styleUrls: ['./dialog-general.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogGeneralComponent implements OnInit {
  message: string;
  buttons = new EventEmitter();
  ratingResult = new EventEmitter();
  statusChange = new EventEmitter();
  statusTicket: string;
  private ratingStars;
  public dataInput: {
    header: string;
    subHeader?: string;
    body: string;
    hideButtonCancel?: boolean;
    isRating?: boolean;
    isform?: boolean;
    okButton?: string;
  };
  constructor(
    public dialogRef: MatDialogRef<DialogGeneralComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      header: string;
      subHeader?: string;
      body: string;
      hideButtonCancel?: boolean;
      isRating?: boolean;
      isform?: boolean;
      okButton?: string;
    },
  ) {
    this.dataInput = data;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buttonsResponse(options: boolean) {
    this.buttons.emit(options);
  }

  ngOnInit() {}
}
