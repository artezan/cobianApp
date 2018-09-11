import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBuyerAdminComponent } from './detail-buyer-admin.component';

describe('DetailBuyerAdminComponent', () => {
  let component: DetailBuyerAdminComponent;
  let fixture: ComponentFixture<DetailBuyerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBuyerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBuyerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
