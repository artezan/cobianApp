import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-form-str-list',
  templateUrl: './form-str-list.component.html',
  styleUrls: ['./form-str-list.component.scss'],
})
export class FormStrListComponent implements OnInit, OnChanges {
  @Input()
  numOfItems = 3;
  @Input()
  nameItems = 'Objeto';
  @Input()
  nameItems2 = 'Objeto';
  @Input()
  nameTitle = 'Lista';
  @Input()
  arrStr: string[] = [];
  @Input()
  arrStr2: string[] = [];
  @Input()
  arrDate: any[] = [];
  @Input()
  arrDate2: any[] = [];
  @Input()
  isRequired = false;
  arrInput: number[];
  @Output()
  arrList = new EventEmitter<string[]>();
  @Output()
  arrOutput = new EventEmitter();
  @Input()
  forms = {
    arrStr: true,
    arrStr2: false,
    arrDate: false,
    arrDate2: false,
  };
  @Input()
  isDesktop = true;

  constructor() {
    this.getArray(this.numOfItems);
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes.numOfItems) {
      if (changes.numOfItems.currentValue) {
        this.numOfItems = changes.numOfItems.currentValue;
        this.getArray(changes.numOfItems.currentValue);
      }
    }
    /*  if (changes.nameItems) {
      if (changes.nameItems.currentValue) {
        this.nameItems = changes.nameItems.currentValue;
      }
    }
    if (changes.nameTitle) {
      if (changes.nameTitle.currentValue) {
        this.nameTitle = changes.nameTitle.currentValue;
      }
    }
    if (changes.isRequired) {
      if (changes.isRequired.currentValue) {
        this.isRequired = changes.isRequired.currentValue;
      }
    } */
  }
  getArray(num?: number) {
    this.arrInput = Array(num).fill(1);
  }
  getStr(itemStr?) {
    this.arrList.emit(this.arrStr);
    this.arrOutput.emit({
      arrStr: this.arrStr,
      arrStr2: this.arrStr2,
      arrDate: this.arrDate,
      arrDate2: this.arrDate2,
    });
  }
  deleteItem(number) {
    this.numOfItems--;
    this.arrInput.splice(number, 1);
    this.arrStr.splice(number, 1);
    this.arrStr2.splice(number, 1);
    this.arrDate.splice(number, 1);
    this.arrDate2.splice(number, 1);
    this.arrList.emit(this.arrStr);
    this.getStr();
  }
  addItem() {
    this.numOfItems++;
    this.getArray(this.numOfItems);
  }
  dateSelect(event, i) {
    if (event) {
      this.arrDate[i] = new Date(
        event.value._i.year,
        event.value._i.month,
        event.value._i.date,
      );
      this.getStr();
    }
  }
  dateSelect2(event, i) {
    console.log(event);
    if (event) {
      this.arrDate2[i] = new Date(
        event.value._i.year,
        event.value._i.month,
        event.value._i.date,
      );
      this.getStr();
    }
  }
}
