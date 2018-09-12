import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScheduleAdminComponent } from './list-schedule-admin.component';

describe('ListScheduleAdminComponent', () => {
  let component: ListScheduleAdminComponent;
  let fixture: ComponentFixture<ListScheduleAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListScheduleAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScheduleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
