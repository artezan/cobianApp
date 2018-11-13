import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBuyerComponent } from './new-buyer.component';

describe('NewBuyerComponent', () => {
  let component: NewBuyerComponent;
  let fixture: ComponentFixture<NewBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
