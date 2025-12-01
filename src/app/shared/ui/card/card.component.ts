import { Component, Input } from '@angular/core';
import { IMFilms } from '../../../data/interfaces/main.interface';
import { CommonModule } from '@angular/common';
import { EngToRusPipe } from '../../pipes/eng-to-rus.pipe';
import { StringEndsPipe } from '../../pipes/string-ends.pipe';

@Component({
  selector: 'app-card',
  imports: [CommonModule, EngToRusPipe, StringEndsPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
 @Input() card!:IMFilms
  @Input() isForPerson:boolean = false
  imageLoaded:boolean = false
 checkRatingStyle(rating:number): string {
    return rating >= 8.5 ? 'linear-gradient(250deg, rgba(241,255,0,1) 0%, rgba(255,0,0,1) 0%, rgba(255,0,189,1) 100%)' : rating >= 7 ? '#8FD14F' : rating <= 6 ? 'red' : '#FAC710'
  }


  onImageLoad(event: Event){
        this.imageLoaded = true;
  }
 
  
}
