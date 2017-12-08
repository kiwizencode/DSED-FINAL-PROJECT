

import { Injectable, Inject} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { RestAPIService } from './../../home/services/rest.api.service';
import { REST_API_URI } from './../../home/services/rest.api.uri';

import { Invoices } from './../models/invoices';
import { Suppliers } from './../models/suppliers';

@Injectable()
export class InvoicesService {

    invoices : Invoices[] ;

    constructor( 
        @Inject('BASE_URL') private baseUrl: string, 
        private restAPIService: RestAPIService
    ){
        this.restAPIService.get(this.baseUrl + REST_API_URI.INVOICES).subscribe( result => {
            this.invoices = result as Invoices[];
        }, error => console.error(<any>error));
    }

    getInvoices() : Observable<Invoices[]> {
        return of(this.invoices);
    }

}