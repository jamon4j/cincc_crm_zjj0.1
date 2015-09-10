Ext.define('Extui.UIControl.PanelControl', {
	
	requires:["Extui.UIControl.Util"],
					  
	constructor : function(config) {
		
		var loadfile;
		this.object = null;
				
		if( typeof(config) == "object" )
		{
			
				Ext.apply(this,config);
				loadfile = config.xmlFile;
				
		}else
				loadfile = config;
				
		this.loadFilePath = Extui.UIControl.Util.getLoadPath(loadfile);

		console.info("win load file path :" + this.loadFilePath);

		if( loadfile != null )Extui.UIControl.Util.get(loadfile,this.getXmlLoad,this);
  	  	
  	this.initParameter();
  	
  	
  	this.createSub(this.panelItem);  	
  	
	},
	
	getXmlLoad:function(object){
		
		this.object = object;	
		
	},
	
	initParameter:function(){
		
		if( this.object != null ){
			
				this.formType = this.object.type;
								
				this.panelTitle =this.object.title;
				
				this.panelItem = this.object.panel;
		}
				
		this.formType = this.formType || "DefualtType";
		
		this.panelTitle = this.panelTitle || "新方From界面";

	},

	createSub:function(panel){
		
		this.subItems = [];
		
		for(var i=0;i<panel.length;i++){
			    	    	   
		    var o = Extui.UIControl.Util.getControlParameter(panel[i].control);
	    
	    	var c = "Extui.UIControl." + o.control;
	    	
	    	var itemfile = "";
	    
				if( o.file != null )
					itemfile = Extui.UIControl.Util.addLoadPath(o.file,this.loadFilePath);
				else
					itemfile = Extui.UIControl.Util.addLoadPath(o.arguments[2],this.loadFilePath);
	    
	    	var chandler;
	    
	    	if( o.file != null)chandler = Ext.create(c,itemfile);
	    	else
	    	{
	    		config = {
	    			
	    				formType : o.arguments[1],
				
							itemFile : itemfile	
					};
					
					chandler = Ext.create(c,config);		
	  		}
	  	
	    	this.subItems.push(chandler);
	    	
		}		
			
	},
		
	refresh:function(record){
		
		console.info(record);
	
	},
		
	show:function(){
		
		var classname = "Extui.UIType.Panel." + this.formType;

		var tag = Extui.UIControl.Util.createItemId("panel");
				
		this.innerPanel = Ext.create(classname,{
			
			itemId	:this.panelItemId || tag.itemId,
			
			title		:this.panelTitle || "",
			
			alias 	:	tag.alias

		});
		
		for( var i=0;i<this.subItems.length;i++){
			
			var c = this.subItems[i];
			
			var v = c.show();
			
			
			this.innerPanel.add(v);
				
			c.refresh(this.object.panel[i].init);
			
		}

		return this.innerPanel;
				
	},
	

  cancel:function(button,e,options){
		
		var v = button.up("window").down("form");
		var win = button.up("window");

		var input = v.getForm().getValues();
		
		console.info(input);
		
		win.close();

  }
	
});