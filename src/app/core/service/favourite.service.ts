import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { IMResponce } from '../../data/interfaces/main.interface';
import { EProfile } from '../../data/enums/profile.enum';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService extends BaseService {

  getData() {
    const params = new HttpParams().set('user', this.userId)
    return this.http.get<IMResponce>(this.apiUrl+ EProfile.favourite, { params })
  }
}
