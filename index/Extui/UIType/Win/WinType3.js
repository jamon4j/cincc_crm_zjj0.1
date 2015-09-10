/*
 *   author: zjj
 *   date: 15/8/18
 *   func:  WinType3 两个button 信息修改、注册窗口
 */
Ext.define('Extui.UIType.Win.WinType3', {
    
    extend :  'Ext.window.Window',
    
    constrain: true,
    defaults : {
        // margin: '10 10 0 10',               
    },  
    
    modal:true,
    
    items : [
    {
        xtype:"form",
        frame   : true,

        layout : "column",                 
        defaults:{
            labelAlign : "right",
            xtype : "textfield",
            itemCls: 'required',    
            style: 'margin-top:5px;margin-left:15px;',
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