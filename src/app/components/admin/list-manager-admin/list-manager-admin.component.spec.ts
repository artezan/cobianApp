import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManagerAdminComponent } from './list-manager-admin.component';

describe('ListManagerAdminComponent', () => {
  let component: ListManagerAdminComponent;
  let fixture: ComponentFixture<ListManagerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListManagerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListManagerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
