
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap';

//import { Observable } from 'rxjs/Rx';
//import { Http } from "@angular/http";
//import { BsModalComponent } from 'ng2-bs3-modal';

import { IPetSize } from './../../models/petsize';
import { DBOperation } from './../../shared/db.enum';
import { Global } from './../../shared/global';

import { RestAPIService } from './../../shared/rest.service';
//import { ModalService } from './../../shared/modal.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'petsize',
    templateUrl: './petsize.component.html'
})
export class PetSizeComponent implements OnInit {

    page_title: string;

    //@ViewChild('modal')
    //modal: BsModalComponent;
    @ViewChild('childModal') public childModal: ModalDirective;

    records: IPetSize[];
    record: IPetSize;
    msg: string;
    indLoading: boolean = false;

    _dbOperation: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    inputForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private _restService: RestAPIService)
        //,private _modalService: ModalService) 
        { }

    ngOnInit(): void {

        this.page_title = 'Aquatic Animal Size';

        this.inputForm =  this.fb.group({
            idPk: -1,
            description: ['', Validators.required]
        });

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

    SetFormState(isEnable: boolean) {
        isEnable ? this.inputForm.enable() : this.inputForm.disable();
    }

    editData(id: number) {
        //this._dbOperation = DBOperation.update;
        //this.SetFormState(true);
        this.modalTitle = "Edit " + this.page_title;
        this.modalBtnTitle = "Update";
        //this.record = this.records.filter(x => x.idPk == id)[0];
        //this.inputForm.setValue(this.record);
        //this.modal.open();
        console.log("Edit Data : " + id);
    }

    openModal() {
        console.log("open Modal Component");
        //this._modalService.open(id);
        this.childModal.show();
    }

    closeModal() {
        this.childModal.hide();
        //this._modalService.close(id);
    }


    //onSubmit(formData: any) {
    //    this.msg = ""; // reset any previous message

    //    switch (this._dbOperation) {
    //        case DBOperation.create: break;

    //        case DBOperation.update: // Update Record

    //            this._restService.put(Global.PET_SIZE_ENDPOINT, formData._value.Id, formData._value)
    //                .subscribe( data => {
    //                    if (data == 1)  { //Success
    //                        this.msg = "Data successfully updated.";
    //                        this.LoadData();
    //                    }
    //                    else {
    //                        this.msg = "There is some issue in saving records, please contact to system administrator!"
    //                    }
    //                    this.modal.dismiss();
    //                },
    //                error => {
    //                    this.msg = error;
    //                }
    //            );
    //            break;
    //        case DBOperation.delete: break;

    //    }
    //}
}