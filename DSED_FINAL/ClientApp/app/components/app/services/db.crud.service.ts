/* 
    Following code is modified from following url :
    https://www.codeproject.com/Articles/1181888/Angular-in-ASP-NET-MVC-Web-API-Part
*/
import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

//import { RestAPIService } from './rest.api.service';
//import { REST_API_URI } from './rest.api.uri';
import { CRUD_Operation } from './db.operation.enum';
//import { Observable } from 'rxjs/Observable';


@Injectable()
export class CRUD_Service {
    constructor(@Inject('BASE_URL') private baseUrl: string,
                    private _http: Http) { }

    submit( rest_api_uri: string, 
            operator: CRUD_Operation,
            formData?: any 
        ) : Observable<any> {

        // DEBUG
        //console.log("CRUD : " + operator);
        //console.log("API_URI : " + rest_api_uri);
        //console.log("data : " + JSON.stringify(formData));

        switch(operator)
        {
            /* perform a (C)reate operation */
            case CRUD_Operation.create: 
            
                formData.idPk = 0 ;
                return this.post( this.baseUrl + rest_api_uri, formData );
        
            case CRUD_Operation.retreive:

                return this.get( this.baseUrl + rest_api_uri);

            /* perform a (U)pdate operation */
            case CRUD_Operation.update: 
        
                return this.put( this.baseUrl + rest_api_uri,
                                formData.idPk,
                                formData );

            /* perform a (D)elete operation */
            case CRUD_Operation.delete: 

                return this.delete( this.baseUrl + rest_api_uri,
                                    formData.idPk );            
        }    
               
    }

    private get(url: string): Observable<any> {
        return this._http.get(url)
            .map((response: Response) => <any>response.json())
            //.do(data => console.log("All: " + JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    private post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private put(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url+id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }    

    private delete(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url+id,options)
                        .map((response: Response) => <any>response.json())
                        .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}