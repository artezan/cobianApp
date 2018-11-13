import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditMakerComponent } from './new-edit-maker.component';

describe('NewEditMakerComponent', () => {
  let component: NewEditMakerComponent;
  let fixture: ComponentFixture<NewEditMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
