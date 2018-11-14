import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPreBuildComponent } from './detail-pre-build.component';

describe('DetailPreBuildComponent', () => {
  let component: DetailPreBuildComponent;
  let fixture: ComponentFixture<DetailPreBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPreBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPreBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
