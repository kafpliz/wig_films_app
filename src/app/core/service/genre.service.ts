import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { EGenre } from '../../data/enums/genre.enum';
import { HttpParams } from '@angular/common/http';
import {  IMFilms, IMResponce } from '../../data/interfaces/main.interface';

@Injectable({
  providedIn: 'root'
})
export class GenreService extends BaseService {

  getGenre(name: string | null) {

    let params = new HttpParams().set('query', name ? name : 'реальное ТВ').set('limit', 50)
    return this.http.get<IMResponce>(this.apiUrl + EGenre.url, { params })

  }
}
