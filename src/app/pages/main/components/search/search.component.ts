import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IMResponce } from '../../../../data/interfaces/main.interface';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { RouterLink } from '@angular/router';
import { MainService } from '../../../../core/service/main.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-search',
  imports: [CardComponent, RouterLink, FormsModule, ProgressSpinnerModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy {
   #service = inject(MainService)
  data:IMResponce | null = null
  placeholder!:string
  #searchSubject  = new Subject<string>()
  isLoading:boolean = false

  ngOnInit(): void {
    this.#searchSubject.pipe(debounceTime(1500), distinctUntilChanged(),switchMap(query => this.#service.search(query))).subscribe(movies=> {
      this.isLoading = false
      this.data = movies
    })
  }

  search(){
        this.isLoading = true
    this.#searchSubject.next(this.placeholder)

  }

  ngOnDestroy(): void {
    this.#searchSubject.complete()
  }

}
