import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import Swal from 'sweetalert2';
import { Producto } from '../../models/producto';
import { Pedido } from '../../models/pedido';




@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  id: number;
  numeroProducto: number;
  producto: Producto = new Producto();
  pedido: Pedido = new Pedido();
  submitted = false;
  listapedidos: any = [];
  public infoAutomotoresRetirar: any = null;

  /**
   * constructor
   * @param pedidoService 
   */
  constructor(private pedidoService: PedidosService) { }

  /**
   * init
   */
  ngOnInit(): void {
    this.recargarInformacionPedido();
  }


  /**
   * submit
   */
  onSubmit() {
    this.guardarPedido();
    //this.recargarInformacionPedido();
  }

  /**
   * guardar el producto
   */
  guardarPedido() {
    this.pedidoService.crearPedido(this.pedido).subscribe(
      (data: any) => {
        console.log("guardar Pedido: ", data);
        if (data.exitoso) {
          Swal.fire({
            icon: 'success',
            title: data.mensaje,
            confirmButtonText: "Aceptar",
          });
        }
        if (!data.exitoso) {
          Swal.fire({
            icon: 'error',
            title: data.mensaje,
            confirmButtonText: "Aceptar",
          });
        }
        this.recargarInformacionPedido();
      },
      (error) => {
        console.log(error)
      });
  }

  /**
   * recarga informacion de la lista de productos
   */
  recargarInformacionPedido() {
    this.pedidoService.listaPedidos().subscribe(
      (data) => {
        console.log("listaPedidos: ", data)
        this.listapedidos = data;
      },
      (error) => {
        console.log(error)
      })
  }

  /**
   * elimina productos
   * @param id 
   */
  eliminarProducto(id: number) {
    this.pedidoService.eliminarProducto(id)
      .subscribe(
        data => {
          console.log(data);
          this.recargarInformacionPedido();
        },
        error => console.log(error));
  }

}
