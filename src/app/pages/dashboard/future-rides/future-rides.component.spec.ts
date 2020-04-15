import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureRidesComponent } from './future-rides.component';

describe('FutureRidesComponent', () => {
  let component: FutureRidesComponent;
  let fixture: ComponentFixture<FutureRidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureRidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
