
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
        index_url: '/admin/rule/index',
        add_url: '/admin/rule/add',
        edit_url: '/admin/rule/edit',
        del_url: '/admin/rule/del',
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


    initColumn: function () {
      return[
            {checkbox: true,  visible: true },
            {title: 'ID',field: 'id', searchable: true},
            {title: '标题',field: 'name', searchable: true},
            {title: '图标',field: 'icon',searchable: true,formatter:util.formatter.icon},
            {title: '规则',field: 'controller', searchable: true},
            {title: '权重',field: 'weight', searchable: true},
            {title: '是否菜单',field: 'ismenu', searchable: true},
            {title: '创建时间',field: 'createtime',sortable: true,align: 'center',formatter: util.formatter.datetime }
　　　　];
    },


    initFrom: function () {
        var fields ={
            'icon': 'required;must',
            'name': 'required;must',
            'controller': 'required;must'
        };
        return pageObj.table.setvalitorfields(fields);
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
               $("#edit-name").val(row.name);
               $("#edit-icon").val(row.icon);
                $("#edit-controller").val(row.controller);
               $("#edit-weight").val(row.weight);
               $('#edit-modal').modal('show');
        },
        options = $.extend(options, {'edit': onEdit});
        this.table.setOperate(options);
    },

    initToolbars: function () {
        var options = $.extend({}, {'refresh': reLoad, 'remove': null, 'add': null});
        this.table.setToobar(options);
    }
}
         






















