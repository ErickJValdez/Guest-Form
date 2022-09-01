import { LightningElement, wire, api } from 'lwc';

import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Industry from '@salesforce/schema/Lead.Industry';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import LEAD_OBJECT from '@salesforce/schema/Lead';


export default class RequirementsStep extends LightningElement {

    description = '';
    industryValue = '';

    requirementValues;
    @api updateRequirementValues;

    options;

    @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
    LeadInfo;

    @wire(getPicklistValues,{recordTypeId: '$LeadInfo.data.defaultRecordTypeId', fieldApiName: Industry})
    IndustryValues({ error, data }) {
        if(data){
         this.options = data.values;
          return 
        }
        console.log(error);
      }
      
    connectedCallback(){
        if(this.updateRequirementValues){
            this.updateRequirement();
        }
    }

    updateRequirement(){
        var tempFiles = JSON.parse(JSON.stringify(this.updateRequirementValues));
        this.requirementValues = tempFiles;

        this.description=this.requirementValues.description;
        this.industryValue=this.requirementValues.industryValue;
    }
 
    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous', {detail: this.requirementValues}));
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent('next', {detail: this.requirementValues} ));
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
        this.requirementValues = {description: this.description, industryValue: this.industryValue};
    }

    handleIndustryChange(event) {
        this.industryValue = event.detail.value;
        this.requirementValues = {description: this.description, industryValue: this.industryValue};
    }
}