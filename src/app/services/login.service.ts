import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "https://restapi-proyecto2ev.herokuapp.com"
  constructor(private http: HttpClient) {}

  getUsers() {
    const url = `${this.url}/validar`;
    return this.http.get(url);
  }

  getUnUs(usuario: any) {
    const url = `${this.url}/unus/${usuario}`;
    return this.http.get(url);
  }

  editatUs(usi:string,_usuario:string,_password:string){
    return this.http.put(this.url + '/actualizaUs/' + usi + '/' +_usuario + '/'+ _password, {responseType: 'text'});
  }

  eliminarUsuario(_usuario: string) {
    //const url = `${this.url}/usout/${_usuario}`;
    return this.http.delete(this.url + '/usout/' + _usuario, {responseType: 'text'});
  }

  addUsuario(doc: any) {
    const url = `${this.url}/register`;
    return this.http.post(url, doc);
  }

}
