import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditOfertComponent } from './new-edit-ofert.component';

describe('NewEditOfertComponent', () => {
  let component: NewEditOfertComponent;
  let fixture: ComponentFixture<NewEditOfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditOfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditOfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
