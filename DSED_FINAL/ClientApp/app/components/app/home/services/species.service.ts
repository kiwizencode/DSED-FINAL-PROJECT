import { Inject} from '@angular/core';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { RestAPIService } from './../../home/services/rest.api.service';
import { REST_API_URI } from './../../home/services/rest.api.uri';

import { Species } from './../models/species';

@Injectable()
export class SpeciesService {

    data : Species[] ;

    constructor( 
        @Inject('BASE_URL') baseUrl: string, 
        private restAPIService: RestAPIService
    ){
        restAPIService.get(baseUrl + REST_API_URI.SPIECES).subscribe( result => {
            this.data = result as Species[];
        }, error => console.error(<any>error));
    }

    getSpecies() : Observable<Species[]> {
        return of(this.data);
    }
}