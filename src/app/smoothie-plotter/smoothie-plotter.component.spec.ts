import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothiePlotterComponent } from './smoothie-plotter.component';

describe('SmoothiePlotterComponent', () => {
  let component: SmoothiePlotterComponent;
  let fixture: ComponentFixture<SmoothiePlotterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmoothiePlotterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmoothiePlotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
