Ext.define('Extui.Store.City',{	

	extend: 'Ext.data.Store', 
	
	alias : 'widget.provice',


	fields: [{
							name: 'value',
						}, {
							name: 'text',
						}],
				
	proxy: {
					
			type: 'ajax',
			getMethod : function() {
						return 'POST';
			},
			
			timeout: 900000,
					
			url: 'php/city.php',
			async : false,
			
			//		extraParams : {},				
					
			reader: {
					type: 'json',
					root: 'root'
			}
	},

	autoLoad: true
			
});	