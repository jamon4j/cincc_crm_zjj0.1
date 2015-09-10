Ext.define('Extui.UIType.Grid.GridTypeNoQuery',{  
    
        extend : 'Ext.grid.Panel', 
                                                        
        collapsible:true,      
        columnLines: true,
                
        viewConfig:{
            width:100,
            stripeRows: true
        },
        
        title:'',
        store: null,     

        dockedItems: [  
        {
            xtype: 'toolbar',
            dock: 'top',
            itemId:'tb1',
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
            btn[i] = Ext.create('Ext.Button',{
                itemId:item.itemId,
                text:item.text,
                iconCls:item.iconCls
            });
        }
        var gridId = this.itemId;

        var tb = this.down('#tb1');

         for(var i = 0;i < btn.length;i++) {
             tb.add(btn[i]);
         }
    },    

});