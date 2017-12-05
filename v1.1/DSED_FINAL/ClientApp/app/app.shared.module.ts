import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/* Date Picker */
//import { DatePickerModule } from 'ng2-datepicker-bootstrap'
//import { DatepickerModule } from 'angular2-material-datepicker';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/app/home/navmenu/navmenu.component';
import { HomeComponent } from './components/app/home/home.component';
import { SpeciesComponent } from './components/app/system/species/species.component';

import { QuarantinePeriodComponent } from './components/app/system/quarantine-periods/quarantine.period.component';

/* Service Component */
import { RestAPIService } from './components/app/service/restAPI.service';

/* Pipe Component */
import { SpeciesFilterPipe } from './components/app/model/species.filter.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        SpeciesComponent,  // MPI Species
        SpeciesFilterPipe,
        QuarantinePeriodComponent
    ],
    imports: [
        //DateValueAccessorModule,
        CommonModule,
        HttpModule,
        FormsModule, ReactiveFormsModule,
        DatepickerModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'system/species', component: SpeciesComponent},
            { path: 'system/quarantine-period', component: QuarantinePeriodComponent},
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        RestAPIService
    ],
    exports: [
        SpeciesFilterPipe
    ]
})
export class AppModuleShared {
}
