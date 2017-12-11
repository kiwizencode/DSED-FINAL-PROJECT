
import { Component, Input, OnInit, Output, EventEmitter, Inject  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Invoices } from './../../models/invoices';
import { Suppliers} from './../../models/suppliers';

import { RestAPIService } from './../../../home/services/rest.api.service';
import { REST_API_URI } from './../../services/rest.api.uri';
import { CRUD_Operation } from './../../services/db.operation.enum';

/*
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
*/

/* 
    http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/
    http://diveshblog.weebly.com/blog/angular-2-passing-data-from-child-to-parent-component-output
*/

@Component({
    selector: 'inv-info',
    templateUrl: './invoice-info.component.html',
    styleUrls: ['./invoice-info.component.css']
})

export class InvoiceInfoComponent implements OnInit {

    /* variables to be passed in from other components */
    @Input() DialogCaption:string ;
    @Input() ButtonCaption:string ;
    @Input() DB_Operation:CRUD_Operation ;

    /* https://angular.io/guide/component-interaction */
    private _data : Invoices ;
    @Input() 
        /* input property setter */
        set data(data : Invoices){

            this._data = data ;
            this.initialiseForm();
            this.isModal = true;
        }

        get data() : Invoices { return this._data ; }

    @Input() 
        /* input property setter */
        set selectedInvoice(data : Invoices){
            this._data = data ;
            this.initialiseForm();
            this.modalForm.disable();
        }    

    /* provide a way to pass parameter back to calling component. */
    /* create an EventEmitter and decorate it as an Output coming from current component. */
    /* All @Outputs are EventEmitters and 
       the @Output decorator exposes an event that parents can attach listeners to in its template. */        
    @Output() Click = new EventEmitter();

    isModal:boolean ;
    modalForm:FormGroup ;
    suppliers:Suppliers[] ;

    constructor( @Inject('BASE_URL') private baseUrl: string,
                    private restAPIService: RestAPIService,
                    private formbuilder: FormBuilder) {}

    ngOnInit(): void {
        
        this.initialiseForm();

        this.DialogCaption = 'N/D';  // Not Defined
        this.ButtonCaption = 'N/D'; // Not Defined

        this.isModal = false ;

        this.getSuppliers();
    }

    /* Initialise Form Control variables to be used for data entry */
    initialiseForm(): void {

        this.modalForm = this.formbuilder.group({
            idPk: [""],
            date: ["", Validators.required],
            doa: [""],
            flightNo: ["", Validators.required],
            total: ["", Validators.required],
            supplierFk: ["", Validators.required],
            supplierFkNavigation: [""],
            invoiceDetail: [""]
        });

        // this.modalForm.reset(); 
        /* Only set value into control form when (U)pdate operation 
           i.e this._data is not null and idPk > 0 */
        if(this._data  && this._data.idPk > 0 )
        {
            this.modalForm.setValue(this._data);
        }
           
        //else
        /* Else for (C)reate operation and other operation, reset the form */
            //this.modalForm.reset();          
    }

    getSuppliers() : void {
        this.restAPIService.get(this.baseUrl + REST_API_URI.SUPPLIERS).subscribe( 
            result => this.suppliers = result , error => console.error(<any>error));
    }

    /* Trigger the following code when user hit 'Save' or 'Update' or 'Delete' button */
    refreshData() : void {
        /* The following line is used to emit (broadcast the event) who ever want to listen, 
            no data is passed back but we want the parent (component) that is listening to the event 
            and handled by event handler onSubmit() as show in following:
            (Click)="onSubmit()" */
        this.Click.emit();

        // Debug
        //console.log("DB_Operation : ["+ this.DB_Operation + "]");
    }

    onSubmit(formData:any){
        // DEBUG
        console.log("onSubmit !!! : " + this.DB_Operation);
 
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
                    data => { this.refreshData(); },
                    error => console.error(<any>error) 
                );        
                break;            
        
            /* perform a (U)pdate operation */
            case CRUD_Operation.update: 
        
                console.log('[Update] : '+JSON.stringify(formData));

                // Due to circular structure
                //formData.supplierFkNavigation=null;
                //formData.invoiceDetail=null;

                this.restAPIService.put(
                    this.baseUrl + REST_API_URI.INVOICES,
                    formData.idPk,
                    formData
                ).subscribe(
                    data => {
                        //console.log('[Result] : '+JSON.stringify(response));
                        this.refreshData();
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
                    data => { this.refreshData(); },
                    error => console.error(<any>error)
                );            

                break;      
        }    

    }


    temp(formData:any){

    }
}