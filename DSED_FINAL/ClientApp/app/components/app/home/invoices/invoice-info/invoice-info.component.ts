import { Component, Input, OnInit, Output, EventEmitter, Inject  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Invoices } from './../../models/invoices';
import { Suppliers} from './../../models/suppliers';

import { RestAPIService } from './../../../home/services/rest.api.service';
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
    @Input() isModal:boolean ;

    /* https://angular.io/guide/component-interaction */
    private _data : Invoices ;
    @Input() 
        /* input property setter */
        set data(data : Invoices){
            this._data = data ;
            this.initialiseForm();
            this.isModal = true;
        }

        get data() : Invoices { 
        
            /*
            if(this._data == undefined){
                return {
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
            }
            else */
                return this._data ;
        }

    modalForm : FormGroup ;

    constructor( @Inject('BASE_URL') private baseUrl: string,
                    private restAPIService: RestAPIService,
                    private formbuilder: FormBuilder) {}

    ngOnInit(): void {
        
        this.initialiseForm();

        this.DialogCaption = 'N/D';  // Not Defined
        this.ButtonCaption = 'N/D'; // Not Defined

        this.isModal = false ;
    }

    /* Initialise Form Control variables to be used for data entry */
    initialiseForm(): void {
        this.modalForm = this.formbuilder.group({
            idPk: [""],
            date: ["", Validators.required],
            doa: [""],
            flightNo: ["", Validators.required],
            total: [0, Validators.required],
            supplierFk: [""],
            supplierFkNavigation: [""],
            invoiceDetail: [""]
        });

        /* Only set value into control form when (U)pdate operation 
           i.e this._data is not null and idPk > 0 */
           if(this._data  && this._data.idPk > 0 )
           this.modalForm.setValue(this._data);
        else
        /* Else for (C)reate operation and other operation, reset the form */
            this.modalForm.reset();          
    }

    /* Trigger the following code when user hit 'Save' or 'Update' or 'Delete' button */
    onSubmit() : void {
        /* The following line is used to emit (broadcast the event) who ever want to listen, 
            no data is passed back but we want the parent (component) that is listening to the event 
            and handled by event handler onSubmit() as show in following:
            (Click)="onSubmit()" */
        //this.Click.emit(this.modalForm.value);
    }    

}