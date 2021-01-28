
	var Form = {

        // 绑定事件
       	bindevent: function(form, options) {
            form = typeof form === 'object' ? form : $(form);
            var event =  Form.event;
            console.log("bindevent form");
            event.validator(form, options, options.success, options.error);
       	},

        // 事件相关
        event: {
            // 验证合法性           
            validator: function(form, options, success, error){
                if (!form.is("form"))
                    return;
                form.validator('destroy');

                //绑定表单事件
                form.validator($.extend({
                    timely: 3,
                    validClass: 'has-success',
                    invalidClass: 'has-error',
                    bindClassTo: '.form-group',
                    formClass: 'n-default n-bootstrap',
                    msgClass: 'n-right',
                    stopOnError: true,
                    fields: options.fields,

                    display: function (elem) { // 显示
                        return $(elem).closest('.form-group').find(".control-label").text().replace(/\:/, '');
                    },
                    valid: function (ret) { // 合法回调
                        var me = this;
                        me.holdSubmit();
                        var data = $(ret).serialize();
                        params = $.extend({}, {url: options.url, data: data});
                        var onsuccess =  function (data, ret) {
                            me.holdSubmit(false);
                            if (false === $(this).triggerHandler("success.form", [data, ret])) {
                                return false;
                            }
                            if (typeof success === 'function') {
                                if (false === success.call($(this), data, ret)) {
                                    return false;
                                }
                            }
                            //提示及关闭当前窗口
                            return false;
                        };

                        var onerror = function(data, ret) {
                            me.holdSubmit(false);
                            if (false === $(this).triggerHandler("error.form", [data, ret])) {
                                return false;
                            }
                            if (typeof error === 'function') {
                                if (false === error.call($(this), data, ret)) {
                                    return false;
                                }
                            }
                        };

                        var submitResult = Form.api.submit($(ret), params, onsuccess, onerror);

                        if (!submitResult) {
                            me.holdSubmit(false);
                        }
                    },
                    invalid: function(form, error){
                        console.log("invalid from");
                        // toastr.error(error);
                        return false;
                    },
                    validation: function(element, result){
                        console.log("validation");
                    },
                    beforeSubmit: function(){
                        console.log("beforeSubmit");
                    }
                },  {})).trigger("validate");
            },

              selectpicker: function (form) {
                //绑定select元素事件
                if ($(".selectpicker", form).size() > 0) {
                    require(['bootstrap-select', 'bootstrap-select-lang'], function () {
                        $('.selectpicker', form).selectpicker();
                    });
                }
            },
            selectpage: function (form) {
                //绑定selectpage元素事件
                if ($(".selectpage", form).size() > 0) {
                    require(['selectpage'], function () {
                        $('.selectpage', form).selectPage({
                            eAjaxSuccess: function (data) {
                                data.list = typeof data.rows !== 'undefined' ? data.rows : (typeof data.list !== 'undefined' ? data.list : []);
                                data.totalRow = typeof data.total !== 'undefined' ? data.total : (typeof data.totalRow !== 'undefined' ? data.totalRow : data.list.length);
                                return data;
                            }
                        });
                    });
                    //给隐藏的元素添加上validate验证触发事件
                    $(document).on("change", ".sp_hidden", function () {
                        $(this).trigger("validate");
                    });
                    $(document).on("change", ".sp_input", function () {
                        $(this).closest(".sp_container").find(".sp_hidden").trigger("change");
                    });
                    $(form).on("reset", function () {
                        setTimeout(function () {
                            $('.selectpage', form).selectPageClear();
                        }, 1);
                    });
                }
            },
            cxselect: function (form) {
                //绑定cxselect元素事件
                if ($("[data-toggle='cxselect']", form).size() > 0) {
                    require(['cxselect'], function () {
                        $.cxSelect.defaults.jsonName = 'name';
                        $.cxSelect.defaults.jsonValue = 'value';
                        $.cxSelect.defaults.jsonSpace = 'data';
                        $("[data-toggle='cxselect']", form).cxSelect();
                    });
                }
            },

        },
        

         api: {
            submit: function (form, options, success, error) {               
                //调用Ajax请求方法
                console.log("submit options:" + JSON.stringify(options));
                util.api.ajax(options, function (data, ret) {
                    $('.form-group', form).removeClass('has-feedback has-success has-error');
                    if (data && typeof data === 'object') {
                        //调用客户端事件
                        if (typeof data.callback !== 'undefined' && typeof data.callback === 'function') {
                            data.callback.call(form, data);
                        }
                    }
                    if (typeof success === 'function') {
                        if (false === success.call(form, data, ret)) {
                            return false;
                        }
                    }
                }, function (data, ret) {
                    if (typeof error === 'function') {
                        if (false === error.call(form, data, ret)) {
                            return false;
                        }
                    }
                });
                return true;
            }
        }
}


