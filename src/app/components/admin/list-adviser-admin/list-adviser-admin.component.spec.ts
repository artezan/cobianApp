import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdviserAdminComponent } from './list-adviser-admin.component';

describe('ListAdviserAdminComponent', () => {
  let component: ListAdviserAdminComponent;
  let fixture: ComponentFixture<ListAdviserAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAdviserAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdviserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
