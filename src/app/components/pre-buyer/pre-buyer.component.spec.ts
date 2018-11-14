import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBuyerComponent } from './pre-buyer.component';

describe('PreBuyerComponent', () => {
  let component: PreBuyerComponent;
  let fixture: ComponentFixture<PreBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
