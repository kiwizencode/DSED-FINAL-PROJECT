
import { Component, Inject, Output, EventEmitter, Input, Pipe } from '@angular/core';
//import { Http } from '@angular/http';
import { RestAPIService } from './../../service/restAPI.service';
import { API_url } from './../../shared/global';

import { MarineSpecies } from './marine.species';
//import { SpeciesFilterPipe } from './species.filter.pipe';

@Component({
    //selector: 'mpispeciesapi',
    templateUrl: './mpispecies.component.html'
    
})
export class MPISpeciesComponent {
    public mpidata: MarineSpecies[];
    public searchText: string;
/*
    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/MPISpeciesAPI/GetSpecies').subscribe(result => {
            this.mpidata = result.json() as MarineSpecies[];
        }, error => console.error(error));
    }
*/
    constructor(@Inject('BASE_URL') baseUrl: string, private _restAPIService: RestAPIService) {
        _restAPIService.get(baseUrl + API_url.GET_SPICIES).subscribe(result => {
            this.mpidata = result as MarineSpecies[];
        }, error => console.error(<any>error));
    }
}
