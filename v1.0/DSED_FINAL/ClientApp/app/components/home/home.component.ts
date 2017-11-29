import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {


    constructor(private _router: Router) {}
    gotoPetSize() {
        console.log("Pet Size is clicked !!!");
        this._router.navigate(['system','petsize']);
    }
}
