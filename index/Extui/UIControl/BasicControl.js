Ext.define('Extui.UIControl.BasicControl', {
		
	requires	:	["Extui.UIControl.Util"],
						  	
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

		console.info("form load file path :" + this.loadFilePath);
				
		if( loadfile != null )Extui.UIControl.Util.get(loadfile,this.getXmlLoad,this);
  	  	
  	this.initParameter();

	  this.itemControl = this.initItem();	
  	  	 		
	},
	
	getXmlLoad:function(object){
		
		this.object = object;	
				
	},
	
	initParameter:function(){
		
		if( this.object != null ){
			    
				this.itemFile = this.object.file;
				
				this.formType = this.object.type || this.formType;
				
				this.panelTitle =this.object.title || this.panelTitle;
				
				this.panelClosable = this.object.closeable || this.panelClosable;
				
				this.width = this.object.width || this.width;
				
				this.height = this.object.height || this.height;
				
				this.x = this.object.x || this.x;
				
				this.y = this.object.y || this.y;
				
				this.labelWidth = this.object.labelWidth || this.labelWidth;

				
		//		if( (typeof(this.object.closeable) == "undefined") && (typeof(this.panelClosable) == "undefined") )
		//				this.panelClosable = false;
						
		}
	  	
		this.itemFile = this.itemFile || "";
		
		this.formType = this.formType || "DefualtType";
					
		this.panelTitle = this.panelTitle || "新方From界面";

//		if( typeof(this.panelClosable) == "undefined" ) this.panelClosable = false;	
    
    this.panelClosable = this.panelClosable || false;
    
    this.width = this.width;
    
    this.height = this.height;
    
    this.x = this.x;
    
    this.y = this.y;
          
    this.labelWidth = this.labelWidth;
    
	},
	
	initItem:function(){
		
    var itemfile;                                                //"./Extui/UI/UIType/Item/" + file;

		var itemfile = Extui.UIControl.Util.addLoadPath(this.itemFile,this.loadFilePath);
				
		var ic = Ext.create("Extui.UIControl.ItemControl",itemfile);
		
		return ic;
		
	},
	
	initAction:function(aform){
		
		var ac = {
			
				save	:	"saveAC",
				savenoret:"savenoret",

				cancel	: "cancelAC",

				modify	: "modifyAC",
				query	: "queryAC",
				notify  : "notifyAC",
				
				transfer:"transferAC",
				sendsms :"sendsmsAC"		
		};

		Extui.UIControl.Util.initAction(aform,ac,this);

	},
	
	show:function(){
		
		var classname = this.FormTypePath + this.formType;

		var tag = Extui.UIControl.Util.createItemId("win");
				
		this.innerPanel = Ext.create(classname,{
			
			itemId	:this.panelItemId || tag.itemId,
			
			title		:this.panelTitle,
			
			alias 	:	tag.alias,
			
			width   :  this.width,
			
			height  : this.height,
	
			x       :  this.x,
			
			y       :  this.y,
			
			labelWidth: this.labelWidth
		});
	
		var items = this.itemControl.show();
		
		if( this.TypeControl == "Win" ){
			
			var form = this.innerPanel.down("form");
			form.fieldDefaults={labelWidth: this.labelWidth};
			form.add(items);
		}
		else{
			this.innerPanel.fieldDefaults={labelWidth: this.labelWidth};
			this.innerPanel.add(items);
		}
			
		this.initAction(this.innerPanel);
	
		return this.innerPanel;
				
	}		
 	
	
});