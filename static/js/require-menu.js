$(function () {
   memuObj.init();
});


var memuObj = {
     navId: "navId",
     sidebarId: "sidebarId",
     height: $(window).height() - 50,

     sidebarHtml:null,

    init: function() {
        var isonline = isLogin();
        this.nav(isonline);
        this.sidebar(isonline);
    },


    // nav 栏
    nav: function(isonline) {
        var html = '';
        if (isonline) {
          
          html += '<li class="nav-item d-none d-sm-inline-block dropdown">'
               + '<a class="nav-link" data-toggle="dropdown" href="#">'
              + '<span class="badge navbar-badge">'
              + '当前账号:' + LocalStore.account.get() + '</span>'
              +'</a>'
              + '<div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">'
              +'<span class="dropdown-header">' + '账号信息' +'</span>'
              +'<div class="dropdown-divider"></div>'
              +'<a href="javascript:;" onclick="signout()" class="dropdown-item">'
              + '<i class="fas fa-envelope mr-2"></i>'
              + '<span class="glyphicon">退出</span>'
              +'</a>'
              +'</div>'
              +'</li>';
          } else {
            html +=  '<li class="nav-item d-none d-sm-inline-block">'
                + '<a class="nav-link" href="/login">'
                + '<span class="badge navbar-badge">'
                + '登录</span>' 
                + '</a></li>'
         }
        $("#" + this.navId).html(html);
    },

    // 菜单栏
    sidebar: function(isonline) { 
        if (isonline === false) { // 不在线
            var html = '<ul class="nav nav-sidebar">'
            + '<li class="active"><a href="/login">请先登录 <span class="sr-only">(current)</span></a></li>'
            +'</ul>';
            $("#" + this.sidebarId).html(html);
            return;
        }
        // 如果有本地的， 直接获取本地的
        var data = LocalStore.menu.get();
        // console.log("data: " + data + (data != "" && typeof data !== 'undefined'));
        if (data != "" && data != null &&typeof data !== 'undefined') {
            memuObj.initSidebar(data);
            return;
        }
        // 如果以上都不是， 异步加载
        this.ajaxSidebar();
    },

    initSidebar: function(data) {

        $("#" + memuObj.sidebarId).treeview({
            data: data,         // data is not optional
            checkedIcon: "glyphicon glyphicon-check", //节点被选中时显示的图标         String
            collapseIcon: "glyphicon glyphicon-minus", //节点被折叠时显示的图标        String
            expandIcon: "glyphicon glyphicon-plus", //节点展开时显示的图标        String
            emptyIcon: "glyphicon", //当节点没有子节点的时候显示的图标              String
             showTags:true,//显示徽章
        });
        // 折叠所有节点
        $("#" + memuObj.sidebarId).treeview('collapseAll', { silent: true });
        var nodeId = LocalStore.menuNodeId.get();

        memuObj.bindevent();
    },

    // 异步加载
    ajaxSidebar: function() {
      var options = $.extend({}, {url: '/admin/menu'});
      var success = function(data) {
          console.log("ajaxSidebar success" + JSON.stringify(data)); 
          memuObj.initSidebar(data);
          LocalStore.menu.set(JSON.stringify(data));
          return false;
      };
       var error = function(data) {
          console.log("ajaxSidebar error" + JSON.stringify(data)); 
      };

      util.api.ajax(options, success, error)
    },


    // 绑定事件
    bindevent: function() {     
        $("#" + memuObj.sidebarId).on('nodeSelected', function(event, data) {
            if (typeof data.nodes !== 'undefined') {
                $("#" + memuObj.sidebarId).treeview('toggleNodeExpanded', [data.nodeId, { silent: true }]);
            }
            if (data.href === '#') {
              return 
            }
            LocalStore.menuNodeId.set(data.nodeId);
            window.location.href = data.href + "?timestamp=" + new Date(); // 跳进主界面 防止进入缓存界面
        });
    }

  }

