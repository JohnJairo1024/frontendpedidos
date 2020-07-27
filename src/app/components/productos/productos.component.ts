import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import swal from 'sweetalert2';
import { Producto } from '../../models/producto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  idProducto: number;
  producto: Producto = new Producto();
  submitted = false;
  listaproducto: any = [];

  /**
   * constructor
   * @param productoService 
   */
  constructor(private productoService: ProductoService) { }

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
    this.productoService.crearProducto(this.producto).subscribe(
      (data: any) => {
        console.log("guardar producto: ", data);
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
    this.productoService.listaProductos().subscribe(
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
    this.productoService.eliminarProducto(id)
      .subscribe(
        data => {
          console.log(data);
          this.recargarInformacionProducto();
        },
        error => console.log(error));
  }

}
