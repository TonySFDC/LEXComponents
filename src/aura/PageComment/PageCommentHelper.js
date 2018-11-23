({
	showToast : function(title, message) {
        var toast = $A.get("e.force:showToast");
                toast.setParams({
                    "title": title,
                    "message": message,
                    "type": "success"
                });
		toast.fire();
	}
})