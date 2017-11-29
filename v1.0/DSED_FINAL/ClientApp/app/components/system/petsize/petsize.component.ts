
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Observable } from 'rxjs/Rx';
import { Http } from "@angular/http";
import { BsModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { IPetSize } from './../../models/petsize';
import { DBOperation } from './../../shared/db.enum';
import { Global } from './../../shared/global';

import { RestAPIService } from './../../shared/rest.service';

@Component({
    selector: 'petsize',
    templateUrl: './petsize.component.html'
})
export class PetSizeComponent implements OnInit {

    @ViewChild('modal') modal: BsModalComponent;
    records: IPetSize[];
    record: IPetSize;
    msg: string;
    indLoading: boolean = false;

    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    _form: FormGroup;


    constructor(private fb: FormBuilder,
        private _restService: RestAPIService) {}

    ngOnInit(): void {

        this._form =  this.fb.group({
            idPk: [''],
            description: ['', Validators.required]
        });

        //console.log("Pet Size compontent has loaded !!!");
        this.LoadData();

    }

    LoadData(): void {
        this.indLoading = true;
        this._restService.get( Global.PET_SIZE_ENDPOINT + 'GetSizes')
            .subscribe((records) => { this.records = records as IPetSize[] ; this.indLoading = false; },
            error => this.msg = <any>error);

        //this._http.get(this._baseUrl + 'api/MarineSizes/GetSizes').subscribe(result => {
        //    this.records = result.json() as IPetSize[];
        //    this.indLoading = false;
        //}, error => console.error(error));

    }
}