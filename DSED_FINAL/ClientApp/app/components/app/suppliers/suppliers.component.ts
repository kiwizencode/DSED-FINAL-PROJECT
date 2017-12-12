
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Suppliers } from './../models/suppliers';

import { CRUD_Operation } from './../services/db.operation.enum';
import { CRUD_Service } from './../services/db.crud.service';
import { REST_API_URI } from './../services/rest.api.uri';

import { Observer } from 'rxjs';
import { Observable } from 'rxjs/Observable';
//import { of } from 'rxjs/observable/of';

@Component({
    selector: 'suppliers',
    templateUrl: './suppliers.component.html'
})
export class SuppliersComponent implements OnInit {
    /* page title */
    pageTitle : string = 'Supplier';

    /* variables to store data model */
    alldata : Suppliers[];
    selected : Suppliers;

    /* CRUD operation indicator */
    DB_Operation: CRUD_Operation;
    
    /* Form Control variables for supplier detail data entry */
    DialogCaption: string;
    ButtonCaption: string;

    constructor(private crud_Service: CRUD_Service) {}

    ngOnInit(): void {

        this.initialise();

        this.loadData();
    }

    /* Initialise Form Control variables to be used for data entry */
    initialise() : void {

        this.DialogCaption = 'N/D' ;  // Not Defined
        this.ButtonCaption = 'N/D' ; // Not Defined
    }

    /* (R)etreive Operation: get all suppliers records. */
    loadData(): void {
        this.crud_Service.submit(REST_API_URI.SUPPLIERS, CRUD_Operation.retreive)
            .subscribe( result => this.alldata = result , error => console.error(<any>error) );
    }

    /* Create Supplier */
    createData() : void {
        /* set to (C)reate DB Operation */
        this.DB_Operation = CRUD_Operation.create;
        
        /* setup detail page's variables */
        this.DialogCaption = 'Create ' + this.pageTitle ;
        this.ButtonCaption = 'Save' ; 
        
        this.selected =  {
            idPk:-1,
            name: "",
            address01: '',
            address02: '',
            address03: '',
            phone:'',
            fax:''
        } 
    }

    /* Edit Supplier */
    editData(data: any) : void {
        /* set to (U)pdate DB Operation */
        this.DB_Operation = CRUD_Operation.update;
        
        /* setup detail page's variables */
        this.DialogCaption = 'Edit ' + this.pageTitle ;
        this.ButtonCaption = 'Update' ;

        /* set to selected record */
        this.selected = data ;
    }

    /* Delete Supplier */
    deleteData(data:any) : void {
        /* set to (D)elete DB Operation */
        this.DB_Operation = CRUD_Operation.delete;
        
        /* setup detail page's variables */
        this.DialogCaption = 'Confirm to Delete ' + this.pageTitle + "?" ;
        this.ButtonCaption = 'Delete' ;

        /* set to selected record */
        this.selected = data;
    }

}

