import { Component, inject, OnInit } from '@angular/core';
import { CollectionsService } from '../../core/service/collections.service';
import { ICollection } from '../../data/interfaces/collections.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-collections',
  imports: [RouterLink],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss'
})
export class CollectionsComponent implements OnInit {
  
  #service = inject(CollectionsService)
  collections!:ICollection[];

  ngOnInit(): void {
    this.#service.getAllCollection().subscribe(data=> {
      this.collections = data.data
      
    })
  }
}
