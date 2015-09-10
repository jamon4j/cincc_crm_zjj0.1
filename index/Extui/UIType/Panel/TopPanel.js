Ext.define('Extui.UI.RoleAgent1.OrderProc.TopPanel', {

    extend: 'Ext.panel.Panel',

    modal:false,

    alias: 'widget.a1orderproctoppanel',
    
    title: '订单处理窗口',
      
		layout : {
			type  : 'fit',
		},
		
/*	  tbar : [

				{
					xtype   : 'button',
					iconCls : 'add_node',
					text    : '<font style=" font-weight:bold">再受理</font>',	
					
					itemId  : 'winoper1'	
				}
		],
*/			       
    items: [
        {
        	xtype:'tabpanel',
        	itemId:'tabpanel'  	
        }
    ]
        
});