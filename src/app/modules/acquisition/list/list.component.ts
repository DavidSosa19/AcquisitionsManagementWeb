import { Component, OnInit } from '@angular/core';
import { AcquisitionService } from '../../../services/acquisition.service';
import { Acquisition } from '../../../models/acquisiton';
import { Router } from '@angular/router';
import { Provider } from '../../../models/provider';
import { Unit } from '../../../models/Unit';
import { AssetServiceType } from '../../../models/asset-service-type';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  acquisitions!: Acquisition[];
  providers!: Provider[];
  unities!: Unit[];
  assetTypes!: AssetServiceType[];
  acquisitionSelected!: Acquisition;
  filterPattern!:string;

  filterForm!: UntypedFormGroup;

  constructor(
    private acquisitionService: AcquisitionService,
    private router: Router,
    private formBuilder: UntypedFormBuilder
  ){
  }

  ngOnInit():void{
    this.initialize();
  }

  initialize(){
    this.acquisitions = [];
    this.assetTypes = [];
    this.unities = [];
    this.providers = [];
    this.getItems('');
    this.filterForm = this.formBuilder.group({
          unidad: [''],
          tipoBienServicio: [''],
          proveedor: [''],
      });
      this.getAssetTypes();
      this.getProviders();
      this.getUnities();
  }

  get form() { return this.filterForm.controls; }

  filter() {
    const filters: string[] = [];
    
    const filterUnit = this.filterForm.get('unidad')?.value;
    const filterProvider = this.filterForm.get('proveedor')?.value;
    const filterAssetsType = this.filterForm.get('tipoBienServicio')?.value;
  
    if (filterUnit) {
      filters.push(`unitId=${filterUnit}`);
    }
    if (filterProvider) {
      filters.push(`providerId=${filterProvider}`);
    }
    if (filterAssetsType) {
      filters.push(`assetServiceTypeId=${filterAssetsType}`);
    }
  
    this.filterPattern = filters.length ? `?${filters.join('&')}` : '';
    this.getItems(this.filterPattern);
  }

  resetFilter(){
    this.getItems('');
    this.filterForm.reset();
  }

  getItems(filter:string) {
    this.acquisitionService.getItems(filter).subscribe({
      next: (res) => {
        this.acquisitions = res.body; 
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  toCreate(): void {
    this.router.navigate(['/acquisitions/add']);
  }

  toDashBoard(): void {
    this.router.navigate(['/dashboard']);
  }

  toView(id:number){
    this.router.navigate([`/acquisitions/view/${id}`]);
  }

  onRowSelect(event: any) {
    const selectedRow = event.data; // Obtén la fila seleccionada desde el evento
    this.toView(selectedRow.id)
  }
  
  getProviders(){
    this.acquisitionService.getProviders().subscribe({
      next: (res) => {
        this.providers = res.body; 
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getUnities(){
    this.acquisitionService.getUnities().subscribe({
      next: (res) => {
        this.unities = res.body; 
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getAssetTypes(){
    this.acquisitionService.getAssetsTypes().subscribe({
      next: (res) => {
        this.assetTypes = res.body; 
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
