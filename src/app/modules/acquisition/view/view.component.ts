import { Component, OnInit } from '@angular/core';
import { AcquisitionService } from '../../../services/acquisition.service';
import { Acquisition } from '../../../models/acquisiton';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent  implements OnInit {

  acquisition!: Acquisition;

  formAcquisition!: UntypedFormGroup;

  constructor(
    private acquisitionService: AcquisitionService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    public activatedRoute: ActivatedRoute
  ){
  }

  ngOnInit():void{
    this.initialize();
  }

  initialize(){
    this.formAcquisition = this.formBuilder.group({
      presupuesto: [''],
      unidad: [''],
      tipoBienServicio: [''],
      cantidad: [''],
      valorUnitario: [''],
      valorTotal: [''],
      fechaAdquisicion: [''],
      proveedor: ['', ],
      documentacion: ['']
    });
    this.getAcquisition();
  }

  getAcquisition(){
    this.activatedRoute.params.subscribe( params => {
      const id: Number = params[ 'id' ];
      this.acquisitionService.getById(id).subscribe(
        res=>{
          console.log(res.body);
          
          this.acquisition = res.body;
          this.formAcquisition.patchValue({
            presupuesto:this.acquisition.presupuesto,
            unidad: this.acquisition.unidad,
            tipoBienServicio: this.acquisition.tipoBienServicio,
            cantidad: this.acquisition.cantidad,
            valorUnitario: this.acquisition.valorUnitario,
            valorTotal: this.acquisition.valorTotal,
            fechaAdquisicion: this.acquisition.fechaAdquisicion,
            proveedor: this.acquisition.proveedor,
            documentacion: this.acquisition.documentacion
          })
        }
      )
    } );
  }

  remove(){
    this.acquisitionService.remove(this.acquisition.id).subscribe(
      res=>{
        console.log(res);
        this.toList();
      }
    )
  }

  toList(){
    this.router.navigate(['/acquisitions']);
  }

  toEdit(){
    this.router.navigate([`/acquisitions/edit/${this.acquisition.id}`]);
  }

}
