$(function () {

    var url = 'http://www.liulongbin.top:3007';

    // 切换登录框和注册框
    $('#goReg').on('click', function () {
        $('#login').hide().next().show();
    })
    $('#goLogin').on('click', function () {
        $('#reg').hide().prev().show();
    })

    // 自定义校验规则
    layui.form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });


    // 注册提交
    $('#reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: url + '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                $('#reg').hide().prev().show();
            }
        })
    })

    // 登录提交
    $('#login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: url + '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('用户名或密码错误');
                }
                localStorage.setItem('token', res.token);
                layui.layer.msg('登录成功');
                location.href = '/index.html';
            }
        })
    })
})