Ext.define('Extui.Store.RoleStore',{	
	
	extend: 'Ext.data.Store', 
	
	alias	:	'widget.rolestore',

	fields: [{
						name: 'roleId',
						type: 'string'
					}, {
						name: 'roleName',
						type: 'string'
					}],
							
	proxy  : {
				type : 'ajax',
				timeout: 900000,
				url  : 'php/role.php',
				
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
