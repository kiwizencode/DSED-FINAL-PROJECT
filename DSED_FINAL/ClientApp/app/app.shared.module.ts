
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/app/navmenu/navmenu.component';
import { HomeComponent } from './components/app/home/home.component';

import { AppModalFormComponent } from './components/app/home/modal-form/modal-form.component';

import { QuarantinePeriodComponent } from './components/app/home/quarantine-period/quarantine-period.component';
import { SpeciesComponent } from './components/app/public/species/species.component';
import { SuppliersComponent } from './components/app/home/suppliers/suppliers.component';
import { SupplierDetailComponent } from './components/app/home/suppliers/supplier-detail/supplier-detail.component';

import { InvoicesComponent } from './components/app/home/invoices/invoices.component';
import { InvoiceDetailComponent } from './components/app/home/invoices/invoice-detail/invoice-detail.component';

/* Service Component */
import { RestAPIService } from './components/app/home/services/rest.api.service';

import { SpeciesService } from './components/app/home/services/species.service';
import { SuppliersService } from './components/app/home/services/suppliers.service';

import { InvoicesService } from './components/app/home/services/invoices.service';

/* Pipe Component */
import { SpeciesFilterPipe } from './components/app/public/species/species.filter.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent, 
        HomeComponent,      // Home Page
        AppModalFormComponent,
        QuarantinePeriodComponent,
        SpeciesComponent,   // MPI Species Page
        SpeciesFilterPipe,  // Search Filter for MPI Species
        SuppliersComponent, SupplierDetailComponent,
        InvoicesComponent, InvoiceDetailComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'public/species', component: SpeciesComponent},
            { path: 'home/quarantine-period', component: QuarantinePeriodComponent},
            { path: 'home/suppliers', component: SuppliersComponent},
            { path: 'supplier-detail/:id', component: SupplierDetailComponent},
            { path: 'home/invoices', component: InvoicesComponent},
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        RestAPIService, 
        SpeciesService,
        SuppliersService,
        InvoicesService
    ],
    exports: [
        SpeciesFilterPipe
    ]
})
export class AppModuleShared {
}