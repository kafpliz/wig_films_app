import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { EMovie } from '../../data/enums/movie.enum';
import { HttpParams } from '@angular/common/http';
import { IMovie } from '../../data/interfaces/movie.interface';
import { EProfile } from '../../data/enums/profile.enum';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends BaseService {

  getMovie(id:number){
    const params = new HttpParams().set('id', id).set('limitPersons', 32).set('user', this.userId)
    return this.http.get<IMovie>( this.apiUrl + EMovie.url, {params})
  }

  editFavourite(isFav:boolean, movie:number){
    if(isFav) {
      return this.http.post(this.apiUrl + EProfile.favourite, { 
        film: movie,
        user: this.userId
      })
    } else {
      return this.http.delete(this.apiUrl + EProfile.favourite + `/${this.userId}/` + movie)
    }
  }

 
}
