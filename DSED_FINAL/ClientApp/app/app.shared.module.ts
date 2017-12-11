
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/* Service Component */
import { RestAPIService } from './components/app/home/services/rest.api.service';

/* Main App Component */
import { AppComponent } from './components/app/app.component';
/* Top Menu Component */
import { NavMenuComponent } from './components/app/navmenu/navmenu.component';
/* Home Page Component */
import { HomeComponent } from './components/app/home/home.component';
/* Invoice Page Component */
import { InvoicesComponent } from './components/app/home/invoices/invoices.component';
/* Invoice Information Page */
import { InvoiceInfoComponent } from './components/app/home/invoices/invoice-info/invoice-info.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent, // Menu Component
        HomeComponent,   // Home Page Component 
        InvoicesComponent, InvoiceInfoComponent   // Components related to Invoices
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
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
