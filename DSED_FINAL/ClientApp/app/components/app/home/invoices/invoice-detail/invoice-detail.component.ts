import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'inv-detail',
    templateUrl: './invoice-detail.component.html'
})

//,styleUrls: ['./invoice-detail.component.css']
export class InvoiceDetailComponent implements OnInit {

    @Input() modalFormTitle : string ;
    @Input() modalButtonTitle : string ;
    @Input() modalForm : FormGroup ;

    @Output() Click = new EventEmitter();

    constructor(private formbuilder: FormBuilder) {}
    
    ngOnInit(): void {

        this.modalFormTitle = 'N/D' ;  // Not Defined
        this.modalButtonTitle = 'N/D' ; // Not Defined

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

    onSubmit() : void {
        this.Click.emit();
    }
}