import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { EProfile } from '../../data/enums/profile.enum';
import { IPromo, IUser } from '../../data/interfaces/user.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService {

  getData(){
    const params = new HttpParams().set('user', this.userId)
    return this.http.get<IUser>(this.apiUrl +  EProfile.url, {params})
  }
  sendPromo(promo:number | string){
    const params = new HttpParams().set('id', this.userId).set('promo', promo)
    return this.http.get<IPromo>(this.apiUrl + EProfile.promo, {params})
  }

  forPay(){
    return this.http.get(EProfile.pay + this.userId)
  }

 
}
