$(function () {
    // 封装一个不需要http协议的
    $.ajaxPrefilter(function (options) {
        options.url = "http://ajax.frontend.itheima.net" + options.url
        // 在封装一个地址里面有 /my/的 就自动添加headers属性
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token'),
            }
        }
    })
})