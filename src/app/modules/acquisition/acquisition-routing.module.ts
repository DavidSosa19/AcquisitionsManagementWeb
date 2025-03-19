import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'add', component: AddComponent },
  { path: '', component: ListComponent },
  { path: 'edit/:id', component: EditComponent }, // Ejemplo con parámetro dinámico
  { path: 'view/:id', component: ViewComponent },
  { path: '**', redirectTo: 'list' } ,
  // Redirección por defecto
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcquisitionRoutingModule { }
