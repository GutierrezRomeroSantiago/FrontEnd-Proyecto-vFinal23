import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Expres } from 'src/app/models/expres';
import { Normal } from 'src/app/models/normal';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-grafico2',
  templateUrl: './grafico2.component.html',
  styleUrls: ['./grafico2.component.css']
})
export class Grafico2Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  pedidos: Array<Normal> = [];
  pedidosApi: any;

  chartOptions: any = {
    chart: {
      type: "bar",
      backgroundColor: ""
    },
    title: {
      text: "Número total de pedidos"
    },
    xAxis: {
      categories: ['Pedidos Totales']
    },
    yAxis: {
      min: 0,
      title: {
        text: "Número de Tarjetas"
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: "normal"
      }
    },
    series: [
      {
        type: "bar",
        name: "Normal",
        data: [],
        color: "#849BE5"
      },
      {
        type: "bar",
        name: "Expres",
        data: [],
        color: "#9E0CA3"
      },
    ],
  };
  chartOptionsX: any = {
    chart: { 
      backgroundColor: "",
      type: 'bar',
    },
    title: {
      text: 'Costos de entrega pedidos',
    },
    yAxis: {
      tickInterval: 5,
      categories: [],
    },
    xAxis: {
      min: 0,
      title: {
        text: 'Id del pedido',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      valueSuffix: '€',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: 'column',
        name: 'Precio',
        data: [],
        color: '#DFF258',
      },
    ],
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '25px',
        color: '#303030',
      },
    },
  };


  constructor(private pedidoService: PedidoService) {}

  getTipo() {
    let tmpPedido: any
    let count1: any = 0
    let count2: any = 0
    let count3: any = 0
    let todos: Array<Pedido> = [];
    let valors: Array<any> = [];
    let valors1: Array<any> = [];

    this.pedidoService.getPedBasic().subscribe(pedidos => {
      this.pedidosApi=pedidos;
      for (let tipo of this.pedidosApi) {
        if (tipo._tipoPedido == "Normal") {
          tmpPedido = new Normal(
            tipo._id,
            tipo._precioBase,
            tipo._diasAprox,
            tipo._compania,
            tipo._fechaEnvio,
            tipo._paisSalida,
            tipo._estado,
            tipo._incremento,
            tipo._impuesto)
        } else {
          tmpPedido = new Expres(
            tipo._id,
            tipo._precioBase,
            tipo._diasAprox,
            tipo._compania,
            tipo._fechaEnvio,
            tipo._paisSalida,
            tipo._estado,
            tipo._material,
            tipo._volumen,
            tipo._proteccion)
        }
        todos.push(tmpPedido)

        if (tipo._tipoPedido == "Normal") {
          count1 += 1
        } else {
          count2 += 1
        }
      }
      todos.forEach(element => {
        let abc = element.costoEntrega()
        valors.push(abc)
        valors1.push(element.id)
        count3=count3+abc
      });
      valors.push(count3)
      valors1.push("Total")

      console.log(count1)
      console.log(count3)
      console.log(valors)


      this.chartOptions.series[0].data = [count1];
      this.chartOptions.series[1].data = [count2];
      this.chartOptionsX.series[0]['data'] = valors;
      this.chartOptionsX.xAxis['categories'] = valors1;
      //console.log(this.chartOptions.series[0])
      //console.log(this.chartOptions.series[1])
      Highcharts.chart("miGrafico02", this.chartOptions);
      Highcharts.chart("miGrafico03", this.chartOptionsX);

    })
  }

  ngOnInit() {
    this.getTipo()
  }

}
