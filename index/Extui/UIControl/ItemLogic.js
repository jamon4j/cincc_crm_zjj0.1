Ext.define('Extui.UIControl.ItemLogic', {
	
    constructor: function (config) {
        
        Ext.apply(this, config);
        
   //     this.callParent(config);
    },

    setItemValue: function(itemId, value){

        var item = this.getItem(itemId);

        if(item) {
        	
            item.setValue(value);

            return item;
        }
        else return null;
    },

    setItemRecord: function(record) {

        var data = record.data;

				this.setItemValues(data);
				
    },


   setItemValues: function(obj) {

        var data = obj;

        var cg = this.form.query('checkboxgroup');

        (function(){
            for(var i= 0,len=cg.length;i<len;i++){
                if('checkboxgroup'===cg[i].xtype){
                    var obj = {};

                    obj[cg[i].name] = data[cg[i].name]?data[cg[i].name].split(','):null;
                    data[cg[i].name] = obj;
                }
            }
        })();

        this.form.getForm().setValues(data);

        var rg = this.form.query('radiogroup');

        (function(){
            for(var i in rg){
                var obj = {};
                obj[rg[i].name] = data[rg[i].name];
                rg[i].setValue(obj);
            }
        })();

   },
     
    getItemValue: function(itemId, simpleResult) {
        
        var item = this.getItem(itemId);
        
        if(item) {
     
            var value = item.getValue();
            
            if('undefined' == typeof simpleResult)
                simpleResult = false;
            
            if(simpleResult && Ext.isObject(value)) {
                return value[itemId] || value;
            }
            else return value;
        }
        else return null;
    },

    getItemText: function(itemId) {
        
        var item = this.getItem(itemId);
                
        if(item) {
            if('radiogroup' == item.getXType()) {
            	
                return item.getChecked()[0].boxLabel;
            }
            else {
                return item.findRecordByValue(item.getValue()).data.text;
            }
        }
        else return null;
    },


   	getItemValues: function() {
     
     var values = null;
     
     if(this.form.isDisabled()) {
     		
     		this.form.setFormEnabled();
     
     		values = this.form.getValues();
     
     		this.form.setFormDisabled();
     	
     		return values;
     }
     else 
     		return this.form.getValues();
     
     },
     

    setItemEn: function(en, itemId) {

        if('undefined' == typeof(itemId)){

            var displayList = this.query('textfield,radiogroup,checkboxgroup,combobox');
  
            //console.log(displayList);
  
            for (var i in displayList) {
  
                displayList[i].setDisabled(!en);
  
                if(displayList[i].readOnly) {
                    displayList[i].addCls('x-item-disabled');
                }
            }
        }
        else {

            var item = this.getItem(itemId);
            
            console.info("enter getItem:"+itemId);
            console.info(item);

            if(item) item.setDisabled(!en);

            if(item.readOnly) {
                item.addCls('x-item-disabled');

            }
        }
    },


    setItemVisiable : function(itemId,visiable){
    	
        var item = this.getItem(itemId);

       if(item){ 
       	
            item.setVisible(visiable);
            
            this.setItemEn(visiable,itemId);
            
        }
    },


    setFormDisabled: function() {
        this.setItemEn(false);
    },

    setFormEnabled: function() {
        this.setItemEn(true);
    },
    
    getItem : function(itemId){
        
        return this.form.down('#'+itemId);
        
    }

});