import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSpecificComponent } from './calendar-specific.component';

describe('CalendarSpecificComponent', () => {
  let component: CalendarSpecificComponent;
  let fixture: ComponentFixture<CalendarSpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarSpecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
