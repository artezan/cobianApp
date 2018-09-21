import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalespropAdminComponent } from './list-salesprop-admin.component';

describe('ListSalespropAdminComponent', () => {
  let component: ListSalespropAdminComponent;
  let fixture: ComponentFixture<ListSalespropAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSalespropAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSalespropAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
