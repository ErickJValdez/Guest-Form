import { LightningElement } from 'lwc';

export default class DetailsStep extends LightningElement {

    handleNext() {
        this.dispatchEvent(new CustomEvent('next'));
    }
    
}