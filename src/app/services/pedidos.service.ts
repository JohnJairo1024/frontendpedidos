import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  /**
   * Lista pedidos
   * @param producto 
   */
  crearPedido(producto: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/crearpedidos`, producto);
  }

  /**
   * Elimina pedido
   * @param id 
   */
  eliminarPedido(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pedidos/${id}`, { responseType: 'text' });
  }

  /**
   * Lista pedidos
   */
  listaPedidos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pedidos`);
  }

}
