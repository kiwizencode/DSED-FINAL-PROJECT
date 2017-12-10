

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/app/navmenu/navmenu.component';
import { HomeComponent } from './components/app/home/home.component';

import { MPISpeciesComponent } from './components/app/public/mpi-species/mpi-species.component';
import { SpeciesSearchComponent } from './components/app/public/mpi-species/species-search.component';

import { SuppliersComponent } from './components/app/home/suppliers/suppliers.component';
import { SupplierDetailComponent } from './components/app/home/suppliers/supplier-detail/supplier-detail.component';

import { InvoicesComponent } from './components/app/home/invoices/invoices.component';
import { InvoiceDetailComponent } from './components/app/home/invoices/invoice-detail/invoice-detail.component';

import { QuarantinePeriodComponent } from './components/app/home/quarantine-period/quarantine-period.component';

/* Service Component */
import { RestAPIService } from './components/app/home/services/rest.api.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent, 
        HomeComponent,      // Home Page
        QuarantinePeriodComponent,
        SuppliersComponent, SupplierDetailComponent,
        InvoicesComponent, InvoiceDetailComponent,
        MPISpeciesComponent, SpeciesSearchComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'public/species', component: MPISpeciesComponent},
            { path: 'home/quarantine-period', component: QuarantinePeriodComponent},
            { path: 'home/suppliers', component: SuppliersComponent},
            { path: 'supplier-detail/:id', component: SupplierDetailComponent},
            { path: 'home/invoices', component: InvoicesComponent},
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        RestAPIService
    ]
})
export class AppModuleShared {
}