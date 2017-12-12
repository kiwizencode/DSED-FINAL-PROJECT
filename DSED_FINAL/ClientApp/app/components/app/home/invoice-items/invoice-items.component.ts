
import { Component, OnInit, Inject, Input, ValueProvider } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

    invoiceIdPk: number ;

    /* CRUD operation indicator */
    DB_Operation: CRUD_Operation;

    /* Form Control variables for invoice detail data entry */
    DialogCaption: string;
    ButtonCaption: string;    

    constructor( @Inject('BASE_URL') private baseUrl: string,
                    private restAPIService: RestAPIService,
                    private formbuilder: FormBuilder,
                    // https://angular.io/tutorial/toh-pt5
                    private route: ActivatedRoute,  
                    private location: Location) {}

    ngOnInit(): void {

        const val  = this.route.snapshot.paramMap.get('id');
        let id = val == null ? -1 : +val ;

        
        if(id > 0)
        {
            this.isChildComponent = true ;
            this.isCreatedEnabled = true ;
            this.invoiceIdPk = id ;
        }
        else{
            this.isChildComponent = false; //false;
            this.isCreatedEnabled = false;
            this.invoiceIdPk=-1;
        }   

        //this.loadData();
        
        this.loadInvoices();        
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
            result => { 
                this.invoices = result ;
                let id = this.invoiceIdPk ;
                if( id > 0)
                {
                    this.selectedInvoice = this.invoices.filter(x => x.idPk == id)[0];
                    this.loadInvoiceDetails(id);
                }
                else
                {
                    this.loadData();
                }
            },
            error => console.error(<any>error));
    }

    loadInvoiceDetails(id:number) : void {
        this.restAPIService.get(this.baseUrl + REST_API_URI.INVOICES_DETAILS).subscribe( 
            result =>{
                let all_inv_detail = result as InvoiceDetails [] ;
                this.alldata = all_inv_detail.filter( x => x.invFk == id) ;
            }, error => console.error(<any>error));
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
            this.loadInvoiceDetails(id);
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
            this.loadData();
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
            idPk: 0,
            invFk: this.selectedInvoice.idPk,
            speciesFk: 0,
            qty: 0,
            label: '',
            cost: 0,
            posted: false,
            doa: 0,    
            code: '',
            invFkNavigation: this.selectedInvoice,
            speciesFkNavigation: null,
            quarantineTank:null
        }
        
        //console.log("" + JSON.stringify(this.selected));
    }    

    /* Edit Invoice */
    editData(data: any): void {

        // how to update select value
        this.invoiceIdPk=data.invFk;
        this.invoiceSelected(data.invFk);

        data.invFkNavigation = this.selectedInvoice;

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

        // how to update select value
        this.invoiceIdPk=data.invFk;
        this.invoiceSelected(data.invFk);

        data.invFkNavigation = this.selectedInvoice;
                
        /* set to (D)elete DB Operation */
        this.DB_Operation = CRUD_Operation.delete;

        /* setup detail page's variables */
        this.DialogCaption = 'Confirm to Delete ' + this.pageTitle + '?' ;
        this.ButtonCaption = 'Delete' ;

        /* set to selected record */
        this.selected = data ;
    }
    
}