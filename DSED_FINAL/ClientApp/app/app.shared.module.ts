

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

/* Service Component */
import { RestAPIService } from './components/app/home/services/rest.api.service';
import { CRUD_Service } from './components/app/home/services/db.crud.service';

/* Main App Component */
import { AppComponent } from './components/app/app.component';
/* Top Menu Component */
import { NavMenuComponent } from './components/app/navmenu/navmenu.component';
/* Home Page Component */
import { HomeComponent } from './components/app/home/home.component';
/* Invoice Page Component */
import { InvoicesComponent } from './components/app/home/invoices/invoices.component';
/* Invoice Information Component */
import { InvoiceInfoComponent } from './components/app/home/invoices/invoice-info/invoice-info.component';
/* Invoice Item Component */
import { InvoiceItemsComponent } from './components/app/home/invoice-items/invoice-items.component';
/* Invoice Item Information Component */
import { InvoiceItemInfoComponent } from './components/app/home/invoice-items/invoice-item-info/invoice-item-info.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent, // Menu Component
        HomeComponent,   // Home Page Component 
        InvoicesComponent, InvoiceInfoComponent,   // Components related to Invoices
        InvoiceItemsComponent, InvoiceItemInfoComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'home/invoices', component: InvoicesComponent},
            { path: 'home/invoice-items/:id', component: InvoiceItemsComponent},
            { path: 'home/invoice-items', component: InvoiceItemsComponent},
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        RestAPIService, 
        CRUD_Service
    ]
})
export class AppModuleShared {
}
