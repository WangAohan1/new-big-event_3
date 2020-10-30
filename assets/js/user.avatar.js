$(function () {
  var layer=layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)
  // 点击button按钮跳转到input上
  $('#btnchooseimg').on('click', function () {
    $('#file').trigger('click')
  })
  // 获取用户上传的照片
  $('#file').on('change', function () {
    // console.log(123);
    var userImg = this.files[0]
    // 进行判断是否有照片
    if (userImg === undefined) {
      return "请上传照片"
    } else {
      // 获取用户的照片
      // 拿到用户的照片
      var imgURL = URL.createObjectURL(userImg)
      // 3. 重新初始化裁剪区域
      $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
    }
  })


  // 进行图片上传
  $('#btnaddImg').on('click', function () {
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')
    // 然后发起ajax请求
    $.ajax({
      url: '/my/update/avatar',
      method: 'POST',
      data: {
        avatar: dataURL
      },
      success:function(res){
        // console.log(res);
        if(res.status !==0){
          return layer.msg('"亲照片上传失败"')
        }else{
          // 如果成功就在渲染一遍页面
          layer.msg('"亲照片上传成功!"')
          window.parent.getUserinfo()
        }
      }
    })
  })



})