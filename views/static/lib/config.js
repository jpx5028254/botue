//require既是函数,也是对象,对象也有属性,设置require.config的方法
require.config({
	//设置baseUrl属性后,后面的文件的路径都是以baseUrl为基准
	baseUrl:'/views/assets',
	//别名设置,以后文件夹及文件的路径改变时,方便统一更改
	paths:{
		"jquery":"jquery/jquery",
		"cookie":'jquery-cookie/jquery.cookie',
		'template':'artTemplate/template',
		'form':'jquery-form/jquery.form'
	}

})
//别名设置完以后,再去各个页面里将