import { Component, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-form.component.html',
    styleUrls: ['./modal-form.component.css']
})
export class AppModalFormComponent {
    @Input() modalTitle : string ;
    @Input() modalButtonTitle : string ;


    /*
    close = new EventEmitter();
    
    onClickedExit() {
        this.close.emit('event');
    } 
    */   
}
