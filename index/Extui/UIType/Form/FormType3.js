/*
 *   author: zjj
 *   date: 15/9/8
 *   func:   FormType3 提交和取消按钮,带有动态列表框itemselector
 */
Ext.define('Extui.UIType.Form.FormType3', {
    
        extend :  'Ext.form.Panel',

        layout : "column", 
        frame   : true,

        defaults:{
            labelAlign : "right",
            xtype : "textfield",
            itemCls: 'required',    
            style: 'margin-top:5px;margin-left:15px;',
        },
                            
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