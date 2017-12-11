import { Injectable, Inject } from '@angular/core';

import { RestAPIService } from './rest.api.service';
import { REST_API_URI } from './rest.api.uri';
import { CRUD_Operation } from './db.operation.enum';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DBCRUDService {
    constructor( @Inject('BASE_URL') private baseUrl: string,
                    private restAPIService: RestAPIService) { }

    submit( rest_api: string, 
            operator: CRUD_Operation,
            formData: any 
        ) : Observable<any> {

        // DEBUG
        console.log("onSubmit : " + operator);
        
        switch(operator)
        {
            /* perform a (C)reate operation */
            case CRUD_Operation.create: 
            
                formData.idPk = 0 ;
                return this.restAPIService
                            .post( this.baseUrl + rest_api, 
                                    formData );
        
            /* perform a (U)pdate operation */
            case CRUD_Operation.update: 
        
                return this.restAPIService
                        .put( this.baseUrl + rest_api,
                                formData.idPk,
                                formData );

            /* perform a (D)elete operation */
            case CRUD_Operation.delete: 

                return this.restAPIService
                        .delete( this.baseUrl + rest_api,
                                    formData.idPk );            
        }    
               
    }
    
}