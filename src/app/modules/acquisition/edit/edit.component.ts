import { Component, OnInit } from '@angular/core';
import { AcquisitionService } from '../../../services/acquisition.service';
import { Acquisition } from '../../../models/acquisiton';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  acquisition!: Acquisition;

  formAcquisition!: UntypedFormGroup;
  submitted: boolean = false;

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
  
  get form() { return this.formAcquisition.controls; }


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

  onSubmit(value: string): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formAcquisition.invalid) {
      console.log("form invalido");
      
      return;
    }

    this.edit();
  }

  edit(){
    var newAcquisition = this.buildAcquisition();
    this.acquisitionService.edit(newAcquisition.id,newAcquisition).subscribe(
      res=>{
        console.log(res);
        
      }
    )
  }

  buildAcquisition():Acquisition{
    this.acquisition = new Acquisition();
    this.acquisition.presupuesto = this.form['presupuesto'].value;
    this.acquisition.unidad = this.form['unidad'].value;
    this.acquisition.tipoBienServicio = this.form['tipoBienServicio'].value;
    this.acquisition.cantidad = this.form['cantidad'].value;
    this.acquisition.valorUnitario = this.form['valorUnitario'].value;
    this.acquisition.valorTotal = this.form['valorTotal'].value;
    this.acquisition.fechaAdquisicion = this.form['fechaAdquisicion'].value;
    this.acquisition.proveedor = this.form['proveedor'].value;
    this.acquisition.documentacion = this.form['documentacion'].value;
    return this.acquisition
  }

  toView(){
    this.router.navigate([`/acquisition/view/${this.acquisition.id}`]);
  }
}
