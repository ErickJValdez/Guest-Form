import { LightningElement, api } from 'lwc';

export default class DetailsStep extends LightningElement {
    name ='';
    company = '';
    email = '';
    phone = '';

    street='';
    city='';
    country='';
    province='';
    postalcode='';

    detailsValues;
    @api updateDetailsValues;

    connectedCallback(){
        if(this.updateDetailsValues){
            this.updateDetails();
        }
    }

    updateDetails(){
        var tempFiles = JSON.parse(JSON.stringify(this.updateDetailsValues));
        this.detailsValues = tempFiles;

        this.name= this.detailsValues.name;
        this.company= this.detailsValues.company;
        this.email= this.detailsValues.email;
        this.phone=this.detailsValues.phone;
        this.street=this.detailsValues.street;
        this.city=this.detailsValues.city,
        this.country=this.detailsValues.country;
        this.province= this.detailsValues.province;
        this.postalcode=this.detailsValues.postalcode;
    }

    isInputValid() {
        let isValid = true;
        let requieredFields = this.template.querySelectorAll('.validate');
        requieredFields.forEach(inputField => {
            if(!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
            }
        });
        return isValid;
    }


    handleNext() {
        if( this.isInputValid()){
            this.dispatchEvent(new CustomEvent('next', {detail: this.detailsValues}));
        }
    }

    handleNameChange(event) {
        this.name = event.target.value;

        this.detailsValues = {
            name: this.name, company: this.company, email: this.email, phone: this.phone, street: this.street, city: this.city,
            country: this.country,province: this.province, postalcode: this.postalcode
            };
    }

    handleCompanyChange(event) {
        this.company = event.target.value;
        this.detailsValues = {
            name: this.name, company: this.company, email: this.email, phone: this.phone, street: this.street, city: this.city,
            country: this.country,province: this.province, postalcode: this.postalcode
            };
    }

    handleEmailChange(event) {
        this.email = event.target.value;
        this.detailsValues = {
            name: this.name, company: this.company, email: this.email, phone: this.phone, street: this.street, city: this.city,
            country: this.country,province: this.province, postalcode: this.postalcode
            };
    }
    
    handlePhoneChange(event) {
        this.phone = event.target.value;
        this.detailsValues = {
            name: this.name, company: this.company, email: this.email, phone: this.phone, street: this.street, city: this.city,
            country: this.country,province: this.province, postalcode: this.postalcode
            };
    }

    handleAddressChange(event) {
        this.street = event.target.street;
        this.city=event.target.city;
        this.country=event.target.country;
        this.province=event.target.province;
        this.postalcode=event.target.postalCode;

        this.detailsValues = {
            name: this.name, company: this.company, email: this.email, phone: this.phone, street: this.street, city: this.city,
            country: this.country,province: this.province, postalcode: this.postalcode
            };
    }
    
}