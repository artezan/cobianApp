import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStrListComponent } from './form-str-list.component';

describe('FormStrListComponent', () => {
  let component: FormStrListComponent;
  let fixture: ComponentFixture<FormStrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStrListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
