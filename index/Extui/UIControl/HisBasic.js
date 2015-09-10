Ext.define('Extui.UIControl.HisBasic', {
					  
	constructor : function(config) {
	},
	
  dbAction:function(record,rowIndex){
		   
	   var formtype = record.raw["formtype"];
	     
	   var config = {
	   	 		formtype	:formtype,
	    	  rcd				:record.raw,
	    	  index			:rowIndex
	   }
	   this.createFormPanel(config);
	},

	showFormPanel:function(index){
		
		var record = this.dstore.getAt(index);

		if( record == null )return;
				
		this.dbAction(recordindex);
		
	},
			
	createFormPanel:function(config){
				
		  var tabpanel = this.innerPanel.down("tabpanel");
		  
	  	var tformid = this.getFormId(config.index);
	  	
		  var indexof = this.findPanel(tabpanel,tformid);
		  
		  if( indexof >= 0 ){
		  	tabpanel.setActiveTab(indexof);
		  	return;
		  }
		  		  
			var str = this.orderForm[config.formtype];
			
	    var o = Extui.UIControl.Util.getControlParameter(str);
	    
	    var itemfile = "";
	    
			if( o.file != null )
					itemfile = Extui.UIControl.Util.addLoadPath(o.file,this.loadFilePath);
			else
					itemfile = Extui.UIControl.Util.addLoadPath(o.arguments[2],this.loadFilePath);
						    
	    
	    var c = "Extui.UIControl." + o.control;
	    
	    if( o.file != null)chandler = Ext.create(c,
	    			{
	    				xmlFile	:itemfile,
	    				
	    				panelItemId		:	tformid,
	    								
	    				panelTitle		:	"记录" + config.index,
	    				
	    				panelClosable	:true
	    									
	    			});    				
	    else
	    {
	    		var conf = {
	    			
	    				xmlFile	 : null,
	    				
	    				panelItemId		:	tformid,
	    								
	    				panelTitle		:	"记录" + config.index,
	    				
	    				formType : o.arguments[1],
				
							itemFile : itemfile,
							
							panelClosable	:true	
					};
					
					chandler = Ext.create(c,conf);		
	  	}
	    
	    var tform = chandler.show();
	            
	    
	    chandler.refresh(config.rcd);

			tabpanel.add(tform);
					  	
  	  tabpanel.setActiveTab(tform);
  	  			
  },
  
  closeAllFormPanel:function(){
  	
  	var tabpanel = this.innerPanel.down("tabpanel");

		var len = tabpanel.items.length;
		 	 	
 		for(var i = len;i>0;i--){
  			
  			console.info("tabpanel: i=" + i);
  			
  			var dform = tabpanel.items.items[i-1];
  			
  			dform.close();
  			 			
 		};  		
  
  },
 
	findPanel:function(container,tag){
		
		var mix = container.items;
				
		var a = mix.findIndex("itemId",tag);
				
		return a;
	},
			
	getFormId:function(index){
		
		return "form" + index;
	},

  formSetDisabled:function(form,b){
 		
 			var fs = form.getForm().getFields();
  						
  		for(var i=0;i<fs.length;i++)
  		{
  					fs.items[i].setDisabled(b);
  		};
  }
	
});