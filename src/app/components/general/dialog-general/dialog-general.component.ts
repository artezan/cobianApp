import {
  Component,
  OnInit,
  Inject,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-general',
  templateUrl: './dialog-general.component.html',
  styleUrls: ['./dialog-general.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogGeneralComponent implements OnInit {
  message: string;
  buttons = new EventEmitter();
  ratingResult = new EventEmitter();
  statusChange = new EventEmitter();
  statusTicket: string;
  inputValue: string;
  files: FileList;
  formData: FormData = new FormData();
  private ratingStars;
  public dataInput: {
    header: string;
    subHeader?: string;
    body: string;
    hideButtonCancel?: boolean;
    isRating?: boolean;
    isform?: boolean;
    formLabel?: string;
    okButton?: string;
    hasFileInput?: boolean;
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
      formLabel?: string;
      hasFileInput?: boolean;
    }
  ) {
    this.dataInput = data;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buttonsResponse(options: boolean) {
    if (this.dataInput.hasFileInput) {
      this.buttons.emit({
        button: options,
        formData: this.formData
      });
    } else if (this.dataInput.isform) {
      this.buttons.emit({
        button: options,
        inputValue: this.inputValue
      });
    } else {
      this.buttons.emit(options);
    }
  }

  ngOnInit() {}
  link() {
    const input = document.getElementById('file1').click();
  }
  fileChangeEvent(event) {
    this.files = event.target.files;
    // file list to array
    const files = Array.from(event.target.files);
    files.forEach((f: File, i) => {
      this.formData.append('file', f);
    });
  }
}
