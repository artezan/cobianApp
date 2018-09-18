import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMakerComponent } from './filter-maker.component';

describe('FilterMakerComponent', () => {
  let component: FilterMakerComponent;
  let fixture: ComponentFixture<FilterMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
