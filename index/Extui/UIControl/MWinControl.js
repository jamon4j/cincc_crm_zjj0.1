Ext.define('Extui.UIControl.MWinControl', {
	
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
 	
	},
	
	getXmlLoad:function(object){
		
		this.object = object;	
		
	},
	
	initParameter:function(){
		
		if( this.object != null ){
			
				this.formType = this.object.type;
								
				this.panelTitle =this.object.title;
				
				this.panelItem = this.object.panel;

				this.x = this.object.x;

				this.y = this.object.y;

				this.width = this.object.width || 837;
				
				this.height = this.object.height || 500;
		}
				
		this.formType = this.formType || "DefualtType";
		
		this.panelTitle = this.panelTitle || "新方Window界面";

	},
	
	refresh:function(record){
		
		console.info(record);
	
	},
		
	show:function(){
		
		var classname = "Extui.UIType.Win." + this.formType;

		var tag = Extui.UIControl.Util.createItemId("win");
				
		this.innerPanel = Ext.create(classname,{
			
			itemId	:this.panelItemId || tag.itemId,
			
			title		:this.panelTitle || "",
			
			alias 	:	tag.alias,

			x : this.x,
			y : this.y,

			width: this.width,
			
			height  : this.height
		});
		
		this.createBasicPanel();

		this.initAction(this.innerPanel);

		return this.innerPanel;
				
	},
	
	createBasicPanel:function(){
		
		for(var i=0;i<this.panelItem.length;i++){
			
			var v = this.panelItem[i];
			
			var tabpanel = this.innerPanel.down(" tabpanel");
										
			var str = v.control;
						
		    var o = Extui.UIControl.Util.getControlParameter(str);
		    
		  	var itemfile;
		  	
		  	if( o.file != null )
					itemfile = Extui.UIControl.Util.addLoadPath(o.file,this.loadFilePath);
			else
					itemfile = Extui.UIControl.Util.addLoadPath(o.arguments[2],this.loadFilePath);
						  	    
		    var c = "Extui.UIControl." + o.control;
		    
		    if( o.file != null)
		    	chandler = Ext.create(c,
    			{
    				xmlFile	:itemfile,
    								
    				panelTitle		:	v.title
    									
    			});    				
		    else
		    {
	    		config = {
	    			
	    				xmlFile	 : null,
	    												
	    				panelTitle		:	v.title,
	    				
	    				formType : o.arguments[1],
				
							itemFile : itemfile,
						
						labelWidth:v.labelWidth					
					};
					
					chandler = Ext.create(c,config);		
		  	}
		    
	        var tform = chandler.show();
	            
	    	chandler.refresh({});

			tabpanel.add(tform);
					  	
  	 		tabpanel.setActiveTab(tform);
  	  				  		
		}
				
	},

  	initAction:function(panel){
  	
			but = panel.down("button#wincancel");
			if( but != null )
				but.on("click",	this.cancelAC,	this);	
				
			but = panel.down("button#winsave");
			if( but != null )
					but.on("click",	this.saveAC,	this);
					
	},
  
	saveAC:function(button,e,options){
		
		var win = button.up("window");
		
		var v = win.down("form");

		if(!v.isValid()) {
			return false;
		};
		
		var input = v.getForm().getValues();
		
		console.info(input);

		win.close();		
		
  },
  
	cancelAC:function(button,e,options){
		
		var win = button.up("window");
		
		var v = win.down("form");
		
		var input = v.getForm().getValues();
		
		console.info(input);
 
    win.close();
    
  },
	
});