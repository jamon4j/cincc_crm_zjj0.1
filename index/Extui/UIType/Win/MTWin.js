Ext.define('Extui.UIType.Win.MTWin', {

    extend: 'Ext.window.Window',
    
    modal:true,

    constrain: true,
    x:400,
    y:150,
    width:670, 
    margin: '10 10 0 10',               
              
	layout : {
		type  : 'fit',
	},
	       
    items: [
        {
        	xtype:'tabpanel',
        	itemId:'tabpanel'  	
        }
    ]
        
});