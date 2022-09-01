import { LightningElement, api } from 'lwc';
import createLead from '@salesforce/apex/LeadCreationController.createLead';
import uploadFile from '@salesforce/apex/CustomFileUploadController.uploadFile';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class GuestForm extends LightningElement {

    showSpinner = false;

    showDetails=true;
    showRequirements = false;
    showFileUploader = false;
    
    filesData=[];
    detailsValues;
    requirementValues;

    handleNextOfDetails(arg) {
        this.showDetails = false;
        this.showRequirements = true;

        const dData = arg.detail;
        this.detailsValues = dData;
    }

    handleNextOfRequirements(arg) {
        this.showRequirements = false;
        this.showFileUploader = true;

        
        const rData = arg.detail;
        this.requirementValues = rData;
    }

    handlePreviousOfRequirements(arg) {
        this.showDetails = true;
        this.showRequirements = false;

           
        const rData = arg.detail;
        this.requirementValues = rData;
    }

    handlePreviousOfUploader(arg) {
        this.showFileUploader = false;
        this.showRequirements = true;

        const fData = arg.detail;
        this.filesData = fData;
    }

    handleSaveOfUploader(arg) {
        const fData = arg.detail;
        this.filesData = fData;

        this.createLeadRecord();

    }

    createLeadRecord() {
        this.handleSpinner();

        createLead({ details: this.detailsValues, requirements: this.requirementValues}).then(result=>{
            console.log(result);
            this.uploadFilesToLead(result);
        }).catch(err=>{
            this.ShowToast('Error!!', err.body.message, 'error', 'dismissable');
        })
    }

    uploadFilesToLead(recId) {
        let rId=recId;
        uploadFile({ filesToInsert: this.filesData, recordId: rId}).then(result=>{
            console.log(result);
            this.filesData = null;
            this.detailsValues = null;
            this.requirementValues = null;
            let title = 'Lead Created Succesfully with Files Uploaded';
            this.ShowToast('Success!', title, 'success', 'dismissable');
            this.updateRecordView(recId);
        }).catch(err=>{
            this.ShowToast('Error!!', err.body.message, 'error', 'dismissable');
        }).finally(() => {
          this.handleSpinner();
        })
    }

    handleSpinner(){
        this.showSpinner = !this.showSpinner;
    }

    ShowToast(title, message, variant, mode){
        const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    } 
 
    //update the record page
    updateRecordView() {
       setTimeout(() => {
            eval("$A.get('e.force:refreshView').fire();");
       }, 1000); 
    }
 

}