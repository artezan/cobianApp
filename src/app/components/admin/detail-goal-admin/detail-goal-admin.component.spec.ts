import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGoalAdminComponent } from './detail-goal-admin.component';

describe('DetailGoalAdminComponent', () => {
  let component: DetailGoalAdminComponent;
  let fixture: ComponentFixture<DetailGoalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailGoalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGoalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
