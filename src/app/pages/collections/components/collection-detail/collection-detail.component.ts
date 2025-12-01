import { Component, computed, effect, HostListener, inject, OnInit, signal } from '@angular/core';
import { CollectionsService } from '../../../../core/service/collections.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CardComponent } from '../../../../shared/ui/card/card.component';
import { IMFilms } from '../../../../data/interfaces/main.interface';
import { SkeletonComponent } from '../../../../shared/ui/skeleton/sckeleton.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-collection-detail',
  imports: [CardComponent, SkeletonComponent, RouterLink, ProgressSpinnerModule, CommonModule],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.scss'
})

export class CollectionDetailComponent implements OnInit {
  title: string = ''
  #service = inject(CollectionsService)
  #route = inject(ActivatedRoute)
  movies = signal<IMFilms[]>([])
  page = signal<number>(1)
  slug = signal<string>('');
  loading = signal<boolean>(false);
  loadingMore = signal<boolean>(false);
  hasMore = signal<boolean>(true);

  constructor() {
    effect(() => {
      console.log('Page', this.page());
    })
  }

  ngOnInit(): void {
    this.#route.queryParams.subscribe(query => {
      const param = query['title']
      if (param) this.title = param
    })

    this.#route.params.subscribe(param => {
      this.slug.set(param['slug'])
      this.loadCollection(true)
    })

  }

  @HostListener('window:scroll', ["$event"])
  onScroll():void{
    if(this.isNear() && !this.loading() && this.hasMore()){
      this.loadMore()
    }
  }

  private loadCollection(isInitial:boolean = false) {
    if((isInitial ? this.loading() : this.loadingMore()) || !this.hasMore()) return

    if(isInitial){
      this.loading.set(true)
    } else {
       this.loadingMore.set(true);
    }

    this.#service.getCollectionMovie(this.slug(), this.page()).subscribe({
      next: (data)=> {
        if(data.data && data.data.length > 0){
          isInitial ? this.movies.set(data.data) : this.movies.update((curr)=> [...curr, ...data.data])
          data.page && data.pages ? this.hasMore.set(data.page < data.pages) : null

          if(this.hasMore()){
            this.page.update(p => p+ 1)
          }
        } else {
          this.hasMore.set(false)
        }
      },
      error: (error)=> {
        console.log(error);
        this.hasMore.set(false);
      },
      complete: () => isInitial ? this.loading.set(false) : this.loadingMore.set(false),
    })
  }

  private loadMore(): void {
    if (!this.loading() && this.hasMore()) {
      this.loadCollection(false);
    }
  }

  private isNear(){
    const threesold = 100
    const scrollPosition = window.pageYOffset
    const windowSize = window.innerHeight
    const bodyHeight = document.body.offsetHeight

    return (scrollPosition + windowSize >= bodyHeight - threesold)
  }
}   
