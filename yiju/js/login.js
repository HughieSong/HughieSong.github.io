/**
 * Created by Administrator on 2016/10/12 0012.
 */
/*$('.check_box').click(function () {
    $('.check_box s').toggleClass('checked')
});*/
/*$('.check_box').toggle(
    function(){
        $('.check_box s').addClass('checked')
    },function(){
        $('.check_box s').removeClass('checked')
    }
);*/
$('.check_box').toggle(
    function(){
        $(this).contents().addClass('checked')
    },function(){
        $(this).contents().removeClass('checked')
    }
);
var off = {};
$('#main_box input').eq(0).on({
    focus: function () {
        $(this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        });

    },
    blur: function () {
        var val = $(this).val();
        theInput(/[\w]{6,20}/.test(val), this);
        $(this).parent().css({
            'border-color': '#cccccc'
        });

    }
}).focus();
$('#main_box input').eq(1).on({
    focus: function () {
        $(this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        });
    },
    blur: function () {
        var val = $(this).val();
        theInput(/^[a-zA-Z0-9][\w]{5,19}/.test(val), this);
        $(this).parent().css({
            'border-color': '#cccccc'
        });

    }
});

function theInput(put, _this) {
    if (put) {
        $(_this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        });
        off[_this.className] = true;
    } else {
        $(_this).parent().css({
            'border-color': '#981616'
        });
        off[_this.className] = false;
    }
}
$('form .reg_btn').click(function () {
    var theForm = true;
    if(theForm){
        if (!(/[\w]{6,20}/.test($('form input[name=lname]').val()))) {
            $('form input[name=lname]').blur();
        }
        if (!(/^[a-zA-Z0-9][\w]{5,19}/.test($('form input[name=lpassword]').val()))) {
            $('form input[name=lpassword]').blur();
        }
        if ($('#check_hook').attr('class') == '') {
            isform=false;
            alert('请选择');
        }
    }

    for (var i in off) {
        if (!off[i]) {
            theForm = false;
        }
    }

    if (theForm) {

        alert(11111111111);
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/landlordLogin.action',
            dataType: 'jsonp',
            data: $('form').serialize(),
            success: function (data) {
                alert(data.resultCode);
                if (data.resultCode == '0000') {
                    location.href = 'home.html'
                } else {
                    alert('账号或密码错误，登录失败！')
                }
            }
        })
    }
});


/*
$('.check_box').click(function () {
    $('.check_box s').toggleClass('checked')
});


var off = {};

$('form input[name=lname]').on({
    focus: function () {
        $(this).parent().css({
            'border-color': '#70ad46'
        });
    },
    blur: function () {
        var val = $(this).val();
        theInput(/[\w]{6,20}/.test(val), this);
    }
}).focus();

$('form input[name=lpassword]').on({
    focus: function () {
        $(this).parent().css({
            'border-color': '#70ad46'
        });
    },
    blur: function () {
        var val = $(this).val();
        theInput(/^[a-zA-Z0-9][\w]{5,19}/.test(val), this);
    }
});

function theInput(put, _this) {
    if (put) {
        $(_this).parent().css({
            'border-color': '#70ad46'
        });

        off[_this.className] = true
    } else {
        $(_this).parent().css({
            'border-color': '#981616'
        });
        off[_this.className] = false;

    }
}

$('form .reg_btn').click(function () {

    var isform = true;
    if (isform) {
        if (!(/[\w]{6,20}/.test($('form input[name=lname]').val()))) {
            $('form input[name=lname]').blur();
        }
        if (!(/^[a-zA-Z0-9][\w]{5,19}/.test($('form input[name=lpassword]').val()))) {
            $('form input[name=lpassword]').blur();
        }
        if ($('#check_hook').attr('class') == '') {
            isform=false;
            alert('请选择');
        }
    }
    for (var i in off) {
        if (!off[i]) {
            isform = false;
        }
    }

    if (isform) {
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/saveLandlord.action',
            dataType: 'jsonp',
            data: $('form').serialize(),
            success: function (data) {
                alert(data.resultCode);
                if (data.resultCode == '0000') {
                    location.href = 'home.html'
                }

            }
        })
    }
});*/
