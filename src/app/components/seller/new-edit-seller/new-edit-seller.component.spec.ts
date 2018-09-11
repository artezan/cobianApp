import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditSellerComponent } from './new-edit-seller.component';

describe('NewEditSellerComponent', () => {
  let component: NewEditSellerComponent;
  let fixture: ComponentFixture<NewEditSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
