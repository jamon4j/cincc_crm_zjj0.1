Ext.define('Extui.UIType.Grid.GridType3',{	
	
		extend : 'Ext.grid.Panel', 
										
		frame  : true,				
		
		collapsible:true,		
	    columnLines: true,
	        		
	    viewConfig:{
	    	width:100,
	    	stripeRows: true
	    },
    
	  	store: null,	
	    		
		dockedItems: [	
			{
				xtype: 'toolbar',
				dock: 'top',
				layout: 'hbox',
				bodyPadding: 0,
				autoScroll: true,
				enableOverflow: true,
				
				defaultButtonUI: 'default',
				
				itemId:'queryid',
				
				items: [{
				
							xtype	:	'form',

							itemId:'queryform',
							
							title:"查询条件",
							
							width: '100%',
										
							layout:
							{
									type  : 'column',
									align : 'stretch' /*'center' 'stretch'*/
							},

							defaults:{
									labelAlign  : 'right',
									labelWidth:70,
									columnWidth:.3,
									padding:3		
							},
			
							collapsible:true,
		
							collapsed:true,
							
							dockedItems: [{
	
									xtype: 'toolbar',
									dock: 'top',

									items:[
									
									'->',
									
									{
													xtype: 'button',
													itemId: 'query',
													text: '查询',
													iconCls: 'add'
  							}]
  					}]
				}]
			},

			{
	
				xtype: 'toolbar',
				dock: 'top',

				items:[			      		
					{
							xtype: 'button',
							itemId: 'oper1',
							text: '新增记录',
							iconCls: 'add'
  			},
  			{
     				xtype: 'tbseparator'
  			},
  			{
      			xtype: 'button',
      			itemId: 'oper2',
      			text: '删除记录',
	      			iconCls: 'save_all'
	  			}
				]
			},			

			{
		 			xtype : 'pagingtoolbar',
				
					dock:'bottom',
																																			
					itemId	:'pagingb',
															
					store    : null,
																			
					displayInfo : true,
					
					displayMsg  : '本页显示第{0}条到第{1}条记录,一共{2}条',
					emptyMsg    : '没有记录'

			}		
					
		],
		
		columns:[],
					 		
    initComponent:function(config) {

        this.selModel = Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"});
                
        this.callParent(arguments);
        
    }
			
});