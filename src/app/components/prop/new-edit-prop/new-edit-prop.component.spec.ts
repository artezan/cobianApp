import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditPropComponent } from './new-edit-prop.component';

describe('NewEditPropComponent', () => {
  let component: NewEditPropComponent;
  let fixture: ComponentFixture<NewEditPropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditPropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
