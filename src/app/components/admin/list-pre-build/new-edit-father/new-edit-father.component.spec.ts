import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditFatherComponent } from './new-edit-father.component';

describe('NewEditFatherComponent', () => {
  let component: NewEditFatherComponent;
  let fixture: ComponentFixture<NewEditFatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditFatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditFatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
