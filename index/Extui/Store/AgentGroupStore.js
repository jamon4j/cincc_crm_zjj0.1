﻿Ext.define('Extui.Store.AgentGroupStore',{	

	extend: 'Ext.data.Store', 
	
	alias : 'widget.agroupstore',


	fields: [{
							name: 'agtGrpId',
							type: 'string'
						}, {
							name: 'agtGrpName',
							type: 'string'
	}],
				
	proxy: {
					
			type: 'ajax',
			getMethod : function() {
						return 'POST';
			},
			
			timeout: 900000,
					
			url: 'php/AGroup.php',
			async : false,
			
			//		extraParams : {},				
					
			reader: {
					type: 'json',
					root: 'root'
			}
	},

	autoLoad: true
			
});	