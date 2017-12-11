
import { Component, OnInit, Inject, Input, ValueProvider } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Invoices } from './../models/invoices';
import { InvoiceDetails } from './../models/invoices-detail';

import { RestAPIService } from './../../home/services/rest.api.service';
import { REST_API_URI } from './../services/rest.api.uri';
import { CRUD_Operation } from './../services/db.operation.enum';

@Component({
    selector: 'inv-items',
    templateUrl: './invoice-items.component.html'
})
export class InvoiceItemsComponent implements OnInit {
    /* page title */
    pageTitle:string ="Invoice Items";

    invoiceForm: FormGroup ;

    invoices: Invoices [];
    selectedInvoice: Invoices ;


    /* variables to store data model */

    selected : InvoiceDetails ;
    alldata: InvoiceDetails [];
    data: InvoiceDetails ;        

    isChildComponent: boolean;
    isCreatedEnabled: boolean;

    /* CRUD operation indicator */
    DB_Operation: CRUD_Operation;

    /* Form Control variables for invoice detail data entry */
    DialogCaption: string;
    ButtonCaption: string;    

    constructor( @Inject('BASE_URL') private baseUrl: string,
                    private restAPIService: RestAPIService,
                    private formbuilder: FormBuilder) {}

    ngOnInit(): void {
        this.loadInvoices();
        this.loadData();
        this.isChildComponent = false;
        this.isCreatedEnabled = false;
    }

    /* Initialise Form Control variables to be used for data entry */
    initialiseForm(): void {
        
        this.invoiceForm = this.formbuilder.group({
            idPk: [""],
            date: ["", Validators.required],
            doa: [""],
            flightNo: ["", Validators.required],
            total: [0, Validators.required],
            supplierFk: [""],
            supplierFkNavigation: [""],
            invoiceDetail: [""]
        });
 
    }

    /* (R)etreive Operation: get all invoices records. */
    loadInvoices(): void {
        this.restAPIService.get(this.baseUrl + REST_API_URI.INVOICES).subscribe( 
            result => this.invoices = result, error => console.error(<any>error));
    } 

    /* (R)etreive Operation: get all invoice details records. */
    loadData(): void {
        this.restAPIService.get(this.baseUrl + REST_API_URI.INVOICES_DETAILS).subscribe( 
            result => this.alldata = result, error => console.error(<any>error));
    }

    /* When user clicked on the selected*/
    invoiceSelected(id:any) : void 
    {
        console.log("[Item selected]:"+id); 
        if(id > 0)
        {
            this.selectedInvoice = this.invoices.filter(x => x.idPk == id)[0];
            this.isCreatedEnabled = true;
            //Debug 
            //console.log("[selectedInvoice]:" + JSON.stringify(this.selectedInvoice));
        }
        else {
            this.selectedInvoice = 
            {
                idPk: 0,
                date: new Date,
                doa: new Date,
                flightNo: '',
                total: 0,
                supplierFk: -1,
                supplierFkNavigation: {
                    name:''
                }             
            }
            this.isCreatedEnabled = false;
        }
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
            idPk: -1,
            invFk: -1,
            speciesFk: -1,
            qty: -1,
            label: '',
            cost: -1,
            posted: false,
            doa: 0,    
            code: '',
            invFkNavigation: null,
            speciesFkNavigation: null
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
        this.DialogCaption = 'Confirm to Delete ' + this.pageTitle + '?' ;
        this.ButtonCaption = 'Delete' ;

        /* set to selected record */
        this.selected = data ;
    }
    
}