Ext.define('Extui.Store.queueUpSoundStore',{  
    
    extend: 'Ext.data.ArrayStore', 
    
//  alias   :   'widget.astore',
    data: [
    ['1', 'successSendFax1.wav'], ['2', 'successSendFax2.wav'], ['3', 'successSendFax3.wav'], ['4', 'successSendFax4.wav'], ['5', 'successSendFax5.wav']],
    fields: ['value','text'],
    sortInfo: {
        field: 'value',
        direction: 'ASC'
    }

    /*fields: [
                {
                    name: 'tr_corp_id',
                    type: 'string'
                },{
                    name: 'vccName',
                    type: 'string'
                },{
                    name: 'displayNumber',
                    type: 'string'
                },{
                    name: 'tr_corp_status',
                    type: 'string'
                }
            ],  
        
    sortInfo:{field:'tr_corp_id',direction:"DESC"},
            
    proxy  : {
                type : 'ajax',
                timeout: 900000,
                url  : 'http://localhost:8080/WorkListAllot/enterpriseInfo/getInfo',
                
                getMethod : function(){
                    return 'POST';
                },
    //          extraParams : {},    //params,
                reader : {
                    type : 'json',
                    root : 'root',                      //rtnCtx.pageResult.pageDataList',
                    totalProperty : 'total'     //rtnCtx.pageResult.pageInfo.totalCount'
                }
            },
        
//  pageSize : 50,
    
    autoLoad : true
    
    /*      
    autoLoad : {
            params : {
                    start : 0,
                    limit : 50
            }
        }
     */

});
