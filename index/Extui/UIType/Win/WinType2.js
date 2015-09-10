/*
 *   author: zjj
 *   date: 15/8/20
 *   func:   WinType2 文本框只读，没有button，一般用于显示详情
 */
Ext.define('Extui.UIType.Win.WinType2', {
    
    extend :  'Ext.window.Window',

    constrain: true,
    margin: '10 10 0 10',               
    
    modal:true,
    
    items : [
    {
        xtype:"form",
        frame: true,
        layout : "column",                 
        defaults:{
            readOnly: true,
            fieldStyle:'color:gray',
            labelAlign : "right",
            xtype : "textfield",
            itemCls: 'required',    
            style: 'margin-top:5px;margin-left:15px;',
        },

        items:[]
        
    }],
    
});