import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditAdviserComponent } from './new-edit-adviser.component';

describe('NewEditAdviserComponent', () => {
  let component: NewEditAdviserComponent;
  let fixture: ComponentFixture<NewEditAdviserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditAdviserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditAdviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
