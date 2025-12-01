import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})


export class AdventService extends BaseService {



  getMovies() {
    return this.http.get<{
      error: boolean, movies: {
        day: number;
        name: string;
        id:number
        description: string;
        poster: {
          url:string
        };
      }[]
    }>(this.apiUrl + 'advent')
  }

}
