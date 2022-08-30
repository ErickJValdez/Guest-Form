public with sharing class CustomFileUploadController {
    
    @AuraEnabled
    public static String uploadFile(List<Object> filesToInsert) {
        List<ContentVersion> lstVersionsToInsert = new List<ContentVersion>();

        For(Object file : filesToInsert){
            FileWrapper fileData = (FileWrapper)JSON.deserialize(JSON.serialize(file), FileWrapper.class);

            ContentVersion cv = new ContentVersion();
            cv.Title = fileData.filename;
            cv.PathOnClient = '/' + fileData.filename;
            cv.FirstPublishLocationId = fileData.recordId;
            cv.VersionData = fileData.versionData;
            lstVersionsToInsert.add(cv);
        }
        insert lstVersionsToInsert;
        return 'Files uploaded successfully!';
    }


    //Wrapper Class
    public class FileWrapper{
        @AuraEnabled
        public String fileName;
        @AuraEnabled
        public Blob versionData;   
        @AuraEnabled
        public String recordId;       
    }
}
