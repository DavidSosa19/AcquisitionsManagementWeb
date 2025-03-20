import { Component, OnInit } from '@angular/core';
import { AcquisitionService } from '../../../services/acquisition.service';
import { Acquisition } from '../../../models/acquisiton';
import { AbstractControl, AsyncValidatorFn, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'; // Operador de RxJS
import { Provider } from '../../../models/provider';
import { Unit } from '../../../models/Unit';
import { AssetServiceType } from '../../../models/asset-service-type';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  acquisition!: Acquisition;
  providers!: Provider[];
  unities!: Unit[];
  assetTypes!: AssetServiceType[];

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
    this.assetTypes = [];
    this.unities = [];
    this.providers = [];
    this.formAcquisition = this.formBuilder.group({
      presupuesto: ['', [Validators.required, Validators.min(0)]],
      unidad: ['', [Validators.required]],
      tipoBienServicio: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      valorUnitario: ['', [Validators.required, Validators.min(0)]],
      valorTotal: ['', [Validators.required, Validators.min(0)]],
      fechaAdquisicion: ['', [Validators.required]],
      proveedor: ['', [Validators.required]],
      documentacion: ['', [Validators.required]]
    });
    this.getAcquisition();
    this.getAssetTypes();
    this.getProviders();
    this.getUnities();
  }
  
  get form() { return this.formAcquisition.controls; }

  getAcquisition() {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          const id: Number = params['id'];
          return this.acquisitionService.getById(id);
        })
      )
      .subscribe({
        next: (res) => {
          this.acquisition = res.body; 
          this.formAcquisition.patchValue({
            presupuesto: this.acquisition.presupuesto,
            unidad: this.acquisition.unidad,
            tipoBienServicio: this.acquisition.tipoBienServicio,
            cantidad: this.acquisition.cantidad,
            valorUnitario: this.acquisition.valorUnitario,
            valorTotal: this.acquisition.valorTotal,
            fechaAdquisicion: this.acquisition.fechaAdquisicion,
            proveedor: this.acquisition.proveedor,
            documentacion: this.acquisition.documentacion
          });
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  onSubmit(): void {
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
        this.toView();
        
      }
    )
  }

  buildAcquisition():Acquisition{
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
    this.router.navigate([`/acquisitions/view/${this.acquisition.id}`]);
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
