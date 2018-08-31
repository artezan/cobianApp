import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPropBuyerComponent } from './detail-prop-buyer.component';

describe('DetailPropBuyerComponent', () => {
  let component: DetailPropBuyerComponent;
  let fixture: ComponentFixture<DetailPropBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPropBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPropBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
