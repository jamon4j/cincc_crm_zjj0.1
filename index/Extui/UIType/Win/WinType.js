Ext.define('Extui.UIType.Win.WinType', {
	
	extend :  'Ext.window.Window',
	
	defaults : {
		width:300			
	},	
		
	modal:true,
		
	items : [
	{

		xtype:"form",
		
		frame	: true,
		
		bodyPadding:10,
		
		defaults:{
			anchor:'100%',
			labelWidth:120
	},
		items:[]
		
	}],
	
	bbar:[
			'->',
			{	
				xtype   : 'button',
				text    : '提交',
				itemId	: 'save',                   
			},'-',	
			{
			
				xtype   : 'button',
				text    : '取消',
				itemId  : 'cancel'  

		}]
	
});