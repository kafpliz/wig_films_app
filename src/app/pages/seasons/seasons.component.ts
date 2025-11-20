import { ChangeDetectionStrategy, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, } from '@angular/core';
import { SharedSeasonsService } from '../../data/service/shared.service';
import { IMSeasons, ISeasons } from '../../data/interfaces/movie.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SkeletonComponent } from '../../shared/ui/skeleton/sckeleton.component';
import { TruncateTextComponent } from '../../shared/ui/truncate-text/truncate-text.component';
import { ScrollerModule } from 'primeng/scroller';


@Component({
  selector: 'app-seasons',
  imports: [DatePipe, SkeletonComponent, TruncateTextComponent, ScrollerModule],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonsComponent implements OnInit {
  #shared = inject(SharedSeasonsService)
  #sub!: Subscription
  #cdr = inject(ChangeDetectorRef)
   seasons!: ISeasons 

  season: IMSeasons[] = []
  activeSeasonIdx = ''
  showSeason: boolean = true
  #router = inject(Router)
  #route = inject(ActivatedRoute)
  showDescriptionIndex: string | null = null



  ngOnInit() {

   //this.season[0] = this.seasons.seasons[0]

    this.#route.fragment.subscribe(frag => {
      this.activeSeasonIdx = frag ? frag : 'season_1'
    })

     this.#sub = this.#shared.current.subscribe(data => {
       if (data) {
         this.seasons = data
          this.season[0] = this.seasons.seasons[0]


 
       } else {
         this.#router.navigate(['../',])
       }
     })

  }



  openSeason(seasonId: string) {

    this.activeSeasonIdx = seasonId
    console.log(this.activeSeasonIdx);
    const next = this.seasons.seasons.find(val => val.enName.toLowerCase().replaceAll(' ', '_') == seasonId)
    if (next) {
      this.season = [next];
      this.showSeason = false
      window.scrollTo(0, 0)
      this.#cdr.markForCheck()
      setTimeout(() => {
        this.showSeason = true
        this.#cdr.markForCheck()
      }, 1500);
    }


  }



}
