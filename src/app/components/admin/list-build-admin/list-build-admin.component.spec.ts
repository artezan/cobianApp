import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildAdminComponent } from './list-build-admin.component';

describe('ListBuildAdminComponent', () => {
  let component: ListBuildAdminComponent;
  let fixture: ComponentFixture<ListBuildAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBuildAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBuildAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
