$(function(){
	//如果不是在登陆页面,才需要从cookie中获取用户名和密码
	if(location.pathname!='/dashboard/login'){
		//从cookie中获取userinfo的信息
		var userinfo=$.cookie('userinfo');
		//取出来的userinfo信息是字符串,需要转换成JSON对象
		userinfo=JSON.parse(userinfo);

		console.log(userinfo);
		//使用模板引擎将信息展示到侧边栏
		var html=template('profile-tpl',userinfo);
		$('#user-info').html(html);
	}
})