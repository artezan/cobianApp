import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailBuyerComponent } from './event-detail-buyer.component';

describe('EventDetailBuyerComponent', () => {
  let component: EventDetailBuyerComponent;
  let fixture: ComponentFixture<EventDetailBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
