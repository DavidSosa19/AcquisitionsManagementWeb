import { Provider } from "@angular/core";
import { AssetServiceType } from "./asset-service-type";
import { EntidadDB } from "./entidad-db";
import { Unit } from "./Unit";

export class Acquisition extends EntidadDB {
    presupuesto!: number;
    unidad!: Unit;
    tipoBienServicio!: AssetServiceType;
    cantidad!: number;
    valorUnitario!: number;
    valorTotal!: number;
    fechaAdquisicion!: Date;
    proveedor!: Provider;
    documentacion!: string[];
    createdAt!: Date;
    updatedAt?: Date;
  }