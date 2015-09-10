Ext.define('Extui.Store.combobox',{	
	
	extend: 'Ext.data.Store', 
	
	alias	:	'widget.combobox',

	fields:[
 					 {name:'value'},
 					 {name:'text'}
 					],
				
	autoLoad : false	
});
