import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Properties } from '../util/properties';
import { DataService } from './data.service';
import { Acquisition } from '../models/acquisiton';

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
    let url = `${Properties.ACQUISITIONS_URL}/${id}`;
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
}
