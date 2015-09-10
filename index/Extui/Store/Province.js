Ext.define('Extui.Store.Province',{	

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
					
			url: 'php/province.php',
			async : false,
			
			//		extraParams : {},				
					
			reader: {
					type: 'json',
					root: 'root'
			}
	},

	autoLoad: true
			
});	