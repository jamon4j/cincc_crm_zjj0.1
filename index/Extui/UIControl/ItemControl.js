Ext.define('Extui.UIControl.ItemControl', {
	
	extend:"Extui.UIControl.ItemLogic",
	
	requires:["Extui.UIControl.Util","Extui.UIControl.ItemBasic"],
				  
	constructor : function(config) {
			
		if( typeof(config) != "string" )
		{
				console.info("itemcontrol must be file string");
				return;	
		}
								
		Extui.UIControl.Util.get(config,this.getXmlLoad,this);
		
		this.initParameter();
  	  			
		this.addLogic(this.items,this.events);
		
		this.initEventAction(); 		
		  	
	},
	
	getXmlLoad:function(object){
		
		this.object = object;	
		
	},
	
	initParameter:function(){
			
		this.items = Extui.UIControl.ItemBasic.createItem(this.object.items);
		
		this.events = this.object.event ||{};

		this.actions = this.object.actions ||{};

	    this.onEvent = this.object.onevent || [];
	    
	    this.notifyEvent = this.object.notifyevent || "";
    
	},
	
	initEventAction:function(){
				
			var es = this.onEvent;
			
			for(var i=0;i<es.length;i++)
					Extui.obEvent.on(es[i],this.onEventHandler,this);
					
	},
	
	onEventHandler:function(input){
				
		console.info("item receive event handler");
				
		console.info(input);
		
	},
	
	show:function(){
		
		return this.items;

	},
	
	addLogic:function(items,event){
						
		for(var p in event){
								
			for(var j=0;j<items.length;j++){
				
				if( items[j].name == p)
				{
						var me = this;
												
						items[j].listeners  = function(n){
							
									var data = event[n];
						
									return {
										
										afterRender:function(item){   item.on("change",me.changeCallback,me,{signal:true,buffer:1000,exd:data}); }
									
									};
									
								}(p);
															
						break;
				}
			}       //eo items	

		}
		
	},
		
	changeCallback:function(item,n,o,opts){
				
		if( n == o )return;
		
		this.form = item.up("form");
		
		this.win = item.up("window");
		
//		console.info(arguments);
		
		var event = opts.exd;             // this is object { value1:"fn",value2:"fn2"}
						
		if( typeof(n) == "object" ){
			
			n = this.getFirstValue(n) || n;	
		
		};

//		console.info(n);		
		
		var str = event[n] || event["default"];
		
//		console.info(str);
		
		if( str != "undefined" )this.excelCommand(str);
				
	},
	
	excelCommand:function(str){
		
    var me = this;
    
  	if( (str == null) || (str == "undefined") )return;

    var cmds = str.split(";");
    
    cmds.forEach(function(cmd){
    			
				var re = /(\w+)\(([^\)]*)\)/;

				var r = cmd.match(re);
				
				console.info(r);
				
				var c = me[r[1]];
				
				if( (c==null) || (c=="undefined") ){
					
					console.info(" item command str : " + r[1] + "    is undefined!!!!!");
					return;
				
				}
					
				me[r[1]](r[2]);
		});
	},
 
 

 /**********************************  event function ******************/
  enable:function(){
 
    var comm = {
    	false:false,
    	true:true
    };
     	
 // 	console.info("disable");
 // 	console.info(arguments);
  	
  	var ar = arguments[0].split(",");
 
  	var value = comm[ar[1]] || false;
  	
  	this.setItemEn(value,ar[0]);
  	
  },
    
  visable:function(){
  	
  	var comm = {
    	false:false,
    	true:true
    };
  	
 // 	console.info("visable");	
 //  	console.info(arguments);
  	
  	var ar = arguments[0].split(",");
  	
  	var value = comm[ar[1]] || false;
  	
		this.setItemVisiable(ar[0],value);
		 
  }, 	
  
	total:function(){
		
		var p = this.form.getForm().getValues();
		
		console.info(p);
		
	},
	
	setValue:function(){
		
 // 	console.info("setvalue");
 // 	console.info(arguments);
  	
  	var ar = arguments[0].split(",");
  	
  	console.info(ar);
  	
		this.setItemValue(ar[0],ar[1]);
				
	},
		
	getFirstValue:function(n){
		
		for(var p in n){
			
			return n[p];
		
		};
		
	},	
		
/*******************   save button *************************/

  notifyAC:function(input){
  	
  	if( this.notifyEvent != "" )
  	{
			  Extui.obEvent.fireEvent(this.notifyEvent,input);
					  
	  		console.info("notifyAC fireevent :" +  this.notifyEvent + " input=");
	  		console.info(input); 
  	}
  
  },
  
	DbOperation:function(cmd,input){
		
		console.info("enter dboperations: " + cmd);
		
		console.info(this);
		
		var items = this.actions[cmd];
		
		if( (typeof(items) == "undefined") || (items == null) )return;
		
		var addtion = this.formatInput(items.addtionalItem,input);
		
		var condition = this.formatInput(items.conditionItem,input);
		
		var values = this.formatInput(items.tableItem,input);
		
		console.info(items.url);	
		
	},
	
	formatInput:function(results,input){
														
		for(var p in results){
							
			var res;
																
			var value = input[p];
						
			if( typeof(value) != "undefined" )res = value;
			else
					res = results[p];
								
			if( res[0] == '$' ){
										
					var cmd = res.substring(1);
																			
					var fn = this[cmd];
					
					if( typeof(fn) == "undefined" ){
						
						console.info(" item " + cmd + " function is not defined");
						continue;
					}
					 
					res = this[cmd]();
			}					
				
			results[p] = res;
										
		}
							
		return results;
	},
	
	currentTime:function(){
		
		return 1234;
		
	},

	streamNo:function(){
		
		return '12334';

	}
	 									
	
});