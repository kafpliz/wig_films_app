import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, Input, OnDestroy,  ViewChild } from '@angular/core';
import { IMFilms } from '../../../../data/interfaces/main.interface';
import { ICollection, ICollections } from '../../../../data/interfaces/collections.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-swiper',
  imports: [CommonModule, RouterLink],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperComponent implements AfterViewInit, OnDestroy {
  @Input() title!: string
  @Input() movies: IMFilms[] | null= null 
  @Input() collection:  ICollection[] | null = null
  @Input() isVertical: boolean = false
  @Input() isCollection: boolean = false
  @Input() isTop: boolean = false
  @Input() routing: string = 'movie'
  @Input() loop: boolean = true
  class: string = 'horiz'
  #router = inject(Router)

  @ViewChild('container') container!: ElementRef
  @ViewChild('swiper') swiper!: ElementRef



  containerObserver!: ResizeObserver

  checkRatingStyle(rating: number): string {
    return rating >= 8.5 ? 'linear-gradient(250deg, rgba(241,255,0,1) 0%, rgba(255,0,0,1) 0%, rgba(255,0,189,1) 100%)' : rating >= 7 ? '#8FD14F' : rating <= 6 ? 'red' : '#FAC710'
  }

  ngAfterViewInit(): void {

    if (this.isVertical == false && this.isCollection == false) {
      this.containerObserver = new ResizeObserver(() => {
        const swiperHeight = this.swiper.nativeElement.offsetHeight
        this.container.nativeElement.style.height = `${swiperHeight}px`;
      })
      this.containerObserver.observe(this.swiper.nativeElement)

    }


  }

  getSwiperClass():string{

    if(this.isCollection){
      return 'horiz-collection'
    }

    return this.isVertical ? 'vert' : ' horiz' 
    
  }

  getSlidesPerView(){
    if(this.isCollection){
      return 'auto'
    }
    return this.isVertical ? 'auto' : '1'
  }


  getContainerStyle():{ [klass: string]: any;} | null | undefined{

    if(this.isCollection && this.collection){
      return {height: '205px'}
    }
   return null
  }
  ngOnDestroy(): void {

    if (this.isVertical == false && this.isCollection == false) {
    
      this.containerObserver.disconnect()
    }
  }

}
