import { Injectable, Inject} from '@angular/core';

import { Observable } from 'rxjs/Observable';
//import { of } from 'rxjs/observable/of';

import { RestAPIService } from './../../home/services/rest.api.service';
import { REST_API_URI } from './../../home/services/rest.api.uri';

import { Species } from './../models/species';

@Injectable()
export class SpeciesService {

    data : Species[] ;

    constructor( 
        @Inject('BASE_URL') private baseUrl: string, 
        private restAPIService: RestAPIService
    ){
        /*
        this.restAPIService.get(this.baseUrl + REST_API_URI.SPIECES).subscribe( result => {
            this.data = result;
        }, error => console.error(<any>error));         
        */
    }

    
    getSpecies() : Observable<Species[]> {
        //return of(this.data);
        return this.restAPIService.get(this.baseUrl + REST_API_URI.SPIECES) ;
    }

}