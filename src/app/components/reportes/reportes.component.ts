import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  listaproducto: any = [];
  nombreArchivo = 'pedidos.xlsx';

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.recargarInformacionProducto();
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
   * Exporta la informacion de los pedidos
   */
  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'pedido');
    XLSX.writeFile(wb, this.nombreArchivo);
  }

}
