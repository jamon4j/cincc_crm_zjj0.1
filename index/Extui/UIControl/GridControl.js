Ext.define('Extui.UIControl.GridControl', {
	
	requires:["Extui.UIControl.Util"],
	
	FormTypePath:"Extui.UIType.Grid.",
		   		 	  
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

		this.queryItems = this.formatQuery();

	    this.userCol = this.formatColumns();
	   	  	
		this.createDB();
		
		this.initEventAction(); 

	},

	getXmlLoad:function(object){
		
		this.object = object;	
	},

	initParameter:function(){
		
		if( this.object != null ){

			console.info(this.object);
			
			this.tableName = this.object.table;
			
			this.formType = this.object.type;
						
			this.actionAC = this.object.action;
			
			this.panelTitle =this.object.title;
			
			this.queryFile = this.object.queryfile;

			this.columnFile = this.object.columnfile;
			
			this.onEvent = this.object.onevent;
			
			this.queryEvent = this.object.queryevent;

			this.storeClass = this.object.storeClass;

			this.toolbarCfg = this.object.toolbarCfg;

			this.queryWidth = this.object.queryWidth;

			this.width = this.object.width;
		}
		
		this.queryFile = this.queryFile || "";
		
		this.formType = this.formType || "DefualtType";
		
		this.actionAC = this.actionAC || {
					
		db	: "WinControl win.xml",		
						    	
    	oper1 : "WinControl win.xml",		
 		
    	oper3	:	"WinControl win.xml"							
		};
					
		this.panelTitle = this.panelTitle || "新方 Grid 界面";

	    this.onEvent = this.onEvent || [];
	    
	    this.queryEvent = this.queryEvent ||"";

	    this.toolbarCfg = this.toolbarCfg || {
    		items:[                     
        		{
            		xtype: 'button',
            		itemId: 'oper1',
            		text:'注册',
            		iconCls: 'add_node'
        		},{
           			xtype: 'button',
            		itemId: 'oper2',
           			text:'批量删除',
            		iconCls: 'delete_node'
        		},
    		]
		};
	},

	initEventAction:function(){
				
		var es = this.onEvent;
		
		for(var i=0;i<es.length;i++)
			Extui.obEvent.on(es[i],this.onEventHandler,this);
		
	},
	
	onEventHandler:function(input){
				
		console.info("receive event handler");
				
		console.info(input);
		
		this.loadData(input);
		
	},
	
	queryChange:function(input){
		
		if( this.queryEvent != "" )
			Extui.obEvent.fireEvent(this.queryEvent,input);
		
	},
		
	formatQuery:function(){
		
		if( this.queryFile != "" ){
			
			var itemfile = Extui.UIControl.Util.addLoadPath(this.queryFile,this.loadFilePath);
			
			var ic = Ext.create("Extui.UIControl.ItemControl",itemfile);
			
			var items = ic.show();
			
			return items;
		}
		
		return null;
		
	},
	
	formatColumns:function(){
		
		if( this.columnFile == null ){
			
			console.info("not define columns file ");
			return null;
		}
		
		var itemfile = Extui.UIControl.Util.addLoadPath(this.columnFile,this.loadFilePath);
		
		var ic = Ext.create("Extui.UIControl.ColumnControl",itemfile);
		
		return ic.show();
		
	},

	createDB:function(){
			 	
	 	this.gridStore = Ext.create(this.storeClass,{autoLoad:false});

	},
	
	loadDB:function(){
		
		this.gridStore.reload();
	},
	
	refresh:function(input){
		
		this.loadDB();
	},
	
	show:function(){
				
		var classname = this.FormTypePath + this.formType;
		
		var tag = Extui.UIControl.Util.createItemId("grid");
    	
		this.grid = Ext.create(classname,{
			toolbarCfg:this.toolbarCfg,
			title: this.panelTitle,
			store   : this.gridStore,
			itemId	:	tag.itemId,
			alias	:	tag.alias,
			width   : this.width,		
		});
			  
		this.loadColumns();
		
		this.loadQuery();
	
	    this.initAction(this.grid);  
	  
		return this.grid;

				
	},
		
	loadColumns:function(){
				
/*		var v = this.grid.columns;
		
    var me = this;
    
    v.forEach(function(it){
    	
    	var c = {
    							header : null,
									align  : null,
									xtype  : null,
									
									itemId : null,
																										
									width		:0,

									items  : []
							};
							
			for( var p in c ){
				
				c[p] = it[p];
 
 			};
			
			c.header = it.initialConfig.header
							  
    	console.info(c);
    	
    	me.userCol.push(c);
 
    });
*/
 		   
		this.grid.reconfigure(null,this.userCol);
    	this.grid.doLayout();

	},
	
	loadQuery:function(){
		
		items = this.queryItems;

		if( items == null )return;
				
		var queryform = this.grid.down("#queryform");
		
		if(this.queryWidth){
			queryform.defaults.columnWidth = this.queryWidth;
		}
		
		console.info(queryform);
		
		queryform.add(items);
							
	},
		
	initAction:function(panel){

        this.parentTag = "";
    						
	    this.topwintag = this.parentTag + " #" + panel.getItemId();
	  
	    console.info(this.topwintag);
								
        this.gridtag = this.topwintag;             							// this.getGridTag(this.topwintag);
        this.querytag = this.topwintag + " form";               //getQueryTag(this.topwintag);
		  
		Extui.initQGrid({	
			
	  	gridtag:this.gridtag,
	  	
	  	db:this.dbClickAction,
	  	ref:this.refAction,
	  		  	
	  	oper1:this.oper1Action,
	  	oper2:this.oper2Action,
	  	oper3:this.oper3Action,
	  	oper4:this.oper4Action,
	  	oper5:this.oper5Action,
	  	oper6:this.oper6Action,
	  	oper7:this.oper7Action,
	  	oper8:this.oper8Action,
	  	oper9:this.oper9Action,
	  	oper10:this.oper10Action,
	  	oper11:this.oper11Action,

	  	store:this.gridStore,

		querytag:this.querytag,
			  	
	  	query:this.queryAction,
 	  	
	  	bindQ:null,            //this.bindQueryForm,
	  	initQ:null,            //this.initQueryForm,
	  	
	  	parent:this.grid,
	  	
	  	scope:this

	  });
	
	},	
	
/*	
	bindQueryForm:function(qform){
	},
	
	initQueryForm:function(qform){
	},
*/
	
	queryAction:function(button,e,options){
			  
		var form = button.up("form");
									
		var v = form.getForm().getValues(); 
 
  		this.queryGrid(v);
  					
	},
	   
	queryGrid:function(input){
	  	
	  	this.refresh(input);
	  	
	  	this.queryChange(input);	
	 
	},
	
	refAction : function(button,e,options){
		
		var store = button.up('grid').getStore();
			
		store.reload();
	},  	
	
	dbClickAction:function(grid,record,e1,rowIndex){
	
	    this.midfyRowIndex = rowIndex;
	    	    
	    this.displayWinInfo(record,"db");

	},
	
	oper1Action:function(button,e,options){
		
		var record = null;
		
		this.displayWinInfo(record,"oper1");
			
	},

	oper3Action:function(button,e,options){
		
		var record = null;
		
		this.displayWinInfo(record,"oper3");
			
	},

	//批量修改
	oper4Action:function(button,e,options){
		
		var grid = button.up('grid');
	   
	    var rows = grid.getView().getSelectionModel().getSelection();
	  
	    var len = rows.length;
	  
	    if(len<=0){
	      Ext.Msg.alert('系统提示', '请选择要修改的数据！');
	      return;
	    }; 

	    var record = null;
	  
	    this.displayWinInfo(record,"oper4");	   
			
	},
	
	oper6Action:function(grid,cell,rowIndex,colIndex){   //grid,rowIndex,colIndex){
		
		var record = grid.getStore().getAt(rowIndex);	

    	this.midfyRowIndex = rowIndex;     
    
	    this.displayWinInfo(record,"oper6");    
	    				  
	},

	 oper7Action:function(grid,cell,rowIndex,colIndex){   
	  
	    var record = grid.getStore().getAt(rowIndex);	

   		this.midfyRowIndex = rowIndex;     
    
	    this.displayWinInfo(record,"oper7"); 	    
	 },

	oper8Action:function(grid,cell,rowIndex,colIndex){   //grid,rowIndex,colIndex){
		
		var record = grid.getStore().getAt(rowIndex);	

   		this.midfyRowIndex = rowIndex;     
    
	    this.displayWinInfo(record,"oper8");    
	    
	},

	oper9Action:function(grid,cell,rowIndex,colIndex){   //grid,rowIndex,colIndex){
		
		var record = grid.getStore().getAt(rowIndex);	

   		this.midfyRowIndex = rowIndex;     
    
	    this.displayWinInfo(record,"oper9");    
	    
	},

	oper10Action:function(grid,cell,rowIndex,colIndex){   //grid,rowIndex,colIndex){
		
		this.oper5Action(grid,cell,rowIndex,colIndex); 
	    
	},

	oper11Action:function(grid,cell,rowIndex,colIndex){   //grid,rowIndex,colIndex){
		
		var record = grid.getStore().getAt(rowIndex);	

   		this.midfyRowIndex = rowIndex;     
    
	    this.displayWinInfo(record,"oper11");    
	    
	},

	oper2Action:function(button,e,options){
		
		var grid=button.up('grid');
			
		var rows = grid.getView().getSelectionModel().getSelection();
		
		var len = rows.length;

  		console.info("del len = " + len);
  
		if(len<=0){
				Ext.Msg.alert('系统提示', '请选择要删除的数据！');
				return;
		};
		
		this.confirmDelete(rows);
			
	},

	oper5Action:function(grid,cell,rowIndex, colIndex){
			
		var record = grid.getStore().getAt(rowIndex);

	    var recs = [];
	    recs.push(record);
    		
	    this.confirmDelete(recs);
		
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
    	var store = rcd.store;
    	store.remove(rcd);
    },
	
	displayWinInfo:function(record,act){
	
		var classobj = this.actionAC[act];
		  	    
	    if( classobj == null)return;
	    
	    console.info(classobj);
	    
	    var o = Extui.UIControl.Util.getControlParameter(classobj);
	    
	    console.info(o);
	    
	    var itemfile = "";
	    
			if( o.file != null )
					itemfile = Extui.UIControl.Util.addLoadPath(o.file,this.loadFilePath);
			else
					itemfile = Extui.UIControl.Util.addLoadPath(o.arguments[2],this.loadFilePath);
						
	    
	    var c = "Extui.UIControl." + o.control;
	    
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
	  	
	    var win = chandler.show();
	    
	    win.show();
	    
	    if( record != null )chandler.refresh(record.getData());
	  
  }	
		
});