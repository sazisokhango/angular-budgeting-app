import { Component, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective],
  standalone: true,
  templateUrl: './chart.component.html',
})
export class ChartComponent {
  public chartLabel = input.required<string[]>();
  public chartData = input.required<number[]>();
  public title = input.required<string>();

  get barChartData() {
    return {
      labels: this.chartLabel(),
      datasets: [
        {
          data: this.chartData(),
          label: this.title(),
        },
      ],
    };
  }

  public barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {
    Chart.register(...registerables);
  }
}
