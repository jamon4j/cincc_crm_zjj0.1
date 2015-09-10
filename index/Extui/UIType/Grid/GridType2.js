Ext.define('Extui.UIType.Grid.GridType2',{  
    
        extend : 'Ext.grid.Panel', 
                                                        
        collapsible:true,      
        columnLines: true,
                
        viewConfig:{
            stripeRows: true
        },
        
        title:'',
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
            
                xtype   :   'form',

                itemId:'queryform',
                
                title:"查询条件",
                
                width: '100%',
                            
                layout:
                {
                        type  : 'column',
                        align : 'left' /*'center' 'stretch'*/
                },

                defaults:{
                        labelAlign  : 'right',
                        labelWidth:70,
                        columnWidth:.2,
                        padding:3       
                },

                collapsible:true,

                collapsed:true,
                
                dockedItems: [{

                        xtype: 'toolbar',
                        dock: 'bottom',

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
            itemId:'tb1',
            layout:'hbox',
            items:[                     
                
            ]
        },          
        {
                xtype : 'pagingtoolbar',
            
                dock:'bottom',
                                                                                                                                        
                itemId  :'pagingb',
                                                        
                store    : null,
                                                                        
                displayInfo : true,
                
                displayMsg  : '本页显示第{0}条到第{1}条记录,一共{2}条',
                emptyMsg    : '没有记录'                          
        },
        ],
        
        columns:[],
                            
    initComponent:function(config) {
        this.selModel = Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"});
        this.callParent(arguments);       
    },

    beforeRender:function() {
        var btn = [];
        for(var i = 0;i < this.toolbarCfg.items.length;i++) {
            var item = this.toolbarCfg.items[i];
            var xtype = item.xtype;
            if(xtype === 'button') {
                btn[i] = Ext.create('Ext.Button',{
                    itemId:item.itemId,
                    text:item.text,
                    iconCls:item.iconCls
                });
            }  

            if(xtype === 'combobox') {
                btn[i] = Ext.create('Ext.form.ComboBox',{
                    itemId:item.itemId,
                    width:item.width,
                    columnWidth:item.columnWidth
                });
            }                    
        }

        var gridId = this.itemId;

        var tb = this.down('#tb1');

         for(var i = 0;i < btn.length;i++) {
             tb.add(btn[i]);
         }
    },    

});