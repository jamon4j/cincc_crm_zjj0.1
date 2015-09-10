Ext.define('Extui.UI.QueryClient.Add.Win', {
	
	extend :  'Ext.window.Window',
	
	requires:["Extui.UI.BasicClient.Add.Form"],
		
	alias	 : 'widget.rcdadd',
	

	title: '增加客户',

	defaults : {
		width:400,
		margin: '20 20 0 10',				
	},	
	
	modal:true,
	
	items : [
	{

		xtype:"addform",
						
		defaults:{
			frame:false,
			anchor:'100%',
			labelWidth:80

		}
	}],
	
	bbar:[	
			'->',
			{
			xtype   : 'button',
			text    : '<font style=" font-weight:bold">提交</font>',
			itemId	: 'save'    
			},
			
			'-',
			{
			
				xtype   : 'button',
				text    : '查询',
				itemId  : 'notify'  

			},	
			{
			
			xtype   : 'button',
			text    : '取消',
			itemId  : 'cancel'      
			}
	]
	
});