import { Pipe, PipeTransform } from '@angular/core';
/* http://www.angulartutorial.net/2017/03/simple-search-using-pipe-in-angular-2.html */

import { Species } from './../../home/models/species';

@Pipe({  
    name: 'speciesfilter' 
})
export class SpeciesFilterPipe implements PipeTransform {
    transform( spieces: Species[],
               input: string
            ) : Species[]
    {
        if(input){
            input = input.toLowerCase();
            return spieces.filter((item) => {
                let scientific = item.scientific.toLowerCase();
                let common = item.common.toLowerCase();
                return ( scientific.indexOf(input) > -1 ) 
                        || ( common.indexOf(input) > -1 ) ;
            });
        }
        return spieces ;
    }
}