import { Component, inject, OnInit } from '@angular/core';
import { AdventService } from '../../core/service/advent.service';
import { SkeletonComponent } from '../../shared/ui/skeleton/sckeleton.component';
import { RouterLink } from '@angular/router';

interface MovieDay {
  id:number
  day: number;
  name: string;
  description: string;
  poster: {
    url: string
  };
}

@Component({
  selector: 'app-advent-calendar',
  imports: [SkeletonComponent, RouterLink],
  templateUrl: './advent-calendar.component.html',
  styleUrl: './advent-calendar.component.scss'
})
export class AdventCalendarComponent implements OnInit {
  movies: MovieDay[] | null = null
  day = new Date().getDate()
  #service = inject(AdventService)


  ngOnInit(): void {
 
    this.#service.getMovies().subscribe(data => {
      this.movies = data.movies
    })
  }



  onImageLoad(event: Event){
      const img = event.target as HTMLImageElement;
    img.classList.add('loaded');
  }
 

}
