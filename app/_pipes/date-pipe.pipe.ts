import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(x:any) {
    const currentDate = new Date();
    return parseInt(currentDate.getFullYear().toString());
  }

}
