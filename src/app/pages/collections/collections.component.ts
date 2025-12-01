import { Component, inject, OnInit } from '@angular/core';
import { CollectionsService } from '../../core/service/collections.service';
import { ICollection } from '../../data/interfaces/collections.interface';
import { RouterLink } from "@angular/router";
import { SkeletonComponent } from '../../shared/ui/skeleton/sckeleton.component';

@Component({
  selector: 'app-collections',
  imports: [RouterLink, SkeletonComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss'
})
export class CollectionsComponent implements OnInit {
  
  #service = inject(CollectionsService)
  collections:ICollection[] | null = null;

  ngOnInit(): void {
    this.#service.getAllCollection().subscribe(data=> {
      this.collections = data.data
      
    })
  }
}
