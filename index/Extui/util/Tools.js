/**
 * Created by Wade (weida1985@163.com) on 2015/4/21.
 */
Ext.define('Extui.util.Tools', {
	singleton: true,

	constructor: function (config) {
		Ext.apply(this, config);
	},

	obj2Array: function (targetObj) {
		if (Ext.isArray(targetObj)) {
			return targetObj;
		}
		var slice = Array.prototype.slice;
		return slice.apply(arguments);
	},

	getVarText: function (text) {
		//var re = /^\$\{(.*)\}$/g;
		var re = /\$\{[^\$\{]*?\}/g;
		//var re = /\$\{[^\{]*?\}/g;
		var v = text.match(re);
		if (v) {
			Ext.Array.each(v, function (item, index, self) {
				self[index] = item.substring(2, item.length - 1);
			});
			return v;
		}
		else
			return null;
	},

	replaceVarText: function (text, varMap, style) {
		return varMap ? text.replace(/\$\{[^\{]*?\}/g, function ($0/*, $1*/) {
			var name = $0.substring(2, $0.length - 1);
			if (varMap[name]) {
				var str = Ext.isString(varMap[name]) ? varMap[name] : varMap[name].value;
				if (style)
					return Ext.String.format(style, str);
				else
					return str;
			}
			else {
				console.info('Variable map has no value of (' + name + ')', varMap);
				return $0;
			}
		}) : null;
	},

	isMatchCondition: function (event, varMap) {
		if (varMap) {
			var indexLeft = event.indexOf('(');
			var label = event.substring(0, indexLeft);
			var params = event.substring(indexLeft + 1, event.length - 1);
			//equal,in,not in,and,or
			if (label == 'equal') {
				return this.equalFunc(params, varMap);
			}
			if (label == 'in') {
				return this.inFunc(params, varMap);
			}
			if (label == 'not') {
				return this.notFunc(params, varMap);
			}
			if (label == 'and') {
				return this.andFunc(params, varMap);
			}
			if (label == 'or') {
				return this.orFunc(params, varMap);
			}
		}
		else
			return null;
	},

	findValueByCondition: function (conditionArray, orgValue) {
		//console.info(arguments);
		var sep = ',';
		if (orgValue) {
			var inputValue = parseInt(orgValue);
			var outputValue = 0;
			//var conArr = condition.split(sep);

			/*var testArray = [
			 {expr: /(gte:)/, to: '>='},
			 {expr: /(gt:)/, to: '>'},
			 {expr: /(lte:)/, to: '<='},
			 {expr: /(lt:)/, to: '<'}
			 ];*/

			var len = conditionArray.length;
			Ext.Array.each(conditionArray, function (condition, index) {
				/*Ext.Array.each(testArray, function(test) {
				 condition['value'] = condition.value.replace(test.expr, test.to);
				 }, this);*/

				//console.info(condition);
				var con = condition['value'].split(sep);
				if (1 == con.length && inputValue == con[0]) {
					outputValue = parseInt(condition.to);
					return false;
				}
				else {
					var result = true;
					Ext.Array.each(con, function (c) {
						try {
							result &= eval(inputValue + c);
						}
						catch (e) {
							console.error(e);
							//todo error
							result = false;
							return false;
						}
					}, this);

					if (result) {
						outputValue = parseInt(condition.to);
						return false;
					}
				}
				if (index == len - 1) {
					console.info('Not match any expression, return default 0');
					outputValue = null;
				}
			}, this);

			return outputValue;
		}
		return null;
	},

	equalFunc: function (params, varMap) {
		var paramArr = params.split(',');
		var varName = paramArr[0];
		var varValue = paramArr[1];
		var decVar = varMap[varName] || '';
		return (decVar == varValue);
	},


	inFunc: function (params, varMap) {
		var paramArr = params.split(',');
		var varName = paramArr[0];
		var pattValue = paramArr[1];
		var pattArr = pattValue.split('|');
		var decVar = varMap[varName];

		if ('undefined' != typeof(decVar) && null != decVar) {
			for (var i = 0; i < pattArr.length; i++) {
				var pattStr = pattArr[i];
				var match = true;
				for (var j = 0; j < pattStr.length && match; j++) {
					var ch = pattStr.charAt(j);
					if (-1 == decVar.indexOf(ch)) {
						match = false;
					}
				}
				if (match == true)
					return true;
			}
		}
		return false;
	},


	notFunc: function (params, varMap) {
		var match = this.isMatchCondition(params, varMap); //isMatchCondition(params,varMap);//返回的是in 的结果
		return !match; //符合in 的condition，返回false
	},

	andFunc: function (params, varMap) {
		var paramArr = params.split('&&');
		var returnVal = true;

		for (var i in paramArr) {
			var tempVal = this.isMatchCondition(paramArr[i], varMap);
			returnVal = returnVal && tempVal;
		}
		return returnVal;
	},

	orFunc: function (params, varMap) {
		var paramArr = params.split('||');
		var returnVal = false;

		for (var i in paramArr) {
//			var tempVal = rsEvent(paramArr[i]);
			var tempVal = this.isMatchCondition(paramArr[i], varMap); //todo check
			returnVal = returnVal || tempVal;
		}
		return returnVal;
	},

	getSimpleParamFromModel: function (modelName, table) {
		var model = Ext.ModelManager.getModel(modelName);
		if (model) {
			var fields = model.getFields();
			var columns = [];
			Ext.Array.each(fields, function (dataItem, index) {
				if ('modelId' !== dataItem.name) //return false; //Model add an attribute "id" itself
					columns.push(dataItem.name);
			});

			//console.info(columns);
			return {
				table: table,
				column: columns.join('#')
			};
		}
		else {
			console.error('Model name [' + modelName + '] doesn\'t registered.');
			return null;
		}
	},

	calcLoginDuration: function () {
		var time = Ext.Date.getElapsed(CINCC.Session.getLoginTime());
		time = parseInt(time / 1000);
		var seconds = time % 60;
		var minutes = (parseInt((time - seconds) / 60)) % 60;
		var hours = parseInt(time / 3600);

		if (hours < 10)   hours = '0' + hours;
		if (minutes < 10) minutes = '0' + minutes;
		if (seconds < 10) seconds = '0' + seconds;

		return hours + '时' + minutes + '分' + seconds + '秒';
	},

	executeSql: function (cmd, table, namesArray, valuesArray, condition, updateTimeColumnName, streamNumberColumnName, otherInfo) {
		var jsonResult = {};
		if ('DELETE' == cmd) {
			var sqlArray = [];
			Ext.Array.each(namesArray, function (item, index) {
				sqlArray.push(item + '=' + valuesArray[index]);
			});

			var sql = 'DELETE FROM ' + table + ' WHERE ' + sqlArray.join(' AND ');
			jsonResult = Ext.create('CINCC.Util.Request', {
				url: CINCC.Session.defaultUrl.dbOperate,
				params: {sql4execute: sql}
			}).getJsonObj();
		}
		else {
			var url = CINCC.Session.defaultUrl.dbOperateAuto;
			var params = {
				cmd: cmd, //'INSERT', 'UPDATE'
				table: table,
				names: namesArray.join('#'),
				values: valuesArray.join('#'),
				searchConditions: condition || '',
				updateTime: updateTimeColumnName || '',
				streamNumber: streamNumberColumnName || ''
			};

			if (otherInfo) {
				Ext.apply(params, {
					cmd: 'INSERT',
					wfContent: otherInfo.wfContent || '',
					idField: otherInfo.idField || 'stream_number',
					seqField: otherInfo.seqField || 'session_number',
					flagField: otherInfo.flagField || 'last_flag'
				});
				url = CINCC.Session.defaultUrl.dbOperateWorkFlow;
			}
			else {
				if ('UPDATE' == cmd) {
					if ('undefined' == typeof(condition) || '' == condition) {
						Ext.Msg.alert('提示', 'UPDATE 语句缺乏条件！');
						return;
					}
				}
			}
			jsonResult = Ext.create('CINCC.util.Request', {url: url, params: params}).getJsonObj();
		}

		if (jsonResult && jsonResult.success) {
			return true;
		}
		else {
			if ('DELETE' == cmd) {
				cinDebug(jsonResult, '数据库删除错误！', 2);
				Ext.Msg.alert('提示', '数据库删除错误' + jsonResult.reason);
			}
			else {
				cinDebug(jsonResult, 'INSERT' == cmd ? '数据库插入错误！' : '数据库更新错误', 2);
				Ext.Msg.alert('提示', 'INSERT' == cmd ? '数据库插入错误！' : '数据库更新错误' + jsonResult.reason);
			}
			return false;
		}
	},

	createAppoint: function (appointInfo) {
		var params = Ext.apply({
			streamNumber: '',
			//sessionNumber: '',
			'corp.id': '',
			rptStreamNumber: '',
			rptObjId: '',
			agentId: '',
			agentName: '',
			projectId: '',
			projectName: '',
			taskId: '',
			taskName: '',
			customerNumber: '',
			appointTime: '',
			remark: ''
		}, appointInfo);
		//console.info(params);
		var url = CINCC.Session.defaultUrl.appointCreate;
		var jsonResult = Ext.create('CINCC.util.Request', {url: url, params: params}).getJsonObj();
		if (jsonResult && jsonResult.success) {
			return true;
		}
		else {
			cinDebug(jsonResult, '创建预约失败！', 2);
			Ext.Msg.alert('提示', '创建预约失败' + jsonResult.reason);
			return false;
		}
	},

	updateAppoint: function (appointInfo) {
		var params = Ext.apply({
			streamNumber: '',
			sessionNumber: '',
			'corp.id': '',
			rptStreamNumber: '',
			rptObjId: '',
			agentId: '',
			agentName: '',
			projectId: '',
			projectName: '',
			taskId: '',
			taskName: '',
			customerNumber: '',
			appointTime: '',
			remark: ''
		}, appointInfo);
		//console.info(params);
		var url = CINCC.Session.defaultUrl.appointUpdate;
		var jsonResult = Ext.create('CINCC.util.Request', {url: url, params: params}).getJsonObj();
		if (jsonResult && jsonResult.success) {
			return true;
		}
		else {
			cinDebug(jsonResult, '更新预约失败！', 2);
			Ext.Msg.alert('提示', '更新预约失败' + jsonResult.reason);
			return false;
		}
	},

	deleteAppoint: function(streamNumber, sessionNumber) {
		var jsonResult = Ext.create('CINCC.util.Request', {
			url: CINCC.Session.defaultUrl.appointDelete,
			params: {
				streamNumber: streamNumber || '',
				sessionNumber: sessionNumber || ''
			}
		}).getJsonObj();
		if (jsonResult && jsonResult.success) {
			return true;
		}
		else {
			cinDebug(jsonResult, '删除预约失败！', 2);
			Ext.Msg.alert('提示', '删除失败' + jsonResult.reason);
			return false;
		}
	},

	getStreamNum: function () {
		return Ext.create('CINCC.util.Request', {url: CINCC.Session.defaultUrl.getStreamNo}).getText();
	},

	findRecordByStreamNum: function (table, streamNum, findLast, column) {
		var searchCondition = "stream_number='" + streamNum + "'";
		if (findLast) searchCondition += ' AND last_flag=1';

		return Ext.create('CINCC.util.Request', {
			url: CINCC.Session.defaultUrl.dbBasic,
			params: {table: table, column: column ? column : '*', searchConditions: searchCondition}
		}).getJsonObj();
	},

	getCinStore: function (storeId, storeCfg, tableNameVars) {
		//console.info(storeCfg);
		if (storeId) {
			var store = Ext.data.StoreManager.lookup(storeId);
			if (store) return {store: store};
		}

		if (storeCfg) {
			if ('undefined' == typeof(storeCfg.gridArray)) {
				if ('CatiAnswer' == storeId) {
					//todo find xml, load config
				}
			}

			var fields = [], columns = [], exportColumns = [], columnAlias = [], extraParams = {}, gridColumns = [];
			gridColumns.push({xtype: 'rownumberer', width: 30});

			Ext.Array.each(storeCfg.gridArray, function (item) {
				fields.push({
					name: item.dataIndex,
					zhCn: item.zh_cn,
					mapping: item.zh_cn,
					type: item.dataType,
					sqlExpr: item.export
				});
				columns.push(item.dataIndex);
				exportColumns.push(item.export || item.dataIndex);
				columnAlias.push(item.zh_cn);

				var columnCfg = {
					header: item.zh_cn,
					dataIndex: item.dataIndex,
					hidden: 'false' === item.display,
					width: item.width
				};

				switch (item.dataType) {
					case 'time':
					case 'date':
						columnCfg.renderer = this.columnTimeRender;
						break;
					case 'duration':
						columnCfg.renderer = this.columnDurationRender;
						break;
					case 'satisfaction':
						columnCfg.renderer = this.columnSatisfactionRender;
						break;
					case 'appointStatus':
						columnCfg.renderer = this.columnAppointStatusRender;
						break;
					case 'successStatus':
						columnCfg.renderer = this.columnSuccessStatusRender;
						break;
					case 'contactStatus':
						columnCfg.renderer = this.columnContactStatusRender;
						break;
					case 'rejectStatus':
						columnCfg.renderer = this.columnRejectStatusRender;
						break;
					case 'agentId':
						columnCfg.renderer = this.columnAgentIdRender;
						break;
					default:
						break;
				}

				gridColumns.push(columnCfg);
			}, this);

			var tableArray = [], tableAliasArray = [], orgTable = [];
			var tableCfg = this.obj2Array(storeCfg.table);

			Ext.Array.each(tableCfg, function (t) {
				var tableRealName = '';
				if (Ext.isString(t)) {
					tableRealName = this.composeTableName(t, tableNameVars);
					tableArray.push(tableRealName);
					tableAliasArray.push('');
					orgTable.push({
						realName: tableRealName,
						name: t,
						alias: ''
					})
				}
				else {
					tableRealName = this.composeTableName(t.name, tableNameVars);
					tableArray.push(tableRealName);
					tableAliasArray.push(t.alias);
					orgTable.push({
						realName: tableRealName,
						name: t.name,
						alias: t.alias
					})
				}

			}, this);

			if (storeCfg.searchConditions) {
				storeCfg.searchConditions = this.composeTableName(storeCfg.searchConditions, tableNameVars)
			}

			extraParams = {
				table: tableArray.join('#') || '',
				tableAlias: tableAliasArray.join('#') || '',
				column: columns.join('#'),
				columnAlias: columnAlias.join('#'),
				groupBy: storeCfg.groupBy || '',
				joinKey: storeCfg.joinStr || '',
				prefix: storeCfg.interval || '',
				orderBy: Ext.isArray(storeCfg.orderBy) ? storeCfg.orderBy.join(' , ') : (storeCfg.orderBy || ''),
				searchConditions: storeCfg.searchConditions
			};

			//console.info(extraParams);
			var storeCfgFinal = {
				fields: fields,
				//id: storeId || undefined,
				proxy: {
					type: 'ajax',
					url: storeCfg.url || CINCC.Session.defaultUrl.dbBasic,
					extraParams: extraParams,
					exportColumns: exportColumns.join('#'),
					orgConditions: storeCfg.searchConditions,
					orgTable: orgTable,
					reader: {type: 'json', root: 'root', totalProperty: 'total'}
				},
				pageSize: storeCfg.pageSize || 20,
				autoLoad: storeCfg.autoLoad,

				listeners: {
					scope: this,
					load: this.dataLoadFailed
				}
			};

			if (storeId)
				storeCfgFinal.storeId = storeId;

			return {
				store: Ext.create('Ext.data.Store', storeCfgFinal),
				columns: gridColumns
			};
		}
		else return null;
	},

	resetStoreSearchCondition: function (store, newConditions) {
		var proxy = store.getProxy();
		var prefix = proxy.orgConditions;
		if (prefix) prefix += ' AND ';
		if (Ext.isArray(newConditions) && newConditions.length>0)
			proxy.extraParams.searchConditions = prefix + newConditions.join(' AND ');
		else if (Ext.isString(newConditions))
			proxy.extraParams.searchConditions = prefix + newConditions;
		else
			proxy.extraParams.searchConditions = proxy.orgConditions;
	},

	resetStoreTable: function (store, varMap) {
		var tableArray = [], tableAliasArray = [];
		var proxy = store.proxy;
		var tableCfg = this.obj2Array(proxy.orgTable);
		Ext.Array.each(tableCfg, function (t) {
			tableArray.push(this.composeTableName(t.name, varMap));
			tableAliasArray.push(t.alias)
		}, this);

		Ext.apply(proxy.extraParams, {
			table: tableArray.join('#') || '',
			tableAlias: tableAliasArray.join('#') || ''
		});
	},

	resetStorePageSize: function (store, pageSize) {
		store.currentPage = 1;
		store.pageSize = parseInt(pageSize);
		if (store.autoLoad && store.autoLoad.params)
			store.autoLoad.params.limit = parseInt(pageSize);
	},

	conditionLimitAgent: function (dbName, tableAlias, agentId) {
		if (!tableAlias) tableAlias = '';

		if ('crm' == dbName)
			return " " + tableAlias + ".agent_id='" + agentId || CINCC.Session.agentInfo.longId + "'";
		else if ('smp' == dbName)
			return " " + tableAlias + ".agentid='" + agentId || CINCC.Session.agentInfo.longId + "'";
		else
			return '';
	},

	conditionLimitGrp: function (dbName, tableAlias, grpId) {
		if (!tableAlias) tableAlias = '';

		if ('crm' == dbName)
			return " " + tableAlias + ".group_id='" + grpId || CINCC.Session.agentInfo.grpId + "'";
		else if ('smp' == dbName)
			return " " + tableAlias + ".department='" + grpId || CINCC.Session.agentInfo.grpId + "'";
		else
			return '';
	},

	conditionLimitProAndTask: function (dbName, tableAlias, projectId, taskId) {
		if (!tableAlias) tableAlias = '';

		if ('crm' == dbName)
			return " " + tableAlias + ".project_id='" + projectId || CINCC.Session.taskInfo.projectId + "' AND task_id='" + taskId || CINCC.Session.taskInfo.taskId + "'";
		else if ('smp' == dbName)
			return " " + tableAlias + ".projectId='" + CINCC.Session.agentInfo.longId + "' AND taskid='" + taskId || CINCC.Session.taskInfo.taskId + "'";
		else
			return '';
	},

	conditionLimitLastRecord: function (dbName, tableAlias, lastItemName) {
		if (!tableAlias) tableAlias = '';

		if ('crm' == dbName)
			return " " + tableAlias + "." + lastItemName || "last_flag" + "=1";
		else
			return '';
	},

	columnTimeRender: function (value) {
		var t = null;
		if (8 == value.length) {
			t = Ext.Date.parse(value, 'Ymd');
			return Ext.Date.format(t, 'Y-m-d');
		}
		else {
			t = Ext.Date.parse(value, 'YmdHis');
			return Ext.Date.format(t, 'Y-m-d H:i:s');
		}
	},

	columnDurationRender: function (value) {
		var theTime = parseInt(value);
		var theTime1 = 0;
		var theTime2 = 0;

		if (theTime > 60) {
			theTime1 = parseInt(theTime / 60);
			theTime = parseInt(theTime % 60);
			if (theTime1 > 60) {
				theTime2 = parseInt(theTime1 / 60);
				theTime1 = parseInt(theTime1 % 60);
			}
		}
		var result = '' + parseInt(theTime) + '秒';
		if (theTime1 > 0) {
			result = '' + parseInt(theTime1) + '分' + result;
		}
		if (theTime2 > 0) {
			result = '' + parseInt(theTime2) + '小时' + result;
		}
		return result;
	},

	columnDurationTypeRender: function (value) {
		var status = parseInt(value);
		if (0 == status) return '<span style="color: #0066FF">未通话</span>';
		else if (1 == status) return '<span style="color: #0066FF">1分钟以下</span>';
		else if (2 == status) return '<span style="color: #0066FF">1-2分钟</span>';
		else if (3 == status) return '<span style="color: #0066FF">2-3分钟</span>';
		else if (5 == status) return '<span style="color: #0066FF">3-5分钟</span>';
		else return '<span style="color: #0066FF">其他通话时长</span>';;
	},

	columnAgentIdRender: function (value) {
		return value.substr(12);
	},

	columnAppointStatusRender: function (value) {
		var status = parseInt(value);
		if (0 == status) return '<span style="color: #0066FF">未预约</span>';
		else if (1 == status) return '<span style="color: #d2413a">已预约</span>';
		else return value;
	},

	columnSuccessStatusRender: function (value) {
		var status = parseInt(value);
		if (0 == status) return '<span style="color: #d2413a">失败</span>';
		else if (1 == status) return '<span style="color: #0066FF">成功</span>';
		else return value;
	},

	columnContactStatusRender: function (value) {
		var status = parseInt(value);
		if (0 == status) return '<span style="color: #d2413a">未接触</span>';
		else if (1 == status) return '<span style="color: #0066FF">已接触</span>';
		else return value;
	},

	columnRejectStatusRender: function (value) {
		var status = parseInt(value);
		if (0 == status) return '<span style="color: #0066FF">未拒绝</span>';
		else if (1 == status) return '<span style="color: #d2413a">用户拒绝</span>';
		/*else if (2 == status) return '<span style="color: #d2413a">用户拒绝</span>';
		else if (3 == status) return '<span style="color: #d2413a">网络中断</span>';*/
		else return value;
	},

	columnAnswerStatusRender: function (value) {
		if (value) {
			var answerStatus = parseInt(value);
			if (1 == answerStatus)
				return '<span style="color: #0066FF">已作答</span>';
			else if (2 == answerStatus)
				return '<span style="color: #009900;">回顾</span>';
			else //3
				return '<span style="color: #da7b19;text-decoration:line-through">已作废</span>';
		}
		else
			return '<span style="color: #d2413a">未作答</span>';
	},

	columnSatisfactionRender: function (value) {
		var status = parseInt(value);
		if (0 == status) return '<span style="color: #0066FF">满意</span>';
		else if (1 == status) return '<span style="color: #df8505">基本满意</span>';
		else if (2 == status) return '<span style="color: #d2413a">不满意</span>';
		else return '<span style="color: #7b8b9d">未知</span>';
	},

	columnInspectResultRender: function (value) {
		var status = parseInt(value);
		if (0 == status) return '<span style="color: #d2413a">0分</span>';
		else if (1 == status) return '<span style="color: #df8505">不及格</span>';
		else if (2 == status) return '<span style="color: #0066FF">及格</span>';
		else if (3 == status) return '<span style="color: #009900">满分</span>';
		else return '<span style="color: #7b8b9d">未知</span>';
	},

	permissionStrSplit: function (value) {
		if (value) {
			if ('*' == value) return true;
			else return value.split(';');
		}
		else return false;
	},

	composeTableName: function (tableNameExpr, varMap) {
		//optional
		tableNameExpr = tableNameExpr.replace(/\[[^\[]*?\]/g, function (optional/*, $1*/) {
			optional = Ext.String.trim(optional.substring(1, optional.length - 1));
			var newOptional = optional.replace(/\{[^\{]*?\}/g, function (optionalStr) {
				var name = Ext.String.trim(optionalStr.substring(1, optionalStr.length - 1));
				if (varMap && varMap[name]) {
					return varMap[name];
				}
				else return optionalStr;
			});

			if (newOptional == optional)
				return '';
			return newOptional;
		});

		//Required
		var lostVar = [];
		tableNameExpr = tableNameExpr.replace(/\{[^\{]*?\}/g, function (requiredlStr) {
			var name = Ext.String.trim(requiredlStr.substring(1, requiredlStr.length - 1));
			if (varMap && varMap[name]) {
				return varMap[name];
			}
			else {
				lostVar.push(name);
				return requiredlStr;
			}
		});

		if (lostVar.length > 0) {
			Ext.Msg.alert('提示', '缺少必要参数:[' + lostVar.join(',') + ']');
			return null;
		}
		return tableNameExpr;
	},

	createDownloadForm: function (action, param) {
		if (null == CINCC.Session.downloadForm) {
			CINCC.Session.downloadForm = document.createElement('form');
			CINCC.Session.downloadForm.style.display = 'none';
			CINCC.Session.downloadForm.method = 'POST';
			document.body.appendChild(CINCC.Session.downloadForm);
		}
		CINCC.Session.downloadForm.action = action;

		var len = CINCC.Session.downloadForm.childNodes.length;
		for (var i = 0; i < len; i++)
			CINCC.Session.downloadForm.removeChild(CINCC.Session.downloadForm.childNodes[0]);
		if (param) {
			Ext.Object.each(param, function (name, value) {
				var itemInput = document.createElement('input');
				itemInput.name = name;
				itemInput.value = value;
				CINCC.Session.downloadForm.appendChild(itemInput);
			}, this);
		}
		CINCC.Session.downloadForm.submit();
	},

	notContainSqlFunction: function (str) {
		return (-1 == str.indexOf('sum(') &&
		-1 == str.indexOf('SUM(') &&
		-1 == str.indexOf('max(') &&
		-1 == str.indexOf('MAX(') &&
		-1 == str.indexOf('min(') &&
		-1 == str.indexOf('MIN(') &&
		-1 == str.indexOf('substring(') &&
		-1 == str.indexOf('SUBSTRING(')
		);
	},

	dataLoadFailed: function (store, records, successful, eOpts) {
		if (!successful) {
			Ext.Msg.show({
				title: '数据加载错误',
				msg: '数据库加载错误，请检查数据库数据配置。',
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.ERROR
			});
			console.info(arguments)
		}
	},

	setValueByItemId: function (form, itemId, value) {
		var el = form.down('#' + itemId);
		if (el) {
			if (el.xtype == 'radiogroup') {
				var param = {};
				param[itemId] = value;
				el.setValue(param);
			} else if (el.xtype == 'checkboxgroup') {

			} else {
				el.setValue(value);
			}
		}
		else {
			//todo deal error
		}
	},

	setStoreByItemId: function (form, itemId, store) {
		var el = form.down('#' + itemId);
		if (el) {
			if (el.xtype == 'radiogroup') {
				var param = {};
				param[itemId] = value;
				el.setValue(param);
			} else if (el.xtype == 'checkboxgroup') {

			} else {
				el.setValue(value);
			}
		}
		else {
			//todo deal error
		}
	},

	setDisabledByItemId: function (form, itemId, disabled) {
		var el = form.down('#' + itemId);
		el.setDisabled(disabled);
	},

	setVisibleByItemId: function (form, itemId, visible) {
		var el = form.down('#' + itemId);
		el.setVisible(visible);
	},

	fillFormByRecord: function(form, orgRecord) {
		var record = Ext.clone(orgRecord);
		var data = record.data;
		Ext.Array.each(form.query('checkboxgroup'), function(cg) {
			if('checkboxgroup' == cg.xtype)
				data[cg.name] = data[cg.name] ? data[cg.name].split('|') : null;
		});
		form.loadRecord(record);
		Ext.Array.each(form.query('radiogroup'), function(rg) {
			var rgObj = {};
			rgObj[rg.name] = data[rg.name];
			rg.setValue(rgObj);
		}, this);
	},
	
	fillFormByData: function(form, obj) {

		var data = obj;
		
		Ext.Array.each(form.query('checkboxgroup'), function(cg) {
			if('checkboxgroup' == cg.xtype)
				data[cg.name] = data[cg.name] ? data[cg.name].split('|') : null;
		});
	
		console.info("	fillFormByData");
		
		console.info(form);
		
		form.getForm().setValues(data);
		
		Ext.Array.each(form.query('radiogroup'), function(rg) {
			var rgObj = {};
			rgObj[rg.name] = data[rg.name];
			rg.setValue(rgObj);
		}, this);
	
	},	

	unifiedQuery: function(btn) {
		var queryCondition = [];
		btn.up('toolbar').down('fieldset').items.each(function(item){
			var value = item.getValue();
			if(value) {
				if(Ext.isDate(value)) value = Ext.Date.format(value, 'YmdHis');
				queryCondition.push(Ext.String.format(item.expression, value));
			}
		}, this);
		var store = btn.up('grid').getStore();
		CINCC.util.Tools.resetStoreSearchCondition(store, queryCondition);
		store.load();
	},

	objKeyTolowerCase: function(obj) {
		var newObj = {};
		Ext.Object.each(obj, function(key, value) {
			newObj[key.toLowerCase()] = value;
		}, this);
		return newObj;
	}

});