import { Component, Input, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-strip-skeleton',
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './strip-skeleton.component.html',
  styleUrl: './strip-skeleton.component.scss'
})
export class StripSkeletonComponent implements OnInit {
  @Input() stripCount:number = 1
  array!:number[]

  ngOnInit(): void {
    this.array = new Array(this.stripCount).fill(Math.random())
  }
  
}
