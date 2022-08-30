import { LightningElement, api, track } from 'lwc';
import uploadFile from '@salesforce/apex/CustomFileUploadController.uploadFile';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class UploadCustomFile extends LightningElement {
    showSpinner = false;
    @api recordId;
    filesName;
    @track filesData=[];
    countOfItems;

     // getting file 
    handleFileChange(event) {
        let files = event.target.files;
        console.log('The files length is: '+files.length);
        if(files.length > 0) {
            let filesName = '';
             for (let i = 0; i < files.length; i++) {
                console.log('The iterator value is: '+i);
                let file = files[i];

                filesName = filesName + file.name + ',';

                let reader = new FileReader();
                reader.onload = () => {
                    let base64 = 'base64,';
                    let content = reader.result.indexOf(base64) + base64.length;
                    let fileContents = reader.result.substring(content);
                    
                   this.countOfItems= this.filesData.push({
                        fileName: file.name,
                        versionData: fileContents,
                        recordId: this.recordId
                    }); 
                };
                reader.readAsDataURL(file);
                console.log('The count of items is:'+ this.countOfItems);
             }
             this.filesName = filesName.slice(0, -1);
        }
        console.log('The file data length in the handleFileChange is:'+ this.filesData.length);
        console.log('The files to be uploaded names are: '+this.filesName);
        console.log('The files data stringify objects are in the handleFileChange: '+ JSON.stringify(this.filesData));
        files = null;
    }
 
    uploadFileHandler() {
        this.handleSpinner(); 

        console.log('The files data length inside the uploadfileHandler is: '+ this.filesData.length);
        console.log('The files data stringify objects are in the uploadFileHandler: '+ JSON.stringify(this.filesData));

        uploadFile({ filesToInsert: this.filesData}).then(result=>{
            console.log(result);
            this.filesData = null;
            let title = this.filesName + 'uploaded successfully!!';
            this.filesName= null;
            this.ShowToast('Success!', title, 'success', 'dismissable');
            this.updateRecordView(this.recordId);
        }).catch(err=>{
            this.ShowToast('Error!!', err.body.message, 'error', 'dismissable');
        }).finally(() => {
          this.handleSpinner();
        })
    
    }

    removeFile(event) {
        var index = event.currentTarget.dataset.id;
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
}