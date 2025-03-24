import { Pipe, PipeTransform } from '@angular/core';
import { AcquisitionService } from '../services/acquisition.service';
import { catchError, map, Observable, of } from 'rxjs';

@Pipe({
    name: 'unitName',
    standalone: false
})
export class UnitNamePipe implements PipeTransform {

  constructor(private acquisitionService: AcquisitionService) {}

  transform(unitId: number): Observable<string> {
    if (!unitId) {
      return of('Desconocido');  // Si no hay id, devuelve 'Desconocido'
    }

    return this.acquisitionService.getUnit(unitId).pipe(
      map((res) => res.body?.nombre || 'Desconocido'), // Devuelve el nombre si existe
      catchError(() => of('Desconocido')) // Si hay error, devuelve 'Desconocido'
    );
  }
}