import { NgModule } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';

export const routes: Routes = [
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
  providers: [
    provideRouter(routes)
  ]
})
export class AppRoutingModule { }
