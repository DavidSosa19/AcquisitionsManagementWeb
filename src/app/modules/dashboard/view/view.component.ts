import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrl: './view.component.css',
    standalone: false
})
export class ViewComponent implements OnInit {

    constructor(private router: Router) { 

    }

    ngOnInit(): void { } 
    
    toAdquisitions(){
        this.router.navigate(['/acquisitions']);
    }

}
