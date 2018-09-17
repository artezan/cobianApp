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
  nameTitle = 'Lista';
  @Input()
  arrStr: string[] = [];
  @Input()
  isRequired = false;
  arrInput: number[];
  @Output()
  arrList = new EventEmitter<string[]>();

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
  }
  deleteItem(number) {
    this.numOfItems--;
    this.arrInput.splice(number, 1);
    this.arrStr.splice(number, 1);
    this.arrList.emit(this.arrStr);
  }
  addItem() {
    this.numOfItems++;
    this.getArray(this.numOfItems);
  }
}
