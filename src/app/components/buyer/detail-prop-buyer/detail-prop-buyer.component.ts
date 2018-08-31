import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { IProperty } from '../../../models/property.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-prop-buyer',
  templateUrl: './detail-prop-buyer.component.html',
  styleUrls: ['./detail-prop-buyer.component.scss'],
})
export class DetailPropBuyerComponent implements OnInit {
  property: IProperty;
  isLoad = false;
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params.id);
      if (params.id) {
        this.getPropertyById(params.id);
      }
    });
  }

  ngOnInit() {}
  getPropertyById(id: string) {
    this.propertyService.getPropertyById(id).subscribe(property => {
      this.property = property;
      console.log(this.property);
      this.isLoad = true;
    });
  }
}
