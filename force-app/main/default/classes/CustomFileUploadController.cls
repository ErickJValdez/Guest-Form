public without sharing class CustomFileUploadController {
    
    @AuraEnabled
    public static String uploadFile(List<Object> filesToInsert, String recordId) {
        List<ContentVersion> lstVersionsToInsert = new List<ContentVersion>();

        For(Object file : filesToInsert){
            FileWrapper fileData = (FileWrapper)JSON.deserialize(JSON.serialize(file), FileWrapper.class);

            ContentVersion cv = new ContentVersion();
            cv.Title = fileData.filename;
            cv.PathOnClient = '/' + fileData.filename;
            cv.FirstPublishLocationId = recordId;
            cv.VersionData = fileData.versionData;
            lstVersionsToInsert.add(cv);
        }
        try{
            insert lstVersionsToInsert;          
        } catch (Exception e){
            System.debug('An exception occurred: ' + e.getMessage());
        }
        
        return 'Files uploaded successfully!';
    }


    //Wrapper Class
    public class FileWrapper{
        public String fileName;
        public Blob versionData;   
    }
}