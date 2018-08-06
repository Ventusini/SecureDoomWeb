import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsChartComponent } from './incidents-chart.component';

describe('IncidentsChartComponent', () => {
  let component: IncidentsChartComponent;
  let fixture: ComponentFixture<IncidentsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
