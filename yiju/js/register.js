/**
 * Created by Administrator on 2016/10/12 0012.
 */
/*var hook = document.getElementById('check_hook'),
 checkBox = document.getElementById('check_bx');

 checkBox.onclick = function () {
 if (hook.className == 'checked') {
 hook.className = '';
 } else {
 hook.className = 'checked';
 }
 };*/

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
$('form #input-3').on({
    focus: function () {
        $(this).parent().css({
            'border-color': '#70ad46'
        });
    },
    blur: function () {
        var val = $(this).val();
        //console.log(val);
        theInput(val == '' ? false : val === $('form input[name=lpassword]').val(), this);
    }
});
$('form input[name=lemail]').on({
    focus: function () {
        $(this).parent().css({
            'border-color': '#70ad46'
        });
    },
    blur: function () {
        var val = $(this).val();
        theInput(/^[a-zA-Z0-9][\w]{5,17}@[a-z0-9]{2,6}(\.[a-z]{2,3}){1,2}$/.test(val), this);
    }
});
$('form input[name=lphone]').on({
    focus: function () {
        $(this).parent().css({
            'border-color': '#70ad46'
        });
    },
    blur: function () {
        var val = $(this).val();
        theInput(/^1[0-9]{10}$/.test(val), this);
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
    /*--------------------------第一种-----------------------*/
    //多项选择，一次全部判断
    var isform = true;
    if (isform) {
        if (!(/[\w]{6,20}/.test($('form input[name=lname]').val()))) {
            $('form input[name=lname]').blur();
        }
        if (!(/^[a-zA-Z0-9][\w]{5,19}/.test($('form input[name=lpassword]').val()))) {
            $('form input[name=lpassword]').blur();
        }
        if (!($('form #input-3').val() === $('form input[name=lpassword]').val()) || $('form #input-3').val() == '') {
            $('form #input-3').blur();
        }
        if (!(/^[a-zA-Z0-9][\w]{5,17}@[a-z0-9]{2,6}(\.[a-z]{2,3}){1,2}$/.test($('form input[name=lemail]').val()))) {
            $('form input[name=lemail]').blur();
        }
        if (!(/^1[0-9]{10}$/.test($('form input[name=lphone]').val()))) {
            $('form input[name=lphone]').blur();
        }
        if ($('#check_hook').attr('class') == '') {
            isform = false;
            alert('请选择');
        }
    }
    for (var i in off) {
        if (!off[i]) {
            isform = false;
        }
    }


    if (isform) {
        //alert(11);
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/saveLandlord.action',
            dataType: 'jsonp',
            data: $('form').serialize(),
            success: function (data) {
                //alert(data.resultCode);
                if (data.resultCode == '0000') {
                    $('.all').show();
                    $('#reg_pop').show();
                    $('.off').click(function () {
                        $('#reg_pop').hide();
                        $('.all').hide();
                    });
                    $('.continue').click(function () {
                        $.ajax({
                            type: 'post',
                            url: 'http://www.zhijunxing.com/yiju/saveLandlord.action',
                            dataType: 'jsonp',
                            data: {
                                lname: $('form input[name=lname]').val(),
                                lpassword: $('form input[name=lpassword]').val()
                            },
                            success: function (data) {
                                if (data.resultCode == 0000) {
                                    location.href = 'login.html'
                                } else {
                                    alert('发生未知错误，登录失败')
                                }
                            }
                        })
                    })
                }
            }
        })
    }
    //第二种写法------单项选择，每次只会判断一个
    /*if (!(/[\w]{6,20}/.test($('form input[name=lname]').val()))) {
     $('form input[name=lname]').blur();
     }
     else if (!(/^[a-zA-Z0-9][\w]{5,19}/.test($('form input[name=lpassword]').val()))) {
     $('form input[name=lpassword]').blur();
     }
     else if (!($('form #input-3').val() === $('form input[name=lpassword]').val()) || $('form #input-3').val() == '') {
     $('form #input-3').blur();
     }
     else if (!(/^[a-zA-Z0-9][\w]{5,17}@[a-z0-9]{2,6}(\.[a-z]{2,3}){1,2}$/.test($('form input[name=lemail]').val()))) {
     $('form input[name=lemail]').blur();
     }
     else if (!(/^1[0-9]{10}$/.test($('form input[name=lphone]').val()))) {
     $('form input[name=lphone]').blur();
     }
     else if ($('.check_box s').attr('class') == '') {
     alert('请选择');
     } else {
     $.ajax({
     type: 'post',
     url: 'http://www.zhijunxing.com/yiju/saveLandlord.action',
     dataType: 'jsonp',
     data: $('form').serialize(),
     success: function (data) {
     alert(data.resultCode);
     if (data.resultCode == '0000') {
     location.href = 'login.html'
     }
     }
     })
     }
     */
    /*-----------------------------第二种结束----------------------*/

    /*if (!$('.check_box s').attr('class') == '') {
     theForm = false;
     }*/

});

