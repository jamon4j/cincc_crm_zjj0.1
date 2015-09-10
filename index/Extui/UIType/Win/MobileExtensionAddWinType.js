/*
 *   author: zjj
 *   date: 15/8/31
 *   func:  MobileExtensionAddWinType 装入grid的winType
 */
Ext.define('Extui.UIType.Win.MobileExtensionAddWinType', {
    
    extend :  'Ext.window.Window',
    
    constrain: true,
    defaults : {
        width:800,
        height:400,              
    },  
    
    modal:true,
    
    items : [
    {
        xtype:"form",
        frame   : true,

        layout : "fit",     
        align:'stretch',            
        defaults:{
            labelAlign : "right",
            labelWidth: 80,
            xtype : "textfield",
            itemCls: 'required',    
        },

        items:[]
        
    }],
    
    bbar:['->',
            {   
                xtype   : 'button',
                text    : '提交',
                itemId  : 'save',                   
            },
            {
            
                xtype   : 'button',
                text    : '取消',
                itemId  : 'cancel'  

        }]
    
});