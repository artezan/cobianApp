import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditSubmanagerAdminComponent } from './new-edit-submanager-admin.component';

describe('NewEditSubmanagerAdminComponent', () => {
  let component: NewEditSubmanagerAdminComponent;
  let fixture: ComponentFixture<NewEditSubmanagerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditSubmanagerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditSubmanagerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
