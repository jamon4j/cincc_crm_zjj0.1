Ext.define('Extui.UIType.Win.MTWin1', {

    extend: 'Ext.window.Window',
    
    modal:true,

    constrain: true,
     
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