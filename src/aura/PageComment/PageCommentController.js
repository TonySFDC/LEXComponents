({
    doInit : function(component, event, helper) {
        // Prepare a new record from template
        component.find("PageCommentRecordCreator").getNewRecord(
            "Page_Comment__c", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newPC");
                var error = component.get("v.newPCError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                // Object.getOwnPropertyNames(rec)
                console.log("Record template initialized: " + JSON.stringify(rec));
                
                var sPageURL = window.location.href;
                console.log("Current page: "+sPageURL);
                component.set("v.simpleNewPC.Page_URL__c", sPageURL);
                
                var userId = $A.get("$SObjectType.CurrentUser.Id");
                component.set("v.simpleNewPC.User__c", userId);
            })
        );
    },
    
    handleSavePC: function(component, event, helper) {
        component.find("PageCommentRecordCreator").saveRecord(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                $A.get("e.force:closeQuickAction").fire();
                helper.showToast("Saved", "The record was saved.")
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        });
    }
})