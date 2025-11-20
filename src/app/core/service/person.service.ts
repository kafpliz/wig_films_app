import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { EPerson } from '../../data/enums/person.enum';
import { IPerson } from '../../data/interfaces/person.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends BaseService {

  getPerson(id:number){
    const params = new HttpParams().set('id', id).set('limit', 120)
    return this.http.get<IPerson>(this.apiUrl + EPerson.url, {params})
  }
}
