import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
// ,
//styleUrls: ['./invoices.component.css']

export class InvoicesComponent implements OnInit {
    /* page title */
    pageTitle:string ='Invoice' ;

    /* variables to store data model */
    alldata : Invoices[] ;
    data: Invoices;

    /* CRUD operation indicator */
    DB_Operation: CRUD_Operation ;

    /* Form Control variables for invoice detail data entry */
    modalForm: FormGroup;
    modalFormTitle: string;
    modalButtonTitle: string;

    isSubmit : boolean ;
        
    constructor( @Inject('BASE_URL') private baseUrl: string,
                    private restAPIService: RestAPIService,
                    private formbuilder: FormBuilder ) {}    
    
    ngOnInit(): void {

        this.initialiseForm();

        this.getInvoices();

    }

    /* Initialise Form Control variables to be used for invoice detail data entry */
    initialiseForm() : void {
        /* Initialize input data form */
        this.modalForm = this.formbuilder.group({
            idPk: [""],
            date: ["", Validators.required],
            doa: [""],
            flightNo : ["", Validators.required],
            total: [0, Validators.required],
            supplierFk: [""],
            supplierFkNavigation:[""],
            invoiceDetail: [""]
        });
        this.modalFormTitle = 'N/D';  // Not Defined
        this.modalButtonTitle = 'N/D'; // Not Defined
    }

    /* (R)etreive Operation: get all invoices records. */
    getInvoices() : void {
        this.restAPIService.get(this.baseUrl + REST_API_URI.INVOICES).subscribe(
            result => this.alldata = result, error => console.error(<any>error));        
    }

    /* Method to set whether the Form Control is editable. */
    SetFormState(isEnable: boolean) : void {
        isEnable ? this.modalForm.enable() : this.modalForm.disable();
    }

    /* Create Invoice */
    createData(): void {
        /* set to (C)reate DB Operation */
        this.DB_Operation = CRUD_Operation.create;

        /* setup detail page's variables */
        this.modalFormTitle = 'Create New ' + this.pageTitle ;
        this.modalButtonTitle = 'Save' ;

        /* reset the Form Control variables */
        this.modalForm.reset();

        /* enable the Form Control for user to perform data entry*/
        this.SetFormState(true);

        this.isSubmit = false ;
    }

    /* Edit Invoice */
    editData(data: any): void {
        /* set to (U)pdate DB Operation */
        this.DB_Operation = CRUD_Operation.update;

        /* setup detail page's variables */
        this.modalFormTitle = 'Edit ' + this.pageTitle ;
        this.modalButtonTitle = 'Update' ;

        /* set value of the Form Control variables to data's value. */
        this.modalForm.setValue(data);

        /* enable the Form Control for user to perform data entry*/
        this.SetFormState(true);

        this.isSubmit = false ;
    }    

    /* Delete Invoice */
    deleteData(data: any): void {
        /* set to (D)elete DB Operation */
        this.DB_Operation = CRUD_Operation.delete;

        /* setup detail page's variables */
        this.modalFormTitle = 'Confirm to Delete?' ;
        this.modalButtonTitle = 'Delete' ;

        /* set value of the Form Control variables to data's value. */
        this.modalForm.setValue(data);

        /* diable the Form Control */
        this.SetFormState(false);

        this.isSubmit = false ;
    }

    onSubmit() : void
    {
        console.log("[onSubmit !!!] : " + this.DB_Operation);
    }
}