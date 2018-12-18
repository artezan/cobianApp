import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPreBuildComponent } from './child-pre-build.component';

describe('ChildPreBuildComponent', () => {
  let component: ChildPreBuildComponent;
  let fixture: ComponentFixture<ChildPreBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildPreBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildPreBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
