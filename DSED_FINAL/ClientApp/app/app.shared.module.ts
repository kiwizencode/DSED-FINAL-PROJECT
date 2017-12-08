

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/app/navmenu/navmenu.component';
import { HomeComponent } from './components/app/home/home.component';
import { SpeciesComponent } from './components/app/public/species/species.component';

import { InvoicesComponent } from './components/app/home/invoices/invoices.component';

/* Service Component */
import { RestAPIService } from './components/app/home/services/rest.api.service';
import { SpeciesService } from './components/app/home/services/species.service';

/* Pipe Component */
import { SpeciesFilterPipe } from './components/app/public/species/species.filter.pipe';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent, 
        HomeComponent,      // Home Page
        SpeciesComponent,   // MPI Species Page
        SpeciesFilterPipe,  // Search Filter for MPI Species
        InvoicesComponent   // Invoices Page
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'public/species', component: SpeciesComponent},
            { path: 'home/invoices', component: InvoicesComponent},
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        RestAPIService, 
        SpeciesService
    ],
    exports: [
        SpeciesFilterPipe
    ]
})
export class AppModuleShared {
}