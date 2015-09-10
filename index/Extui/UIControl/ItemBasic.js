﻿Ext.define('Extui.UIControl.ItemBasic', {
	
	singleton: true,
					  
	constructor : function(config) {
	},
	
	createItem:function(items){
		
		if( (items == null) || (items == "undefined") )
		{
			console.info("itemsControl items is null");
			return null;
		};
				
		var is =[];
		
		for(var i=0;i<items.length;i++){
			
			var item = items[i];

			var fn = this[item.xtype];
							
			if( (fn == null) || (fn == "undefined") )
				var tmp = this.defaultFn(item);
			else
				var tmp = fn.call(this,item);
							
			if( tmp instanceof Array ){
				
				tmp.forEach(function(tm){
						is.push(tm);
				});
				
			}else
					is.push(tmp);
			
		};
		
		return is;
		
	},

	defaultFn:function(obj){
				
			var tmp = {};
					
			Ext.apply(tmp,obj);
			
			tmp.fieldLabel = obj.fieldLabel || obj.label;
			tmp.itemId = obj.itemId || obj.name;

			if(obj.storeClass !== undefined && obj.storeClass !== null) {
				tmp.store = Ext.create(obj.storeClass);
			}

			//为multiselector创建store
			if(obj.multiselects !== undefined) {
				for(var i = 0;i < obj.multiselects.length;i++) {
					if(obj.multiselects[i].storeClass !== undefined) {
						var storeClass = obj.multiselects[i].storeClass;
						tmp.multiselects[i].store = Ext.create(storeClass);
					}
				}
			}
			return tmp;
	},
	
	radiogroup:function(obj){
											
			var tmp = {};
					
			Ext.apply(tmp,obj);
			
			tmp.fieldLabel = obj.fieldLabel || obj.label;
			tmp.itemId = obj.itemId || obj.name;				
					
			tmp.vertical = true;
		
			for(var j=0;j<obj.items.length;j++){
														
					tmp.items[j].name = obj.name;
					tmp.items[j].inputValue = obj.items[j].inputValue || obj.items[j].boxLabel;
			};
			
			return tmp;
	}, 


/**************************  xtype link database  *****************/

	linkdb:function(obj){
		
		items = [];
				
		var number = obj.number;
		
		for(var i=1;i<=number;i++){
			
			var config = {
				label:obj["label" + i],
				name:obj["name" + i],
				itemId:obj["name" + i],
				
				url:obj["url" + i],
				
				displayField:obj["displayField"+i],
				
				valueField:obj["valueField"+i],
				
				allowBlank:obj["allowBlank"+i]
			};	
		
			if( i == 1 ) config.autoLoad = true;
			else
				config.autoLoad = false;
				
			var tmp = this.createDBCombobox(config);
		
		  if( i != number ){
				var me = this;
				
				tmp.listeners  = {
					afterRender:function(item){   item.on("change",me.selectDBFn,me,obj); }
				};
			}
			items.push(tmp);
		}
		
		return items;
		
	},	

	selectDBFn:function(item,n,o,exd){
		
		console.info("enter selectdbfn: n = " + n);
						
		var pstore = item.getStore();

	  var next = item.next();		
		var nstore = next.getStore();
		
		console.info(nstore);
				
		if( n && n != o ){
								
			var paramsCondition = {
						id : n
	 		};
	 
	 	console.info(paramsCondition);
			
			nstore.getProxy().extraParams = paramsCondition
			
			nstore.reload();
			
			this.resetValue(item,exd);
		};
	},
	
	createDBCombobox:function(config){
		
		var it = Ext.clone(this.comboType);
     	
		it.fieldLabel = config.label;                   
		it.name = config.name;
		it.itemId = config.itemId;
		
		it.displayField = config.displayField;
		it.valueField = config.valueField;
		it.allowBlank = config.allowBlank;
		
//		it.queryMode = "local";
		
		it.store = Ext.create("Ext.data.Store",{

				id:config.name,
			
				fields:[
					{name:config.displayField,type:"string"},
					{name:config.valueField,type:"string"}
					],
					
				autoLoad:config.autoLoad,
			
				proxy:{
					
					type:"ajax",
					url:config.url,
					
					getMethod : function(){
						return 'POST';
					},
					
					reader:{
						type:"json",
						root:"root"
					}
				}
		});
					
		return it;
	},

/*********************  xtype link *****************/	
	
	link:function(obj){
		
		var items =[];
		
		var number = obj.number;
		
		for(var i=1;i<number;i++){
			
			var config = {
				label:obj["label" + i],
				name:obj["name" + i],
				itemId:obj["name" + i],
			};	
		
			if( i == 1 )config.data = obj.data;
			else
					config.data = null;
								 
			var tmp = this.createCombobox(config);
		
			var me = this;
				
			tmp.listeners  = {
					afterRender:function(item){   item.on("change",me.selectFn,me,obj); }
			};
		
			items.push(tmp);
		}
		
		var config = {
				label:obj["label" + i],
				name:obj["name" + i],
				itemId:obj["name" + i],
		};	
		
		if( i == 1 )config.data = obj.data;
		else
			config.data = null;
									 
		var tmp = this.createCombobox(config);
		
		items.push(tmp);
			
		return items;
	},
	
	selectFn:function(item,n,o,exd){
						
		var pstore = item.getStore();

	  var next = item.next();		
		var nstore = next.getStore();
				
		if( n && n != o ){
			
			var rec = pstore.getById(n);
				
			if(rec){
					nstore.loadData(rec.data.data);
			};
		
			this.resetValue(item,exd);	
	
		};
	},
	
	 resetValue:function(item,exd){

		var label = item.fieldLabel;
			
			for(var i=1;i<5;i++){
					
					if( exd["label" + i] == label)break;
			}
			i++;
			console.info("i=" + i);
			
			var form = item.up("form");
			
			for( i;i<5;i++){
							  	
				var cb = form.getForm().findField(exd["name"+i]);
				
				console.info(cb);
				console.info("i=" + i);
				
				if( cb != null ) cb.setValue(""); 		
	
			};
	},

	
	createCombobox:function(config){
		
		var it = Ext.clone(this.comboType);
     	
		it.fieldLabel = config.label;                   
		it.name = config.name;
		it.itemId = config.itemId;
		
		it.displayField = config.displayField;
		it.valueField = config.valueField;
		
		it.queryMode = "local";
		
		if( config.data != null )
			it.store = Ext.create("Ext.data.Store",{

				id:config.name,
			
				fields:[
					{name:"id",type:"int"},
					"text","data"
					],
			
				data:config.data
			});
		else
			it.store = Ext.create("Ext.data.Store",{

				id:config.name,
			
				fields:[
					{name:"id",type:"int"},
					"text","data"
					]
			});			
					
		return it;
	},


	comboType:{
		xtype:"combobox"
	},

/****************************xtype:selectorcontrol*****************************/

	selectorcontrol : function(obj){

		var fromFile = obj.fromgrid;
		var tofile = obj.togrid;

		var fs = Ext.create(Ext.form.FieldSet,{title:obj.title,layout:{type:'hbox',align:'stretch'},columnWidth:obj.columnWidth||.99});

		var from = Ext.create("Extui.UIControl.GridControl",fromFile);	  
    	var fromgrid = from.show();
    	from.loadDB();

    	var to = Ext.create("Extui.UIControl.GridControl",tofile);	  
    	var togrid = to.show();
    	to.loadDB();

    	fs.add(fromgrid);
    	fs.add(togrid);

    	return fs;	

	},

/****************************xtype:gridcontrol*****************************/
		gridcontrol : function(obj){

		var file = obj.grid;

		var temp = Ext.create("Extui.UIControl.GridControl",file);	  
    	var grid = temp.show();
    	temp.loadDB();

    	return grid;	

	}
	
});
