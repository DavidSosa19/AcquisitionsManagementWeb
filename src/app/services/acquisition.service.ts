import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Properties } from '../util/properties';
import { DataService } from './data.service';
import { Acquisition } from '../models/acquisiton';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionService extends DataService{

  constructor(protected override _http: HttpClient) {
    super(_http);
  }

  getItems(filter: string) {
    filter = (filter && filter.length > 0) ? `?${filter}` : '';
    let url = `${Properties.ACQUISITIONS_URL}${filter}`;
    return this.get(url);
  }

  getById(id:Number){
    let url = `${Properties.ACQUISITIONS_URL}/view/${id}`;
    return this.get(url);
  }

  create(bean: Acquisition){
    let url = `${Properties.ACQUISITIONS_URL}/add`;
    return this.post(url, bean);
  }

  edit(id:Number ,bean: Acquisition){
    let url = `${Properties.ACQUISITIONS_URL}/edit/${id}`;

    return this.put(url, bean);
  }

  remove(id:Number){
    let url = `${Properties.ACQUISITIONS_URL}/delete/${id}`;
    return this.delete(url);
  }

  getProviders(){
    let url = `${Properties.PROVIDERS_URL}`;
    return this.get(url);
  }

  getProvider(id:Number){
    let url = `${Properties.PROVIDERS_URL}/view/${id}`;
    return this.get(url);
  }

  getProviderName(id: number): Observable<string> {
    let url = `${Properties.PROVIDERS_URL}/view/${id}`;
    return this.getObjectName(url);
  }

  getUnities(){
    let url = `${Properties.UNITIES_URL}`;
    return this.get(url);
  }

  
  getUnit(id:Number){
    let url = `${Properties.UNITIES_URL}/view/${id}`;
    return this.get(url);
  }

  getAssetsTypes(){
    let url = `${Properties.ASSETS_TYPES_URL}`;
    return this.get(url);
  }
  
  getAssetType(id:Number){
    let url = `${Properties.ASSETS_TYPES_URL}/view/${id}`;
    return this.get(url);
  }
}
