import { Component, OnInit,inject } from '@angular/core';
import { SwiperComponent } from "./components/swiper/swiper.component";
import { IMainChapter, IMRandom, IMResponce } from '../../data/interfaces/main.interface';
import { genre } from '../../data/data/data';
import { SearchComponent } from "./components/search/search.component";
import { RouterLink } from '@angular/router';
import { SkeletonComponent } from '../../shared/ui/skeleton/sckeleton.component';
import { MainService } from '../../core/service/main.service';
import { Dialog } from 'primeng/dialog'
import { Select } from 'primeng/select'
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/ui/card/card.component';



@Component({
  selector: 'app-main',
  imports: [SwiperComponent, SearchComponent, RouterLink, SkeletonComponent, Dialog, Select, FormsModule, CardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  data!: IMainChapter
  genres = genre.slice(0,9)
  fullGenres = genre;
  #service = inject(MainService)
  visible:boolean = false
  selected:{name:string, slug:string} | null = null
  random!:IMRandom

  ngOnInit(): void {
    this.#service.getData().subscribe(movies=> {
      this.data = {
        inovations: movies.innovation,
        top: movies.top,
        popular: movies.popular,
        collections: movies.collections
      }
    })
  }

  changeStateDialog(){
    this.visible = !this.visible
  } 

  getRandom(){
    console.log(this.selected);
    
      this.#service.getRandom(this.selected!.name).subscribe(randomData=> {
        console.log(randomData);
        this.random = randomData
      })
  }
 
}
