Ext.define('Extui.UIControl.HisControl', {
	
	extend:"Extui.UIControl.HisBasic",
	
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

		console.info("history load file path :" + this.loadFilePath);

		if( loadfile != null )Extui.UIControl.Util.get(loadfile,this.getXmlLoad,this);
		
		this.initParameter();
		
		this.createDB(this.object.store1,this.object.store2,this.object.store3);
		
		this.callParent();			 		
	},
	
	getXmlLoad:function(object){
		
		this.object = object;	
		
	},
	
	initParameter:function(){
		
		if( this.object != null ){
			
				this.formType = this.object.type;
				
				this.orderForm = this.object.orderform;
							
				this.orderWin = this.object.orderwin;
				
				this.panelTitle =this.object.title;
				
				this.actions = this.object.actions;

		}

		this.formType = this.formType || "DefualtType";
		
		this.orderForm = this.orderForm || [];
		
		this.orderWin = this.orderWin || [];
						
		this.actions = this.actions || [];
					
		this.panelTitle = this.panelTitle || "新方 历史 界面";

	},
	
	createDB:function(s1,s2,s3){
				
		if( this.o1store == null )
	 			this.o1store = Ext.create(s1);
	 			
	  if( this.o2store == null )
	  		this.o2store = Ext.create(s2);

	  if( this.dstore == null)
	  		this.dstore = Ext.create(s3);
	  		
	},

	refresh:function(input){
		
		console.info("history control func. enter refeshWin. input =");
		console.info(arguments);
		
		this.loadData(input);
		
	},

 	loadData:function(input){
 				
		console.info("history control func.  enter loaddata input = ");
		console.info(input);
		
		var input = input || {"vccId":1};
					
		this.dstore.removeAll();
			
	 	var paramsCondition = {
				"command.vccId" : input["vccId"]
	 	};
	 		 
		this.o1store.proxy.extraParams = paramsCondition;                   //.searchConditions = conditionArr.join(' AND ');

		this.o1store.load({
			
				callback:this.loadDataFinish,
				scope:this,
				
				formtype:"Reply"
		
		});
		
		this.o2store.load({
			
				callback:this.loadDataFinish,
				scope:this,
				
				formtype:"Repeat"
		
		});
	
	  this.closeAllFormPanel();
	  	
	},
		
	loadDataFinish:function(records,options,success)
	{ 
		  
			var datas = [];
	
			var len = records.length;
		
			for(var i=0;i<len;i++){
						
					var tmprec = {formtype:options.formtype};
			
					Ext.apply(tmprec,records[i].data);
			
// 					console.info(records[i].data);
 			
 					datas.push(tmprec);
 		 		
			};
			
			this.dstore.loadData(datas,true);
	},		
 
	show:function(){  
		
		var classname = "Extui.UIType.Panel." + this.formType;

		var tag = Extui.UIControl.Util.createItemId("panel");
				
		this.innerPanel = Ext.create(classname,{
			
			itemId	:this.panelItemId || tag.itemId,
					
			title		:this.panelTitle,
					
			alias 	:	tag.alias			
			
		});
		
		this.initAction(this.innerPanel);
		
		return this.innerPanel;	
	},

	initAction:function(panel){
    					
	  this.topwintag = "#" + panel.getItemId() + " grid";
	    								
		Extui.initGrid({	
			
	  	gridtag:this.topwintag,
	  	
	  	db:this.dbClickAction,
	  		  	
	  	oper3:this.oper3Action,
	  	oper4:this.oper4Action,
	  	oper5:this.oper5Action,
	  	  	
	  	store:this.dstore,
	
	  	parent:panel,
	  	
	  	scope:this

	  });
	
	},	
	
	dbClickAction:function(grid,record,e1,rowIndex){
		
		console.info("db click function");
	
			var fn = this.actions["db"];
			
			this[fn](record,rowIndex);

	},
	
	oper3Action:function(grid,cell,rowIndex,colIndex){   //grid,rowIndex,colIndex){
		
			var record = grid.getStore().getAt(rowIndex);	
	
			var fn = this.actions["oper3"];
			
			this[fn](record,rowIndex);
	    				  
	},

	oper5Action:function(grid,cell,rowIndex,colIndex){   //grid,rowIndex,colIndex){
		
			var record = grid.getStore().getAt(rowIndex);	
	
			var fn = this.actions["oper5"];
			
			this[fn](record,rowIndex);
	    				  
	},

	oper4Action:function(grid,cell,rowIndex, colIndex){
			
		var record = grid.getStore().getAt(rowIndex);

    var recs = [];
    recs.push(record);
    		
	  this.confirmDelete(recs);
	
	},
  
  playRecord:function(record,index){
 
   		console.info("playRecord Record"); 	
  },
   
  modifyRecord:function(record,index){

  		console.info("modify Record");
  		
  		var formtype = record.raw["formtype"];
  		
			var str = this.orderWin[formtype];
						
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
	    								
	    				panelTitle		:	"记录" + index				
	    									
	    			});    				
	    else
	    {
	    		config = {
	    			
	    				xmlFile	 : null,
	    					    								
	    				panelTitle	:	"记录" + index,
	    				
	    				formType : o.arguments[1],
				
							itemFile : itemfile
							
					};
					
					chandler = Ext.create(c,config);		
	  	}
	    
	    var win = chandler.show();

			win.show();

  },
  
	confirmDelete:function(records)
	{
		var me = this;
		
		Ext.MessageBox.confirm("系统提示","确认删除吗？",function(btn,txt)
				{
				    
					if(btn!="yes")return;
				
				  var len = records.length;
					
					for(var i=0;i<len;i++)me.deleteAction(records[i]);
						
			  }  	
			);	
	},
	
  deleteAction:function(rcd){
  }
	
});