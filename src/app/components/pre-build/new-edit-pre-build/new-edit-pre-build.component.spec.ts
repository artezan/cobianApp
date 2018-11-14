import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditPreBuildComponent } from './new-edit-pre-build.component';

describe('NewEditPreBuildComponent', () => {
  let component: NewEditPreBuildComponent;
  let fixture: ComponentFixture<NewEditPreBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditPreBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditPreBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
