import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBuildComponent } from './filter-build.component';

describe('FilterBuildComponent', () => {
  let component: FilterBuildComponent;
  let fixture: ComponentFixture<FilterBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
