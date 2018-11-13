import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditScheduleComponent } from './new-edit-schedule.component';

describe('NewEditScheduleComponent', () => {
  let component: NewEditScheduleComponent;
  let fixture: ComponentFixture<NewEditScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
