// 保存的数据
var CookieStore = {
    	token: { // cookie 下的toke
    		get: function() {
    			return $.cookie("token");
    		},

    		set: function(token) {
    			$.cookie('token', token, {path:'/'}); 
    		},

    		remove: function() {
    			$.cookie('token', "", {path:'/'}); 
    		}
    	}
    	// 获取cookie token 
    }

// 保存在本地的
var LocalStore = {
    	account: {
    		set: function(account){
    			localStorage.setItem("account", account);
    		},

    		get: function() {
    			return localStorage.getItem("account");
    		},

    		remove: function() {
    			localStorage.removeItem("account");
    		}
    	},

    	// 把菜单保存吧
    	menu: {
    		set: function(data) {
    			localStorage.setItem("menu", data);
    		},

    		get: function() {
    			return localStorage.getItem("menu");
    		},

    		remove: function() {
    			localStorage.removeItem("menu");
    		}
    	},

        menuNodeId: {
            set: function(data) {
                localStorage.setItem("menuNodeId", data);
            },

            get: function() {
                return localStorage.getItem("menuNodeId");
            },

            remove: function() {
                localStorage.removeItem("menuNodeId");
            }
        }
    }