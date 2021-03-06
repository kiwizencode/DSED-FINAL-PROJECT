
import { Component, Input, OnInit, Output, EventEmitter, Inject  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Invoices } from './../../models/invoices';
import { InvoiceDetails } from './../../models/invoices-detail';
import { Species } from './../../models/species';

import { CRUD_Service } from './../../services/db.crud.service';
import { REST_API_URI } from './../../services/rest.api.uri';
import { CRUD_Operation } from './../../services/db.operation.enum';
import { Suppliers } from '../../models/suppliers';

@Component({
    selector: 'inv-detail-info',
    templateUrl: './invoice-detail-info.component.html'
})
export class InvoiceDetailInfoComponent implements OnInit {

    /* variables to be passed in from other components */
    @Input() DialogCaption:string ;
    @Input() ButtonCaption:string ;
    @Input() DB_Operation:CRUD_Operation ;

    /* https://angular.io/guide/component-interaction */
    private _data : InvoiceDetails ;
    @Input() // data:InvoiceDetails ;
        /* data property setter */
        set data(data : InvoiceDetails){


            this._data = data ;
            this.initialiseForm();
            this.isModal = true;
        }
        /* data property setter */
        get data() : InvoiceDetails { return this._data ; } 

    /* 
        http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/
        http://diveshblog.weebly.com/blog/angular-2-passing-data-from-child-to-parent-component-output
    */        
    /* provide a way to pass parameter back to calling component. */
    /* create an EventEmitter and decorate it as an Output coming from current component. */
    /* All @Outputs are EventEmitters and 
       the @Output decorator exposes an event that parents can attach listeners to in its template. */        
    @Output() Click = new EventEmitter();

    isModal:boolean ;
    modalForm : FormGroup ;

    invoices:Invoices ;
    supplier:Suppliers ;
    species:Species ;

    constructor( @Inject('BASE_URL') private baseUrl: string,
                    private crud_serivce:CRUD_Service,
                    private formbuilder: FormBuilder) {}  
                    
    ngOnInit(): void { 

        this.DialogCaption = 'N/D';  // Not Defined
        this.ButtonCaption = 'N/D'; // Not Defined

        this.initialiseForm();
        this.getSpecies();
        this.getInvoices();
        this.isModal = false ;
    }

    /* Initialise Form Control variables to be used for data entry */
    initialiseForm(): void {
        
        this.modalForm = this.formbuilder.group({
            idPk: [""],
            invFk: ["", Validators.required],       // Invoice idPk
            speciesFk: ["", Validators.required],   // Species idPk
            qty: ["", Validators.required],         // Quantity
            label:[""],
            cost: ["", Validators.required],        // Cost price
            posted: [""],
            doa:[""],       // Death On Arrival (count)
            code:[""], 
            invFkNavigation: [""],
            speciesFkNavigation: [""],
            quarantineTank:[""]
        });

        // this.modalForm.reset(); 
        /* Only set value into control form when (U)pdate operation 
            i.e this._data is not null and idPk > 0 */
        if(this._data )  {// && this._data.idPk > 0 ) {
            this.modalForm.setValue(this._data);
        }
            
        //else
        /* Else for (C)reate operation and other operation, reset the form */
            //this.modalForm.reset();          
    }

    getSpecies() : void {

        this.crud_serivce.submit( REST_API_URI.SPIECES, CRUD_Operation.retreive )
            .subscribe( result => this.species = result , error => console.error(<any>error));
    }
    
    getInvoices(): void {
        this.crud_serivce.submit( REST_API_URI.INVOICES, CRUD_Operation.retreive )
            .subscribe(result => this.invoices = result , error => console.error(<any>error));       
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
        formData.invFkNavigation = '';
        //console.log("onSubmit !!! : " + JSON.stringify(formData));
        
        this.crud_serivce.submit( 
            REST_API_URI.INVOICES_DETAILS,
            this.DB_Operation, 
            formData) 
                .subscribe(
                    data => { this.refreshData(); },
                    error => console.error(<any>error) ); 
                    
    }
    
}