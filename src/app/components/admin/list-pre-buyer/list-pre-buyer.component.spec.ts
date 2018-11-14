import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPreBuyerComponent } from './list-pre-buyer.component';

describe('ListPreBuyerComponent', () => {
  let component: ListPreBuyerComponent;
  let fixture: ComponentFixture<ListPreBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPreBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPreBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
