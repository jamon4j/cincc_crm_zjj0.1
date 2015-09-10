/*
 *   author: zjj
 *   date: 15/9/9
 *   func:    WinType5 装入grid的window，有提交button
 */
Ext.define('Extui.UIType.Win.WinType5', {
    
    extend :  'Ext.window.Window',
    
    constrain: true,
    
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