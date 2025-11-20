import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IPromo, IUser } from '../../data/interfaces/user.interface';
import { ProfileService } from '../../core/service/profile.service';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user!:IUser;
  #service = inject(ProfileService)
  isCopy: boolean = false;
  promocode:string = '' 
  promoDetails?:IPromo 
  themeService = inject(ThemeService)
  ngOnInit(){
    this.#service.getData().subscribe(data=> {
      this.user = data
    })
  }

  pay(){
      this.#service.forPay().subscribe(data=> {
        this.#service.closeApp()
      })
  }

  copyRef(ref?: string) {
    if (ref) {
      navigator.clipboard.writeText(ref).then(() => {
        this.isCopy = true
      }).catch()
    }
  }

  sendPromo(){
    this.#service.sendPromo(this.promocode).subscribe(data=> {
      this.promoDetails = data
    })
  }


  toggleTheme(){
    this.themeService.toggleTheme()
  }
}
