Ext.define('Extui.Store.NodeStore',{	
	
	extend: 'Ext.data.Store', 
	
	alias	:	'widget.nodestore',

	fields: [{
						name: 'nodeId',
						type: 'string'
					}, {
						name: 'nodeName',
						type: 'string'
					}],
							
	proxy  : {
				type : 'ajax',
				timeout: 900000,
				url  : 'php/node.php',
				getMethod : function(){
					return 'POST';
				},
			
				extraParams : { 
					 'command.vccId':1			//CinSession.userDetails.corpVccId
				},			
				
				reader : {
					type : 'json',
					root : 'root',						//rtnCtx.pageResult.pageDataList',
					totalProperty : 'total'		//rtnCtx.pageResult.pageInfo.totalCount'
				}
			},
			
	autoLoad : true
		
});
