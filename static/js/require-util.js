    var util = {

      events: {
            //请求成功的回调
            onAjaxSuccess: function (resp, onAjaxSuccess) {

                var data = typeof resp.data !== 'undefined' ? resp.data : null;
                var msg = typeof resp.msg !== 'undefined' && resp.msg ? resp.msg : "";

                if (typeof onAjaxSuccess === 'function') {
                    var result = onAjaxSuccess.call(this, data, resp);
                    if (result === false){
                        return;
                    }
                }
                toastr.success(msg);
            },
            //请求错误的回调
            onAjaxError: function (resp, onAjaxError) {
                var data = typeof resp.data !== 'undefined' ? resp.data : null;
                if (typeof onAjaxError === 'function') {
                    var result = onAjaxError.call(this, data, resp);
                    if (result === false) {
                        return;
                    }
                }
                toastr.error(resp.msg);
            },
            //服务器响应数据后
            onAjaxResponse: function (response) {
                try {
                    var resp = typeof response === 'object' ? response : JSON.parse(response);
                    if (!resp.hasOwnProperty('code')) {
                        $.extend(resp, {code: -2, msg: response, data: null});
                    }
                } catch (e) {
                    var resp = {code: -1, msg: e.message, data: null};
                }
                return resp;
            }
        },
      api: {
            //发送Ajax请求
            ajax: function (options, success, error) {
                options = typeof options === 'string' ? {url: options} : options;
                // var index = layer.set();
                options = $.extend({
                    type: "POST",
                    dataType: "json",
                    success: function (ret) {
                        // layer.unset(index);
                        ret = util.events.onAjaxResponse(ret);

                        if (ret.code === 0) {
                            util.events.onAjaxSuccess(ret, success);
                        } else {
                            util.events.onAjaxError(ret, error);
                        }
                    },
                    error: function (xhr) {
                        // layer.close(index);
                        // alert('onAjaxResponse error like icon, row: ' + JSON.stringify(xhr));
                        var ret = {code: xhr.status, msg: xhr.statusText, data: null};
                        util.events.onAjaxError(ret, error);
                    }
                }, options);
                $.ajax(options);
            }
      },
         // 单元格数据格式化
      formatter: {
            icon: function (value, row, index) {
                if (!value)
                    return '';
                value = value.indexOf(" ") > -1 ? value : "fa fa-" + value;
                //渲染fontawesome图标
                return '<i class="' + value + '"></i> ' + value;
            },
               
            authgroup: function(value, row, index) {
                if (row.groupId == 1) {
                    return "超级管理员";
                } else {
                    return "管理员";
                }
            },
            datetime: function (value, row, index) {
                var datetimeFormat = typeof this.datetimeFormat === 'undefined' ? 'YYYY-MM-DD HH:mm:ss' : this.datetimeFormat;
                if (isNaN(value)) {
                    return value ? moment(value).format(datetimeFormat) : "";
                } else {
                    return value ? moment(parseInt(value) * 1000).format(datetimeFormat) : "";
                }
            }
               
      }
}