import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfficeAdminComponent } from './list-office-admin.component';

describe('ListOfficeAdminComponent', () => {
  let component: ListOfficeAdminComponent;
  let fixture: ComponentFixture<ListOfficeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfficeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfficeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
