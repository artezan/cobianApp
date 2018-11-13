import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterPropBuyerComponent } from './inter-prop-buyer.component';

describe('InterPropBuyerComponent', () => {
  let component: InterPropBuyerComponent;
  let fixture: ComponentFixture<InterPropBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterPropBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterPropBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
