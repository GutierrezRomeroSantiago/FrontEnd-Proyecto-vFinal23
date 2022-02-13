import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private url = "https://restapi-proyecto2ev.herokuapp.com"
  constructor(private http: HttpClient) {}

  getPedBasic() {
    const url = `${this.url}/pedidop`;
    return this.http.get(url);
  }

  addPedido(doc: any) {
    const url = `${this.url}/pedido`;
    return this.http.post(url, doc);
  }

  eliminarPedido(_id: number) {
    //const url = `${this.url}/pedido/${_id}`;
    return this.http.delete(this.url + '/pedido/' + _id , {responseType: 'text'});
    //return this.http.delete(this.url + '/usout/' + _usuario, {responseType: 'text'});
  }

  editaEst(id:any,estado:any){
    return this.http.put(this.url + '/estadoUs/' + id + '/' + estado, {responseType: 'text'});
  }
  getDametodo() {
    return this.http.get(this.url + '/grafico3', {responseType: 'text'}); 
  }

  getDameNum() {
    return this.http.get(this.url + '/grafico4', {responseType: 'text'}); 
  }

  enviarCorreo(doc: any) {
    const url = `${this.url}/enviar`;
    console.log("Esto es el servicio");
    console.log(doc);
    return this.http.post(url, doc);
  }

}
