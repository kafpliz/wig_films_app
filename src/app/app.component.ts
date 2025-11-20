import { CommonModule, Location } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseService } from './core/base.service';
import { SkeletonComponent } from './shared/ui/skeleton/sckeleton.component';
import { ThemeService } from './core/theme.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, SkeletonComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'wig_films';
  #router = inject(Router)
  isEnabled: boolean = true
  #service = inject(BaseService)
  isApi = false;
  headerOpacity: boolean = false
  location = inject(Location)
  theme = inject(ThemeService)
  currTheme:'dark' | 'light' = 'dark'
  needPad:boolean = false
  #themeSubscription!:Subscription;

  constructor(){
    
     effect(()=> {
      this.needPad = this.#service.isFullscreen()
    })
  }

  

  ngOnInit() {
    this.theme.loadSavedTheme()
    this.currTheme = this.theme.currTheme()
   
    
    this.theme.currentTheme$.subscribe(theme=> {
      this.currTheme = theme;
    })

    this.#router.events.subscribe(() => {
      const path = this.location.path()
      if (path == '/seasons') {
        this.headerOpacity = true
      } else {
        this.headerOpacity = false
      }
    })

    this.#service.ping().subscribe(data => {
      this.isApi = true
    })

    
  }

  ngOnDestroy(): void {
    if(this.#themeSubscription){
      this.#themeSubscription.unsubscribe()
    }
  }
}
