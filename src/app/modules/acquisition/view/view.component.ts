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
      presupuesto: ['', Validators.required, Validators.min(0)],
      unidad: ['', Validators.required],
      tipoBienServicio: ['', Validators.required],
      cantidad: ['', Validators.required, Validators.min(0)],
      valorUnitario: ['', Validators.required, Validators.min(0)],
      valorTotal: ['', Validators.required, Validators.min(0)],
      fechaAdquisicion: ['', Validators.required],
      proveedor: ['', Validators.required],
      documentacion: ['', Validators.required]
    });
    this.getAcquisition();
  }

  getAcquisition(){
    this.activatedRoute.params.subscribe( params => {
      const id: Number = params[ 'id' ];
      this.acquisitionService.getById(id).subscribe(
        res=>{
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
      }
    )
  }

  toList(){
    this.router.navigate(['/Acquisitions']);
  }

  toEdit(){
    this.router.navigate([`/Acquisitions/edit/${this.acquisition.id}`]);
  }
}
