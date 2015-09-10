Ext.define('Extui.Store.AgentStore3',{	
	
	extend: 'Ext.data.Store', 
	
//	alias	:	'widget.astore',

	fields: [
				{
					name: 'agtId',
					type: 'string'
				},{
					name: 'agtName',
					type: 'string'
				},{
					name: 'vccId',
					type: 'string'
				},{
					name: 'agtGrpId',
					type: 'string'
				},{
					name: 'agtGrpName',
					type: 'string'
				},{
					name: 'agtRole',
					type: 'string'
				},{
					name: 'agtStatus',
					type: 'string'
				},{
					name: 'streamNumber',
					type: 'string'
				},{
					name: 'ccNodeId',
					type: 'string'
				}
			],	
	
	
	sortInfo:{field:'agtGrpName',direction:"DESC"},
			
	proxy  : {
				type : 'ajax',
				timeout: 900000,
				url  : 'php/Agent.php',
				
				getMethod : function(){
					return 'POST';
				},
	//			extraParams : {},    //params,
				reader : {
					type : 'json',
					root : 'root',						//rtnCtx.pageResult.pageDataList',
					totalProperty : 'total'		//rtnCtx.pageResult.pageInfo.totalCount'
				}
			},
		
//	pageSize : 50,
	
	autoLoad : true
	
	/*		
	autoLoad : {
			params : {
					start : 0,
					limit : 50
			}
		}
	*/		
});
