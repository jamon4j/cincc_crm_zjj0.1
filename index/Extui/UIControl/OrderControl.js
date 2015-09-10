Ext.define('Extui.UIControl.OrderControl', {
	
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

		if( loadfile != null )Extui.UIControl.Util.get(loadfile,this.getXmlLoad,this);
  	  	
  	this.initParameter();
		
		this.callParent();			 		
	},
	
	getXmlLoad:function(object){
		
		this.object = object;	
		
	},

	initParameter:function(){
		
		if( this.object != null ){
			
				this.formType = this.object.type;
				
				this.basicPanel = this.object.basicpanel;
							
				this.actionPanel= this.object.actpanel;
				
				this.panelTitle =this.object.title;

		}
		
		this.basicPanel = this.basicPanel || {};
							
		this.actionPanel= this.actionPanel || {};		
		
		this.formType = this.formType || "DefualtType";
					
		this.panelTitle = this.panelTitle || "新方 Grid 界面";

	},
		
	refresh:function(input){
		
		console.info("history control func. enter refeshWin. input =");
		console.info(arguments);
		
	},

 	loadData:function(input){
 				
		console.info("history control func.  enter loaddata input = ");
		console.info(input);
			  	
	},
		
	show:function(){  
		
		var classname = "Extui.UIType.Panel." + this.formType;

		var tag = Extui.UIControl.Util.createItemId();
				
		this.innerPanel = Ext.create(classname,{
			
					itemId	:this.panelItemId || tag.itemId,
					
					title		:this.panelTitle,
					
					alias 	:	tag.alias

		});
		
		this.createBasicPanel();

		this.initAction(this.innerPanel);
		
		return this.innerPanel;	
	},

	createBasicPanel:function(){
		
		for( var p in this.basicPanel){
			
			var v = this.basicPanel[p];
			
			this.createTab(v,false);
		
		}
				
	},
	
	initAction:function(){
		
		var panel = this.innerPanel;
		var ac = this.actionPanel;
		
		for(var p in ac)
		{
				but = panel.down("button#" + p);
				
				if( but != null )
						but.on("click",	this.clickAction,this,p);	
		};
		    						
	},	
	
	clickAction:function(button,e,options){
		
		console.info(arguments);
		
		var p = options;
		
		var v = this.actionPanel[p];
		
		if( v != null )this.createTab(v,true);
	
	},
	
	createTab:function(v,flage){
				
			var itemId = v.name;
					
			var tabpanel = this.innerPanel.down(" tabpanel");
						
			var indexof = this.findPanel(tabpanel,itemId);
	
			if( indexof >= 0 )
			{
				tabpanel.setActiveTab(indexof);
				return;
			}
				
			var str = v.control;
						
	    var o = Extui.UIControl.Util.getControlParameter(str);
	    
	  	var itemfile;
	  	
	  	if( o.file != null )
					itemfile = Extui.UIControl.Util.addLoadPath(o.file,this.loadFilePath);
			else
					itemfile = Extui.UIControl.Util.addLoadPath(o.arguments[2],this.loadFilePath);
					  	    
	    var c = "Extui.UIControl." + o.control;
	    
	    if( o.file != null)chandler = Ext.create(c,
	    			{
	    				xmlFile	:itemfile,
	    				
	    				panelItemId		:	itemId,
	    								
	    				panelTitle		:	v.title,
	    									
							panelClosable	:flage
	    			});    				
	    else
	    {
	    		config = {
	    			
	    				xmlFile	 : null,
	    				
	    				panelItemId		:	itemId,
	    								
	    				panelTitle		:	v.title,
	    				
	    				formType : o.arguments[1],
				
							itemFile : itemfile,
							
							panelClosable	:flage	
					};
					
					chandler = Ext.create(c,config);		
	  	}
	    
	    var tform = chandler.show();
	            
	    chandler.refresh({});

			tabpanel.add(tform);
					  	
  	  tabpanel.setActiveTab(tform);
  	  				  		
	},	
	 	
	
	findPanel:function(container,tag){
		
		var mix = container.items;
		
		var a = mix.findIndex("itemId",tag);
		
		return a;
	}

	
});