import { Injectable } from '@angular/core';
import { IMSeasons, ISeasons } from '../interfaces/movie.interface';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedSeasonsService {
    #shared = new BehaviorSubject<ISeasons | null>(null)
    current = this.#shared.asObservable()

    updInfo(data:IMSeasons[], names:{name:string; altName:string}){
      const shared:ISeasons = {
        name:names.name,
        altName: names.altName,
        seasons: data
      }
      this.#shared.next(shared)
    }
  
}
