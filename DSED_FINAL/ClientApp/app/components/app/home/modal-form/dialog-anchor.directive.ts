
import { Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef, Component } from "@angular/core";
import {ViewContainerRef} from '@angular/core';
import { AppModalFormComponent } from './modal-form.component';

@Directive({ 
    selector: '[dialogAnchor]' 
})
export class DialogAnchorDirective {
    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    createDialog(dialogComponent: {  new(): Component }): ComponentRef<Component>  {
        this.viewContainer.clear();

        let dialogComponentFactory = 
          this.componentFactoryResolver.resolveComponentFactory(dialogComponent);
        let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);
        
        /*
        dialogComponentRef.instance.close.subscribe(() => {
            dialogComponentRef.destroy();
        });
        */
        return dialogComponentRef;
    }    
}