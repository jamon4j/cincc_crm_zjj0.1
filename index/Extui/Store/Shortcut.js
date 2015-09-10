/**
 * Created by Wade on 2015/4/30.
 */
Ext.define('CINCC.store.Shortcut', {
	extend: 'Ext.data.Store',
	
	fields: [
		'path',
		'node'
	],
	autoLoad: false,
	proxy: {type: 'memory'}
});