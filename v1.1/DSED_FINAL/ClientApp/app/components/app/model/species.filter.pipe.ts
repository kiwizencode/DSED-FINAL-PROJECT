import { Pipe, PipeTransform, Injectable } from '@angular/core';
/* This code is modified from following URL
   https://dzone.com/articles/implementing-an-angular-table-filter 
   
   http://www.advancesharp.com/blog/1211/angular-2-search-and-sort-with-ngfor-repeater-with-example

   https://octoperf.com/blog/2016/04/05/angular2-ngfor-filter-using-pipes/  */

import { Species } from './species';

@Pipe({ name: 'speciesfilter' })

@Injectable()
export class SpeciesFilterPipe implements PipeTransform {
    transform(spieces: Species[],
              text: any
            ) : any
    {
        if(text==null) return spieces ;

        return spieces.filter(
            item => ( item.scientific.toLowerCase().indexOf(text.toLowerCase()) != -1) 
                || ( item.common.toLowerCase().indexOf(text.toLowerCase()) != -1) )
        ;
    }
}