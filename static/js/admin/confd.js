
$(function () {
    load();
});   
//初始化表格
function load() {
    pageObj.init();
}
//reLoad 更新表格
function reLoad() {
    pageObj.table.refresh( {query: pageObj.formParams()});
}


  var pageObj={
      table:null,
      id:"table",//要渲染的table id
      url:{
           index_url: '/admin/confd/index',
          add_url: '/admin/confd/add',
          edit_url: '/admin/confd/edit',
          del_url: '/admin/confd//del',
      },

      init: function() {
          var defaultColunms = pageObj.initColumn();
          var table = new BSTable(pageObj.id, pageObj.url, defaultColunms);
          pageObj.table = table;
          pageObj.initOperate();
          pageObj.initToolbars();
          pageObj.initFrom()
          pageObj.table.init();
      },

      
      initFrom: function () {
          var fields ={
            'ServerId': 'required;must'
          }
          pageObj.table.setvalitorfields(fields)
      },

      initColumn: function () {
        return[

            {title: '服务器id',field: 'serverId'},
            {title: '服务器名称',field: 'serverName',align: 'center'},
            {title: '区',field: 'zone',align: 'center',},
            {title: '配置路径',field: 'DataDir',align: 'center',},
            {title: '心跳时长',field: 'heartbeattime',align: 'center',},
            {title: '下线时长',field: 'kickouttime',align: 'center',},
            {title: '最大连接数',field: 'max_conn',align: 'center',},
            {title: 'NetServerConf',field: 'net_server',align: 'center',formatter:function(value, row, index){ return JSON.stringify(value)}},
            {title: 'NetClientConf',field: 'net_client',align: 'center',formatter:function(value, row, index){ return JSON.stringify(value)}},
            {title: 'LogConf',field: 'log',align: 'center',formatter:function(value, row, index){ return JSON.stringify(value)}},
            {title: 'MysqlConf',field: 'mysql',align: 'center',formatter:function(value, row, index){ return JSON.stringify(value)}},
            {title: 'ProtocolConf',field: 'protocol',align: 'center',formatter:function(value, row, index){ return JSON.stringify(value)}},
            {title: 'HttpServerConf',field: 'http_server',align: 'center',formatter:function(value, row, index){ return JSON.stringify(value)}},
            {title: 'DiscoveryConf',field: 'discovery',align: 'center',formatter:function(value, row, index){ return JSON.stringify(value)}},
            {title: 'UrlConf',field: 'url',align: 'center',formatter:function(value, row, index){ return JSON.stringify(value)}},
            {title: 'DbConf',field: 'db',align: 'center',formatter:function(value, row, index){ return JSON.stringify(value)}},
            {title: 'redis',field: 'redis',align: 'center',formatter:function(value, row, index){ return JSON.stringify(value)}},
　　　　];
      },   

//设置传参
      formParams: function () {
        var queryData = {};
        queryData['searchWord'] = $("#searchWord").val();
        return queryData;
      },

// 主要不直接在table; 是不同模块需要不同的参数， 比如编辑和显示要处理
      initOperate: function() {
        var options = $.extend({}, {'like': null, 'remove': null});
        var onEdit =  function(row) {
              // $("#edit-id").val(row.id);
              //  $("#edit-pId").val(row.pId);
              //  $("#edit-name").val(row.name);
               $('#edit-modal').modal('show');
        },
        options = $.extend(options, {'edit': onEdit});
        this.table.setOperate(options)
      },

      initToolbars: function () {
        var options = $.extend({}, {'refresh': reLoad, 'remove': null, 'add': null});
        this.table.setToobar(options);
      }
  }