import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreditAdminComponent } from './list-credit-admin.component';

describe('ListCreditAdminComponent', () => {
  let component: ListCreditAdminComponent;
  let fixture: ComponentFixture<ListCreditAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCreditAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
