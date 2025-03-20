import { Provider } from "@angular/core";
import { AssetServiceType } from "./asset-service-type";
import { EntidadDB } from "./entidad-db";
import { Unit } from "./Unit";

export class Acquisition {
    id!:Number
    presupuesto!: number;
    unidad!: number;
    tipoBienServicio!: number;
    cantidad!: number;
    valorUnitario!: number;
    valorTotal!: number;
    fechaAdquisicion!: string;
    proveedor!: number;
    documentacion!: string[];
    createdAt!: string;
    updatedAt?: string;
  }