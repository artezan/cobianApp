import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSellerAdminComponent } from './detail-seller-admin.component';

describe('DetailSellerAdminComponent', () => {
  let component: DetailSellerAdminComponent;
  let fixture: ComponentFixture<DetailSellerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSellerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSellerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
