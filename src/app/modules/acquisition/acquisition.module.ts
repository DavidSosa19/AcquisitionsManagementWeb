import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcquisitionRoutingModule } from './acquisition-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from "./view/view.component";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { SharedModule } from '../../shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { ProviderNamePipe } from "../../pipes/provider-name.pipe";
import { AssetTypeNamePipe } from "../../pipes/asset-type-name.pipe";
import { UnitNamePipe } from "../../pipes/unit-name.pipe";
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';  

@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    EditComponent,
    ViewComponent,
    ProviderNamePipe,
    UnitNamePipe,
    AssetTypeNamePipe
  ],
  imports: [
    CommonModule,
    AcquisitionRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    InputTextModule,
    FormsModule,
    DropdownModule
  ],
  providers: [CurrencyPipe],
})
export class AcquisitionModule { }
