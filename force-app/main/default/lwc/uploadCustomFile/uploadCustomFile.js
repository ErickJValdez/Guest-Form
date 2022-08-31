import { LightningElement, api, track } from 'lwc';
import uploadFile from '@salesforce/apex/CustomFileUploadController.uploadFile';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class UploadCustomFile extends LightningElement {
    showSpinner = false;
    @api recordId;
    
    @track filesData=[];
    
    @api updateFilesData=[];


    connectedCallback(){
        if(this.updateFilesData.length>0){
            this.updateFilesValues();
        }
    }

    updateFilesValues(){
        var tempFiles = JSON.parse(JSON.stringify(this.updateFilesData));
        this.filesData = tempFiles;
    }

     // getting file 
    handleFileChange(event) {
        let files = event.target.files;
        if(files.length > 0) {
             for (let i = 0; i < files.length; i++) {
                let file = files[i];

                let reader = new FileReader();
                reader.onload = () => {
                    let base64 = 'base64,';
                    let content = reader.result.indexOf(base64) + base64.length;
                    let fileContents = reader.result.substring(content);
                    
                  this.filesData.push({
                        fileName: file.name,
                        versionData: fileContents,
                        recordId: this.recordId
                    }); 
                };
                reader.readAsDataURL(file);
             }
        }
        files = null;
    }
 
    uploadFileHandler() {
        this.handleSpinner();

        uploadFile({ filesToInsert: this.filesData}).then(result=>{
            console.log(result);
            this.filesData = null;
            let title = 'Files uploaded successfully!!';
            this.ShowToast('Success!', title, 'success', 'dismissable');
            this.updateRecordView(this.recordId);
        }).catch(err=>{
            this.ShowToast('Error!!', err.body.message, 'error', 'dismissable');
        }).finally(() => {
          this.handleSpinner();
        })
    }

    removeFile(event) {
        let index = event.currentTarget.dataset.id;
        this.filesData.splice(index, 1);
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


    //logic Guest Form
    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous', {detail: this.filesData}));
    }

    handleSave() {
        this.dispatchEvent(new CustomEvent('save'));
    }

}