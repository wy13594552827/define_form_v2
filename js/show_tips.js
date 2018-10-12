class show_tips {
	tips_form_one(yz, err, suc) {
		if (yz == false){
			$(suc).each(function(i, val) {
				var ele = val.ele;
				$(ele).css({
					"border": "1px solid green"
				});
			});
			$(err).each(function(i, val) {
				console.log(val);
				var ele = val.ele;
				$(ele).css({
					"border": "1px solid red"
				});
			});
		}
		if (yz == true) {
			$(suc).each(function(i, val) {
				var ele = val.ele;
				$(ele).css({
					"border": "1px solid green"
				});
			});
		}
	}
	tips_form_two(yz, err, suc) {
		if (yz == false) {
			$(suc).each(function(i, val) {
				var ele = val.ele;
				$(ele).next().remove();
				$(ele).after("<em style='position: absolute; display: inline-block; width:20px;height:20px; text-align: center;box-sizing: border-box; border-radius:10px;font-size:12px; margin-top:8px;color:white;background-color:green'>✔</em>");
				$(ele).next().next().remove();
			});
			$(err).each(function(i, val) {
				var ele = val.ele;
				var tip = val.tip;
				$(ele).next().remove();
				$(ele).after("<em style='position: absolute; display: inline-block;width:20px; height:20px;text-align: center;box-sizing: border-box;border-radius:10px;font-size:12px;margin-top:8px;color:white;background-color:red'>✘</em>");
				$(ele).next().next().remove();
				$(ele).next().after("<font style='position:absolute;line-height:50px;display: inline-block;margin-left:21px;margin-top:-8px;color:red;'>" + tip + "</font>");

			});
		} else {
			$(suc).each(function(i, val) {
				var ele = val.ele;
				$(ele).next().remove();
				$(ele).after("<em style='position: absolute;display: inline-block;width:20px;height:20px;text-align: center;box-sizing: border-box;border-radius:10px; font-size:12px;margin-top:8px;color:white;background-color:green'>✔</em>");
				$(ele).next().next().remove();
			});
		}
	}
    tips_form_three(yz, err, suc) {
		if (yz == false){
			$(suc).each(function(i, val) {
				var ele = val.ele;
				$(ele).css({
					"border": "1px solid rgba(0,0,0,0)"
				});
			});
			$(err).each(function(i, val) {
				//console.log(val);
				var ele = val.ele;
				$(ele).css({
					"border": "1px solid red"
				});
			});
		}
		if (yz == true) {
			$(suc).each(function(i, val) {
				var ele = val.ele;
				$(ele).css({
					"border": "0px solid green"
				});
			});
		}
	}
    tips_form_four(yz, err, suc) {
		if (yz == false) {
			$(suc).each(function(i, val) {
                var ele = val.ele;
				$(ele).next().remove();
				$(ele).after("<p class='box-tips' style='position:absolute;top:5px;right:5px;display:none;color:red;'>输入正确</p>");
				
			});
			$(err).each(function(i, val) {
			var ele = val.ele;
			var tip = val.tip;
			$(ele).next().remove();
		    $(ele).after("<p class='box-tips' dial='tips'   style='position:absolute;top:5px;right:5px;display: inline-block;color:red;'>" + tip + "</p>");

			});
		} else {
			$(suc).each(function(i, val) {
			var ele = val.ele;
			$(ele).next().remove();
			$(ele).after("<p class='box-tips' style='position:absolute;top:5px;right:5px;display:none;color:red;'>输入正确</p>");
			});
		}
	}



}