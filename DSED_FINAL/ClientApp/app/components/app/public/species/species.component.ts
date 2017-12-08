import { Component, OnInit } from '@angular/core';

import { SpeciesService } from './../../home/services/species.service';

/* Data Model */
import { Species } from './../../home/models/species';

import { Observable } from 'rxjs';

@Component({
    selector: 'species',
    templateUrl: './species.component.html'
    
})
export class SpeciesComponent {
    mpidata: Species[];
    public searchText: string;

    constructor(private speciesService : SpeciesService) {} 

    ngOnInit() : void {
        this.getSpecies(); 
    }

    getSpecies() : void {
        this.speciesService.getSpecies().subscribe(
            species => this.mpidata = species
        );
    }
}