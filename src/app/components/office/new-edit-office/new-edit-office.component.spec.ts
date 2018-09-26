import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditOfficeComponent } from './new-edit-office.component';

describe('NewEditOfficeComponent', () => {
  let component: NewEditOfficeComponent;
  let fixture: ComponentFixture<NewEditOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
