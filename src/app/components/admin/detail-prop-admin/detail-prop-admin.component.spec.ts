import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPropAdminComponent } from './detail-prop-admin.component';

describe('DetailPropAdminComponent', () => {
  let component: DetailPropAdminComponent;
  let fixture: ComponentFixture<DetailPropAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPropAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPropAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
