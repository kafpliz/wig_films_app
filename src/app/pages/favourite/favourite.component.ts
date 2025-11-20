import { Component, inject, OnInit } from '@angular/core';
import { IMFilms } from '../../data/interfaces/main.interface';
import { CardComponent } from '../../shared/ui/card/card.component';
import { FavouriteService } from '../../core/service/favourite.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favourite',
  imports: [CardComponent,RouterLink],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.scss'
})
export class FavouriteComponent implements OnInit {
  data:IMFilms[] = []
  waitMessage:string = 'Секундочку...'
  #service = inject(FavouriteService)

  ngOnInit(): void {
      this.#service.getData().subscribe(fav=>{
        if(!fav.error){
          this.data = fav.data
          this.waitMessage = this.data.length == 0 ? 'Пусто...' : 'zxc'
        } else {
          this.waitMessage = 'Ошибка, попробуйте позже.'
        }
      })
  }

}
