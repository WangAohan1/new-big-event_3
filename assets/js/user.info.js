$(function () {
    // 用户昵称必须在6个字符之内
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nick: function (value) {
            if (value.length > 6){
              return  '不可以超过6个字哦'
            }
        }
    })
    infoUser()
    // 封装一个函数初始化用户信息
    function infoUser(){
        $.ajax({
            url:'http://ajax.frontend.itheima.net/my/userinfo',
            type:"GET",
            headers:{
                Authorization:localStorage.getItem('token')
            },
            success:function(res){
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    } 
    
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        infoUser()
      })

    // 修改用户的信息
      $('.layui-form').on('submit',function(e){
          e.preventDefault()
          var fd=$(this).serialize()
          $.ajax({
              url:'http://ajax.frontend.itheima.net/my/userinfo',
              method:"POST",
              data:fd,
              headers:{
                Authorization:localStorage.getItem('token')
            },
            success:function(res){
                console.log(res);
                window.parent.getUserinfo()
            }
          })

      })



})
