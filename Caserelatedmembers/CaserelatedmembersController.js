({
    doInitAction : function(component, event, helper) {
        var action = component.get("c.find_AccById");
        action.setParams({ "get_caseid": component.get("v.accGetID") });
        action.setCallback( this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.ac", response.getReturnValue());
                console.log(response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        helper.getCaseMember(component, event);
        helper.getPicklistValu(component, event);
    },
    handleComponentEvent: function(component, event, helper) {
        
      component.set('v.CaseToContactMapping.Contact__c', event.getParam("contactId"));
    },
    handleComponentEventcase: function(component, event, helper) {
        
      component.set('v.CaseToContactMapping.LF_Case__c', event.getParam("caseId"));
    },
    openmodal :  function(component, event, helper) {
        component.set('v.isOpen',true);
    },
    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpen", false);
    },
    create : function(component, event, helper) {
        console.log('Create record');
        
        //getting the candidate information
        var CaseToContactMapping = component.get("v.CaseToContactMapping");
          console.log('sda record'+JSON.stringify(CaseToContactMapping));
        
        //Calling the Apex Function
        var action = component.get("c.createRecord");
        
        //Setting the Apex Parameter
        action.setParams({
            CaseToContactMapping : CaseToContactMapping
        });
        
        //Setting the Callback
        action.setCallback(this,function(a){
            //get the response state
            var state = a.getState();
            
            //check if result is successfull
            if(state == "SUCCESS"){
                //Reset Form
                var newCandidate = {'sobjectType': 'CaseToContactMapping__c'
                                    
                                   };
                component.set("v.selectedLookUpRecordcontact",{});
                component.set("v.selectedLookUpRecordcase",{});
                //resetting the Values in the form
                component.set("v.CaseToContactMapping",newCandidate);
                
                alert('Record is Created Successfully');
              component.set("v.isOpen", false);  
                helper.getCaseMember(component, event);
            } else if(state == "ERROR"){
                alert('Error in calling server side action');
            }
        });
        
        //adds the server-side action to the queue        
        $A.enqueueAction(action);
        
    }
})