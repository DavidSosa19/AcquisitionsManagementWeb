import { Pipe, PipeTransform } from '@angular/core';
import { AcquisitionService } from '../services/acquisition.service';
import { catchError, map, Observable, of } from 'rxjs';

@Pipe({
  name: 'providerName'
})
export class ProviderNamePipe implements PipeTransform {

  constructor(private acquisitionService: AcquisitionService) {}

  transform(providerId: number): Observable<string> {
    if (!providerId) {
      return of('Desconocido');  // Si no hay id, devuelve 'Desconocido'
    }

    return this.acquisitionService.getProvider(providerId).pipe(
      map((res) => res.body?.nombre || 'Desconocido'), // Devuelve el nombre si existe
      catchError(() => of('Desconocido')) // Si hay error, devuelve 'Desconocido'
    );
  }
}