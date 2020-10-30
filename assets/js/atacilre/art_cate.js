$(function () {
    var layer = layui.layer
    // 封装一个渲染在页面上的函数
    initBook()

    function initBook() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取数据失败")
                };
                layer.msg("获取信息成功")
                // 如果获取成功就讲数据渲染到页面上
                var htmlStr = template('tmp-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }


    // 点击进行添加
    var indexAdd
    $('#addBook').on('click', function () {
        // 点击弹出弹出层
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#addBooks').html()
        });
        $('body').on('submit', '#formAdd', function (e) {
            e.preventDefault()
            // 进行添加步骤\
            var fd = $(this).serialize()
            $.ajax({
                url: '/my/article/addcates',
                method: 'POST',
                data: fd,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    };
                    layer.msg(res.message)
                    // 渲染页面
                    initBook()
                    // 并且关闭弹出层
                    layer.close(indexAdd);
                }
            })
        })
    })

    // 点击删除按钮
    $('tbody').on('click', '#removBook', function (e) {
        e.preventDefault()
        var id = $(this).data('id')
        $.ajax({
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                // 删除成功后再重新渲染页面
                initBook()
            }
        })
    })




    // 编辑面板开始
    var indexRe
    $('tbody').on('click', '#btnRe', function () {
        // 点击弹出弹出层
      indexRe=  layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#addBooks').html()
        });
        var id = $(this).data('id')
        $.ajax({
            url: "/my/article/cates/" + id,
            success: function (res) {
             
                layui.form.val("form-edit", res.data)
            }
        })



        // 进行表单提交
        $('body').on('submit', '#formedit', function (e) {
            e.preventDefault()
            var fd = $(this).serialize()
            $.ajax({
                url: '/my/article/updatecate',
                method: 'POST',
                data: fd,
                success: function (res) {
                    console.log(res);
                    initBook()
                    // 并且关闭弹出层
                    layer.close(indexRe);
                }
            })
        })
    })
})