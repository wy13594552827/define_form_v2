var submit_sync = function() {  
    $.ajax({  
        type: "post",  
        url: 'a.php',  
        async: false, // 使用同步方式  
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...  
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}  
        data: JSON.stringify({                    
            a: parseInt($('input[name="a"]').val()),  
            b: parseInt($('input[name="b"]').val()),  
            now: new Date().getTime() // 注意不要在此行增加逗号  
        }),  
        contentType: "application/json; charset=utf-8",  
        dataType: "json",  
        success: function(data) {  
            $('textarea').text(data.result);  
        } // 注意不要在此行增加逗号  
    });  
}  
submit_sync();
