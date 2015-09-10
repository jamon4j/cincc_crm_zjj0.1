﻿Ext.define('Extui.Store.AgentVccStore',{
	
	extend: 'Ext.data.Store', 
	
	alias : 'widget.avccstore',

	fields: 
	[
			{
					name: 'vccId',
					type: 'string'
			}, 
			{
					name: 'vccName',
					type: 'string'
			}
	],
				
	proxy: {
					
			type: 'ajax',
			getMethod : function() {
						return 'POST';
			},
			
			timeout: 900000,
					
			url: 'php/vcc.php',
			async : false,
			
			//		extraParams : {},				
					
			reader: {
					type: 'json',
					root: 'root'
			}
	},

	autoLoad: true
			
});	