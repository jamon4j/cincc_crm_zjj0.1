Ext.define('Extui.UIControl.ColumnControl', {
		
	requires:["Extui.UIControl.Util"],
				  
	constructor : function(config) {
			
		if( typeof(config) != "string" )
		{
				console.info("itemcontrol must be file string");
				return;	
		}
				
		Extui.UIControl.Util.get(config,this.getXmlLoad,this);
		
		this.initParameter();
		
		this.items = this.formatColumns();
  	  					  	
	},
	
	getXmlLoad:function(object){
		
		this.object = object;	
		
	},
	
	initParameter:function(){

	},
	
	show:function(){
		
		return this.items;

	},
	
	formatColumns:function(){
						
		var items = this.object.items;
		
		var is =[];
		
		for(var i=0;i<items.length;i++){
			
			var tmp = items[i];
			
			is.push(tmp);
			
		};
		
		return is;
		
	}		
	
});