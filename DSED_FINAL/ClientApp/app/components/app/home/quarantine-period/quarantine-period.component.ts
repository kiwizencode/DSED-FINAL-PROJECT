
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import * as moment from 'moment';

/* Following Angular pipe format date according rto locale rules
   https://angular.io/api/common/DatePipe */
import { DatePipe } from '@angular/common';

import { RestAPIService } from './../services/rest.api.service';
import { REST_API_URI } from './../services/rest.api.uri';
import { CRUD_Operation } from './../services/db.operation.enum';

import { QurantinePeriod } from './../models/quarantine-period';

@Component({  
    templateUrl: './quarantine-period.component.html'
})
export class QuarantinePeriodComponent implements OnInit {
    
    pageTitle: string = 'Quarantine Periods';

    alldata : QurantinePeriod [];
    data : QurantinePeriod ;

    DB_Operation: CRUD_Operation ;
    
    modalForm: FormGroup;
    modalFormTitle: string;
    modalButtonTitle: string;

    constructor( @Inject('BASE_URL') private baseUrl: string, 
                    private restAPIService: RestAPIService,
                    private formbuilder: FormBuilder ) {}

    ngOnInit(): void {
        /* Initialize input data form */
        this.modalForm = this.formbuilder.group({
            idPk: [""],
            startDate: ["", Validators.required],
            text: ["", Validators.required],
            closedDate: [""],
            closedFlag: [""],
            quarantineTank:[""]
        });

        this.modalButtonTitle='N/D';

        this.loadData();
    }
    
    /* perform RETREIVE data operation. */
    loadData() : void {
        this.restAPIService.get(this.baseUrl + REST_API_URI.QUARANTINE_PERIODS).subscribe(result => {
            this.alldata = result as QurantinePeriod[];
        }, error => console.error(<any>error) );
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

        this.modalFormTitle = 'Create New ' + this.pageTitle ;
        this.modalButtonTitle = 'Save' ;

        this.modalForm.reset();
        this.SetFormState(true);
    }

    /* display an edit/update data  modal dialog */
    editData(id: number)
    {
        this.DB_Operation = CRUD_Operation.update;
        
        this.modalFormTitle = 'Edit ' + this.pageTitle ;
        this.modalButtonTitle = 'Update' ;

        this.data = this.alldata.filter(x => x.idPk == id)[0];
        this.modalForm.setValue(this.data);
        this.SetFormState(true);

        console.log('[Create] : '+JSON.stringify(this.data));

    }

    /* display a delete data  modal dialog */
    deleteData(id: number)
    {
        this.DB_Operation = CRUD_Operation.delete;
        
        this.modalFormTitle = 'Confirm to Delete?' ;
        this.modalButtonTitle = 'Delete' ;

        this.data = this.alldata.filter(x => x.idPk == id)[0];
        this.modalForm.setValue(this.data);
        this.SetFormState(false);
    }

    onSubmit(formData: any){
        switch(this.DB_Operation)
        {
            /* perform a CREATE operation */
            case CRUD_Operation.create: 
            
                formData._value.idPk = -1;
                formData._value.closedFlag = false;
                console.log('[Create] : '+JSON.stringify(formData._value));
                this.restAPIService.post(
                    this.baseUrl + REST_API_URI.QUARANTINE_PERIODS,
                    formData._value
                ).subscribe(
                    data => {
                        /*
                        if(data==1) // Success operation
                        {
                            //this.status = "Data has been created sucessfully.";
                            console.log("Data has been created sucessfully.");
                        }
                        else
                        {
                            //this.status = "There is some issue in updating data, please contact to system administrator!"
                            console.log("There is some issue in updating data, please contact to system administrator!");
                        }*/
                        this.loadData();
                    },
                    error => console.error(<any>error) 
                );        
                break;            
        
            /* perform a UPDATE operation */
            case CRUD_Operation.update: 
        
                console.log('[Update] : '+JSON.stringify(formData._value));

                this.restAPIService.put(
                    this.baseUrl + REST_API_URI.QUARANTINE_PERIODS,
                    formData._value.idPk,
                    formData._value
                ).subscribe(
                    data => {
                        /*
                        if(data==1) // Success operation
                        {
                            console.log("Data has been created sucessfully.");
                        }
                        else
                        {
                            console.log("There is some issue in updating data, please contact to system administrator!");
                        }*/
                        this.loadData();
                    },
                    error => console.error(<any>error)
                );
                break;
                    /* perform a DELETE operation */
            case CRUD_Operation.delete: 

                this.restAPIService.delete(
                    this.baseUrl + REST_API_URI.QUARANTINE_PERIODS,
                    formData._value.idPk
                ).subscribe(
                    data => {
                        /*
                        if(data==1) // Success operation
                        {
                            console.log("Data has been created sucessfully.");
                        }
                        else
                        {
                            console.log("There is some issue in updating data, please contact to system administrator!");
                        }*/
                        this.loadData();
                    },
                    error => console.error(<any>error)
                );            

                break;      
        }    
             
    }    
}
//selector: '',
// ,
//styleUrls: ['./quarantine-period.component.css']