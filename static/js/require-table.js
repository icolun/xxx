(function () {
    var BSTable = function (bstableId, url, columns,queryParamsType,countSize) {
        this.btInstance = null;                 //jquery和BootStrapTable绑定的对象
        this.bstableId = bstableId;
        this.url =  {
            del_url: url.del_url,
            add_url: url.add_url,
            index_url: url.index_url,
            edit_url: url.edit_url
        }
        this.method = "post";
        this.paginationType = "server";         //默认分页方式是服务器分页,可选项"client"   如果 设置 sidePagination: "server", 必须包含 total 和 rows;  如果直接返回的是数组 需要设置为 sidePagination: "client"
        this.toolbarId = bstableId + "Toolbar";
        // this.toolbarHtml ='';
        this.columns = columns;
        this.valitorfields = null; 

        this.height = 665;                     
        this.data = {};
        this.queryParams = {}; // 向后台传递的自定义参数
        if (countSize==undefined){
            this.countSize=10;
        }else{
            this.countSize=countSize;
        }
        if(queryParamsType==undefined){
            this.queryParamsType='limit';
        }else{
            this.queryParamsType=queryParamsType;
        }
        this.config = {
            refreshbtn: '.btn-refresh',
            addbtn: '.btn-add',
            editbtn: '.btn-edit',
            delbtn: '.btn-remove'
        }
    };
 
    BSTable.prototype = {
        /**
         * 初始化bootstrap table
         */
        init: function () {
            var tableId = this.bstableId;
            var me = this;
            this.btInstance =
                $('#' + tableId).bootstrapTable({
                    contentType: "application/x-www-form-urlencoded",
                    url: this.url.index_url,              //请求地址
                    method: this.method,        //ajax方式,post还是get
                    ajaxOptions: {              //ajax请求的附带参数
                        data: this.data
                    },
                    toolbar: "#" + this.toolbarId,//顶部工具条
                    striped: true,              //是否显示行间隔色
                    cache: false,               //是否使用缓存,默认为true
                    pagination: true,           //是否显示分页（*）
                    sortable: true,             //是否启用排序
                    // sortOrder: "desc",           //排序方式
                    pageNumber: 1,                  //初始化加载第一页，默认第一页
                    pageSize: this.countSize,               //每页的记录行数（*）
                    pageList: [10, 20, 50, 100],     //可供选择的每页的行数（*）
                    queryParamsType: this.queryParamsType,  //默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
                    queryParams: function (param) {
                        if(this.queryParamsType=='limit'){
                            return $.extend(me.queryParams, param);
                        }else{
                            //因为layui table 传参不一样
                            return $.extend(me.queryParams, {
                                'page':param.pageNumber,
                                'limit':param.pageSize
                            });
                        }
 
                    }, // 向后台传递的自定义参数
                    sidePagination: this.paginationType,   //分页方式：client客户端分页，server服务端分页（*）
                    search: true,              //是否显示表格搜索，此搜索是客户端搜索，不会进服务端
                    // strictSearch: true,         //设置为 true启用 全匹配搜索，否则为模糊搜索
                    showColumns: true,          //是否显示所有的列
                    showRefresh: true,          //是否显示刷新按钮

                    minimumCountColumns: 2,     //最少允许的列数
                    clickToSelect: true,        //是否启用点击选中行
                    searchOnEnterKey: true,     //设置为 true时，按回车触发搜索方法，否则自动触发搜索方法
                    columns: this.columns,      //列数组
                    showToggle: true,
                    height: this.height,
                    icons: {
                        paginationSwitchDown: 'fa-caret-square-down',
                        paginationSwitchUp: 'fa-caret-square-up',
                        refresh: 'fa-sync glyphicon-repeat',
                        toggleOff: 'fa fa-list-alt glyphicon-list-alt',
                        toggleOn: 'fa fa-file-text-o glyphicon-list-alt',
                        columns: 'fa fa-list fa-th-list glyphicon-list',
                        fullscreen: 'fa-arrows-alt',
                        detailOpen: 'fa-plus',
                        detailClose: 'fa-minus'

                    },
                    iconSize: 'outline',
                
                    
                });
            this.bindevent();
            return this;
        },

        // 绑定一些默认事件
        bindevent: function () {
                //Bootstrap-table的父元素,包含table,toolbar,pagnation
                // var parenttable = this.closest('.bootstrap-table');
                // //Bootstrap-table配置
                // var options = this.bootstrapTable('getOptions');
                // //Bootstrap操作区
                // var toolbar = $(options.toolbar, parenttable);
                //当刷新表格时
                var that = this
                var table = this.btInstance;
                this.btInstance.on('load-error.bs.table', function (status, res, e) {
                    if (e.status === 0) {
                        return;
                    }
                    Toastr.error(__('Unknown data format'));
                });
                //当刷新表格时
                this.btInstance.on('refresh.bs.table', function (e, settings, data) {
                    $('#toolbar_refresh').addClass('disabled');
                    $('#toolbar_refresh').find('fa').addClass('fa-spin');
                });

                   //查询词表
                this.btInstance.on('search.bs.table', function (e, settings, data) {
                    alert("您输入的关键字setting:" + settings + "但是暂时不支持搜索");
                });
                
                //当内容渲染完成后
                this.btInstance.on('post-body.bs.table', function (e, settings, json, xhr) {
                    $('#toolbar_refresh').removeClass('disabled');
                    $('#toolbar_refresh').find('fa').removeClass('fa-spin');
                });

                // 确认新增
                $("#add-submit").click(function () {
                     var success = function(data, ret) {
                        $('#add-modal').modal('hide');
                        that.refresh();
                        toastr.success("新增成功");
                    };
                    var options = $.extend({}, {url:that.url.add_url, fields: that.valitorfields, success: success})
                    Form.bindevent($("#add-form"), options);
                });
                // 更新表单
                $("#edit-submit").click(function () {
                    var success = function(data, ret) {
                        $('#edit-modal').modal('hide');
                        that.refresh();
                        toastr.success("修改成功");
                    };
                    var options = $.extend({}, {url:that.url.edit_url, fields: that.valitorfields, success: success})
                    Form.bindevent($("#edit-form"), options);
                });
                        // 更新表单

            // 确认新增
                // 刷新按钮
                $('#'+this.toolbarId).on('click', this.config.refreshbtn , this.events.refresh);
                // 新增按钮
                $('#'+this.toolbarId).on('click', this.config.addbtn , this.events.add);
                // 刷新按钮
                $('#'+this.toolbarId).on('click', this.config.editbtn , function() {
                    that.events.edit();
                });
                // 删除按钮
                $('#'+this.toolbarId).on('click', this.config.delbtn , function () {
                    var ids = that.api.selectedids(table);
                   console.log("delete: " + ids + "table");
                });
                   


            },

        /**
         * 向后台传递的自定义参数
         * @param param
         */
        setQueryParams: function (param) {
            this.queryParams = param;
        },
        /**
         * 设置分页方式：server 或者 client
         */
        setPaginationType: function (type) {
            console.log(type)
            this.paginationType = type;
        },
        setHeight: function (type) {
            this.height = type;
        },
 
        /**
         * 设置ajax post请求时候附带的参数
         */
        set: function (key, value) {
            if (typeof key == "object") {
                for (var i in key) {
                    if (typeof i == "function")
                        continue;
                    this.data[i] = key[i];
                }
            } else {
                this.data[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
            }
            return this;
        },
 
        /**
         * 设置ajax post请求时候附带的参数
         */
        setData: function (data) {
            this.data = data;
            return this;
        },
 
        /**
         * 清空ajax post请求参数
         */
        clear: function () {
            this.data = {};
            return this;
        },
         
        destory: function () {
            this.btInstance.bootstrapTable('destory');
        },
        /**
         * 刷新 bootstrap 表格
         * Refresh the remote server data,
         * you can set {silent: true} to refresh the data silently,
         * and set {url: newUrl} to change the url.
         * To supply query params specific to this request, set {query: {foo: 'bar'}}
         */
        refresh: function (parms) {
            if (typeof parms != "undefined") {
                this.btInstance.bootstrapTable('refresh', parms);
            } else {
                this.btInstance.bootstrapTable('refresh');
            }
        },


        // 默认事件
        events: {
            like: function() {
                console.log('You click like icon');
            },
            edit: function(row) {
                console.log("edit default");
                $('#edit-modal').modal('show');
            },
            remove: function(options, success, error) { 
                if (confirm("确认删除？")){ // 单人删除与多人删除
                    util.api.ajax(options, success, error);
                }
            },
            add: function() {
                $('#add-modal').modal('show');
            },
            refresh: function() {
                console.log('You click refresh icon');
            }
        },

        // 重写事件
        setevent: function(options) {
            // 刷新事件
            if (typeof options.refresh === 'function') {
                this.events.refresh = options.refresh
            } 

            // 增加事件
            if (typeof options.add === 'function') {
                this.events.add = options.add;
            }

            if (typeof options.edit === 'function') {
                this.events.edit = options.edit;
            }
            // 删除
            if (typeof options.remove === 'function') {
                this.events.remove = options.remove;
            }

             // 
            if (typeof options.like === 'function') {
                this.events.like = options.like;
            }
            // console.log("setevent");

        },

        // 默认操作框图标
        operateformatter: {
            like: function() {
                return  '<a class="like" href="javascript:void(0)" title="Like">'
                        + '<i class="fa fa-heart"></i>'
                        + '</a>';
            },
            edit: function() {
                return ' <a class="edit" href="javascript:void(0)" title="Edit">'
                        +'<i class="fa fa-edit"></i>'
                        +'</a>';
            },
            remove: function(e, value, row, index) {
                return ' <a class="remove" href="javascript:void(0)" title="Remove">'
                        +'<i class="fa fa-times"></i>'
                        +'</a>';
            }
        },
        // 表格是否有操作栏
        setOperate: function(options){
            this.setevent(options);
            var that = this;
            var formatter = '';
            window.onclickEvent = {
                'click .like': function(e, value, row, index) { that.events.like();},
                'click .edit': function(e, value, row, index) {
                                console.log("edit default");
                                that.events.edit(row);
                                },
                'click .remove':  function(e, value, row, index) {
                                console.log("click remove:" + row.id);
                                var success = function(data, ret) {
                                    that.refresh();
                                    toastr.success("删除成功");
                                    return false;
                                };
                                that.events.remove($.extend({}, {url:that.url.del_url, data: {id: row.id}}))
                            },
            };

            if (options.like !== undefined) {
                formatter +=this.operateformatter.like();
            }

            if (options.edit !== undefined) {
                formatter +=this.operateformatter.edit();
            }

            if (options.remove !== undefined) {
                formatter +=this.operateformatter.remove();
            }

            var operate ={
                  field: 'operate',
                  title: '操作',
                  width: 120,
                  align: 'center',
                  valign: 'middle',
                  events: onclickEvent
             };
            operate.formatter = function(value, row, index){
                return formatter;
            };

             // console.log("operate:::" + formatter + JSON.stringify(options) +  (options.like !== undefined));
            this.columns.push(operate);
       },


        // 头部按钮
        setToobar: function (options) {
            this.setevent(options);
            that = this;
            var html = '<div class="btn-group">';

            if (options.refresh !== undefined) { // 刷新按钮
                html += '<a herf="javascript:;" id="tableToolbar-refresh" type="button" onclick="that.events.refresh()" class="btn btn-info">'        
                    + '<i class="fa fa-circle"></i>'
                    +'</a>';
            }

            if (options.add !== undefined) { // 新增按钮
                html += '<a herf="javascript:;" id="tableToolbar-add" type="button" onclick="that.events.add()" class="btn btn-primary">'
                    + '<i class="fa fa-plus"></i>'
                    +'</a>';
            }

            if (options.edit !== undefined) { // 编辑
                html += '<a herf="javascript:;" id="tableToolbar-edit" type="button"  onclick="that.events.edit()" class="btn btn-primary">'
                    + '<i class="fa fa-plus">编辑</i>'
                    +'</a>';
            }

             if (options.remove !== undefined) { // 刷新按钮
                html += '<a herf="javascript:;" id="tableToolbar-remove" type="button" onclick="that.events.remove()" class="btn btn-danger">'        
                    + '<i class="fa fa-trash"></i>'
                    +'</a>';
            }

            html += '</div>';        

            $("#" + this.toolbarId).html(html);



            // console.log("setToobar" + JSON.stringify(options));
            // console.log("setToobar1" + options.remove +(options.remove === undefined)+ "add" + options.add + ( options.add === undefined));
            // console.log("setToobar2" + options.refresh + (options.refresh === undefined)+ "edit111" + options.edit + ( options.edit === undefined));
        },

        setvalitorfields: function(fields) {
            this.valitorfields = fields
        },

        api: {
                // 获取选中的条目ID集合
            selectedids: function (table) {
                var options = table.bootstrapTable('getOptions');
                var ids = $.map(table.bootstrapTable('getSelections'), function (row){ 
                        console.log("selectedids:" + row.pk + "ids:" + ids);
                        return row.id;
                });
                console.log("selectedids:" + JSON.stringify(table.bootstrapTable('getSelections')) + "ids:" + ids);

            },
            // 切换复选框状态
            toggleattr: function (table) {
                $("input[type='checkbox']", table).trigger('click');
            },
            // 根据行索引获取行数据
            getrowdata: function (table, index) {
                index = parseInt(index);
                var data = table.bootstrapTable('getData');
                return typeof data[index] !== 'undefined' ? data[index] : null;
            },
            // 根据行索引获取行数据
            getrowbyindex: function (table, index) {
                return Table.api.getrowdata(table, index);
            },
            // 根据主键ID获取行数据
            getrowbyid: function (table, id) {
                var row = {};
                var options = table.bootstrapTable("getOptions");
                $.each(table.bootstrapTable('getData'), function (i, j) {
                    if (j[options.pk] == id) {
                        row = j;
                        return false;
                    }
                });
                return row;
            }
        }

    };
 
    window.BSTable = BSTable;
 
}());
