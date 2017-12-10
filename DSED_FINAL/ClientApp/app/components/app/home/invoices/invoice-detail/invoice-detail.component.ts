
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'inv-detail',
    templateUrl: './invoice-detail.component.html'
})

export class InvoiceDetailComponent implements OnInit {

    /* variables to be passed in from other components */
    @Input() modalFormTitle : string ;
    @Input() modalButtonTitle : string ;
    @Input() modalForm : FormGroup ;

    @Output() Click = new EventEmitter();

    constructor(private formbuilder: FormBuilder) {}
    
    ngOnInit(): void {

        this.initialiseForm();
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

        this.modalFormTitle = 'N/D';  // Not Defined
        this.modalButtonTitle = 'N/D'; // Not Defined
    }

    onSubmit() : void {
        this.Click.emit();
    }
}