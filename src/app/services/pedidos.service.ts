import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }


  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/producto/${id}`);
  }

  crearPedido(producto: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/crearpedidos`, producto);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/producto/${id}`, value);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/producto/${id}`, { responseType: 'text' });
  }

  listaProductos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/producto`);
  }

}
