// import BSTable from '../table.js';

// 
$(function () {
    load();
});

// 
//初始化表格
function load() {
    pageObj.init();
}
//reLoad 更新表格
function reLoad() {
    pageObj.table.refresh({query: pageObj.formParams()});
}
 
var pageObj={
    table:null,
    id:"table",//要渲染的table id
    url:{
        index_url: '/admin/authGroup/index',
        add_url: '/admin/authGroup/add',
        edit_url: '/admin/authGroup/edit',
        del_url: '/admin/authGroup/del',
    },

    init: function() {
        var defaultColunms = pageObj.initColumn();
        var table = new BSTable(pageObj.id, pageObj.url, defaultColunms);
        pageObj.table = table;
        pageObj.initOperate();
        pageObj.initToolbars();
        pageObj.initFrom();
        pageObj.table.init();
    },

    initFrom: function () {
         var fields ={
            'pId': 'required;must',
            'name': 'required;must'
        }
        
        pageObj.table.setvalitorfields(fields)
    },

    initColumn: function () {
      return[
            {checkbox: true,  visible: true },
            {title: 'ID',field: 'id',width: 25,},
            {title: '父级',field: 'pName',width: 80,align: 'center',},
            {title: '名称',field: 'name',width: 80,align: 'center',},
            {title: '权限',field: 'rules',width: 80,align: 'center',},
            {title: '创建时间',field: 'createtime',width: 200,sortable: true,align: 'center',formatter: util.formatter.datetime }
　　　　];
    },

    formParams: function () {
        var queryData = {};
        queryData['searchWord'] = $("#searchWord").val();
        return queryData;
    },

// 主要不直接在table; 是不同模块需要不同的参数， 比如编辑和显示要处理
    initOperate: function() {
        var options = $.extend({}, {'like': null, 'remove': null});
        var onEdit =  function(row) {
              $("#edit-id").val(row.id);
               $("#edit-pId").val(row.pId);
               $("#edit-name").val(row.name);
                $("#edit-rules").val(row.rules);
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
         











