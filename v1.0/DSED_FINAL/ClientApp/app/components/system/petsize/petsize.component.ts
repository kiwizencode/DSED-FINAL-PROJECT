
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
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
    userFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    //constructor(private fb: FormBuilder,
    //    private _restService: RestAPIService,
    //    private _http:Http) { }

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/MarineSizes/GetSizes').subscribe(result => {
            this.records = result.json() as IPetSize[];
        }, error => console.error(error));
    }

    ngOnInit(): void {

        //this.userFrm = this.fb.group({
        //    idPk: [''],
        //    desription: ['', Validators.required]
        //});
        console.log("Pet Size compontent has loaded !!!");
        //this.LoadData();
        //this.indLoading = false;
    }

    /* 
    LoadData(): void {
        this.indLoading = true;
        //this._restService.get(Global.PET_SIZE_ENDPOINT +'GetSizes')
        //    .subscribe(records => { this.records = records; this.indLoading = false; },
        //    error => this.msg = <any>error);

        var url = "http://localhost:42000/api/MarineSizes/GetSizes";
        this.records = [];

        this._http.get(url).subscribe(
            (response) => {
                //var json_text = response.json();
                this.records = response.json();
                this.indLoading = false;
            },
            (response) => {
                this.msg = "Request failed.";
            }
        );
    }*/
}