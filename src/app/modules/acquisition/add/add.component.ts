import { Component, OnInit } from '@angular/core';
import { AcquisitionService } from '../../../services/acquisition.service';
import { Acquisition } from '../../../models/acquisiton';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Provider } from '../../../models/provider';
import { Unit } from '../../../models/Unit';
import { AssetServiceType } from '../../../models/asset-service-type';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css'],
    standalone: false
})
export class AddComponent implements OnInit {

  acquisition!: Acquisition;
  providers!: Provider[];
  unities!: Unit[];
  assetTypes!: AssetServiceType[];

  formAcquisition!: UntypedFormGroup;
  submitted: boolean = false;

    constructor(
      private acquisitionService: AcquisitionService,
      private router: Router,
      private formBuilder: UntypedFormBuilder
    ){
    }

    ngOnInit():void{
      this.initialize();
    }

    initialize(): void {
      this.assetTypes = [];
      this.unities = [];
      this.providers = [];
      this.formAcquisition = this.formBuilder.group({
        presupuesto: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
        unidad: ['', [Validators.required]],
        tipoBienServicio: ['', [Validators.required]],
        cantidad: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]],  // Solo números enteros
        valorUnitario: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]], // Permite decimales
        valorTotal: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]], // Permite decimales
        fechaAdquisicion: ['', [Validators.required]],
        proveedor: ['', [Validators.required]],
        documentacion: ['', [Validators.required]]
      });
      this.getAssetTypes();
      this.getProviders();
      this.getUnities();
    }

    get form() { return this.formAcquisition.controls; }

    onSubmit(): void {
      this.submitted = true;
      // stop here if form is invalid
      if (this.formAcquisition.invalid) {
        console.log("form invalido");
        
        return;
      }
  
      this.create();
    }
  
    create() {
      this.acquisitionService.create(this.buildAcquisition()).subscribe({
        next: (res) => {
          console.log("Acquisition created successfully:", res);
          this.toList(); // ✅ Navigate after success
        },
        error: (err) => {
          console.error("Error creating acquisition:", err);
        },
        complete: () => {
          console.log("Create operation completed.");
        }
      });
    }

    buildAcquisition(): Acquisition {
      const documents: string[] = [];
      const documentacionValue = this.formAcquisition.get('documentacion')?.value;
      if (documentacionValue) {
        documents.push(documentacionValue);
      }
    
      // Obtener la fecha de adquisición y convertirla a string en formato YYYY-MM-DD
      const dateValue = this.formAcquisition.get('fechaAdquisicion')?.value;
      let fechaAdquisicion: string = '';
    
      if (dateValue) {
        const date = new Date(dateValue);
        // Convertir la fecha a string en el formato YYYY-MM-DD
        fechaAdquisicion = date.toISOString().split('T')[0]; // Retorna la fecha en formato "YYYY-MM-DD"
      }
    
      // Asegurándonos de que los campos numéricos sean correctos
      const presupuesto = parseFloat(this.formAcquisition.get('presupuesto')?.value) || 0;
      const unidad = parseInt(this.formAcquisition.get('unidad')?.value, 10) || 0;
      const tipoBienServicio = parseInt(this.formAcquisition.get('tipoBienServicio')?.value, 10) || 0;
      const cantidad = parseInt(this.formAcquisition.get('cantidad')?.value, 10) || 0;
      const valorUnitario = parseFloat(this.formAcquisition.get('valorUnitario')?.value) || 0;
      const valorTotal = parseFloat(this.formAcquisition.get('valorTotal')?.value) || 0;
      const proveedor = parseInt(this.formAcquisition.get('proveedor')?.value, 10) || 0;
    
      // Obtener las fechas actuales para 'createdAt' y 'updatedAt', en formato string
      const currentDate = new Date().toISOString(); // Fecha actual en formato ISO
    
      // Crear y retornar el objeto Acquisition con los valores correctamente formateados
      return {
        presupuesto,
        unidad,
        tipoBienServicio,
        cantidad,
        valorUnitario,
        valorTotal,
        fechaAdquisicion, // Se asigna la fecha en formato string
        proveedor,
        documentacion: documents, // El array de documentos
        createdAt: currentDate, // Fecha de creación, en formato ISO
        updatedAt: currentDate, // Fecha de actualización, en formato ISO
      } as Acquisition;
    }

    toList(){
      this.router.navigate(['/acquisitions']);
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
