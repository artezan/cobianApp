import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditEventBuyerComponent } from './credit-event-buyer.component';

describe('CreditEventBuyerComponent', () => {
  let component: CreditEventBuyerComponent;
  let fixture: ComponentFixture<CreditEventBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditEventBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditEventBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
