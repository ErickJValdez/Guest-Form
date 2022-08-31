import { LightningElement, api } from 'lwc';

export default class GuestForm extends LightningElement {

    showDetails=true;
    showRequirements = false;
    showFileUploader = false;

    
   filesData=[];

    page = 1;



    handleNextOfDetails() {
        this.showDetails = false;
        this.showRequirements = true;
        this.page = this.page + 1;
    }

    handleNextOfRequirements() {
        this.showRequirements = false;
        this.showFileUploader = true;

        this.page = this.page + 1;
    }

    handlePreviousOfRequirements() {
        this.showDetails = true;
        this.showRequirements = false;
        
        if (this.page > 1) {
            this.page = this.page - 1;
        }
    }

    handlePreviousOfUploader(event) {
        this.showFileUploader = false;
        this.showRequirements = true;

        const fData = event.detail;
        this.filesData = fData;

        if (this.page > 1) {
            this.page = this.page - 1;
        }
    }


    handleSaveOfUploader() {
        this.page = this.page + 1;
    }

}