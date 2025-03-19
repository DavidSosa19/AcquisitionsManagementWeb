import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './modules/dashboard/view/view.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
  { path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  }, 
  { 
    path: 'acquisitions',
    loadChildren: () => import('./modules/acquisition/acquisition.module').then(m => m.AcquisitionModule)
  }, 
  { path: '**', redirectTo: 'dashboard' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
