import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcquisitionRoutingModule } from './acquisition-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from "./view/view.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    AcquisitionRoutingModule,
    HttpClientModule
  ]
})
export class AcquisitionModule { }
