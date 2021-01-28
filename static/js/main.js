require.config({
    // 向服务器请求额外参数 防止缓存的
    urlArgs: "time=" +  new Date().getTime()
    // packages: [{
    //     name: 'moment',
    //     location: '../libs/moment',
    //     main: 'moment'
    // }
    // ],
    appDir: "/dataz/epogt/admin"
    baseUrl: './static/js', //资源基础路径
    //在打包压缩时将会把include中的模块合并到主文件中
    include: [],

    dir: "./dist"
    // 加载
    paths: {
        'auth': "require-auth:",
        'form': 'require-form',
        'table': 'require-table',
        'util': 'require-util',
        'menu': 'require-menu',
        'store': 'require-store',


        // 以下的包从node_modules目录加载
        "popper": '../../node_modules/popper.js/dist/umd/popper',
        'jquery': '../../node_modules/jquery/dist/jquery.min',
        'bootstrap': '../../node_modules/bootstrap/dist/js/bootstrap.min',
        'toastr': '../../node_modules/toastr/toastr',
        'cookie': '../../node_modules/jquery.cookie/jquery.cookie',
        'bootstrap-table': '../../node_modules/bootstrap-table/dist/bootstrap-table.min',
        'bootstrap-table-lang': '../../node_modules/bootstrap-table/dist/locale/bootstrap-table-zh-CN',
        'layer': '../../node_modules/layer/layer.min',
        'bootstrap-treeview': '../../node_modules/bootstrap-treeview/dist/bootstrap-treeview.min',
        'adminlte': '../../node_modules/admin-lte/dist/js/adminlte.min',
        'chart':  '../../node_modules/chart.js/dist/Chart.min',

    },
    // shim依赖配置
    shim: {
        'backend': ['backend'],
        'bootstrap': ['jquery'],
        'bootstrap-table': {
            deps: [
                'bootstrap',
            ],
            exports: '$.fn.bootstrapTable'
        },
        'bootstrap-table-lang': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
      
        'adminlte': {
            deps: ['bootstrap', 'slimscroll'],
            exports: '$.AdminLTE'
        }
    },
    // map: {
    //     '*': {
    //         'css': '../libs/require-css/css.min'
    //     }
    // },
    waitSeconds: 30,
    charset: 'utf-8' // 文件编码
});

require(['jquery', 'bootstrap'], function ($, undefined) {

    var paths = {};
    // paths['lang'] = Config.moduleurl + '/ajax/lang?callback=define&controllername=' + Config.controllername;
    // 避免目录冲突
    paths['backend/'] = 'backend/';
    require.config({paths: paths});

    // 初始化
    $(function () {
    });
});
