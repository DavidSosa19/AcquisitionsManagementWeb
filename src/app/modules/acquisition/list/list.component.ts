import { Component, OnInit } from '@angular/core';
import { AcquisitionService } from '../../../services/acquisition.service';
import { Acquisition } from '../../../models/acquisiton';
import { Router } from '@angular/router';
import { Provider } from '../../../models/provider';
import { Unit } from '../../../models/Unit';
import { AssetServiceType } from '../../../models/asset-service-type';

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
  loading!:boolean;

  constructor(
    private acquisitionService: AcquisitionService,
    private router: Router
  ){
  }

  ngOnInit():void{
    this.initialize();
  }

  initialize(){
    this.acquisitions = [];
    this.loading = false;
    this.getItems();
  }

  getItems() {
    this.acquisitionService.getItems('').subscribe({
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
}
