import { Component, inject } from '@angular/core';
import { IMFilms, IMGenre, IMResponce } from '../../data/interfaces/main.interface';
import { genre } from '../../data/data/data';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GenreService } from '../../core/service/genre.service';
import { CardComponent } from '../../shared/ui/card/card.component';
import { SkeletonComponent } from '../../shared/ui/skeleton/sckeleton.component';

@Component({
  selector: 'app-genres',
  imports: [CardComponent, RouterLink, SkeletonComponent],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss'
})
export class GenresComponent {
  genres:IMGenre[] = genre
  #route = inject(ActivatedRoute)
  #service = inject(GenreService)
  data!:IMResponce 
  activeGenre:string = ''

  ngOnInit(){
    this.#route.queryParams.subscribe((param:any) => {
      const genre = param.genre ? param.genre : null
      this.activeGenre = genre
      this.#service.getGenre(genre).subscribe(genres=> {
          this.data = genres
      })
    })
  }


}
