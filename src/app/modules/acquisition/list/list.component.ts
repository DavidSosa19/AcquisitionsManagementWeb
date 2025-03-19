import { Component, OnInit } from '@angular/core';
import { AcquisitionService } from '../../../services/acquisition.service';
import { Acquisition } from '../../../models/acquisiton';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  acquisitions!: Acquisition[];
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

  getItems(){
    this.loading = true;
    this.acquisitionService.getItems('').subscribe(
      res=>{
        this.acquisitions = res.body
        console.log(res.body);
        this.loading = false;
      }, 
      error =>{
        console.log(error);
      }
    )
  }

  toCreate(): void {
    this.router.navigate(['/Acquisitions/add']);
  }

  toDashBoard(): void {
    this.router.navigate(['/dashboard']);
  }

  onRowSelect(event: any) {
    if(!this.loading) {
      this.router.navigate([`/Acquisitions/view/${this.acquisitionSelected.id}`]);
    } else {
      return;
    }
  }
}
