import { Pipe, PipeTransform } from '@angular/core';
import { AcquisitionService } from '../services/acquisition.service';
import { catchError, map, Observable, of } from 'rxjs';

@Pipe({
  name: 'assetTypeName'
})
export class AssetTypeNamePipe implements PipeTransform {

  constructor(private acquisitionService: AcquisitionService) {}

  transform(assetTypeId: number): Observable<string> {
    if (!assetTypeId) {
      return of('Desconocido');  // Si no hay id, devuelve 'Desconocido'
    }

    return this.acquisitionService.getAssetType(assetTypeId).pipe(
      map((res) => res.body?.nombre || 'Desconocido'), // Devuelve el nombre si existe
      catchError(() => of('Desconocido')) // Si hay error, devuelve 'Desconocido'
    );
  }
}