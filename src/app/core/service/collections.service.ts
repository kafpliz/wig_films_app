import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ICollections } from '../../data/interfaces/collections.interface';
import { ECollections } from '../../data/enums/collections.enum';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService extends BaseService{

  getAllCollection(){
    const params = new HttpParams().set('count', 'all')
  return  this.http.get<ICollections>(this.apiUrl+ ECollections.collections, {params})
  }


  getCollectionMovie(slug:string){
   
  return  this.http.get<ICollections>(this.apiUrl + ECollections.collections + '/'+ slug,)
  }
}
