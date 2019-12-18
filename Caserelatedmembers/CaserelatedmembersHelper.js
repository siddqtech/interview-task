({
	getCaseMember : function(component,event) {
        var action = component.get("c.getcaseTeamMembers");
        action.setParams({ "get_caseid": component.get("v.accGetID") });
        action.setCallback( this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.teamMembers",response.getReturnValue());
                console.log('contacts'+component.get("v.teamMembers") );
            }
        });
        $A.enqueueAction(action);
	},
    getPicklistValu : function (component,event){
        var action = component.get("c.getPickListValuesIntoList");
        action.setParams({
            objectType: 'CaseToContactMapping__c',
            selectedField: 'CurrencyIsoCode'
        });
        action.setCallback(this, function(response) {
            var list = response.getReturnValue();
            component.set("v.picklistValues", list);
        })
        $A.enqueueAction(action);
    }
})