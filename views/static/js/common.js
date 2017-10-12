// define(['jquery','template','cookie'],function($,template){
// 	$(function(){
// 	//如果不是在登陆页面,才需要从cookie中获取用户名和密码
// 	if(location.pathname!='/dashboard/login'){
// 		//从cookie中获取userinfo的信息
// 		var userinfo=$.cookie('userinfo');
// 		//取出来的userinfo信息是字符串,需要转换成JSON对象
// 		userinfo=JSON.parse(userinfo);
// 		//获取cookie中的phpsessid值,如果没有了(取反则进入判断),则代表退出页面了,就跳转回登陆页面了
// 		//用途是,如果用户一开始就没有登陆操作,直接输入除登陆页面以外的其他网址,则检测后
// 		//发现符合条件,直接跳转到登陆界面
// 		if(!$.cookie('PHPSESSID')){
// 			location.href='/dashboard/login'
// 		}
// 		console.log(userinfo);
// 		//使用模板引擎将信息展示到侧边栏
// 		var html=template('profile-tpl',userinfo);
// 		$('#user-info').html(html);
// 	}
// 	 //退出按钮点击事件
//         $('#btn-logout').on('click',function(){
//         	$.ajax({
//         		type:'post',
//         		//退出的后台接口
//         		url:'/api/logout',
//       			success:function(data){
//       				//退出的接口,进来后代表已经退出,成功后,后台会自动删掉cookie中phpsessid值,当前
//       				// 项目中，由于接口不够完善，我们没有接口可以用来判断用户是
//       				// 否已经登录暂时，先依据cookie中是否存有phpsessid来确定用户
//       				//是否已经登录,
//       				location.href='/dashboard/login'		
//       			}
//         	})
//         })
// 	})
// })

// common.js是根据当前代码需要引入哪些包,将这些包写在数组里,
// 对应的包的返回写在形参对应的位置,没有返回值的写在后面
define(['jquery','template','cookie'],function($,template){
	$(function(){
		//如果路径不是登陆页面的情况
		if(location.pathname!='/dashboard/login'){
			
			//获取cookie的值
			var userinfo=$.cookie('userinfo');
			//cookie的值之前在login.js里被转成了字符串,所以要转回来
			userinfo=JSON.parse(userinfo);

			//调用模板的方法,将其放入页面中
			var html=template('profile-tpl',userinfo);
			$('#user-info').html(html);
			//如果没有登录的情况,输入除登陆页面的其他链接,都将跳转回登录页面
			//cookie里有个PHPSESSID的值,如果没有登陆的情况是空的
			if(!$.cookie('PHPSESSID')){
				location.href='/dashboard/login'
			}
			//点击退出按钮功能
			$('#btn-logout').on('click',function(){
				//根据接口文档,有个退出接口,下面要发送ajax给退出接口文档
				$.ajax({
					type:'post',
					url:'/api/logout',
					success:function(data){
						//请求成功后执行
						if(data.code==200){
							//让链接跳回登录界面,后台已经做了清除PHPSESSID处理,
						location.href='/dashboard/login'
						}
					}
				})
			})
			//
		}
	})
})