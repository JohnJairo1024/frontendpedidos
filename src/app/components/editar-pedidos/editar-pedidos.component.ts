import { Producto } from '../../models/producto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductoService } from './../../services/producto.service';

@Component({
  selector: 'app-editar-pedidos',
  templateUrl: './editar-pedidos.component.html',
  styleUrls: ['./editar-pedidos.component.css']
})
export class EditarPedidosComponent implements OnInit {

  id: number;
  producto: Producto;

  constructor(private route: ActivatedRoute, private router: Router,
    private productoService: ProductoService) { }

  ngOnInit(): void {
    this.producto = new Producto();

    this.id = this.route.snapshot.params['id'];
    this.productoService.obtenerProducto(this.id)
      .subscribe(data => {
        console.log(data)
        this.producto = data;
      },
        error => console.log(error)
      );
  }

  actualizarProducto() {
    this.productoService.actualizarProducto(this.id, this.producto)
      .subscribe(data => console.log(data), error => console.log(error));
    this.producto = new Producto();
    this.gotoList();
  }

  onSubmit() {
    this.actualizarProducto();
  }

  gotoList() {
    this.router.navigate(['/pedidos']);
  }
}
