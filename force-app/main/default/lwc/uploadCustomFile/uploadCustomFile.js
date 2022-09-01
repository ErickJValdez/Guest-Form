import { LightningElement, api, track } from 'lwc';
export default class UploadCustomFile extends LightningElement {
    
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
                    }); 
                };
                reader.readAsDataURL(file);
             }
        }
        files = null;
    }

    removeFile(event) {
        let index = event.currentTarget.dataset.id;
        this.filesData.splice(index, 1);
    }

    //logic Guest Form
    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous', {detail: this.filesData}));
    }

    handleSave() {
        this.dispatchEvent(new CustomEvent('save',{detail: this.filesData}));
    }

}