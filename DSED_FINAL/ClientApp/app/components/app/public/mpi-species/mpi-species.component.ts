/*  
    The following code is modified from the following URL:
    http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/ */

import { Component } from '@angular/core';

import { CRUD_Operation } from './../../services/db.operation.enum';
import { CRUD_Service } from './../../services/db.crud.service';
import { REST_API_URI } from './../../services/rest.api.uri';
import { Species } from './../../models/species';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs';
import { of } from 'rxjs/observable/of';

@Component({
    selector : 'mpi-species',
    template : `
        <species-search
            (searchEvent)="onSearch($event)"
            [results]="data"> 
        </species-search>
    `
})
export class MPISpeciesComponent {
    species: Species[];

    private data: Observable<any>;
    private dataObserver: Observer<any>;

    constructor( private crud_Service: CRUD_Service) {
        
        this.data = new Observable(observer => this.dataObserver = observer);
        
        this.getSpecies();
        
    }

    getSpecies() : void {
        this.crud_Service.submit(REST_API_URI.SPIECES, CRUD_Operation.retreive)
            .subscribe( result => {
                this.species = result
                this.dataObserver.next(result);
            }, 
            error => console.error(<any>error) );
    }
        
    onSearch(input:string){
        if(input != '')
        {
            input = input.toLowerCase();
          
            of(this.species.filter( (item) => {
                let scientific = item.scientific.toLowerCase();
                let common = item.common.toLowerCase();
                return ( ( scientific.indexOf(input) > -1 ) 
                        || ( common.indexOf(input) > -1 )) ;
                })
            ).subscribe( 
                (result) => this.dataObserver.next(result) );
            
        }
        else 
        {
            this.dataObserver.next(this.species);
        }
    }
}