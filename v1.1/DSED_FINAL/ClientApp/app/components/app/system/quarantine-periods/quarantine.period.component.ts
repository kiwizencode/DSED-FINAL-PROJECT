import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { DatePickerModule } from 'ng2-datepicker-bootstrap';
//import { DatepickerModule } from 'angular2-material-datepicker';

/* Following Angular pipe format date according rto locale rules
   https://angular.io/api/common/DatePipe */
import { DatePipe } from '@angular/common';

/* Rest API Service and related file */
import { API_url } from './../../shared/api.url';
import { CRUD_Operation } from './../../shared/enum';
import { RestAPIService } from './../../service/restAPI.service';

/* Modal class */
import { QurantinePeriod } from './../../model/quarintine.period';

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
            idPk: Number,
            startDate: '', //, Validators.required],
            text: String, //, Validators.required]
            closedDate: null,
            closedFlag: false
        });
        /*
        this.modalForm.valueChanges.subscribe( value => 
            this.release = new QurantinePeriod(
                value.idPk,value.startDate, value.text,value.closedDate, value.closedFlag
            )
        );
        */

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

        /* format the date into */
        //var dateTemp = new DatePipe('en-US');
        //this.modalForm.value.startDate = dateTemp.transform(this.modalForm.value.startDate,'yyyy-MM-dd') as string;
        //let new_date = dateTemp.transform(this.modalForm.value.startDate,'yyyy-MM-dd');
        //this.modalForm.setValue({startDate:this.record.startDate.getDate});
        console.log('Start Date =>'+this.modalForm.value.startDate);

        //console.log('DEBUG [modalForm]\n==>'+JSON.stringify(this.modalForm.value));
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
}