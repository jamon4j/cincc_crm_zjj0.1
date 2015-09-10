Ext.define('Extui.UIControl.WinControl', {
	
	extend  :"Extui.UIControl.BasicControl",
	
	requires:["Extui.UIControl.Util"],
	
	FormTypePath	:	"Extui.UIType.Win.",
	
	TypeControl		:"Win",
					  
	refresh:function(input){
	
	    console.info(input);
		
		var form = this.innerPanel.down("form");
		
		fillData2Form(form,input);
	
	},
		
	
/******************************   form button operation ***************************/
		
	saveAC:function(button,e,options){
		
		var win = button.up("window");
		
		var v = win.down("form");
		
		if(!v.isValid()) {
			return false;
		};

		var input = v.getForm().getValues();
		
		console.info(input);
		
		this.itemControl.DbOperation("saveAC",input);

    	win.close();
		
  },
  
	savenoretAC:function(button,e,options){
		
		var win = button.up("window");
		
		var v = win.down("form");

		var input = v.getForm().getValues();
		
		console.info(input);
		
		this.itemControl.DbOperation("saveAC",input);
		
  },
  
	cancelAC:function(button,e,options){
		
		var win = button.up("window");
		
		var v = win.down("form");
		
		var input = v.getForm().getValues();
		
		console.info(input);

		this.itemControl.DbOperation("cancelAC",input);
 
    win.close();
    
  },
  
  
	modifyAC:function(button,e,options){
		
		var win = button.up("window");
		
		var v = win.down("form");
		
		var input = v.getForm().getValues();
		
		this.itemControl.DbOperation("modifyAC",input);

    win.close();
		
  },
  
  queryAC:function(button,e,options){
		
		var win = button.up("window");
		
		var v = win.down("form");
		
		var input = v.getForm().getValues();
		
		console.info(input);
		
		this.itemControl.DbOperation("queryAC",input);

    win.close();

  },
  
  notifyAC:function(button,e,options){
		
		var win = button.up("window");
		
		var v = win.down("form");
		
		var input = v.getForm().getValues();
		
		console.info(input);
		
    win.close();

		this.itemControl.notifyAC(input);		

  },

  transferAC:function(button,e,options){
		
		var win = button.up("window");
		
		var v = win.down("form");
		
		var input = v.getForm().getValues();
		
		console.info(input);
		
//		this.itemControl.transferAC(input);		

  },

  sendsmsAC:function(button,e,options){
		
		var win = button.up("window");
		
		var v = win.down("form");
		
		var input = v.getForm().getValues();
		
		console.info(input);
		
//		this.itemControl.transferAC(input);		

  }
  	
});