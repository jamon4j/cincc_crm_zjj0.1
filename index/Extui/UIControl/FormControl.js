﻿Ext.define('Extui.UIControl.FormControl', {
	
	extend  :"Extui.UIControl.BasicControl",
	
	requires	:	["Extui.UIControl.Util"],
	
	FormTypePath	:	"Extui.UIType.Form.",
	
	TypeControl			:"Form",
						  
	refresh:function(input){
		
		console.info(input);
		
		Extui.UIControl.Util.fillFormByData(this.innerPanel,input);
		
	},
	
/******************************   form button operation ***************************/
							
	saveAC:function(button,e,options){
		
		var v = button.up("form");
		
		if(!v.isValid()) {
			return false;
		};

		var input = v.getForm().getValues();
		
		console.info(input);
		
		this.itemControl.DbOperation("cancelAC",input);
		
  },
  
	savenoretAC:function(button,e,options){
		
		var v = button.up("form");

		var input = v.getForm().getValues();
		
		console.info(input);
		
		this.itemControl.DbOperation("cancelAC",input);
		
  },

	cancelAC:function(button,e,options){
		
		var v = button.up("form");

		var input = v.getForm().getValues();
		
		console.info(input);

		this.itemControl.DbOperation("cancelAC",input);
 
  },
  
  
	modifyAC:function(button,e,options){
		
		var v = button.up("form");

		var input = v.getForm().getValues();
		
		this.itemControl.DbOperation("cancelAC",input);
		
  },
  
  queryAC:function(button,e,options){
		
		var v = button.up("form");

		var input = v.getForm().getValues();
		
		console.info(input);
		
		this.itemControl.DbOperation("queryAC",input);

  },
  
  notifyAC:function(button,e,options){
		
		var v = button.up("form");

		var input = v.getForm().getValues();
		
		console.info(input);
		
		this.itemControl.notifyAC(input);		

  },

  transferAC:function(button,e,options){
		
		var v = button.up("form");

		var input = v.getForm().getValues();
		
		console.info(input);
		
//		this.itemControl.transferAC(input);		

  },

  sendsmsAC:function(button,e,options){
		
		var v = button.up("form");

		var input = v.getForm().getValues();
		
		console.info(input);
		
//		this.itemControl.transferAC(input);		

  }

  	
});