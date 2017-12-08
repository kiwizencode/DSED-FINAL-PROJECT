import { Injectable, Inject} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { RestAPIService } from './../../home/services/rest.api.service';
import { REST_API_URI } from './../../home/services/rest.api.uri';

import { Suppliers } from './../models/suppliers';

@Injectable()
export class SuppliersService {

    suppliers : Suppliers[] ;

    constructor( 
        @Inject('BASE_URL') private baseUrl: string, 
        private restAPIService: RestAPIService
    ){
        this.restAPIService.get(this.baseUrl + REST_API_URI.SUPPLIERS).subscribe( result => {
            this.suppliers = result as Suppliers[];
        }, error => console.error(<any>error));
    }

    getSuppliers() : Observable<Suppliers[]> {
        return of(this.suppliers);
    }
    
    getSupplier(id:number): Observable<Suppliers> {
        return of(this.suppliers.find(supplier => supplier.idPk == id) as Suppliers) ;
    }
}