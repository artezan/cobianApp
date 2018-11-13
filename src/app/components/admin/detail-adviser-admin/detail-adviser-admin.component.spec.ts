import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAdviserAdminComponent } from './detail-adviser-admin.component';

describe('DetailAdviserAdminComponent', () => {
  let component: DetailAdviserAdminComponent;
  let fixture: ComponentFixture<DetailAdviserAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAdviserAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAdviserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
