import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { EditarPedidosComponent } from './components/editar-pedidos/editar-pedidos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  },
  {
    path: 'editarproducto/:id',
    component: EditarPedidosComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'reportes',
    component: ReportesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
