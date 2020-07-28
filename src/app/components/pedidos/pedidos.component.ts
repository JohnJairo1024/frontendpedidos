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
  listaproducto: any = [];

  /**
   * constructor
   * @param pedidoService 
   */
  constructor(private pedidoService: PedidosService) { }

  /**
   * init
   */
  ngOnInit(): void {
    this.recargarInformacionProducto();
  }


  /**
   * submit
   */
  onSubmit() {
    this.guardarPedido();
    this.recargarInformacionProducto();
  }

  /**
   * guardar el producto
   */
  guardarPedido() {

    // Seteamos el producto
    let producto = new Producto();
    producto.idProducto = this.numeroProducto;
    let asignacionProducto = Object.assign(this.pedido, { producto });
    console.log("JSON", JSON.stringify(asignacionProducto));
    let datosJSON = JSON.stringify(asignacionProducto)
    this.pedidoService.crearPedido(datosJSON).subscribe(
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
      },
      (error) => {
        console.log(error)
      });
  }

  /**
   * recarga informacion de la lista de productos
   */
  recargarInformacionProducto() {
    this.pedidoService.listaProductos().subscribe(
      (data) => {
        console.log("listaProductos: ", data)
        this.listaproducto = data;
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
          this.recargarInformacionProducto();
        },
        error => console.log(error));
  }

}
