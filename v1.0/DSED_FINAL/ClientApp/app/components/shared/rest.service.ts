/* The following code is modified from 
   https://www.codeproject.com/Articles/1181888/Angular-in-ASP-NET-MVC-Web-API-Part */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestAPIService {
    constructor(private _http: Http) { }

    /*
        Get Method takes the RESTful API URL as a parameter and returning the Observable<any> (keep it generic)
        1. http get method is being called by providing the input RESTful API url
        2. calling the map method to map the JSON response to any type (keep it generic).
        3. catch any error and passed it to handleError.
        The type any is like a dynamic in C#, it does the compile type check.
    */
    get(url: string): Observable<any> {
        return this._http.get(url)
            .map((response: Response) => <any>response.json())
            // .do(data => console.log("All: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    put(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    delete(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url + id, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}