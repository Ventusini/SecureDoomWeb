import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsFlowChartComponent } from './cars-flow-chart.component';

describe('CarsFlowChartComponent', () => {
  let component: CarsFlowChartComponent;
  let fixture: ComponentFixture<CarsFlowChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsFlowChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsFlowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
