import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';


declare const Telegram: any
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  http = inject(HttpClient)
  apiUrl: string = 'https://bot.wig24ru.space/api/'
  #webApp: any;
  userId!: number
  #router = inject(Router)
  location = inject(Location);
  isFullscreen = signal(false)


  constructor() {
    this.#webApp = Telegram.WebApp;
    this.userId = this.#webApp.initDataUnsafe?.user?.id
    this.#webApp.expand()    
    if(this.#webApp.isFullscreen) this.isFullscreen.set(true)
    this.initNavigationControls()
  
  }



  private initNavigationControls() {
    this.#webApp.MainButton.hide()
    this.#webApp.BackButton.hide()

    this.updateButtonVisibility()

    this.#webApp.BackButton.onClick(() => {
      if (this.location.path() !== '/') {
        window.history.back()
      } else {
        this.closeApp()
      }
    })

    this.#router.events.subscribe(() => {
      this.updateButtonVisibility()
    })
  }

  private updateButtonVisibility() {
    const isRootRoute = this.location.path() == '';
    if (isRootRoute) {
      this.#webApp.BackButton.hide();
      this.#webApp.MainButton.onClick(() => this.closeApp());
      this.#webApp.MainButton.offClick(() => { });
    } else {
      this.#webApp.MainButton.hide();
      this.#webApp.BackButton.show();
    }
  }

  closeApp() {
    return this.#webApp.close()
  }

  ping() {


    const params = new HttpParams().set('user', this.userId)
    return this.http.get(this.apiUrl + 'ping', { params })
  }

}
