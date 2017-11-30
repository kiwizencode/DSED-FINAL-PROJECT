
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ModalModule, ModalDirective } from 'ng2-bootstrap';

import { BsModalModule } from 'ng2-bs3-modal';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';

import { MPISpeciesComponent } from './components/mpispecies/mpispecies.component';
import { PetSizeComponent } from './components/system/petsize/petsize.component';

//import { ModalComponent } from './components/shared/modal.component';
//import { ModalService } from './components/shared/modal.service';

import { RestAPIService } from './components/shared/rest.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        MPISpeciesComponent,
        PetSizeComponent //,ModalComponent
    ],
    providers:[ 
        RestAPIService //, ModalService
    ],    
    imports: [
        ModalModule,
        CommonModule,
        HttpModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'mpispecies', component: MPISpeciesComponent },
            { path: 'system/petsize', component: PetSizeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
