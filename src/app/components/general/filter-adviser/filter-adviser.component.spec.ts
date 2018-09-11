import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAdviserComponent } from './filter-adviser.component';

describe('FilterAdviserComponent', () => {
  let component: FilterAdviserComponent;
  let fixture: ComponentFixture<FilterAdviserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAdviserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAdviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
