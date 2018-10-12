$(function() {
	var formA = new define_form("#form_define");
//	console.log(formA);
	var all_data = {
		"result": {
			"data": [{
				"username": "张三asd",
				"password": "abc123",
				"area": "重庆",
				"address": "重庆市渝北区",
				"phone_number": "13593452626",
				"pos": "407893",
				"id_number": "500234199509087656",
				"createtime": "20171023124200",
				"email": "1367@qq.com",
				"textareas": "你好世界",
				"selects": "选中的内容",
				"A": "AA",
				"B": "BB",
				"range": 7
			}]
		}
	};
	formA.full_auto(all_data); //填充值
	$("#saves").click(function() {
		//var yz=formA.yz();
		var yz = formA.yz(function() {
			var errors = {};
			var success = {};
			var retu = [];
			var a = [];
			if (parseInt($("#a").val()) === (parseInt($("#b").val()) + parseInt($("#c").val()))) {
				success = {};
				success.ele = $("#a");
				success.result = true;
				a = [true, success];
				retu.push(a);
			} 
			else {
				errors = {};
				errors.ele = $("#a");
				errors.tip = "格式不对";
				a = [false, errors];
				retu.push(a);
			}	
//			if($("[name='sex']:checked").val()==null||$("[name='sex']:checked").val()==undefined){
//				errors = {};
//				errors.ele = $("[name='sex']")[$("[name='sex']").length-1];
//				errors.tip = "性别没有选择";
//				a = [false, errors];
//				retu.push(a);
//			}
//			if($("[name='fx']:checked").val()==null||$("[name='fx']:checked").val()==undefined){
//				console.log($("[name='fx']")[$("[name='fx']").length-1]);
//				errors = {};
//				errors.ele = $("[name='fx']")[$("[name='fx']").length-1];
//				errors.tip = "复选框没有选择";
//				a = [false, errors];
//				retu.push(a);
//			}			
			console.log(retu);
			return retu;
		});
		var err = formA.err;
		var suc = formA.suc;
//		console.log("验证未通过的", err, "验证通过的", suc);
//		console.log(yz);
		if (yz == false) {
			formA.tips(yz, err, suc, function() {}); //整个表单的验证还没通过时执行的tips方法
		} else {
//			console.log("验证通过后获取到的值", formA.getjsondata());
			formA.tips(yz, err, suc, function() {}); //整个表单的验证全部通过之后执行的tips方法
//			console.log("验证通过");
		}
	});
});