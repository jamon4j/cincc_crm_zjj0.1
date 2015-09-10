Ext.define('Extui.UIType.Panel.PanelType', {
	
	extend : 'Ext.panel.Panel',
	
	frame  : true,
	
	border : false,
	
	collapsible : false,
	
	autoScroll  : true,
	
	width		:	'100%',
	height	:	400,
		
	items  : [],

	layout : {
		type  : 'vbox',
		align : 'stretch'/*'center' 'stretch'*/
	}
	
});