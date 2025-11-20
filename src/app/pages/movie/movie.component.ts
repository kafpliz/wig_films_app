import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, viewChild, ViewChild, } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMovie } from '../../data/interfaces/movie.interface';
import { MovieService } from '../../core/service/movie.service';
import { CommonModule } from '@angular/common';
import { StringEndsPipe } from '../../shared/pipes/string-ends.pipe';
import { SkeletonComponent } from '../../shared/ui/skeleton/sckeleton.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SharedSeasonsService } from '../../data/service/shared.service';




gsap.registerPlugin(ScrollTrigger)


@Component({
  selector: 'app-movie',
  imports: [CommonModule, RouterLink, StringEndsPipe, SkeletonComponent, ToastModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  providers: [MessageService]
})
export class MovieComponent implements OnInit, AfterViewInit {
  movie!: IMovie
  #service = inject(MovieService)
  #router = inject(Router)
  #route = inject(ActivatedRoute)
  isFavourite: boolean = false

  #_poster!: ElementRef
  #_content!: ElementRef
  #message = inject(MessageService)
  #shared = inject(SharedSeasonsService)
  breakpoints = {
    '410px': {
      width: '80%',
    }
  }
 
  #resizeObserver!:ResizeObserver


  @ViewChild('poster', { static: false }) set poster(ref: ElementRef) {
    if (ref) {
      this.#_poster = ref;
      setTimeout(() => {
        this.scrollAnimation()
      }, 10);
    }
  }
 @ViewChild('content', { static: false })  content!:ElementRef

  ngAfterViewInit() {

  }


  ngOnInit(): void {
    this.#route.params.subscribe(data => {
      this.#service.getMovie(data['id']).subscribe(data => {
        this.movie = data;
        this.isFavourite = this.movie.data.film.favorite
      })
    })


  }



  goToSeasons() {
    this.#shared.updInfo(this.movie.data.seasons, { name: this.movie.data.film.names.name, altName: this.movie.data.film.names.alternative })
    this.#router.navigate(['seasons'])
  }

  private scrollAnimation() {

    const poster = this.#_poster.nativeElement

    
    gsap.set(poster, { zIndex: 1, opacity: 1 })


    ScrollTrigger.create({
      trigger: poster,
      start: 'top top',
      end: '+=90%',
      markers: false,
      pin: false,
      pinSpacing: false,
      animation: gsap.to(poster, {
        opacity: 0,
      }),
      scrub: true,
    })

  }

  copy() {
    const url = `${window.location.href}/` + this.#service.userId
    navigator.clipboard.writeText(url).then(data => {
      this.#message.add({
        severity: 'success',
        detail: 'Успешно скопировано!',
        life: 1000000
      })

    })
  }

  editFav() {
    this.isFavourite = !this.isFavourite
    this.#service.editFavourite(this.isFavourite, this.movie.data.film.id.kp).subscribe(data => {

    })
  }

 
checkRatingStyle(rating:number): string {
    return rating >= 8.5 ? 'linear-gradient(250deg, rgba(241,255,0,1) 0%, rgba(255,0,0,1) 0%, rgba(255,0,189,1) 100%)' : rating >= 7 ? '#8FD14F' : rating <= 6 ? 'red' : '#FAC710'
  }
}
