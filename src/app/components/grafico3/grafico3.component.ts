import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Todos } from 'src/app/models/todos';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-grafico3',
  templateUrl: './grafico3.component.html',
  styleUrls: ['./grafico3.component.css']
})
export class Grafico3Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  pedidosApi: any;
  clasiPed: Todos[] = [];
  tipos:any;

  chartOptions: any = {
    chart: {
      backgroundColor: ""
    },
    title: {
        text: 'Total de cada tipo por pedido'
    },
    xAxis: {
        categories: ['Normal', 'Expres']
    },
    labels: {
        items: [{
            html: 'Cantidad de prendas por tipo de pedido',
            style: {
                left: '50px',
                top: '10px',
                color: 'black'
            }
        }]
    },
    series: [{
        type: 'column',
        name: 'Abrigo',
        data: [],
        color: "#849BE5"
    }, {
        type: 'column',
        name: 'Joya',
        data: [],
        color: "#9E0CA3"
    }, {
        type: 'column',
        name: 'Calzado',
        data: [],
        color: "#F99782"
    }, {
        type: 'pie',
        name: 'Cantidad de beneficio generado en cada tipo de pedido',
        data: [{
            name: 'Pedidos Normal',
            y: 0,
            color: "#DFF258" // Jane's color
        }, {
            name: 'Pedidos Expres',
            y: 2,
            color: "#10579E" // John's color
        }],
        right: [100, 80],
        size: 150,
        showInLegend: false,
        dataLabels: {
            enabled: false
        }
    }]
};

  constructor( private pedidoService: PedidoService ) { }


  getTodo(){
    this.pedidoService.getDametodo().subscribe(tipos => {
      this.pedidosApi = tipos
      let data = JSON.parse(this.pedidosApi)

      this.chartOptions.series[0].data = [data._totalAN,data._totalAE];
      this.chartOptions.series[1].data = [data._totalJN,data._totalJE];
      this.chartOptions.series[2].data = [data._totalCA,data._totalCE];
      this.chartOptions.series[3].data[0].y = data._total1
      this.chartOptions.series[3].data[1].y = data._total2
      Highcharts.chart("miGrafico01", this.chartOptions);
      console.log(this.chartOptions.series[0])
      console.log(this.chartOptions.series[1])
      console.log(this.chartOptions.series[3].data[0].y)
      

    })
  }

  ngOnInit(): void {
    this.getTodo();
    Highcharts.chart('miGrafico01', this.chartOptions);
  }

}
