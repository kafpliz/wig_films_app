import { AfterContentInit, AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PersonService } from '../../core/service/person.service';
import { IPerson } from '../../data/interfaces/person.interface';
import { CardComponent } from '../../shared/ui/card/card.component';
import { SkeletonComponent } from '../../shared/ui/skeleton/sckeleton.component';
import { TabsModule } from 'primeng/tabs';
import { SwiperComponent } from "../main/components/swiper/swiper.component";
import { StringEndsPipe } from '../../shared/pipes/string-ends.pipe';


@Component({
  selector: 'app-person',
  imports: [CardComponent, SkeletonComponent, TabsModule, RouterLink, SwiperComponent, StringEndsPipe],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent implements OnInit {
  #route = inject(ActivatedRoute)
  #service = inject(PersonService)
  person!: IPerson
  activeIndex: number = 0;
 

  ngOnInit(): void {
    this.#route.params.subscribe(param => {
      this.#service.getPerson(param['id']).subscribe(data => {
        this.person = data
      })
    })
  }
}
