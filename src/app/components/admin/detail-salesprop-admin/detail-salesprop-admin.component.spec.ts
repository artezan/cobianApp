import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSalespropAdminComponent } from './detail-salesprop-admin.component';

describe('DetailSalespropAdminComponent', () => {
  let component: DetailSalespropAdminComponent;
  let fixture: ComponentFixture<DetailSalespropAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSalespropAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSalespropAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
