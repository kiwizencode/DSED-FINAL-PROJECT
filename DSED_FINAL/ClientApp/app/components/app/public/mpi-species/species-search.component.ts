import { FormControl } from '@angular/forms';
import { Component, Output, Input, EventEmitter } from '@angular/core' ;
import { Observable } from 'rxjs';

/* http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/ */

@Component({
    selector : 'species-search',
    templateUrl : './species-search.component.html'
})
export class SpeciesSearchComponent {

    @Input() results : Observable<any>;
    @Output() searchEvent: EventEmitter<string> = new EventEmitter();

    searchBox:FormControl = new FormControl();

    constructor() {
        this.searchBox.valueChanges.delay(100) //.debounceTime(250)
            .subscribe( (event) => this.searchEvent.emit(event));
        
        this.searchBox.setValue("");
    }
}