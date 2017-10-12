// define(['jquery','cookie'],function($){
// 	 $(function(){
//         //注册点击事件,因为页面找不到合适的点击元素,按钮元素不好用
//         //按钮的属性是submit,改用表单提交事件
//         $('form').submit(function(e){
//             //非空验证
//             if($('input[name=tc_name]').val().trim()==""){
//                 alert('请输入用户名');
//                 return false;
//             }
//     if($('input[name=tc_pass]').val().trim()==""){
//                 alert('请输入密码');
//                 return false;
//             }
//            //获取用户输入的数据,调用表单序列化的方法
//            var data=$(this).serialize();
//           //用户输入的内容发送给接口api进行登录
//         $.ajax({
//             type:'post',
//             url:'/api/login',
//             data:data,
//             success:function(data){
//                 //额接口文档中data.code是200的情况下才算请求成功
//                if(data.code==200){
//                     //创建一个cookie并设置 cookie的有效路径：
//                     //$.cookie('cookieName', 'cookieValue', { expires: 365, path: '/' });  
//                     //cookie名,cookie值,保存时间,路径
//                     $.cookie("userinfo",JSON.stringify(data.result),{expires:365,path:'/'});
//                     //登陆成功,则跳转到页面首页
//                     location.href='/';
//                }
//             }
//         })
//         //阻止默认事件,不让表单自己提交,因为我们我发送ajax请求
//            return false;
//         })
//     })
// })

//第二种调用jquery.form的方法来实现登录功能

define(['jquery','cookie','form'],function($){
	$(function(){
		//form表单提交事件,就是点击在form表单的按钮就能触发
		$('form').submit(function(e){
			//非空验证
			if($('input[name=tc_name]').val().trim()==''){
				alert('你输入的账号为空');
				return false;
			}
			if($('input[name=tc_pass]').val().trim()==''){
				alert('你输入的密码为空');
				return false;
			}

			//调用jquery.form的方法就不需要用表单序列化了,
			//data在插件内部做了处理,直接在下面成功的回调里接收就行
			$(this).ajaxSubmit({
				url:'/api/login',
				type:'post',
				success:function(data){
					if(data.code==200){
						console.log(data)
						//先将后台返回的用户的用户名以及头像信息存储到cookie中
                        //因为首页中要用到这些信息
                        //cookie又可以做到各个页面间共享数据

                        //cookie中只能存储字符串，如果要将对象存入cookie
                        //需要先将对象转成字符串，存入cookie
                        //以后用的时候，直接将存储字符串获取出来之后，再将其转成对象！
                        $.cookie('userinfo',JSON.stringify(data.result),{
                        	expires:365,
                        	path:'/'
                        })
						location.href='/';
					}
				}
			})
			//阻止表单提交默认事件,改为上面异步的ajax提交
			return false;
		})

	})
})