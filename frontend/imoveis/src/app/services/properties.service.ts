import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(private _api: ApiService) { }

  create(dados){
    console.log(dados);
    return this._api.post('propertie', dados);
  }

  list(){
    return this._api.get('propertie');
  }

  getId(propertieId){
    return this._api.get(`propertie/${propertieId}`);
  }

  edit(propertieId, dados){
    return this._api.put(`propertie/${propertieId}`, dados);
  }

  delete(propertieId){
    return this._api.delete(`propertie/${propertieId}`);
  }
}
