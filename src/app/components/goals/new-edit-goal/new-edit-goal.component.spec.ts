import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditGoalComponent } from './new-edit-goal.component';

describe('NewEditGoalComponent', () => {
  let component: NewEditGoalComponent;
  let fixture: ComponentFixture<NewEditGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
