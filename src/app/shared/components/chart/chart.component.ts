import { Component, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective],
  standalone: true,
  templateUrl: './chart.component.html',
})
export class ChartComponent {
  public datasets = input.required<ChartConfiguration<'bar'>['data']['datasets']>();
  public labels = input.required<string[]>();
  public chartType = input.required<
    'bar' | 'bubble' | 'doughnut' | 'line' | 'pie' | 'radar' | 'polarArea' | 'scatter'
  >();

  get chartData() {
    return {
      labels: this.labels(),
      datasets: this.datasets(),
    };
  }

  public chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {
    Chart.register(...registerables);
  }
}
