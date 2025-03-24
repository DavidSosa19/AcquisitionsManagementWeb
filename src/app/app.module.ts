import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { providePrimeNG } from 'primeng/config';
import  MyPreset  from './util/app-theme-preset';
import Material from '@primeng/themes/material';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';

import { AppComponent } from './app.component';
import { AcquisitionModule } from './modules/acquisition/acquisition.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';

import { routes } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';


@NgModule({ 
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ], 
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AcquisitionModule,
        DashboardModule,
        SharedModule,
        RouterOutlet
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        providePrimeNG({
            theme: {
                preset: Lara
            }
        }),
        provideRouter(routes)
    ]
})
export class AppModule { }