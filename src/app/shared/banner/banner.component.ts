import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.css',
    standalone: false
})
export class BannerComponent implements OnInit{

  items: MenuItem[] = [];
  constructor(){
  }

  ngOnInit() {
      this.items = [
        {
            label:'Home',
            icon: 'pi pi-home',
            routerLink:'dashboard'
        },
        {
          label:'Auditoria',
          icon: 'pi pi-eye',
          routerLink:'auditoria'
      },
      ]
      }
}