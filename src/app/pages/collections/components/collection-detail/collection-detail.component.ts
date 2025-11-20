import { Component, inject, OnInit } from '@angular/core';
import { CollectionsService } from '../../../../core/service/collections.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection-detail',
  imports: [],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.scss'
})
export class CollectionDetailComponent implements OnInit {
  title: string = ''
  #service = inject(CollectionsService)
  #route = inject(ActivatedRoute)
  ngOnInit(): void {
    this.#route.params.subscribe(param => {
      this.#service.getCollectionMovie(param['slug']).subscribe(data => {
        console.log(data);

      })
    })

  }
}
