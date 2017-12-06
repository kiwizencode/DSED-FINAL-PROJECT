import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { DatePickerModule } from 'ng2-datepicker-bootstrap';
//import { DatepickerModule } from 'angular2-material-datepicker';

import { DateValueAccessorModule } from 'angular-date-value-accessor';

/* Following Angular pipe format date according rto locale rules
   https://angular.io/api/common/DatePipe */
import { DatePipe } from '@angular/common';

/* Rest API Service and related file */
import { API_url } from './../../shared/api.url';
import { CRUD_Operation } from './../../shared/enum';
import { RestAPIService } from './../../service/restAPI.service';

/* Modal class */
import { QurantinePeriod } from './../../model/quarintine.period';
//import { ViewChild } from '@angular/core/src/metadata/di';

@Component({
    selector:'quarantine-period',
    templateUrl: './quarantine.period.component.html'
})
export class QuarantinePeriodComponent implements OnInit {
    pageTitle: string = 'Quarantine Periods'

    records: QurantinePeriod[];
    record: QurantinePeriod;
    //release: QurantinePeriod;

    //Table_Name:string  = 'System Table';
    DB_Operation: CRUD_Operation ;
    modalForm: FormGroup;
    modalTitle: string;
    modalButtonTitle: string;
    
    /* Display information back to user. */
    status: string ;

    constructor(@Inject('BASE_URL') private baseUrl: string, 
                    private _restAPIService: RestAPIService,
                    private _formbuiler: FormBuilder ) {
    }

    ngOnInit() : void {

        /* Initialize input data form */
        this.modalForm = this._formbuiler.group({
            idPk: [''],
            startDate: [''], //, Validators.required],
            text: [''], //, Validators.required]
            closedDate: [''],
            closedFlag: [false]
        });

        this.modalButtonTitle='To-be-defined';
        this.status='';

        this.loadData();
    }

    /* perform RETREIVE data operation. */
    loadData() : void
    {
        /*  Get all records for SYSTEM_TABLE*/
        this._restAPIService.get(this.baseUrl + API_url.QUARANTINE_PERIODS).subscribe(result => {
            this.records = result as QurantinePeriod[];
        }, error => this.status = <any> error );//console.error(<any>error));
    }

    /* set the state of the input data form */
    SetFormState(isEnable: boolean)
    {
        isEnable ? this.modalForm.enable() : this.modalForm.disable();
    }
    
    /* display a create data modal dialog */
    createData()
    {

        this.DB_Operation = CRUD_Operation.create;
        this.SetFormState(true);
        this.modalTitle = 'Create New ' + this.pageTitle ;
        this.modalButtonTitle = 'Save' ;

        /*
        this.record = this.records.filter(x => x.idPk == 0)[0];
        */
        this.record.idPk=0;
        this.record.startDate=new Date();
        this.record.text='';
        this.record.closedDate=new Date();
        this.record.closedFlag=false;
        this.modalForm.reset();
        this.modalForm.setValue(this.record);
    }  
    
    /* display an edit/update data  modal dialog */
    editData(id: number)
    {
        this.DB_Operation = CRUD_Operation.update;
        this.SetFormState(true);
        this.modalTitle = 'Edit ' + this.pageTitle ;
        this.modalButtonTitle = 'Update' ;
        this.record = this.records.filter(x => x.idPk == id)[0];

        //console.log('DEBUG data ==>'+JSON.stringify(this.record));
        this.modalForm.setValue(this.record);

    }

    /* display a delete data  modal dialog */
    deleteData(id: number)
    {
        this.DB_Operation = CRUD_Operation.delete;
        this.SetFormState(false);
        this.modalTitle = 'Confirm to Delete?' ;
        this.modalButtonTitle = 'Delete' ;
        this.record = this.records.filter(x => x.idPk == id)[0];
        this.modalForm.setValue(this.record);
    }

    onSubmit(formData: any){
        this.status;

        switch(this.DB_Operation)
        {
            /* perform a CREATE operation */
            case CRUD_Operation.create: 

                console.log('[modalForm] : '+JSON.stringify(formData._value));
            /*
            this._restAPIService.post(
                this.baseUrl + API_url.QUARANTINE_PERIODS,
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
            ); */            
            break;
            
            /* perform a UPDATE operation */
            case CRUD_Operation.update: 
                this._restAPIService.put(
                    this.baseUrl + API_url.QUARANTINE_PERIODS,
                    formData._value.idPk,
                    formData._value
                ).subscribe(
                    data => {
                        if(data==1) // Success operation
                        {
                            this.status = "Data has been updated sucessfully.";
                            this.loadData();
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
    }    
}