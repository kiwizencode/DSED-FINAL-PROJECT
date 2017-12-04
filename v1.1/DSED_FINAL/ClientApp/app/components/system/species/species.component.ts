

import { Component, Inject, Output, EventEmitter, Input, Pipe } from '@angular/core';
//import { Http } from '@angular/http';

import { RestAPIService } from './../../service/restAPI.service';
import { API_url } from './../../shared/global';
import { Species } from './../../model/species';

//import { MarineSpecies } from './marine.species';
//import { SpeciesFilterPipe } from './species.filter.pipe';

@Component({
    selector: 'species',
    templateUrl: './species.component.html'
    
})
export class SpeciesComponent {
    public mpidata: Species[];
    public searchText: string;

    constructor(@Inject('BASE_URL') baseUrl: string, 
                private _restAPIService: RestAPIService) 
    {
        _restAPIService.get(baseUrl + API_url.SPIECES).subscribe(result => {
            this.mpidata = result as Species[];
        }, error => console.error(<any>error));
    }
}