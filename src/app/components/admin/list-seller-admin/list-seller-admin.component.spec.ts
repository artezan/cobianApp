import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSellerAdminComponent } from './list-seller-admin.component';

describe('ListSellerAdminComponent', () => {
  let component: ListSellerAdminComponent;
  let fixture: ComponentFixture<ListSellerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSellerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSellerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
