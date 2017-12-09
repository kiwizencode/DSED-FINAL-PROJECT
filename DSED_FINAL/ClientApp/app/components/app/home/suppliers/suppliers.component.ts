import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';

import { Suppliers} from './../models/suppliers';

import { RestAPIService } from './../../home/services/rest.api.service';
import { REST_API_URI } from './../services/rest.api.uri';
import { CRUD_Operation } from './../services/db.operation.enum';

@Component({
    templateUrl: './suppliers.component.html'
})
export class SuppliersComponent implements OnInit {

    pageTitle : string = 'Supplier';
    
    records : Suppliers[];
    selected: Suppliers;
    edited: Suppliers;

    DB_Operation: CRUD_Operation ;
    
    modalForm: FormGroup;
    modalTitle: string;
    modalButtonTitle: string;

    constructor( @Inject('BASE_URL') private baseUrl: string,
                    private restAPIService: RestAPIService,
                    private formbuiler: FormBuilder ) {}

    ngOnInit(): void {

        this.modalForm = this.formbuiler.group({
            idPk: [""],
            name: ["", Validators.required],
            address01: [""],
            address02: [""],
            address03: [""],
            phone:[""],
            fax:[""]
        });

        this.getSuppliers();
    }

    getSuppliers(): void {
        this.restAPIService.get(this.baseUrl + REST_API_URI.SUPPLIERS).subscribe( result => {
            this.records = result as Suppliers[];
        }, error => console.error(<any>error));
    }

    createEditData(supplier?: Suppliers) : void {

        if(supplier)
            this.edited = {
                idPk: supplier.idPk,
                name: supplier.name,
                address01: supplier.address01,
                address02: supplier.address02,
                address03: supplier.address03,
                phone: supplier.fax,
                fax: supplier.fax
            };
        else
            this.edited = {
                idPk: 0,
                name: '',
                address01: '',
                address02: '',
                address03: '',
                phone: '',
                fax: ''
            };
        this.selected = this.edited ;
        //this.selected = this.edited ;
        //this.modalForm.setValue(this.edited);
    }

    createData() : void {
        this.createEditData();
        this.DB_Operation = CRUD_Operation.create;
        this.modalTitle = 'Create ' + this.pageTitle ;
        this.modalButtonTitle = 'Save' ; 

    }

    editData(data: Suppliers) : void {
        this.createEditData(data);
        this.DB_Operation = CRUD_Operation.update;
        this.modalTitle = 'Edit ' + this.pageTitle ;
        this.modalButtonTitle = 'Update' ;
                
    }

    onSubmit(){
        // DEBUG
        //console.log("editSupplier: " + JSON.stringify(this.editSupplier))
        //console.log("editSupplier: " + JSON.stringify(formData))
        switch(this.DB_Operation)
        {
            /* perform a CREATE operation */
            case CRUD_Operation.create: 
            

                break;            
        }      

    }

}

