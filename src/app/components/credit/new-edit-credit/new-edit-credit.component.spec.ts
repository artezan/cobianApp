import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditCreditComponent } from './new-edit-credit.component';

describe('NewEditCreditComponent', () => {
  let component: NewEditCreditComponent;
  let fixture: ComponentFixture<NewEditCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
