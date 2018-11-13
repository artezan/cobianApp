import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateSearchAdminComponent } from './simulate-search-admin.component';

describe('SimulateSearchAdminComponent', () => {
  let component: SimulateSearchAdminComponent;
  let fixture: ComponentFixture<SimulateSearchAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulateSearchAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulateSearchAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
