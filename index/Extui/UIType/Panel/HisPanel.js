Ext.define('Extui.UIType.Panel.HisPanel', {

    extend: 'Ext.panel.Panel',

    width: 600,
    height:450,
    
    autoScroll	: true,
          
		layout : {
			type  : 'vbox',
			align : 'stretch'/*'center' 'stretch'*/
		},
		
    items: [    
        {
        	xtype:'grid', 

        	flex :2,        				
	  			store: null,
	  			columns : [
							{
									header    : '组ID',
									align  		: 'center',
									dataIndex : 'agtGrpId',
									sortable	:true
							},
							{
									header    : '班组名称',
									align 		: 'center',
									dataIndex : 'agtGrpName',
							},
							{
									header : '查看',
									align  : 'center',
									xtype  : 'actioncolumn',
					
									itemId : 'oper3',
					
									//		width:'20%',
									items  : [{
											iconCls : 'pencil_icon',
											tooltip : '查看'	
									}]
							},
							{
								header : '删除',
								align  : 'center',
								xtype  : 'actioncolumn',
								
								itemId : 'oper5',
								
						//		width     : '20%',
								items  : [{
										iconCls : 'delete_node',
										tooltip : '删除'
									}]	
							}
					]			
				},

        {
        	xtype: 'tabpanel',
        	flex:3,
        	border    : true                  
        }
   ]
});