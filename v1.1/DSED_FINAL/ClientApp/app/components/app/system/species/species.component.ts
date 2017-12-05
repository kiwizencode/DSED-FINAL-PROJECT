import { Component, Inject, Output, EventEmitter, Input, Pipe } from '@angular/core';


import { RestAPIService } from './../../service/restAPI.service';
import { API_url} from './../../shared/api.url';

import { Species } from './../../model/species';

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