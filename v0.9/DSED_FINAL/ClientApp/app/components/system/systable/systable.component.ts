
import { Component, Inject,  OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RestAPIService } from './../../service/restAPI.service';
import { API_url } from './../../shared/global';

import { SystemTable } from './../../model/system.table';

import { CRUD_Operation } from './../../shared/enum';

@Component({
    templateUrl: './systable.component.html'
})

export class SystemTableComponent implements OnInit {
    records: SystemTable[];
    record: SystemTable;

    Table_Name:string  = 'System Table';
    DB_Operation: CRUD_Operation ;
    modalForm: FormGroup;
    modalTitle: string;
    modalButtonTitle: string;

    constructor(@Inject('BASE_URL') baseUrl: string, 
                private _restAPIService: RestAPIService,
                private _formbuiler: FormBuilder ) {
        _restAPIService.get(baseUrl + API_url.GET_SYSTEM_TABLES).subscribe(result => {
            this.records = result as SystemTable[];
        }, error => console.error(<any>error));
    }

    ngOnInit():void {
        this.modalForm = this._formbuiler.group({
            idPk: [''],
            value: [''], //, Validators.required],
            text: [''], //, Validators.required]
            groupFk: [''],
            deleted: [''],
            groupFkNavigation:[''],
            inverseGroupFkNavigation:['']
        });

        this.modalButtonTitle='';
    }

    SetFormState(isEnable: boolean)
    {
        isEnable ? this.modalForm.enable() : this.modalForm.disable();
    }

    createData()
    {
        this.DB_Operation = CRUD_Operation.create;
        this.SetFormState(true);
        this.modalTitle = 'Create New ' + this.Table_Name ;
        this.modalButtonTitle = 'Save' ;
        this.modalForm.reset();  
    }

    editData(id: number)
    {
        this.DB_Operation = CRUD_Operation.update;
        this.SetFormState(true);
        this.modalTitle = 'Edit ' + this.Table_Name ;
        this.modalButtonTitle = 'Update' ;
        this.record = this.records.filter(x => x.idPk == id)[0];
        this.modalForm.setValue(this.record);
    }
}