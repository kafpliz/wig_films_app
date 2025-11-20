import { EMain } from './../../data/enums/main.enum';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { forkJoin, map } from 'rxjs';
import { IMFilms, IMRandom, IMResponce } from '../../data/interfaces/main.interface';
import { HttpParams } from '@angular/common/http';
import { ICollections } from '../../data/interfaces/collections.interface';

@Injectable({
  providedIn: 'root'
})
export class MainService extends BaseService {

  getData() {
    const params = new HttpParams().set('user', this.userId).set('top', 'top10').set('limit', 10)
    return forkJoin([
      this.http.get<IMResponce>(this.apiUrl + EMain.innovations),
      this.http.get<IMResponce>(this.apiUrl + EMain.top, { params }),
      this.http.get<IMResponce>(this.apiUrl + EMain.popular),
      this.http.get<ICollections>(this.apiUrl + EMain.collections),

    ]
    ).pipe(
      map(([data1, data2, data3, data4]) => ({ innovation: data1, top: data2, popular: data3, collections: data4 }))
    )
  }

  search(query:string){
    const params = new HttpParams().set('query', query)
    return this.http.get<IMResponce>(this.apiUrl + EMain.search, {params})
  }

  getRandom(genre:string){
   const params = new HttpParams().set('name', genre)
    return this.http.get<IMRandom>(this.apiUrl + EMain.random, {params})
  }

}
