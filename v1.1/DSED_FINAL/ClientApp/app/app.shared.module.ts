
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/home/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { SpeciesComponent } from './components/system/species/species.component'; 

import { RestAPIService } from './components/service/restAPI.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        SpeciesComponent  // MPI Species
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'system/species', component: SpeciesComponent},
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[RestAPIService]
})
export class AppModuleShared {
}
