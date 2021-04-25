import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConvertor'
})
export class TempConvertorPipe implements PipeTransform {

  transform(value: number, unit: string) {
    if(value && !isNaN(value)) {
        if (unit === 'C') {
            var temperature = (value - 273.15);
            return temperature.toFixed(2);
        } else if (unit === 'F'){
            var temperature = (value - 273.15 ) * 9/5 + 32;
            return temperature.toFixed(2);
        }
    }
    return;
}

}
