import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../models/producto';




@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  id: number;
  producto: Producto = new Producto();
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
    this.guardarProducto();
    this.recargarInformacionProducto();
  }

  /**
   * guardar el producto
   */
  guardarProducto() {
    this.pedidoService.crearProducto(this.producto)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
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
