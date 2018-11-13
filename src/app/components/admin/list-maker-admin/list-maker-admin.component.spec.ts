import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMakerAdminComponent } from './list-maker-admin.component';

describe('ListMakerAdminComponent', () => {
  let component: ListMakerAdminComponent;
  let fixture: ComponentFixture<ListMakerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMakerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMakerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
