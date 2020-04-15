import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineMatSpinnerComponent } from './inline-mat-spinner.component';

describe('InlineMatSpinnerComponent', () => {
  let component: InlineMatSpinnerComponent;
  let fixture: ComponentFixture<InlineMatSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineMatSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineMatSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
