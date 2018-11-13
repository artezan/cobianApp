import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreComponent } from './refre.component';

describe('RefreComponent', () => {
  let component: RefreComponent;
  let fixture: ComponentFixture<RefreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
