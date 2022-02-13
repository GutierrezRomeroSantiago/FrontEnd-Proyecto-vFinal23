import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-grafico4',
  templateUrl: './grafico4.component.html',
  styleUrls: ['./grafico4.component.css']
})
export class Grafico4Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  pedidosApi: any;
  tipos:any;

  chartOptions: any = {
    chart: {
        type: 'column',
        backgroundColor: ""
    },
    title: {
        text: 'Costes/Beneficios todos los pedidos'
    },
    xAxis: {
        categories: [
            'Balance de costes/beneficios'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: '€'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} €</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Costos pedidos',
        data: [],
        color: "#849BE5"

    }, {
        name: 'Costos prendas',
        data: [],
        color: "#9E0CA3"

    }, {
        name: 'Liquido obtenido en la venta',
        data: [],
        color: "#F99782"

    }, {
        name: 'Beneficios',
        data: [],
        color: "#10579E"

    }]
};

  constructor(private pedidoService: PedidoService) { }

  getPresupuestos(){
    this.pedidoService.getDameNum().subscribe(tipos => {
      this.pedidosApi = tipos
      let data = JSON.parse(this.pedidosApi)
      console.log(data)

      let ben = data._ventaFin - data._costo - data._costoXM
      this.chartOptions.series[0].data = [data._costo];
      this.chartOptions.series[1].data = [data._costoXM];
      this.chartOptions.series[2].data = [data._ventaFin];
      this.chartOptions.series[3].data = [ben];
      Highcharts.chart("miGrafico01", this.chartOptions);
      console.log(this.chartOptions.series[0])
      console.log(this.chartOptions.series[1])
      console.log(this.chartOptions.series[2])
      console.log(this.chartOptions.series[3])

    })
  }

  ngOnInit(): void {
    this.getPresupuestos()
  }

}
