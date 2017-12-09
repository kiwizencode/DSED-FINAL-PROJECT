/* http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/ */

import { Component, OnInit, Inject } from '@angular/core';

import { RestAPIService } from './../../home/services/rest.api.service';
import { REST_API_URI } from './../../home/services/rest.api.uri';
import { Species } from './../../home/models/species';

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
    alldata: Species[];

    private data: Observable<any>;
    private dataObserver: Observer<any>;

    constructor( @Inject('BASE_URL') private baseUrl: string,
                    private restAPIService: RestAPIService) {
        this.data = new Observable(observer => this.dataObserver = observer);
        this.getSpecies();
    }

    getSpecies() : void {
        this.restAPIService.get(this.baseUrl + REST_API_URI.SPIECES).subscribe(
            result => this.alldata = result 
            , error => console.error(<any>error)
        );
        
    }    
    onSearch(input:string){
        if(input){
            input = input.toLowerCase();

            /* Combining multiple RxJs streams in Angular
                http://www.syntaxsuccess.com/viewarticle/combining-multiple-rxjs-streams-in-angular-2.0 */
            
            let first = of(this.alldata.filter(
                (item) => {
                let value = item.scientific.toLowerCase();
                return value.indexOf(input) > -1 ;
            })) ;

            let second = of(this.alldata.filter(
                (item) => {
                let value = item.common.toLowerCase();
                return value.indexOf(input) > -1 ;
            })) ;

            first.concat(second).subscribe( 
                (result) => this.dataObserver.next(result)
            ) ;
            
        }
        else {
            this.dataObserver.next(this.alldata);
        }
    }
}