import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropAdminComponent } from './list-prop-admin.component';

describe('ListPropAdminComponent', () => {
  let component: ListPropAdminComponent;
  let fixture: ComponentFixture<ListPropAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPropAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPropAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
