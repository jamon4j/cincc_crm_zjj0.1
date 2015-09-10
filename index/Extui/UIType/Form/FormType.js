Ext.define('Extui.UIType.Form.FormType', {
	
		extend :  'Ext.form.Panel',
		
		autoHeight : true,
        frame : true,
        layout : "column", 

		defaults:{
            labelAlign : "right",
            xtype : "textfield",
            itemCls: 'required',    
            style: 'margin-top:5px;'
        },
			  				
		bbar:[
			'->',
			{	
				xtype   : 'button',
				text    : '修改',
				itemId	: 'modify',                   
			},'-',	
			
			{
			
				xtype   : 'button',
				text    : '查询',
				itemId  : 'notify'  

			},	
			{
			
				xtype   : 'button',
				text    : '取消',
				itemId  : 'cancel'  

		}]
	
});