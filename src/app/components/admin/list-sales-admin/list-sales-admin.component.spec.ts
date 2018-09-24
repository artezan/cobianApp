import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalesAdminComponent } from './list-sales-admin.component';

describe('ListSalesAdminComponent', () => {
  let component: ListSalesAdminComponent;
  let fixture: ComponentFixture<ListSalesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSalesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSalesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
