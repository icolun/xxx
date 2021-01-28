
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
        index_url: '/admin/auth/index',
        add_url: '/admin/auth/add',
        edit_url: '/admin/auth/edit',
        del_url: '/admin/auth/del',
    },

    init: function() {
        var defaultColunms = pageObj.initColumn();
        var table = new BSTable(pageObj.id, pageObj.url, defaultColunms);
        pageObj.table = table;
        pageObj.initOperate();
        pageObj.initToolbars();
        pageObj.initFrom();
        pageObj.table.init();
        pageObj.bindevent();        
    },

    bindevent: function() {
        // console.log("add-submit bindevent");
        // $('edit-submit').click(pageObj.edit);
    },

    initFrom: function () {
        var fields ={
            'account': 'required;must',
            'name': 'required;must',
            'email': 'required;email;must',
            'groupId': 'required;must'
        }
        
        pageObj.table.setvalitorfields(fields)
    },

    initColumn: function () {
      return[
            {checkbox: true,  visible: true },
            {title: 'ID',field: 'id',width: 25, searchable: true},
            {title: '账号',field: 'account',width: 80,align: 'center',searchable: true},
            {title: '名称',field: 'name',width: 80,align: 'center', searchable: true},
            {title: '邮箱',field: 'email',width: 200,align: 'center',},
            {title: '组别',field: 'groupName',align: 'center'},
            {title: '上一次登录时间',field: 'updatetime',sortable: true,align: 'center',formatter: util.formatter.datetime },
            {title: '创建时间',field: 'createtime',sortable: true,align: 'center',formatter: util.formatter.datetime }
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
               $("#edit-account").val(row.account);
               $("#edit-name").val(row.name);
               $("#edit-email").val(row.email);
               $("#edit-groupId").val(row.groupId);
               $('#edit-modal').modal('show');
        },
        options = $.extend(options, {'edit': onEdit});
        this.table.setOperate(options);
    },

    initToolbars: function () {
        var options = $.extend({}, {'refresh': reLoad, 'remove': null, 'add': null});
        this.table.setToobar(options);
    },

}
         






















