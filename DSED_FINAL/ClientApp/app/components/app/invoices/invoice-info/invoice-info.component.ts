
import { Component, Input, OnInit, Output, EventEmitter, Inject  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Invoices } from './../../models/invoices';
import { Suppliers} from './../../models/suppliers';

import { CRUD_Operation } from './../../services/db.operation.enum';
import { CRUD_Service } from './../../services/db.crud.service';
import { REST_API_URI } from './../../services/rest.api.uri';

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

    constructor( private crud_Service: CRUD_Service,
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
        this.crud_Service.submit(REST_API_URI.SUPPLIERS, CRUD_Operation.retreive)
            .subscribe( result => this.suppliers = result , error => console.error(<any>error) );
    }

    /* Trigger the following code when user hit 'Save' or 'Update' or 'Delete' button */
    refreshData() : void {
        /* The following line is used to emit (broadcast the event) who ever want to listen, 
            no data is passed back but we want the parent (component) that is listening to the event 
            and handled by event handler onSubmit() as show in following:
            (Click)="onSubmit()" */
        this.Click.emit();
    }

    onSubmit(formData:any){

        this.crud_Service.submit( 
            REST_API_URI.INVOICES, this.DB_Operation, formData) 
                .subscribe( data => this.refreshData(),
                            error => console.error(<any>error) ); 
    }
}