var Extui = Extui || {};
 	
(function(){
	
	Extui.obEvent = new Ext.util.Observable();
			
	Extui.eventOn = function(item,handler,scope){
				
		item.on('render',Extui.createCB(Extui.initControl,handler),scope);
  };
  
  Extui.formOn = function(item,handler,scope){
  	item.on('render',Extui.createCB(Extui.formControl,handler),scope);
  };
  
	Extui.createCB = function(fn,args){
  	
  		return function(){
  		
  			fn.call(this,args);

  		}
  };
  		
	Extui.initControl = function(handler){
  	
   		var v = handler;
   
   		for(var i=0;i<v.length;i++){
   	
  			var b = Ext.ComponentQuery.query(v[i].itemId);   
  			
  			var len = b.length;
  			
  			if( len != 1 )
  				console.info(v[i].itemId + " init Control event component isnot 1  is " + len + " !!!!");
  			
  			if( v[i].event == "binddb" ){
  				
  							for(var k =0;k<len;k++)b[k].bindStore(v[i].callback);
  							
  							continue;
  			}
  			
  			if( v[i].event == "bindrefdb" ){
  			
								for(var k =0;k<len;k++){
			
											var pd = b[k].down("pagingtoolbar");
						
											if( pd != null )pd.bind(v[i].callback);
			
								}
  							continue;
  			}
  				
  					
  			for(var j=0;j<len;j++){   

					if( v[i].callback == null )
					{
						console.info( v[i].itemId + " init Control event, callback is null. cann't be bind !!!!");
						continue;
					};
					 					
    			b[j].on(v[i].event, v[i].callback,v[i].scope || this,{signle:true,buffer:500,exd:v[i].options ||''});
    		
    		}
		  }  	
  };

	Extui.formControl = function(handler){
  	
   		var v = handler;
   
   		for(var i=0;i<v.length;i++){
   	
  				var form = v[i].scope.owner;
  				
  				var item = form.down("#" + v[i].itemId);		
  				
  				if( item == null ){
  					
  						console.info(v[i].itemId + " formControl change is null  !!!!");
  						continue;
  				};
  							
    			item.on("change", v[i].callback, v[i].scope || this, {signle:true,buffer:500,exd:v[i].options ||''});
		  }  	
  };



  Extui.bsStore = function(itemid,store){

		var v = Ext.ComponentQuery.query(itemid);
		
		var len = v.length;
		
		if( len != 1)
			console.info("bind grid database itemid: " + itemid + " len: " + len + " component!! ");
		
		for(var i =0;i<len;i++)v[i].bindStore(store);
	
	};
	
	Extui.bsRefStore = function(itemid,store){
		
		var v = Ext.ComponentQuery.query(itemid);
		
		var len = v.length;
		
		if( len != 1)
			console.info("bind grid refesh itemid: " + itemid + " bind " + len + " component!! ");
		
		for(var i =0;i<len;i++){
			
			var pd = v[i].down("pagingtoolbar");
						
			pd.bind(store);
			
					//		v[i].dockedItems.items[1].bind(store);
		}
	};
	
	Extui.initQGrid = function(config){
				   
    Extui.initGrid(config);

		Extui.initQuery(config);
		
	};
	
	Extui.initQuery = function(config){
		
		var me = config.scope;
		
		var actions=[];
		
		var gridquerytag = config.querytag;
		
		if( config.query != null )
    {
    	var v = {itemId:gridquerytag + " button#query",		event:"click",				callback:config.query,scope:me};
    	
    	actions.push(v);
    };
    
    console.info("config parent gridtag =" + gridquerytag + "  panel = " );
    console.info(config.parent);
    
    Extui.eventOn(config.parent,actions,me);  
    
   
		var form = config.parent.down("form");                           //Ext.ComponentQuery.query(gridquerytag);	 	
	
		if( form == null ){
			
			console.info("initQuery parent down: " + gridquerytag + "  form down is not 1 and  null :");
			console.info(config.parent);
		};
       		
		if( config.bindQ !== null )config.bindQ.call(me,form);             //form[0]);
		if( config.initQ !== null )config.initQ.call(me,form);             //form[0]);		
	
	};
		

	Extui.initGrid = function(config){
		
		var me = config.scope;
		
		var actions = [];
		
		var gridtag = config.gridtag;       
    
    if( config.db != null )
    {
    	var v = {itemId:gridtag,									event:"itemdblclick",	callback:config.db,	scope:me}; 	
    	actions.push(v);
    }
    
    if( config.ref != null )
    {
    	var v = {itemId:gridtag + " #refresh",		event:"click",				callback:config.ref,	scope:me};
    	actions.push(v);
    }   
  
    if( config.oper1 != null )
    {
    	var v = {itemId:gridtag + " #oper1",		event:"click",				callback:config.oper1,	scope:me};
    	actions.push(v);
    }   
    
    if( config.oper2 != null )
    {
    	var v = {itemId:gridtag + " #oper2",		event:"click",				callback:config.oper2,	scope:me};
    	actions.push(v);
    }   
       
     if( config.oper3 != null )
    {
    	var v = {itemId:gridtag + " #oper3",		event:"click",				callback:config.oper3,	scope:me};
    	actions.push(v);
    }   
    
    if( config.oper4 != null )
    {
    	var v = {itemId:gridtag + " #oper4",		event:"click",				callback:config.oper4,	scope:me};
    	actions.push(v);
    }   
    
    if( config.oper5 != null )
    {
    	var v = {itemId:gridtag + " #oper5",		event:"click",				callback:config.oper5,	scope:me};
    	actions.push(v);
    }  

    if( config.oper6 != null )
    {
        var v = {itemId:gridtag + " #oper6",        event:"click",              callback:config.oper6,  scope:me};
        actions.push(v);
    }  

    if( config.oper7 != null )
    {
        var v = {itemId:gridtag + " #oper7",        event:"click",              callback:config.oper7,  scope:me};
        actions.push(v);
    }

     if( config.oper8 != null )
    {
        var v = {itemId:gridtag + " #oper8",        event:"click",              callback:config.oper8,  scope:me};
        actions.push(v);
    }

     if( config.oper9 != null )
    {
        var v = {itemId:gridtag + " #oper9",        event:"click",              callback:config.oper9,  scope:me};
        actions.push(v);
    } 

    if( config.oper10 != null )
    {
        var v = {itemId:gridtag + " #oper10",        event:"click",              callback:config.oper10,  scope:me};
        actions.push(v);
    } 

    if( config.oper11 != null )
    {
        var v = {itemId:gridtag + " #oper11",        event:"click",              callback:config.oper11,  scope:me};
        actions.push(v);
    }    
    
    if( config.store != null )
    {
    	v = {itemId:gridtag,										event:"binddb",				callback:config.store,	scope:me};
    	actions.push(v);
    }
    
    if( config.store != null)
    {	
     	v = {itemId:gridtag,										event:"bindrefdb",		callback:config.store,	scope:me};
    	actions.push(v);   	
    }  
      
		console.info("config parent gridtag =" + gridtag + "  panel = " );
    console.info(config.parent);
        
    Extui.eventOn(config.parent,actions,me);   
    		
	};
	
	Extui.bFormStore = function(form,itemid,store){
						
	  var v = form.down(itemid);  
	  	  
		if( v == null){
			
			console.info("bind formstore itemid: " + itemid + "  is null not 1 ");
	  	console.info(v);
	  };
	  	  
	  if( v !== null )v.bindStore(store);
	
	};
	
	Extui.formSetDisabled = function(form,b){
 		
 			var fs = form.getForm().getFields();
  						
  		for(var i=0;i<fs.length;i++)
  		{
  					fs.items[i].setDisabled(b);
  		};
  };  
	
	Extui.getPanelTag = function(panel){
		
		var v = panel.alias;
		
		if( v instanceof Array ){
			
			v = v[0];
		}
		
		console.info("alias = " + v);
			
		var  tags = v.split(".");
		
		if( tags.length == 0 )
		{
			console.info("Extui getPaneltag is error:" + v );
			
			return null;
		}
		
		var tag = tags[tags.length-1];
		
//    console.info("get panel alais tap :" + tag);
    
    return tag;
	};
	fillData2Form = function(form, dataCtx) {
	  	for(var property in dataCtx) {
	    var formField=form.queryById(property);
	    if(formField){
	      if(formField.xtype=='datetimefield'){
	        formField.setValue(ymdHisToDate(dataCtx[property]));
	      }
	      else{
	        formField.setValue(dataCtx[property]);
	      }
	    }
	  }
   }
	
 }());