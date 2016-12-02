/**
 * Created by Administrator on 2016/10/14 0014.
 */

$('#address_box').on({
    mouseover: function () {
        $('#pop').show();
    },mouseout: function () {
        $('#pop').hide();
    }
});
$('#pop').hover(function () {
    $(this).show();
}, function () {
    $(this).hide();
});
$('#pop i').click(function () {
    $('#address').html($(this).html());
    $('#pop').hide();
});

$('.upphoto').click(function () {
    $('#resetphoto').show();
    $('#resetphoto').siblings().hide();
    //$('#resetname').hide();
    //$('#resetpwd').hide();
});
$('.chname').click(function () {
    $('#resetname').show();
    $('#resetname').siblings().hide();
});
$('.chpwd').click(function () {
    $('#resetpwd').show();
    $('#resetpwd').siblings().hide();
});
$('.to_collect').click(function () {
    $(this).addClass('check');
    $(this).siblings().removeClass('check');
    $('.mycollect').show();
    $('.mycollect').siblings().hide();
});
$('.to_announce').click(function () {
    $(this).addClass('check');
    $(this).siblings().removeClass('check');
    $('.myannounce').show();
    $('.myannounce').siblings().hide();
});
$('.to_history').click(function () {
    $(this).addClass('check');
    $(this).siblings().removeClass('check');
    $('.history').show();
    $('.history').siblings().hide();
});
$('.to_edit').click(function () {
    $(this).addClass('check');
    $(this).siblings().removeClass('check');
    $('.rephoto').show();
    $('.rephoto').siblings().hide();
});
$('.inner_bar_tool').click(function () {
    $(this).addClass('inner_bar_check');
    $(this).siblings().removeClass('inner_bar_check');

});


/*-------------------------上传头像--------------------------------*/
login();
//获取登录信息
function login() {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/loginSession.action',
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
            if (data.success) {
                pass= data.data[0].lpassword;
                var a = '<a href="###">' + data.data[0].lname + '</a>|<a href="###" onclick="quitLogin()">退出</a>';
                $('#reg').html(a);
                $('#name').html(data.data[0].lname);
                if (data.data[0].lphoto) {
                    $('#head_little img').attr('src', 'http://www.zhijunxing.com/yiju/upload/' + data.data[0].lphoto);
                } else {
                    alert('没有图片');
                }
            } else {
                location.href = 'login.html';
            }
        }
    });
}
//上传图片按钮
$('#resetphoto').on('change', 'input', function () {
    if (typeof FileReader == 'undefined') {
        alert("检测到您的浏览器不支持FileReader对象");
    }
    var reader = new FileReader(),
        val = this.files[0];
    reader.readAsDataURL(val);
    reader.onload = function () {
        $('#resetphoto img').attr('src', reader.result);
    }
});
//点击保存，开始上传图片文件
$('.save_1').click(function () {
    $.ajaxFileUpload({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
        secureurl: false,
        fileElementId: 'uploadPhoto',
        async: true,
        cache: true,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
    });
    //一秒后在从新获取一次登录信息
    setTimeout(function () {
        login();
    }, 1000);
});
//退出
function quitLogin() {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/quitLogin.action',
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
            if (data.resultCode == '0000') {
                location.href = 'home.html';
            }
        }
    });
}


/*---------------------------------修改昵称----------------------------------*/

$('.reset-name-r input').on({
    focus: function () {
        $('.reset-name-r').css({
            'border-color': 'rgb(112, 173, 70)'
        });
    },
    blur: function () {
        var val = $(this).val();
        if (/[\w]{6,20}$/.test(val)) {
            $('.save_name').click(function () {
                $.ajax({
                    type: 'post',
                    url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
                    dataType: 'jsonp',
                    data: {
                        lname: val
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.resultCode == '0000') {
                            login();
                        }

                    }
                })
            })
        }

    }
});


/*---------------------------------修改密码----------------------------------*/
var pass;
$('.reset-pwd-r input').focus(function () {
    $(this).parent().css({
        'border-color': 'rgb(112, 173, 70)'
    });
});
$('.reset-pwd-r input').eq(0).blur(function () {
    var val = $(this).val();
    console.log(val == pass);
    if (!(val == pass)) {
        $(this).parent().css({
            'border-color': '#981616'
        });
    }
});
$('.reset-pwd-r input').eq(1).blur(function () {
    var val = $(this).val();
    if (!(/^[a-zA-Z0-9][\w]{5,19}/.test(val))) {
        $(this).parent().css({
            'border-color': '#981616'
        });
    }
});
$('.reset-pwd-r input').eq(2).blur(function () {
    var val = $(this).val();
    if (!(val == '' ? false : val === $('.reset-pwd-r input').eq(1).val())) {
        $(this).parent().css({
            'border-color': '#981616'
        });
    }
});
$('.save_pwd').click(function () {
    $('.pop_box').show();
    if (
        $('.reset-pwd-r input').eq(0).val() == pass &&
        /^[a-zA-Z0-9][\w]{5,19}/.test($('.reset-pwd-r input').eq(1).val()) &&
        $('.reset-pwd-r input').eq(2).val() === $('.reset-pwd-r input').eq(1).val()
    ) {
        $('.con_l').click(function(){
        $('.pop_box').hide();
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
            dataType: 'jsonp',
            data: {
                lpassword: $('.reset-pwd-r input').eq(2).val()
            },
            success: function (data) {
                console.log(data);
                if (data.resultCode == '0000') {
                    login();
                }
            }
        });
    });

    }else{
        $('.con_r').click(function(){
            $('.pop_box').hide();
        });
        $('.off').click(function(){
            $('.pop_box').hide();
        });
    }

});



/*---------------------------------切换页码----------------------------------*/
$('.to_collect').click(function () {
    var pageNo = 1;
    console.log(pageNo);
    Collect(pageNo);
    $('.page').on('click', 'a', function () {
        // console.log($('.page-box a').last().prev().html());
        if ($(this).html() == '上一页') {
            if (!(pageNo == 1)) {
                pageNo -= 1;
                Collect(pageNo);
            }
        } else if ($(this).html() == '下一页') {
            if (!(pageNo == $('.page a').last().prev().html())) {
                pageNo += 1;
                Collect(pageNo);
            }
        } else {
            pageNo = parseInt($(this).html());
            Collect(pageNo);
        }

    });
});

/*
//添加收藏
for (var i = 500; i <=600; i++) {
    $.ajax({
        type: 'get',
        url: 'http://www.zhijunxing.com/yiju/addCollect.action',
        dataType: 'jsonp',
        data: {
            hid: i
        },
        success: function (data) {
            console.log(data);
        }
    });
}*/


//取消收藏

$('input.con_r').click(hides);
$('.off').click(hides);

function hides() {
    console.log(123);
    $('.pop_box_2').hide();
}

$('.rig_box').on('click','.delete', function () {
    //console.log($(this).html());
    //console.log($(this).parents('.collect_dv'));
    var del=$(this).parents('.collect_dv');
    $('.pop_box_2').show();

    $('input.con_l').one('click',function () {

        //console.log(del.attr('id'));
        $.ajax({
            type: 'get',
            url: 'http://www.zhijunxing.com/yiju/delCollect.action',
            dataType: 'jsonp',
            data: {
                hid: del.attr('id')
            },
            success: function (data) {
                //console.log(123);
                if(data.resultCode=='0000'){
                    $('.pop_box_2').hide();
                    Collect($('.page-checked').html())
                }else {
                    alert('取消收藏失败!');
                }


            }
        });
    });



});
function Collect(pageNo) {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/queryCollectHouses.action',
        dataType: 'jsonp',
        data: {
            pageNo : pageNo
        },
        success: function (data) {

            console.log(data.rowCount);
            if (data.success) {
                //data.rowCount=20;
                var a;
                if (Math.ceil(data.rowCount / 2) <= 5) {
                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= Math.ceil(data.rowCount / 2); i++) {
                        if (i == pageNo) {
                            a += '<a href="###" class="page-checked">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';
                } else if (pageNo <= 3) {
                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= 4; i++) {
                        if (i == pageNo) {
                            a += '<a href="###" class="page-checked">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<b>···</b><a href="###">' + Math.ceil(data.rowCount / 2) + '</a><a href="###">下一页</a>';
                } else if (pageNo + 2 >= Math.ceil(data.rowCount / 2)) {
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b>···</b>';
                    for (var i = 3; i >= 0; i--) {
                        if (Math.ceil(data.rowCount / 2) - i == pageNo) {
                            a += '<a href="###" class="page-checked">' + (Math.ceil(data.rowCount / 2) - i) + '</a>'
                        } else {
                            a += '<a href="###">' + (Math.ceil(data.rowCount / 2) - i) + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';
                } else if (pageNo + 2 < Math.ceil(data.rowCount / 2)) {
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b>···</b>' +
                        '<a href="###">' + (parseInt(pageNo) - 1) + '</a>' +
                        '<a href="###" class="page-checked">' + pageNo + '</a>' +
                        '<a href="###">' + (parseInt(pageNo) + 1) + '</a>' +
                        '<b>···</b>' +
                        '<a href="###">' + Math.ceil(data.rowCount / 2) + '</a>' +
                        '<a href="###">下一页</a>';
                }
                $('.page').html(a);

                var item = '';
                for (var i = 0; i < data.data.length; i++) {
                    item+='<li class="collect_dv" id="' + data.data[i].id + '">'+
                        '<i class="photo_box photo_1">'+
                        '<img src="http://www.zhijunxing.com/yiju/upload/' + data.data[i].photo.split(',')[0] + '" alt="" style="width: 100%;height: 100%">'+ '</i>'+
                        '<div class="collect_dv_r">'+
                        '<i class="photo_id">' + data.data[i].tittle + '' + data.data[i].room + '' + '<span class="rent_type">('+data.data[i].type +')</span>'+
                        '</i><s class="agent"></s><b class="faith"></b>'+
                        '<p class="delete">　删除×</p>'+ '<br>'+
                        '<i class="intro">' + data.data[i].room + '|' + data.data[i].rentway + '|' + data.data[i].hlevel + '|' + data.data[i].floor + '/' + data.data[i].countfloor + '层</i>'+
                        '<s class="rent_fee"><span class="rent_num">' + data.data[i].price + '</span>/月</s>'+ '<br>'+
                        '<i class="intro"><s class="address"></s>' + data.data[i].address + '</i><s class="today">' + data.data[i].addtime + '</s>'+ '<br>'+
                        '<i class="intro_1">'+data.data[i].features.slice(0,4)+'</i> <i class="intro_2">'+data.data[i].features.slice(5,9)+'</i></div></li>';
         //           item += '<li class="collect_dv" data_id="'+data.data[i].id+'"></li>';
                }
                console.log(item);
                $('.rig_box').html(item);
            } else {
                alert('您没有收藏房源！');
            }

        }
    })
}




