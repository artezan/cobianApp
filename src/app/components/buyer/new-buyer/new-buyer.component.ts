import { Component, OnInit } from '@angular/core';
import { IBuyer } from '../../../models/buyer.model';
import { BuyerService } from '../../../services/buyer.service';

@Component({
  selector: 'app-new-buyer',
  templateUrl: './new-buyer.component.html',
  styleUrls: ['./new-buyer.component.scss'],
})
export class NewBuyerComponent implements OnInit {
  newBuyer: IBuyer = {};
  isCorrect: boolean;
  constructor(private buyerService: BuyerService) {}

  ngOnInit() {}
  check() {
    this.buyerService.checkBuyer(this.newBuyer).subscribe(buyer => {
      if (buyer === null) {
        this.isCorrect = true;
      } else {
        this.isCorrect = false;
      }
    });
  }
}
