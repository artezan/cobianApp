import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBuildAdminComponent } from './detail-build-admin.component';

describe('DetailBuildAdminComponent', () => {
  let component: DetailBuildAdminComponent;
  let fixture: ComponentFixture<DetailBuildAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBuildAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBuildAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
