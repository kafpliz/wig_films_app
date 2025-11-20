import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-truncate-text',
  imports: [],
  templateUrl: './truncate-text.component.html',
  styleUrl: './truncate-text.component.scss'
})
export class TruncateTextComponent implements AfterViewInit {
  @ViewChild('text') text!: ElementRef
  isTruncated: boolean = false
  showMoreBtn: boolean = true
  isExpanded: boolean = false

  ngAfterViewInit(): void {
    setTimeout(() => { this.checkTruncation()});
  }

  checkTruncation(){
    const el = this.text.nativeElement
    console.log(el);
    
    this.isTruncated = el.scrollHeight > el.clientHeight
  }

  
  expandText(){
    if(this.isTruncated){
      this.isExpanded = !this.isExpanded;
    }
   
  }
}
