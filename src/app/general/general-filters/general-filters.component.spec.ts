import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFiltersComponent } from './general-filters.component';

describe('GeneralFiltersComponent', () => {
  let component: GeneralFiltersComponent;
  let fixture: ComponentFixture<GeneralFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
