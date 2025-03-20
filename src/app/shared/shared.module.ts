import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerComponent } from './banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import {FieldsetModule} from 'primeng/fieldset';
import {MenubarModule} from 'primeng/menubar';

@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    ToastModule,
    TabViewModule,
    CalendarModule,
    DialogModule,
    FieldsetModule,
    MenubarModule,
    InputNumberModule,
  ],
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    ToastModule,
    TabViewModule,
    FieldsetModule,
    MenubarModule,
    CalendarModule,
    DialogModule,
    InputNumberModule,
    BannerComponent,
    
  ]
})
export class SharedModule { }
