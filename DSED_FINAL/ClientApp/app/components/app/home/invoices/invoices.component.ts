

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
    pageTitle:string ='Invoice' ;

    /* Invoice Data Model */
    alldata : Invoices[] ;
    data : Invoices ;

    DB_Operation: CRUD_Operation ;

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

        this.modalFormTitle = 'N/D' ;  // Not Defined
        this.modalButtonTitle = 'N/D' ; // Not Defined

    }

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
    }

    /* get all invoices from database. */
    getInvoices() : void {
        this.restAPIService.get(this.baseUrl + REST_API_URI.INVOICES).subscribe( result => {
            this.alldata = result as Invoices[];
        }, error => console.error(<any>error));        
    }

    SetFormState(isEnable: boolean)
    {
        isEnable ? this.modalForm.enable() : this.modalForm.disable();
    }

    /* display a create data modal dialog */
    createData()
    {
        this.DB_Operation = CRUD_Operation.create;

        this.modalFormTitle = 'Create New ' + this.pageTitle ;
        this.modalButtonTitle = 'Save' ;

        this.modalForm.reset();
        this.SetFormState(true);
        this.isSubmit = false ;
    }

    /* display an edit/update data  modal dialog */
    editData(data:any)
    {
        this.DB_Operation = CRUD_Operation.update;
        
        this.modalFormTitle = 'Edit ' + this.pageTitle ;
        this.modalButtonTitle = 'Update' ;

        //this.data = this.alldata.filter(x => x.idPk == id)[0];
        this.modalForm.setValue(data);
        this.SetFormState(true);
        this.isSubmit = false ;

        //console.log('[Create] : '+JSON.stringify(this.data));

    }    
    /* display a delete data  modal dialog */
    deleteData(data:any)
    {
        this.DB_Operation = CRUD_Operation.delete;
        
        this.modalFormTitle = 'Confirm to Delete?' ;
        this.modalButtonTitle = 'Delete' ;

        //this.data = this.alldata.filter(x => x.idPk == id)[0];
        this.modalForm.setValue(data);
        this.SetFormState(false);

        this.isSubmit = false ;
    }

    onSubmit() : void
    {
        console.log("[onSubmit !!!] : " + this.DB_Operation);
    }
}