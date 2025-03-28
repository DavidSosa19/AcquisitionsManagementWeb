import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.css',
    standalone: false
})
export class BannerComponent implements OnInit{

  constructor(private router: Router){
  }

  ngOnInit() {
  }

  toHome(){
    this.router.navigate(['/dashboard']);
}
}