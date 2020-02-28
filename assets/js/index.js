$(function () {
    $('#leftNav .layui-nav-item a').on('click', function () {
        $(this).parents('.layui-nav-item').siblings().removeClass('layui-nav-itemed');
    })


    $('.loginout').on('click', function () {
        if ($(this).hasClass('layui-this')) {
            $(this).removeClass('layui-this');
        }
    })
    //JavaScript代码区域
    layui.use('element', function () {
        var element = layui.element;
    });
})