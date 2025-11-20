import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'engToRus'
})
export class EngToRusPipe implements PipeTransform {

  transform(value: string,): string {
    if (value == 'movie') {
      return 'Фильм'
    } else if (value == 'tv-series') {
      return 'Сериал'
    } else if (value == 'cartoon') {
      return 'Мультфильм'
    } else if (value == 'animated-series') {
      return 'Мультипликационный сериал'
    } else if (value == 'anime') {
      return 'Аниме'
    } else {
      return '-'
    }
  }

}
