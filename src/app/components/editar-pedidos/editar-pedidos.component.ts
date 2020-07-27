import { Producto } from '../../models/producto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PedidosService } from './../../services/pedidos.service';

@Component({
  selector: 'app-editar-pedidos',
  templateUrl: './editar-pedidos.component.html',
  styleUrls: ['./editar-pedidos.component.css']
})
export class EditarPedidosComponent implements OnInit {

  id: number;
  producto: Producto;

  constructor(private route: ActivatedRoute, private router: Router,
    private pedidosService: PedidosService) { }

  ngOnInit(): void {
    this.producto = new Producto();

    this.id = this.route.snapshot.params['id'];
    this.pedidosService.getEmployee(this.id)
      .subscribe(data => {
        console.log(data)
        this.producto = data;
      },
        error => console.log(error)
      );
  }

  updateEmployee() {
    this.pedidosService.updateEmployee(this.id, this.producto)
      .subscribe(data => console.log(data), error => console.log(error));
    this.producto = new Producto();
    this.gotoList();
  }

  onSubmit() {
    this.updateEmployee();
  }

  gotoList() {
    this.router.navigate(['/pedidos']);
  }
}
