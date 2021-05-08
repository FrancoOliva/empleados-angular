import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEmpleadosComponent } from './components/crear-empleados/crear-empleados.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';

const routes: Routes = [
  { path: '', redirectTo: 'lista-empleados', pathMatch: 'full'}, // se pone "full" para que compare toda la ruta completa
  { path: 'lista-empleados', component: EmpleadosComponent },
  { path: 'crear-empleados', component: CrearEmpleadosComponent},
  { path: 'editar-empleados/:id', component: CrearEmpleadosComponent},
  { path: '**', redirectTo: 'lista-empleados', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
