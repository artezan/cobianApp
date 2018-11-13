import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertBuyerComponent } from './ofert-buyer.component';

describe('OfertBuyerComponent', () => {
  let component: OfertBuyerComponent;
  let fixture: ComponentFixture<OfertBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
