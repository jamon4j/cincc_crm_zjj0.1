Ext.define('Extui.UI.CommHistory.Reply.Form', {
	
	extend :  'Extui.UI.BasicOrder.Reply.Form',                     //window.Window',
	
	alias	 : 'widget.historyreplyform',
	
	title: '回复form',
		
	frame:true,
	
	layout : {
			type  : 'vbox',
			align : 'stretch'/*'center' 'stretch'*/
	},
		
	defaults  :{ 
	 		anchor:'100%',
			labelWidth:80,
			
	}
	/*,
	    				
	bbar:[
			'->',
			{	
				xtype   : 'button',
				text    : '修改',
				itemId	: 'modify',
				vflage   : 1                      
			},'-',		
			{
			
				xtype   : 'button',
				text    : '取消',
				itemId  : 'cancel'  

	}]
 */	
});