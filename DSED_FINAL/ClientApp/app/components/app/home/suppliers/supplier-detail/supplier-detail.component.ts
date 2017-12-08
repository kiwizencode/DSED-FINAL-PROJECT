import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Suppliers } from './../../models/suppliers';
import { SuppliersService } from './../../services/suppliers.service';

@Component({
    selector: 'supplier-detail',
    templateUrl: './supplier-detail.component.html',
    styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {

    pageTitle = 'Supplier Detail'

    @Input() supplier: Suppliers ;

    constructor(
        private route: ActivatedRoute,
        private suppliersService: SuppliersService,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.getSupplier();
    }

    getSupplier(): any {
        const val  = this.route.snapshot.paramMap.get('id');
        let id = val == null ? 0 : +val ;
        if(id != 0)
            this.suppliersService.getSupplier(id)
                                .subscribe( (supplier) => this.supplier = supplier ) ;
    }

    goBack(): void {
        this.location.back();
    }    
}