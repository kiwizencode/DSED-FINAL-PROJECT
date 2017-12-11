
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/* Main App Component */
import { AppComponent } from './components/app/app.component';
/* Top Menu Component */
import { NavMenuComponent } from './components/app/navmenu/navmenu.component';
/* Home Page Component */
import { HomeComponent } from './components/app/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent, // Menu Component
        HomeComponent   // Home Page Component 
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
