import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubmanagerAdminComponent } from './list-submanager-admin.component';

describe('ListSubmanagerAdminComponent', () => {
  let component: ListSubmanagerAdminComponent;
  let fixture: ComponentFixture<ListSubmanagerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSubmanagerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubmanagerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
