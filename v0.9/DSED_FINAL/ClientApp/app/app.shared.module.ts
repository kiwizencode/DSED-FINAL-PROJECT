
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';

import { MPISpeciesComponent } from './components/system/mpispecies/mpispecies.component';
import { SpeciesFilterPipe } from './components/system/mpispecies/species.filter.pipe';

/* System Table Component */
import { SystemTableComponent } from './components/system/systable/systable.component';

/* Rest API Service */
import { RestAPIService } from './components/service/restAPI.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        MPISpeciesComponent, // MPI Species List
        SpeciesFilterPipe, // speice fileter pipe
        SystemTableComponent // System Table
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'system/mpispecies', component: MPISpeciesComponent},
            { path: 'system/systable', component: SystemTableComponent},
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[RestAPIService],
    exports: [
        // ...
        SpeciesFilterPipe
    ]
})
export class AppModuleShared {
}
