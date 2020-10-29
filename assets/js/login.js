$(function () {
    // console.log(123);
    // 点击互相跳转
    $('#goreg').on('click', function () {

        $('.log_login').hide()
        $('.log_reg').show()
        console.log(123);
    })
    $('#gologin').on('click', function () {
        $('.log_login').show()
        $('.log_reg').hide()
    })

    // 自定义表单校验规则
    layui.form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //   再次确认的密码验证
        repwd: function (value) {
            // var repass = $('.pwdsss').val()
            var repass =$('.log_reg [name=password]').val()
            if (value !== repass){
                return '两次输入不一致';
            }
        }
    })
    // 注册功能
    $('.log_reg').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'http://ajax.frontend.itheima.net/api/reguser',
            method:'POST',
            data:{
                username:$('.log_reg [name=username]').val(),
                password:$('.log_reg [name=password]').val()
            },
            success:function(res){
                // console.log(res);
                // 注册成功转到登录页面
                if(res.status === 0 ){
                    $('.log_login').show()
                    $('.log_reg').hide()
                }else{
                    $('.log_login').hide()
                    $('.log_reg').show()
                }
            }

        })
    })

    // 登录功能
    $('#formlog').on('submit',function(e){
        e.preventDefault()
        // console.log(123);
        var fd =$(this).serialize()
        // console.log(fd);
        $.ajax({
            url:'http://ajax.frontend.itheima.net/api/login',
            method:"post",
            data:fd,
            success:function(res){
                // console.log(res);
                // 进行判断登录成功就进行跳段
                if(res.status !==0){
                    return  layui.layer.msg(res.message,{icon: 5})
                }else{
                  layui.layer.msg(res.message,{icon: 6})
                    // 将数据存储在本地
                    localStorage.setItem('token',res.token)
                    location.href='/index.html'
                }
            }

        })

    })



})