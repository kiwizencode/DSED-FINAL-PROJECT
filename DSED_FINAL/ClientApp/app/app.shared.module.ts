
/* Module */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/* Components */
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/app/navmenu/navmenu.component';
import { HomeComponent } from './components/app/home/home.component';

/* Components related to Species */
import { MPISpeciesComponent } from './components/app/public/mpi-species/mpi-species.component';
import { SpeciesSearchComponent } from './components/app/public/mpi-species/species-search.component';

/* Components related to Supplier */
import { SuppliersComponent } from './components/app/suppliers/suppliers.component';
import { SupplierDetailComponent } from './components/app/suppliers/supplier-detail/supplier-detail.component';

/* Components related to Invoice Header */
import { InvoicesComponent } from './components/app/invoices/invoices.component';
import { InvoiceInfoComponent } from './components/app/invoices/invoice-info/invoice-info.component';

/* Components related to Invoice Body */
import { InvoiceDetailComponent } from './components/app/invoice-detail/invoice-detail.component';
import { InvoiceDetailInfoComponent } from './components/app/invoice-detail/invoice-detail-info/invoice-detail-info.component';


/* Services */
import { CRUD_Service } from './components/app/services/db.crud.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        MPISpeciesComponent, SpeciesSearchComponent,
        SuppliersComponent, SupplierDetailComponent,
        InvoicesComponent, InvoiceInfoComponent,
        InvoiceDetailComponent, InvoiceDetailInfoComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'public/species', component: MPISpeciesComponent},
            { path: 'suppliers', component: SuppliersComponent },
            { path: 'invoices', component: InvoicesComponent},
            { path: 'invoice/details', component: InvoiceDetailComponent},
            { path: 'invoice/details/:id', component: InvoiceDetailComponent},
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[CRUD_Service]
})
export class AppModuleShared {
}
