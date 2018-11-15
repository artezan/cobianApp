import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditManagerComponent } from './new-edit-manager.component';

describe('NewEditManagerComponent', () => {
  let component: NewEditManagerComponent;
  let fixture: ComponentFixture<NewEditManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
