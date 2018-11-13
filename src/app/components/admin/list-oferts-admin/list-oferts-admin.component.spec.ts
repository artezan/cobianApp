import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfertsAdminComponent } from './list-oferts-admin.component';

describe('ListOfertsAdminComponent', () => {
  let component: ListOfertsAdminComponent;
  let fixture: ComponentFixture<ListOfertsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfertsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfertsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
