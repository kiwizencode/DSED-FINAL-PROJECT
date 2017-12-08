


import { Component, OnInit } from '@angular/core';

import { SuppliersService } from './../services/suppliers.service';
import { Suppliers} from './../models/suppliers';

import { CRUD_Operation } from './../services/db.operation.enum';

@Component({
    //selector: 'suppliers',
    templateUrl: './suppliers.component.html',
    styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

    pageTitle = 'Supplier';
    records : Suppliers[];
    selectedSupplier: Suppliers;
    editSupplier: Suppliers;

    DB_Operation: CRUD_Operation ;
    
    modalTitle: string;
    modalButtonTitle: string;

    constructor(private suppliersService : SuppliersService){}

    ngOnInit(): void {
        this.getSuppliers();
    }

    getSuppliers(): void {
        this.suppliersService.getSuppliers().subscribe(
            suppliers => this.records = suppliers 
        );
    }

    editData(supplier: Suppliers) : void {
        
        this.editSupplier = {
            idPk: supplier.idPk,
            name: supplier.name,
            address01: supplier.address01,
            address02: supplier.address02,
            address03: supplier.address03,
            phone: supplier.fax,
            fax: supplier.fax,
        };

        this.selectedSupplier = this.editSupplier ;
        
        this.DB_Operation = CRUD_Operation.update;
        this.modalTitle = 'Edit ' + this.pageTitle ;
        this.modalButtonTitle = 'Update' ;        
    }

    onSubmit(){
        // DEBUG
        console.log("editSupplier: " + JSON.stringify(this.editSupplier))
    }
}