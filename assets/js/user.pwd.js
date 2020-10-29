$(function () {
    // 进行表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        somePwd: function (value) {
            // 判断新旧密码是否一致  不可以一致
            if (value === $('[name=oldPwd]').val()) {
                return "两次密码不可以一样哦"
            }
        },
        rePwd: function (value) {
            // 判断两次密码是否一致必须保持一致
            if (value !== $('[name=newPwd]').val()) {
                return "亲 请确认密码是否一致"
            }
        }

    })

    // 进行更改密码验证
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        var fd = $(this).serialize()
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/my/updatepwd',
            type: 'POST',
            data: fd,
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                if (res.status !== 0) {
                    return "获取失败"
                } else {
                    // 如果修改成功就清空输入框
                    layer.msg('修改密码成功')
                    $('.layui-form')[0].reset()
                }
            }
        })
    })
})