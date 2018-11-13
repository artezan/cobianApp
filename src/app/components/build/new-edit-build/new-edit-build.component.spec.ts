import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditBuildComponent } from './new-edit-build.component';

describe('NewEditBuildComponent', () => {
  let component: NewEditBuildComponent;
  let fixture: ComponentFixture<NewEditBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
