Ext.define('Extui.Store.Tmpstore',{	
	
	extend: 'Ext.data.Store', 
	
	alias	:	'widget.Tmpstore',

	fields:[
 					 {name:'value'},
 					 {name:'text'}
 					],
				
	autoLoad : false	
});
