import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPreBuildComponent } from './list-pre-build.component';

describe('ListPreBuildComponent', () => {
  let component: ListPreBuildComponent;
  let fixture: ComponentFixture<ListPreBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPreBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPreBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
