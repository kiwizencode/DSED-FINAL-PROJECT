import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Invoices } from './../models/invoices';

import { REST_API_URI } from './../services/rest.api.uri';
import { RestAPIService } from './../services/rest.api.service';
import { CRUD_Operation } from './../services/db.operation.enum';

import { Observer } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'invoices',
    templateUrl: './invoices.component.html'
})
export class InvoicesComponent implements OnInit {
    /* page title */
    pageTitle:string ='Invoice' ;

    /* variables to store data model */
    alldata : Invoices[] ;
    selected : Invoices ;

    /* CRUD operation indicator */
    DB_Operation: CRUD_Operation ;

    /* Form Control variables for invoice detail data entry */
    DialogCaption: string;
    ButtonCaption: string;

    constructor( @Inject('BASE_URL') private baseUrl: string,
                    private restAPIService: RestAPIService) {}    
    
    ngOnInit(): void {

        this.initialiseForm();

        this.loadData();

    }

    /* Initialise Form Control variables to be used for invoice detail data entry */
    initialiseForm() : void {

        this.DialogCaption = 'N/D';  // Not Defined
        this.ButtonCaption = 'N/D'; // Not Defined
    }

    /* (R)etreive Operation: get all invoices records. */
    loadData() : void {
        this.restAPIService.get(this.baseUrl + REST_API_URI.INVOICES).subscribe(
            result => this.alldata = result, error => console.error(<any>error));        
    }

    /* Create Invoice */
    createData(): void {
        /* set to (C)reate DB Operation */
        this.DB_Operation = CRUD_Operation.create;

        /* setup detail page's variables */
        this.DialogCaption = 'Create New ' + this.pageTitle ;
        this.ButtonCaption = 'Save' ;

        /* Initialize a Invoice class */
        this.selected =  {
            idPk:-1,
            date: new Date,
            doa: new Date,
            flightNo: '',
            total: 0,
            supplierFk:-1,
            supplierFkNavigation:null
        }
    }

    /* Edit Invoice */
    editData(data: any): void {
        /* set to (U)pdate DB Operation */
        this.DB_Operation = CRUD_Operation.update;

        /* setup detail page's variables */
        this.DialogCaption = 'Edit ' + this.pageTitle ;
        this.ButtonCaption = 'Update' ;

        /* set to selected record */
        this.selected = data ;
    }    

    /* Delete Invoice */
    deleteData(data: any): void {
        /* set to (D)elete DB Operation */
        this.DB_Operation = CRUD_Operation.delete;

        /* setup detail page's variables */
        this.DialogCaption = 'Confirm to Delete?' ;
        this.ButtonCaption = 'Delete' ;

        /* set to selected record */
        this.selected = data ;
    }

    onSubmit(formData:any){
        // DEBUG
        // console.log("[onSubmit !!!] : " + this.DB_Operation);
 
        switch(this.DB_Operation)
        {
            /* perform a (C)reate operation */
            case CRUD_Operation.create: 
            
                formData.idPk = 0 ;
                console.log('[Create] : '+JSON.stringify(formData));

                this.restAPIService.post(
                    this.baseUrl + REST_API_URI.INVOICES,
                    formData
                ).subscribe(
                    data => {

                        this.loadData();
                    },
                    error => console.error(<any>error) 
                );        
                break;            
        
            /* perform a (U)pdate operation */
            case CRUD_Operation.update: 
        
                console.log('[Update] : '+JSON.stringify(formData));

                this.restAPIService.put(
                    this.baseUrl + REST_API_URI.INVOICES,
                    formData.idPk,
                    formData
                ).subscribe(
                    data => {
                        //console.log('[Result] : '+JSON.stringify(response));
                        this.loadData();
                    },
                    error => console.error(<any>error)
                );
                break;
            
            /* perform a (D)elete operation */
            case CRUD_Operation.delete: 

                console.log('[Delete] : '+JSON.stringify(formData));

                this.restAPIService.delete(
                    this.baseUrl + REST_API_URI.INVOICES,
                    formData.idPk
                ).subscribe(
                    data => {
                        this.loadData();
                    },
                    error => console.error(<any>error)
                );            

                break;      
        }    
    }
}