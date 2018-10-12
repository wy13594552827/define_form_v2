class define_form {
	constructor(obj) {
		this.obj =obj;
		this.address = "重庆"; //分地区的验证		
	}
	//自动填充值
	full_auto(all_data) {
			$.each(all_data.result.data[0], function(i, n) {
				$("input[name='" + i + "']").val(n);
				$("textarea[name='" + i + "']").val(n);
			});
		}
	//获取表单的值为json字符串
	getjsondata() {
		var space_fit = {};
		var product = [];
		var report = {};
		$("input:text[data-transmit],input:password[data-transmit],input[type='checkbox'][data-transmit]:checked,input[type='radio']:checked[data-transmit] ").each(function() {
			space_fit = {}
			space_fit.val = $(this).val();
			product.push(space_fit);
		});
		$("textarea[data-transmit]").each(function() {
			space_fit = {}
			space_fit.val = $(this).val();
			product.push(space_fit);
		});
		$("select[data-transmit]").each(function() {
			space_fit = {}
			space_fit.val = $(this).val();
			product.push(space_fit);
		});
		return product;
	}

	//获取页面元素
	_gets() {
			var maps = {};
			var map1 = {};
			var arr = [];
			var ele = $(this.obj).find("[data-prove]");
			for (var len = 0; len < ele.length; len++) {
				maps = {};
				maps.ele = ele[len];
				maps.val = $(ele[len]).val();
				if($(ele[len]).attr("type")=="radio"||$(ele[len]).attr("type")=="checkbox"){
					var attrb=$(ele[len]).attr("name");
            	    var val=$("[name='"+attrb+"']:checked").val();
            	    maps.val = val;
//          	    console.log(attrb,$("[name='"+attrb+"']:checked").val());
				}
				
				maps.len_self = ($(ele[len]).val()).length;
				maps.gz = this._jx($(ele[len]).attr("data-prove"));
				maps.tip = $(ele[len]).attr("tips");
				arr.push(maps);
			}
			return arr; //返回验证规则以及元素
		}
	//解析
	_jx(rules) {
			var maps = {};
			var a = [];
			var areas;
			switch (this.address) {
				case "重庆":
					areas = "cq";
					break;
				case "新疆":
					areas = "xj";
					break;
				case "广西":
					areas = "gx";
					break;
				case "西藏":
					areas = "xz";
					break;
				default:
					areas = "*";
			}
			var gz = rules.split(";");
			$(gz).each(function b(i, val) {
				var g = val.split(":");
				if (g[0] == areas || g[0] == "*") {
					var ss = g[1].split("(");
					var keys = ss[0];
					maps[keys] = g[1];
					return maps;
				}
			});
			return maps; //返回具体的每一条规则
		}
   //验证表单
	yz(str) {
			var data = this._gets();
			var yz = "";			
			/*var gzk = this._gzk();*/
			var errors = {};
			var success = {};
			var err = []; //验证的错误信息
			var suc = []; //验证的正确信息
			var returns = true;
			var zdyreturn=true;
//			console.log("解析后的输出结果:", data);
			if ((typeof(str) == undefined) || (typeof(str) == "function")) {
				var self = str();
				$(self).each(function(i, val) {
					if (val[0] == false) {
						err.push(val[1]);
						zdyreturn = false;
					}
					if (val[0] == true) {
						suc.push(val[1]);
					}
				});
			}
			$.each(data, function(i, val) {				
				var rule = val.gz;
				var tips = val.tip;
				var len_self = val.len_self;
				var ele = val.ele;
				var val = val.val;
				var test = new rules();	//实例化规则库对象			
				$.each(rule, function(keys, value) {
					switch (keys) {
						case "notnull":
							yz = test.notnull.call(this,val);
							if (yz == false) {
								errors = {};
								errors.ele = ele;
								errors.tip = tips + "不能为空";
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}
							break;
						case "length":
							var len_self = val.length;
							var rule_len = value;
//							console.log(rule_len);
							rule_len = rule_len.split("(");
//							console.log(rule_len);
							if (rule_len[rule_len.length - 1].indexOf(",") > -1) {
								rule_len = rule_len[rule_len.length - 1].split(",");
								if (rule_len[0] == "") {
									yz = test.max_length.call(this,rule_len[1].substring(0, rule_len[1].length - 1), len_self);
								} else if (rule_len[1] == ")") {

									yz = test.min_length.call(this,rule_len[0], len_self);
								} else {
									yz = test.range_length.call(this,rule_len[0], rule_len[1].substring(0, rule_len[1].length - 1), len_self);
								}
							} else {
						 yz = test.sp_length.call(this,rule_len[rule_len.length - 1].substring(0, rule_len[rule_len.length - 1].length - 1), len_self);
							}
							if (yz == false) {
								var value1 = value.split("(");
//								console.log(value1);
								value1 = value1[value1.length - 1];
								var g = value1;
//								console.log(g);
								if (g.indexOf(",") > -1) {
									g = g.split(",");
//									console.log(g);
									if (g[0] == "") {
										var gxy=g[g.length - 1];
										g = "小于" + gxy.substring(0,  gxy.length - 1);
//										console.log(g);
									} else {
										var min = g[0];
										var max = "-" + g[1].substring(0, g[1].length - 1);
										if (g[1] == ")") {
											var max = "位以上";
										}
										g = min + max;
									}
								} else {
									g = g.substring(0, g.length - 1);
								}
								errors = {};
								errors.ele = ele;
								errors.tip = tips + "长度应为" + g;
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}
							break;
						case "floats":
							yz = test.floats.call(this,val);
							if (yz == false) {
								errors = {};
								errors.ele = ele;
								errors.tip = tips + "格式不对";
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}

							break;
						case "integer":
							yz = test.integer.call(this,val);
							if (yz == false) {
								errors = {};
								errors.ele = ele;
								errors.tip = tips + "格式不对";
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}
							break;
						case "figure":
							yz = test.figure.call(this,val);
							if (yz == false) {
								errors = {};
								errors.ele = ele;
								errors.tip = tips + "格式不对";
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}
							break;
						case "character":
							yz = test.character.call(this,val);
							if (yz == false) {
								errors = {};
								errors.ele = ele;
								errors.tip = tips + "格式不对";
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}
							break;
						case "email":
							yz = test.email.call(this,val);
							if (yz == false) {
								errors = {};
								errors.ele = ele;
								errors.tip = tips + "格式不对";
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}
							break;
						case "id_card":
							yz = test.id_card.call(this,val);
							if (yz == false) {
								errors = {};
								errors.ele = ele;
								errors.tip = tips + "格式不对";
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}
							break;
						case "tel_number":
							yz = test.tel_number.call(this,val);
							if (yz == false) {
								errors = {};
								errors.ele = ele;
								errors.tip = tips + "格式不对";
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}
							break;
						case "pos":
							yz = test.pos.call(this,val);
							if (yz == false) {
								errors = {};
								errors.ele = ele;
								errors.tip = tips + "格式不对";
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}
							break;
						case "num_range":
							var r = value;
							r = r.split("(");
							r = r[r.length - 1];
							r = r.split(",");
							var min = r[0];
							var max = r[1].substring(0, r[1].length - 1);
							yz = test.num_range.call(this,val, min, max);
							if (yz == false) {
								errors = {};
								errors.ele = ele;
								errors.tip = tips + min + "-" + max;
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}
							break;
						case "relation":
							var v = value;
							var v1 = v.split("],[");
							var id = v1[0];
							var gz_self = v1[v1.length - 1];
							gz_self = gz_self.split("]");
							gz_self = gz_self[0]; //当前元素的规则
							id = id.split("[");
							var gz1 = id[id.length - 1]; //关联元素的规则
							id = id[0];
							id = id.split("(");
							id = id[id.length - 1]; //关联元素的id
							var val1 = $("#" + id).val(); //关联元素的值
							var len1 = $("#" + id).val().length; //关联元素的值的长度
							//对关联的元素的规则调用
							var r1;
							var r2;
							if (gz1 == "notnull()") {
								(test.notnull.call(this,val1)) ? r1 = true: r1 = false;
							}
							if (gz1.indexOf("length") > -1) {
								console.log(gz1);
								var str = gz1;
								var len_self = val1.length;
								str = str.split("(");
								if (str[str.length - 1].indexOf(",") > -1) {
									str = str[str.length - 1].split(",");
									if (str[0] == "") {
										(test.max_length.call(this,str[1].substring(0, str[1].length - 1), len_self)) ? r1 = true: r1 = false;
									} else if (str[1] == ")") {

										(test.min_length.call(this,str[0], len_self)) ? r1 = true: r1 = false;
									} else {
										(test.range_length.call(this,str[0], str[1].substring(0, str[1].length - 1), len_self)) ? r1 = true: r1 = false;
									}
								} else {
						(test.sp_length.call(this,str[str.length - 1].substring(0, str[str.length - 1].length - 1), len_self)) ? r1 = true: r1 = false;
									//console.log(r1);
								}

							}
							if (gz1 == "floats()") {
								(test.floats.call(this,val1)) ? r1 = true: r1 = false;
							}
							if (gz1 == "figure()") {
								(test.figure.call(this,val1)) ? r1 = true: r1 = false;
							}
							if (gz1 == "character()") {
								(test.character.call(this,val1)) ? r1 = true: r1 = false;
							}
							if (gz1 == "integer()") {
								(this.integer.call(this,val1)) ? r1 = true: r1 = false;
							}
							if (gz1 == "pos()") {
								(test.pos.call(this,val1)) ? r1 = true: r1 = false;
							}
							if (gz1 == "tel_number()") {
								(test.tel_number.call(this,val1)) ? r1 = true: r1 = false;
							}
							if (gz1 == "id_card()") {
								(test.id_card.call(this,val1)) ? r1 = true: r1 = false;
							}
							if (gz1 == "email()") {
								(test.email.call(this,val1)) ? r1 = true: r1 = false;
							}
							if (gz1.indexOf("num_range") > -1) {
								/*console.log(gz1);*/
								var r = gz1;
								r = r.split("(");
								r = r[r.length - 1];
								r = r.split(",");
								var min = r[0];
								var max = r[1].substring(0, r[1].length - 1);
								(test.num_range.call(this,val1, min, max)) ? r1 = true: r1 = false;
							}
							/*console.log(r1);*/
							/*console.log(len_self);*/
							if (r1 == true) {
								if (gz_self == "notnull()") {
									(test.notnull.call(this,val)) ? r2 = true: r2 = false;
								}
								if (gz_self.indexOf("length") > -1) {
									var str = gz_self;
									var len_self = val.length;
									str = str.split("(");
									if (str[str.length - 1].indexOf(",") > -1) {
										str = str[str.length - 1].split(",");
										if (str[0] == "") {
											(test.max_length.call(this,str[1].substring(0, str[1].length - 1), len_self)) ? r2 = true: r2 = false;
										} else if (str[1] == ")") {

											(test.min_length.call(this,str[0], len_self)) ? r2 = true: r2 = false;
										} else {
									(test.range_length.call(this,str[0], str[1].substring(0, str[1].length - 1), len_self)) ? r2 = true: r2 = false;
										}
									} else {
						(test.sp_length.call(this,str[str.length - 1].substring(0, str[str.length - 1].length - 1), len_self)) ? r2 = true: r2 = false;
										//console.log(r1);
									}
								}
								if (gz_self == "floats()") {
									(test.floats.call(this,val)) ? r2 = true: r2 = false;
								}
								if (gz_self == "figure()") {
									(test.figure.call(this,val)) ? r2 = true: r2 = false;
								}
								if (gz_self == "character()") {
									(test.character.call(this,val)) ? r2 = true: r2 = false;
								}
								if (gz_self == "integer()") {
									(test.integer.call(this,val)) ? r2 = true: r2 = false;
								}
								if (gz_self == "pos()") {
									(test.pos.call(this,val)) ? r2 = true: r2 = false;
								}
								if (gz_self == "tel_number()") {
									(test.tel_number.call(this,val)) ? r2 = true: r2 = false;
								}
								if (gz_self == "id_card()") {
									(test.id_card.call(this,val)) ? r2 = true: r2 = false;
								}
								if (gz_self == "email()") {
									(test.email.call(this,val)) ? r2 = true: r2 = false;
								}
								if (gz_self.indexOf("num_range") > -1) {
									var r = gz_self;
									r = r.split("(");
									r = r[r.length - 1];
									r = r.split(",");
									var min = r[0];
									var max = r[1].substring(0, r[1].length - 1);
									(test.num_range.call(this,val1, min, max)) ? r2 = true: r2 = false;
								}

							} else {
								r2 = false;
							}
							/*console.log(r2);*/
							yz = test.relation.call(this,r2);
							if (yz == false) {
								errors = {};
								errors.ele = ele;
								errors.tip = tips;
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}
							break;
						case "compare":
							var gz = value;
							var id = gz.split("(");
							id = id[id.length - 1];
							id = id.split("_");
							var com = id[0]; //运算符
							id = id[id.length - 1];
							id = id.substring(0, id.length - 1);
							var val2 = $("#" + id).val();
							yz = test.compare.call(this,val, val2, com);
							//解析出tips的显示内容
							var t = value.split("(");
							t = t[t.length - 1];
							t = t.split("_");
							var f = t[0]; //运算符
							var val2 = t[t.length - 1]; //id
							val2 = val2.substring(0, val2.length - 1);
							var val3 = $("#" + val2).val();
							if (yz == false) {
								errors = {};
								errors.ele = ele;
								errors.tip = tips + f + val3;
								err.push(errors);
								returns = false;
								return false;
							} else {
								success = {};
								success.ele = ele;
								suc.push(success);
								return true;
							}
							break;
					}
					return returns;
				});
				return [returns, err, suc];
			});
			this.err = err;
			this.suc = suc;
//			console.log(zdyreturn);
			if(returns==true&&zdyreturn==true){
				return true;
			}
			else{
				return false;
			}
		}
   //tips显示方式
	tips(yz, err, suc, str) {
		//yz表单验证的结果，err验证未通过的结果集，suc验证通过的结果集，str自定义的函数
		if ((typeof(str) == undefined) || (typeof(str) == "function")) {
			let tf = new show_tips();//实例化tips显示对象
			tf.tips_form_four.call(this, yz, err, suc);//对表单的提示信息显示进行选择
			//str(err, suc);
		} else {
			if (yz == false) {
				$(suc).each(function(i, val) {
					var ele = val.ele;
					$(ele).css({
						"border": "1px solid green"
					});
				});
				$(err).each(function(i, val) {
					var ele = val.ele;
					$(ele).css({
						"border": "1px solid red"
					});
				});
			} else {
				$(suc).each(function(i, val) {
					var ele = val.ele;
					$(ele).css({
						"border": "1px solid green"
					});
				});
			}

		}

	}
}
$(function(){
	(function(){
		//获取焦点处理
		var ele = $("#form_define").find("[data-prove]");
        $(ele).each(function(i, e) {
        	$(e).focus(function(){
        		if($(this).next().attr("dial")=="tips"){
                    $(this).next().remove();           			
        		}
        		else{return;}
        	})
        });
   })();
   //单选框复选框的处理
   (function(){
		var ele = $("#form_define").find("input[type='radio'],input[type='checkbox']");
        $(ele).each(function(i, e) {
            $(e).click(function(){
//          	var attrb=$(this).attr("name");
//          	var val=$("[name='"+attrb+"']:checked").val();
//          	$(this).parent().children("input:last-child").val(val);
        		if($(this).parent().children(".box-tips").attr("dial")=="tips"){
                    $(this).parent().children(".box-tips").remove();           			
        		}
        		else{return;}
        	})
        });
   })();
});

