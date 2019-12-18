public class findcasebyid {
    @AuraEnabled
    public static LF_Case__c find_AccById(Id get_caseid) {
        try{
            if(get_caseid != null ) {
                return [SELECT Id, Name,Case_Number__c ,Type__c,Start_Date__c,End_Date__c from LF_Case__c where ID = :get_caseid];
            }
            else{
                return [SELECT ID,  Name,Case_Number__c ,End_Date__c from LF_Case__c LIMIT 1];
            } 
        } catch (Exception ex){
            System.debug('Error'+ ex.getStackTraceString()); return null;
        }
    }
    @AuraEnabled
    public static void createRecord (CaseToContactMapping__c CaseToContactMapping){
        
        try{
            System.debug('Create'+CaseToContactMapping);
            
            if(CaseToContactMapping != null){
                insert CaseToContactMapping;
            }
            
        } catch (Exception ex){
            System.debug('Error'+ ex.getStackTraceString()+'Msg'+ ex.getMessage() );
        }
        
    }  
     @AuraEnabled
    public static List<contact> getcaseTeamMembers (Id get_caseid){
        List<contact> lstcont = new  List<contact>();
        try{
            List<String> contactId =new List<String>();
            List<CaseToContactMapping__c> ctcm = [SELECT id,Contact__c from CaseToContactMapping__c where LF_Case__c =:get_caseid order By Priority__c ASC ];
            if(ctcm.size() > 0)
            {
                for(CaseToContactMapping__c obj : ctcm)
                {
                  contactId.add(obj.Contact__c);  
                }
            }
            if(contactId.size() > 0)
            {
              lstcont = [SELECT id,Name,Email, Phone from Contact where Id In:contactId ];  
            }
        } catch (Exception ex){
            System.debug('Error'+ ex.getStackTraceString());
        }
        return lstcont;
    }  
    @AuraEnabled        
    public static List<String> getPickListValuesIntoList(String objectType, String selectedField){
        List<String> pickListValuesList = new List<String>();
        Schema.SObjectType convertToObj = Schema.getGlobalDescribe().get(objectType);
        Schema.DescribeSObjectResult res = convertToObj.getDescribe();
        Schema.DescribeFieldResult fieldResult = res.fields.getMap().get(selectedField).getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getValue());
        }     
        return pickListValuesList;
    }
        
     
}