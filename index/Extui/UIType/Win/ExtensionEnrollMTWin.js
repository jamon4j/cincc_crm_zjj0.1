Ext.define('Extui.UIType.Win.ExtensionEnrollMTWin', {

    extend: 'Ext.window.Window',
    
    modal:true,

    constrain: true,

    margin: '10 10 0 10',               
              
    layout : 'fit',

           
    items: [
        {
            xtype:'tabpanel',
            itemId:'tabpanel'   
        }
    ]
        
});