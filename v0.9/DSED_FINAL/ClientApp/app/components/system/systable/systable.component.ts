
import { Component, Inject,  OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RestAPIService } from './../../service/restAPI.service';
import { API_url } from './../../shared/global';

import { SystemTable } from './../../model/system.table';

import { CRUD_Operation } from './../../shared/enum';

@Component({
    templateUrl: './systable.component.html',
    styleUrls: ['./systable.component.css']
})

export class SystemTableComponent implements OnInit {
    records: SystemTable[];
    record: SystemTable;

    groupFKs: SystemTable[];

    Table_Name:string  = 'System Table';
    DB_Operation: CRUD_Operation ;
    modalForm: FormGroup;
    modalTitle: string;
    modalButtonTitle: string;

    status: string ;
    _baseUrl: string ;

    constructor(@Inject('BASE_URL') baseUrl: string, 
                private _restAPIService: RestAPIService,
                private _formbuiler: FormBuilder ) {
        this._baseUrl = baseUrl ;
    }

    ngOnInit():void {
        this.modalForm = this._formbuiler.group({
            idPk: 0,
            value: '', //, Validators.required],
            text: '', //, Validators.required]
            groupFk: null,
            deleted: false
        });

        this.modalButtonTitle='';
        this.status='';
        this.loadData();
        this.loadGroupFk();
    }

    /* perform RETREIVE operation */
    loadData() : void
    {
        /*  Get all records for SYSTEM_TABLE*/
        this._restAPIService.get(this._baseUrl + API_url.SYSTEM_TABLE_ENDPOINT).subscribe(result => {
            this.records = result as SystemTable[];
        }, error => this.status = <any> error );//console.error(<any>error));
    }

    /* load GroupFk */
    loadGroupFk() : void
    {
        /*  Get all records for SYSTEM_TABLE*/
        this._restAPIService.get(this._baseUrl + API_url.GET_GROUP_FK).subscribe(result => {
            this.groupFKs = result as SystemTable[];
        }, error => this.status = <any> error );//console.error(<any>error)); 
    }

    SetFormState(isEnable: boolean)
    {
        isEnable ? this.modalForm.enable() : this.modalForm.disable();
    }

    /* display a create data modal dialog */
    createData()
    {
        this.loadGroupFk();
        
        console.log('groupFks :'+ JSON.stringify(this.groupFKs));

        this.DB_Operation = CRUD_Operation.create;
        this.SetFormState(true);
        this.modalTitle = 'Create New ' + this.Table_Name ;
        this.modalButtonTitle = 'Save' ;
    }

    /* display an edit/update data  modal dialog */
    editData(id: number)
    {
        this.loadGroupFk();
        //console.log('Edit Data');
        this.DB_Operation = CRUD_Operation.update;
        this.SetFormState(true);
        this.modalTitle = 'Edit ' + this.Table_Name ;
        this.modalButtonTitle = 'Update' ;
        this.record = this.records.filter(x => x.idPk == id)[0];
        this.modalForm.setValue(this.record);
    }

    /* display a delete data  modal dialog */
    deleteData(id: number)
    {
        this.DB_Operation = CRUD_Operation.delete;
        this.SetFormState(false);
        this.modalTitle = 'Confirm to Delete ?' ;//+ this.Table_Name ;
        this.modalButtonTitle = 'Delete' ;
        this.record = this.records.filter(x => x.idPk == id)[0];
        this.modalForm.setValue(this.record);
    }
    
    onSubmit(formData: any) {
        this.status = "";

        console.log('Submit form' + this.DB_Operation);
        console.log('fromData :'+ JSON.stringify(formData._value));

        switch(this.DB_Operation)
        {
            /* perform a CREATE operation */
            case CRUD_Operation.create: 
                this._restAPIService.post(
                    this._baseUrl + API_url.SYSTEM_TABLE_ENDPOINT,
                    formData._value
                ).subscribe(
                    data => {
                        if(data==1) // Success operation
                        {
                            this.status = "Data has been created sucessfully.";
                            
                        }
                        else
                        {
                            this.status = "There is some issue in updating data, please contact to system administrator!"
                        }
                    },
                    error => {
                        this.status = <any> error ;
                    }
                );            
                break;

            /* perform a UPDATE operation */
            case CRUD_Operation.update: 
                this._restAPIService.put(
                    this._baseUrl + API_url.SYSTEM_TABLE_ENDPOINT,
                    formData._value.idPk,
                    formData._value
                ).subscribe(
                    data => {
                        if(data==1) // Success operation
                        {
                            this.status = "Data has been updated sucessfully.";
                            
                        }
                        else
                        {
                            this.status = "There is some issue in updating data, please contact to system administrator!"
                        }
                    },
                    error => {
                        this.status = <any> error ;
                    }
                );
                break;
            
            /* perform a DELETE operation */
            case CRUD_Operation.delete: 
  
                this._restAPIService.delete(
                    this._baseUrl + API_url.SYSTEM_TABLE_ENDPOINT,
                    formData._value.idPk
                ).subscribe(
                    data => {
                        if(data==1) // Success operation
                        {
                            this.status = "Data has been deleted sucessfully.";
                            
                        }
                        else
                        {
                            this.status = "There is some issue in updating data, please contact to system administrator!"
                        }
                    },
                    error => {
                        this.status = <any> error ;
                    }
                );            

                break;            
        }
        this.loadData();
    }

}