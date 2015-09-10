/*
 *   author: zjj
 *   date: 15/9/9
 *   func:  WinType4 装入grid的window，无提交button，用于显示详情
 */
Ext.define('Extui.UIType.Win.WinType4', {
    
    extend :  'Ext.window.Window',
    
    constrain: true,
    
    modal:true,

    items : [
    {
        xtype:"form",
        frame   : true,

        layout : "fit",         
        defaults:{
            labelAlign : "right",
            labelWidth: 80,
            xtype : "textfield",
            itemCls: 'required',    
        },

        items:[]
        
    }],
    
});