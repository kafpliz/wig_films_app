import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ICollections } from '../../data/interfaces/collections.interface';
import { ECollections } from '../../data/enums/collections.enum';
import { HttpParams } from '@angular/common/http';
import { IMResponce } from '../../data/interfaces/main.interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService extends BaseService{

  getAllCollection(){
    const params = new HttpParams().set('count', 'all')
  return  this.http.get<ICollections>(this.apiUrl+ ECollections.collections, {params})
  }


  getCollectionMovie(slug:string, page:number = 1){
   const params = new HttpParams().set('page', page)
  return  this.http.get<IMResponce>(this.apiUrl + ECollections.collections + '/'+ slug, {params})
  }
}
