import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBuyerComponent } from './calendar-buyer.component';

describe('CalendarBuyerComponent', () => {
  let component: CalendarBuyerComponent;
  let fixture: ComponentFixture<CalendarBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
