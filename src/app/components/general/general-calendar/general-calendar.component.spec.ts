import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralCalendarComponent } from './general-calendar.component';

describe('GeneralCalendarComponent', () => {
  let component: GeneralCalendarComponent;
  let fixture: ComponentFixture<GeneralCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
