import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private localStorageService: any;

  constructor(protected _http: HttpClient) {
    this.localStorageService = localStorage;
   }

  /**
  * Método encargado de obtener los headers necesarios para la ejecucion del servicio
  */
  protected getContentHeader() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public get(url: string): Observable<HttpResponse<any>> {
    const options = { 
      headers: this.getContentHeader(),
      observe: 'response' as const 
    };
    return this._http
      .get<HttpResponse<any>>(url, options) 
      .pipe(catchError(this.handleError)); 
  }

  protected post(url: string, params: any): Observable<HttpResponse<any>> {
    const body = JSON.stringify(params); 
    const options = { 
      headers: this.getContentHeader(), 
      observe: 'response' as const
    };
    return this._http
      .post<HttpResponse<any>>(url, body, options)
      .pipe(catchError(this.handleError)); 
  }

   protected put(url: string, params: any): Observable<HttpResponse<any>> {
    const body = JSON.stringify(params);
    const options = { 
      headers: this.getContentHeader(),
      observe: 'response' as const // Especificamos que esperamos toda la respuesta
    };
    return this._http
      .put<HttpResponse<any>>(url, body, options) // Tipo HttpResponse<any>
      .pipe(catchError(this.handleError));
  }


  
  protected delete(url: string): Observable<HttpResponse<any>> {
    const options = { 
      headers: this.getContentHeader(),
      observe: 'response' as const // Especificamos que esperamos toda la respuesta
    };
    return this._http
      .delete<HttpResponse<any>>(url, options) // Tipo HttpResponse<any>
      .pipe(catchError(this.handleError));
  }



  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(() => error); // Regresa el error para manejarlo en el componente
  }

  getObjectName(url:string): Observable<string> {
    return this._http.get<any>(url).pipe(
      map(res => res.body?.nombre || 'Desconocido'), 
      catchError(() => of('Desconocido')) 
    );
  }
  
}
