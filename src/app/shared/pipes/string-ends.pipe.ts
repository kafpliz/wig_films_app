import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringEnds'
})
export class StringEndsPipe implements PipeTransform {

  transform(value: string,): any {

    if (value == 'актеры') {
      return value.replace('ы', '')
    }
    else if (value == "композиторы") {
      return value.replace('ы', '')
    }
    else if (value == "художники") {
      return value.replace('ки', 'к')
    }
    else if (value == "режиссеры") {
      return value.replace('ы', '')
    }
    else if (value == "монтажеры") {
      return value.replace('ы', '')
    }
    else if (value == "операторы") {
      return value.replace('ы', '')
    }
    else if (value == "продюсеры") {
      return value.replace('ы', '')
    }
    else if (value == "сценаристы") {
      return value.replace('ы', '')
    } else if (value == 'актеры дубляжа') {
      return 'дубляж'
    }



  }

}
