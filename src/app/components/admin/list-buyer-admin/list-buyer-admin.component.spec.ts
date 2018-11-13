import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuyerAdminComponent } from './list-buyer-admin.component';

describe('ListBuyerAdminComponent', () => {
  let component: ListBuyerAdminComponent;
  let fixture: ComponentFixture<ListBuyerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBuyerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBuyerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
