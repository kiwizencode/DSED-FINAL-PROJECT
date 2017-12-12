import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Invoices } from './../models/invoices';

import { CRUD_Operation } from './../services/db.operation.enum';
import { CRUD_Service } from './../services/db.crud.service';
import { REST_API_URI } from './../services/rest.api.uri';

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

    constructor( private crud_Service: CRUD_Service ) {}      
    
    ngOnInit(): void {
        this.initialise();
        this.loadData();
    }

    /* Initialise Form Control variables to be used for invoice detail data entry */
    initialise() : void {
        
        this.DialogCaption = 'N/D';  // Not Defined
        this.ButtonCaption = 'N/D'; // Not Defined
    }    

    /* (R)etreive Operation: get all invoices records. */
    loadData() : void {
        this.crud_Service.submit(REST_API_URI.INVOICES, CRUD_Operation.retreive)
            .subscribe( result => this.alldata = result, error => console.error(<any>error) );        
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
}