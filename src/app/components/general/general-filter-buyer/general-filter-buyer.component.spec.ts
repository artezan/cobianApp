import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFilterBuyerComponent } from './general-filter-buyer.component';

describe('GeneralFilterBuyerComponent', () => {
  let component: GeneralFilterBuyerComponent;
  let fixture: ComponentFixture<GeneralFilterBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralFilterBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralFilterBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
