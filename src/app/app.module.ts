import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { AcquisitionModule } from './modules/acquisition/acquisition.module'; 
import { DashboardModule } from './modules/dashboard/dashboard.module'; 
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@NgModule({ 
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ], 
    imports: [
        BrowserModule,
        AcquisitionModule,
        DashboardModule,
        ReactiveFormsModule,
        SharedModule,
        DropdownModule,
        BrowserAnimationsModule
    ], 
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        provideRouter(routes)
    ]
})
export class AppModule { }
