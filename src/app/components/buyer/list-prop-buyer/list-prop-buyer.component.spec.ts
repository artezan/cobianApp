import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropBuyerComponent } from './list-prop-buyer.component';

describe('ListPropBuyerComponent', () => {
  let component: ListPropBuyerComponent;
  let fixture: ComponentFixture<ListPropBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPropBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPropBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
