/*
 *   author: zjj
 *   date: 15/8/14
 *   func:   FormType2 只有提交和取消按钮
 */
Ext.define('Extui.UIType.Form.FormType2', {
    
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