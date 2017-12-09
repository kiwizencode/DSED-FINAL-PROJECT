

import { Component, OnInit, Inject } from '@angular/core';

import { SpeciesService } from './../../home/services/species.service';

import { RestAPIService } from './../../home/services/rest.api.service';
import { REST_API_URI } from './../../home/services/rest.api.uri';

/* Data Model */
import { Species } from './../../home/models/species';

import { Observable } from 'rxjs';

@Component({
    selector: 'species',
    templateUrl: './species.component.html'
    
})
export class SpeciesComponent implements OnInit {
    mpidata: Species[];
    public searchText: string;

    constructor( //private speciesService : SpeciesService) {} 
            @Inject('BASE_URL') private baseUrl: string,
            private restAPIService: RestAPIService) {}

    ngOnInit() : void {
        this.getSpecies();
    }

    getSpecies() : void {
        /*
        this.speciesService.getSpecies().subscribe(
            (species:Species[]) => this.mpidata = species
        );
        */
        this.restAPIService.get(this.baseUrl + REST_API_URI.SPIECES).subscribe(
            result => this.mpidata = result //as Species[]
            , error => console.error(<any>error)
        );
        
    }
}