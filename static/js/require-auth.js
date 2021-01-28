// 登录
function signin() {
 	var email =$('#login-email')[0].value;
 	var password=$('#login-password')[0].value;

 	// var mpassword = $.md5(password);
    // var mpassword = md5(str1 + email);
 	var data = {"email":email, "password":password};
 	var options = $.extend({}, {url: '/login', data: data});
 	var success = function(resp) {
 		// alert("sinin" + JSON.stringify(resp));
		CookieStore.token.set(resp.token)
 		LocalStore.account.set(resp.account);
 		LocalStore.menu.remove(); // 重新登录后删除菜单， 防止不同账号登录 		window.location.href = "/" + "?timestamp=" + new Date(); // 跳进主界面 防止进入缓存界面
 		window.location.href = "/" + "?timestamp=" + new Date(); // 跳进主界面
 	};
 	var error = function(resp) {
 		console.log("sinin error" + JSON.stringify(resp));
 	}
 	util.api.ajax(options, success, error);
}

// 注册
function signup() {

}


// 注册
function signout() {
	var options = $.extend({}, {url: '/logout'});
 	var success = function(resp) {
 		clear();
 		window.location.href = "/nindex" + "?timestamp=" + new Date(); // 跳进主界面

 	};
 	util.api.ajax(options, success, null);
}


function isLogin() {
	var token= CookieStore.token.get();
	return  token != "" && typeof token !== 'undefined'; 
}

function checkOnline(){
	if(isLogin()){
		clear();
	}
}
function clear(){
		CookieStore.token.remove();
 		LocalStore.account.remove();
 		LocalStore.menu.remove(); // 正

}
