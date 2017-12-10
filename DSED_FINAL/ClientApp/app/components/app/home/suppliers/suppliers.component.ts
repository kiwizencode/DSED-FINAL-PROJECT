
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';

import { Suppliers} from './../models/suppliers';

import { RestAPIService } from './../../home/services/rest.api.service';
import { REST_API_URI } from './../services/rest.api.uri';
import { CRUD_Operation } from './../services/db.operation.enum';

import { Observer } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: './suppliers.component.html'
})
export class SuppliersComponent implements OnInit {
    /* page title */
    pageTitle : string = 'Supplier';

    /* variables to store data model */
    alldata : Suppliers[];
    selected: Suppliers;

    /* CRUD operation indicator */
    DB_Operation: CRUD_Operation ;
    
    /* Form Control variables for supplier detail data entry */
    DialogCaption: string;
    ButtonCaption: string;

    constructor( @Inject('BASE_URL') private baseUrl: string,
                    private restAPIService: RestAPIService) {}

    ngOnInit(): void {

        this.initialiseForm();

        this.loadData();
    }

    /* Initialise Form Control variables to be used for data entry */
    initialiseForm() : void {

        //this.modalForm.setValue(this.data) ;
        this.DialogCaption = 'N/D' ;  // Not Defined
        this.ButtonCaption = 'N/D' ; // Not Defined
    }

    /* (R)etreive Operation: get all suppliers records. */
    loadData(): void {
        this.restAPIService.get(this.baseUrl + REST_API_URI.SUPPLIERS).subscribe( 
            result => this.alldata = result , error => console.error(<any>error));
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
        /* reset the Form Control variables */
        //this.modalForm.reset();
        
        /* enable the Form Control for user to perform data entry*/
        //this.SetFormState(true);
    }

    /* Edit Supplier */
    editData(data: any) : void {
        // Debug
        // console.log("data ==> " + JSON.stringify(data)) ;

        /* set to (U)pdate DB Operation */
        this.DB_Operation = CRUD_Operation.update;
        
        /* setup detail page's variables */
        this.DialogCaption = 'Edit ' + this.pageTitle ;
        this.ButtonCaption = 'Update' ;
        
        this.selected = data ;
    }

    /* Delete Supplier */
    deleteData(data:any) : void {
        /* set to (D)elete DB Operation */
        this.DB_Operation = CRUD_Operation.delete;
        
        /* setup detail page's variables */
        this.DialogCaption = 'Confirm to Delete?' ;
        this.ButtonCaption = 'Delete' ;

        this.selected = data ;

    }

    onSubmit(formData:any){
        // DEBUG
        // console.log("[onSubmit !!!] : " + this.DB_Operation);
 
        switch(this.DB_Operation)
        {
            /* perform a CREATE operation */
            case CRUD_Operation.create: 
            
                formData.idPk = 0 ;
                console.log('[Create] : '+JSON.stringify(formData));

                this.restAPIService.post(
                    this.baseUrl + REST_API_URI.SUPPLIERS,
                    formData
                ).subscribe(
                    data => {

                        this.loadData();
                    },
                    error => console.error(<any>error) 
                );        
                break;            
        
            /* perform a UPDATE operation */
            case CRUD_Operation.update: 
        
                console.log('[Update] : '+JSON.stringify(formData));

                this.restAPIService.put(
                    this.baseUrl + REST_API_URI.SUPPLIERS,
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
                    /* perform a DELETE operation */
            case CRUD_Operation.delete: 

                console.log('[Delete] : '+JSON.stringify(formData));

                this.restAPIService.delete(
                    this.baseUrl + REST_API_URI.SUPPLIERS,
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

