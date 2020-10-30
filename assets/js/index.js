$(function () {
    getUserinfo()
    // 点击退出退回主页面
    $('#exit').on('click',function(e){
        e.preventDefault()
        location.href='/login.html'
    })
})


// 封装一个函数将其名字图片渲染到页面上
function getUserinfo() {
    $.ajax({
        url:'http://ajax.frontend.itheima.net/my/userinfo',
        headers:{
            Authorization:localStorage.getItem('token')
        },
        success:function(res){
            console.log(res);
            judge(res.data)
        }
    })
}

// 在判断用户的头像与第一次的英文字母
function judge(user){
    // console.log(123);
    // 进行判断是否有管理员名 有就渲染没有就渲染自己的名称
    var name = user.nickname || user.username
    $('.welcome').html("Hello &nbsp;" + name)
    // 在进行是否有图片 有图片 圆圈就 隐藏
    if(user.user_pic !== null) {   //代表有照片
        // 有照片先显示照片框
        $('.layui-nav-img').show().attr('src',user.user_pic)
        $('.text').hide()
    }else{
        $('.layui-nav-img').hide()
        // 该name的名字第一个字母改成大写
        var strtext = name[0].toUpperCase()
        $('.text').show().html(strtext)
    }
}