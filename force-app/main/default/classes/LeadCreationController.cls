public without sharing class LeadCreationController {

    @AuraEnabled
    public static String createLead(Object details, Object requirements) {
        DetailWrapper detailData = (DetailWrapper)JSON.deserialize(JSON.serialize(details), DetailWrapper.class);
        RequirementWrapper requirementData = (RequirementWrapper)JSON.deserialize(JSON.serialize(requirements), RequirementWrapper.class);

        Lead nLead = new Lead();

        nLead.LastName = detailData.name;
        nLead.Company = detailData.company;
        nLead.Email = detailData.email;
        nLead.Phone= detailData.phone;
        nLead.street = detailData.street;
        nLead.City= detailData.city;
        nLead.Country= detailData.country;
        nLead.State=detailData.province;
        nLead.PostalCode=detailData.postalcode;

        nLead.Description = requirementData.description;
        nLead.Industry = requirementData.industryValue;

        try{
            insert nLead;
            
        } catch (Exception e){
            System.debug('An exception occurred: ' + e.getMessage());
        }
        
        return String.valueOf(nLead.Id);
    }


    //Wrapper Class
    public class DetailWrapper{
        public String name;
        public String company;   
        public String email;
        public String phone;
        public String street;
        public String city;
        public String country;
        public String province;
        public String postalcode;
    }

    //Wrapper Class
    public class RequirementWrapper{
        public String description;
        public String industryValue;      
    }
}
