//表单验证规则库
class rules {
	notnull(str) { //验证是否为空
		if (str == null || typeof str == "undefined" || str == "" || str == " ") {
			return false; //为空
		} else {
			return true;
		}
	}
	max_length(str, len_self) {
//		console.log(str);
		if (len_self > str) {
			return false; //长度超过了最大的长度
		} else {
//			if (len_self == 0) {
//				return false;
//			}
			return true;
		}
	}
	min_length(str, len_self) {
		if (len_self < str) {
			return false; //长度小于了最小的长度
		} else {
			return true;
		}
	}
	range_length(min, max, len_self) {
		if (len_self < min || len_self > max) {
			return false; //长度小于了最小的长度，大于了最大长度
		} else {
			return true;
		}
	}
	sp_length(str, len_self) {
		if (len_self != str) {
			return false; //长度不等于指定的长度
		} else {
			return true;
		}
	}
	integer(str) { //判断是否为整数
		var reg_int = /^\+?[1-9][0-9]*$/; //非零正整数
		return reg_int.test(str);
	}

	floats(str) { //判断是否为浮点数
		var reg_flo = /^[0-9]+(\.[0-9]{1,3})?$/g; //1-3位小数
		return reg_flo.test(str);
	}

	figure(str) { //判断是否只是数字
		var reg_fig = /^[0-9]*$/; //只能是数字
		return reg_fig.test(str);
	}

	character(str) { //判断只能为字符
		var reg_char = /^[A-Za-z]+$/; //只能是字母				
		return reg_char.test(str);
	}
	email(str) { //判断是否为邮箱格式，包含@和.
		var email_reg = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$/);
		return email_reg.test(str);
	}
	id_card(str) { //判断是否为18位的身份证号码
		var reg_id_card = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
		return reg_id_card.test(str);
	}
	tel_number(str) { //判断是否为电话号码，包括手机号13,14,15,16,17,18,19开头，座机号8位，含有-
		var reg_phone_number = /^1[3|4|5|6|7|8][0-9]{9}$/;
		var reg_fix_phone = /^([0-9]{3}-)[0-9]{5}$/g;
		if (reg_phone_number.test(str) || reg_fix_phone.test(str)) {
			return true;
		} else {
			return false;
		}
	}

	pos(str) { //判断邮编格式  6 位数字编码
		var pos = /^[0-9]{6}$/;
		return pos.test(str);

	}
	num_range(str, min, max) { //判断值的大小是否在某一个范围类
		//str标签的值，min最小值，max最大值
		return (str >= min && str <= max) ? true : false;
	}
	relation(r2) { //关联关系。返回最后的验证结果			
		return r2;

	}
	compare(val1, val2, com) { //两个标签大小比较，有==，===，>，<，>=，<=
		//com运算符号，val1本身的值，val2关联的值
		switch (com) {
			case "==":
				if (val1 == val2) {
					return true;
				} else return false;
				break;
			case ">=":
				if (val1 >= val2) {
					return true;
				} else return false;
				break;
			case "<=":
				if (val1 <= val2) {
					return true;
				} else return false;
				break;
			case ">":
				if (val1 > val2) {
					return true;
				} else return false;
				break;
			case "<":
				if (val1 < val2) {
					return true;
				} else return false;
				break;
			case "===":
				if (val1 === val2) {
					return true;
				} else return false;
				break;
		}

	}



}