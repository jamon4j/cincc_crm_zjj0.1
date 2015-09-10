Ext.define('Extui.Store.HolidayStore',{  
    
    extend: 'Ext.data.ArrayStore', 
    
    data: [
    ['1', '中秋节'], ['2', '国庆节'], ['3', '春节']],
    fields: ['value','text'],
    sortInfo: {
        field: 'value',
        direction: 'ASC'
    }

});
