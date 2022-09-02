public with sharing class CustomFileUploadController {
    
    @AuraEnabled
    public static String uploadFile(List<Object> filesToInsert, String recordId) {

        if (!ContentVersion.SObjectType.getDescribe().isCreateable()){
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR,
            'Error: Insufficient Access'));
            return null;
         } 
        
        List<ContentVersion> lstVersionsToInsert = new List<ContentVersion>();

        ContentVersion cv;

        For(Object file : filesToInsert){
            FileWrapper fileData = (FileWrapper)JSON.deserialize(JSON.serialize(file), FileWrapper.class);

            cv = new ContentVersion();
            cv.Title = fileData.filename;
            cv.PathOnClient = '/' + fileData.filename;
            cv.FirstPublishLocationId = recordId;
            cv.VersionData = fileData.versionData;
            
            lstVersionsToInsert.add(cv);
        }

        try{
            insert lstVersionsToInsert;  
            
            return 'Files uploaded successfully!';

        } catch (Exception e){
            System.debug('An exception occurred: ' + e.getMessage());
        }
        
        return null;
    }


    //Wrapper Class
    public class FileWrapper{
        public String fileName;
        public Blob versionData;   
    }
}