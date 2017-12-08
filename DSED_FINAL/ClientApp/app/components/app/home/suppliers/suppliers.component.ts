

import { Component, OnInit } from '@angular/core';

import { SuppliersService } from './../services/suppliers.service';
import { Suppliers } from './../models/suppliers';

@Component({
    //selector: 'suppliers',
    templateUrl: './suppliers.component.html',
    styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

    pageTitle = 'Supplier';
    records : Suppliers[];
    selectedSupplier: Suppliers;

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
        this.selectedSupplier = supplier ;
    }
}