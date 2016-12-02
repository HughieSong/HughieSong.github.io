/**
 * Created by Administrator on 2016/10/17 0017.
 */
$('#address_box').on({
    mouseover: function () {
        $('#pop').show();
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
$('.kind_1').click(function () {
    $('.pop_li_1').show();
});

$('.kind_2').click(function () {
    $('.pop_li_2').show();
});
$('.pop_li_opt_1').click(function () {
    $('.kind_inner_1').html($(this).html()).attr('data-a', $(this).attr('data-a'));

    filterCondition.room = $(this).attr('data-a');
    filterCondition.pageNo =1;
    filterPrice(filterCondition);

    $('.pop_li_1').hide();
});
$('.pop_li_opt_2').click(function () {
    $('.kind_inner_2').html($(this).html()).attr('data-b', $(this).attr('data-b'));
    filterCondition.hlevel = $(this).attr('data-b');
    filterCondition.pageNo =1;
    filterPrice(filterCondition);
    $('.pop_li_2').hide();

});
$('.opt_box').on('click', '.opt_li', function () {
    $(this).addClass('opt_check').siblings().removeClass('opt_check');
});

$('.opt_con_1').click(function () {
    $('.opt_con_1 i').addClass('opt_con_check');
    $('.opt_con_2 i').removeClass('opt_con_check');
});
$('.opt_con_2').click(function () {
    $('.opt_con_2 i').addClass('opt_con_check');
    $('.opt_con_1 i').removeClass('opt_con_check');
});
$('#inner_bar').on('click', '.inner_bar_tool', function () {
    $(this).addClass('inner_bar_check').siblings().removeClass('inner_bar_check');


});
$('#inner_bar').on('click', '.inner_bar_tool_r', function () {
    $(this).addClass('inner_bar_check_r').siblings().removeClass('inner_bar_check_r');

});
$('.inner_all').click(function () {
    $('.all_room').show();
    $('.faith_room').hide();
    $('.per_room').hide();
    $('.agent_room').hide();

});
$('.inner_faith').click(function () {
    $('.faith_room').show();
    $('.all_room').hide();
    $('.per_room').hide();
    $('.agent_room').hide();
});
$('.inner_per').click(function () {
    $('.per_room').show();
    $('.faith_room').hide();
    $('.all_room').hide();
    $('.agent_room').hide();
});
$('.inner_agent').click(function () {
    $('.agent_room').show();
    $('.faith_room').hide();
    $('.all_room').hide();
    $('.per_room').hide();
});


/*--------------------------------登录状态判断---------------------------------------*/
$.ajax({
    type: 'post',
    url: 'http://www.zhijunxing.com/yiju/loginSession.action',
    dataType: 'jsonp',
    success: function (data) {
        //console.log(data.success);
        if (data.success) {
            //alert(111);
            $('.register').eq(0).html('欢迎  ' + data.data[0].lname).attr('href', 'edit.html');
            $('.register').eq(1).html('退出').attr({
                'onclick': 'quitLogin()',
                'href': '###'
            });
        }
        // $('.register').html('<a href="">'+data.data[0].lname+'</a>|')
    }
});

function quitLogin() {

    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/quitLogin.action',
        dataType: 'jsonp',
        success: function (data) {
            //console.log(data);
            if (data.resultCode == '0000') {

                $('.register').eq(0).html('登录').attr('href', 'login.html');
                $('.register').eq(1).html('注册').attr('href', 'login.html').removeAttr('onclick');
            }
            // $('.register').html('<a href="">'+data.data[0].lname+'</a>|')
        }
    });

}


/*--------------------------------按条件筛选---------------------------------------*/
var filterCondition = {};
$('.inner_all').click(function () {
    filterCondition.pageNo = 1;
    //console.log(pageNo);
    filterPrice(filterCondition);
    //alert('模拟点击');
    $('.page').on('click', 'a', function () {
        //console.log($('.page a').last().prev().html());

        if ($(this).html() == '上一页') {
            if (!(filterCondition.pageNo  == 1)) {
                //filterCondition.pageNo = parseInt($('.page-checked').html())-1;
                filterCondition.pageNo -= 1;
                filterPrice(filterCondition);
            }
        } else if ($(this).html() == '下一页') {
            //////////////////////////////////////
            if (!(filterCondition.pageNo == $('.page a').last().prev().html())) {
                //filterCondition.pageNo = parseInt($('.page-checked').html())+1;
                filterCondition.pageNo += 1;
                filterPrice(filterCondition);
            }
        } else {
            filterCondition.pageNo = parseInt($(this).html());
            filterPrice(filterCondition);
        }

    });
}).trigger('click');
//筛选条件：地区(接口暂缺）
$('.opt_box').on('click', '.opt_region', function () {
    filterCondition.region = $(this).html();
    filterCondition.pageNo = parseInt($('.page-checked').html());
    filterPrice(filterCondition);
});
//筛选条件：租金
$('.opt_box').on('click', '.opt_fee', function () {
    filterCondition.price = $(this).children().html();
    filterCondition.pageNo = parseInt($('.page-checked').html());
    filterPrice(filterCondition);
    /*        $.ajax({
     type: 'post',
     url: 'http://www.zhijunxing.com/yiju/queryHousesBySql.action',
     dataType: 'jsonp',
     data: {
     price:feeIn,
     pageNo:pageNo
     },
     success: function (data) {
     console.log(data);
     if(data.success){
     //filterPrice(pageNo)
     }
     }
     });*/
});
//筛选条件：房型
$('.opt_box').on('click', '.opt_shi', function () {
    filterCondition.shi = $(this).attr('value');
    filterCondition.pageNo = parseInt($('.page-checked').html());
    filterPrice(filterCondition);
});
//筛选条件：房屋类型
/*
$('.pop_li_1').on('click','pop_li_opt_1',function () {
    filterCondition.room = $(this).attr('data-a');
    filterCondition.pageNo = parseInt($('.page-checked').html());
    filterPrice(filterCondition);
});
//筛选条件：装修
$('.pop_li_2').on('click','pop_li_opt_2',function () {
    filterCondition.hlevel = $(this).attr('data-b');
    filterCondition.pageNo = parseInt($('.page-checked').html());
    filterPrice(filterCondition);
});
*/


function filterPrice(pageNo) {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/queryHousesBySql.action',
        dataType: 'jsonp',
        data: pageNo,
        success: function (data) {
            console.log(data.rowCount);
            if (data.success) {
                //pageNo.pageNo = 1;
                //data.rowCount=10;
                var a;
                if (data.rowCount == 0) {
                    //当前页信息数量为0  上一页1下一页
                    a = '<a href="###">上一页</a>';
                    a += '<a href="###" class="page-checked">1</a>';
                    a += '<a href="###">下一页</a>';
                }
                else if (Math.ceil(data.rowCount / 5) <= 5) {
                    //当前页页码小于等于5  上一页12345下一页
                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= Math.ceil(data.rowCount / 5); i++) {
                        if (i == pageNo.pageNo) {
                            a += '<a href="###" class="page-checked">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';
                }
                else if (pageNo.pageNo <= 3) {
                    //当前页页码小于3  上一页123
                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= 4; i++) {
                        if (i == pageNo.pageNo) {
                            a += '<a href="###" class="page-checked">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<b>···</b><a href="###">' + Math.ceil(data.rowCount / 5) + '</a><a href="###">下一页</a>';
                }
                else if (pageNo.pageNo + 2 >= Math.ceil(data.rowCount / 5)) {
                    //当前页页码+2大于等于最大页码  上一页1...789下一页
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b>···</b>';
                    for (var i = 3; i >= 0; i--) {
                        if (Math.ceil(data.rowCount / 5) - i == pageNo.pageNo) {
                            a += '<a href="###" class="page-checked">' + (Math.ceil(data.rowCount / 5) - i) + '</a>'
                        } else {
                            a += '<a href="###">' + (Math.ceil(data.rowCount / 5) - i) + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';
                }
                else if (pageNo.pageNo + 2 < Math.ceil(data.rowCount / 5)) {
                    //当前页页码+2小于最大页码  上一页1...456...10下一页
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b>···</b>' +
                        '<a href="###">' + (parseInt(pageNo.pageNo) - 1) + '</a>' +
                        '<a href="###" class="page-checked">' + pageNo.pageNo + '</a>' +
                        '<a href="###">' + (parseInt(pageNo.pageNo) + 1) + '</a>' +
                        '<b>···</b>' +
                        '<a href="###">' + Math.ceil(data.rowCount / 5) + '</a>' +
                        '<a href="###">下一页</a>';
                }
                $('.page').html(a);

                var item = '';
                for (var i = 0; i < data.data.length; i++) {
                    item += '<li class="collect_dv" id="' + data.data[i].id + '">' +
                        '<i class="photo_box">' +
                        '<img src="http://www.zhijunxing.com/yiju/upload/' + data.data[i].photo.split(',')[0] + '" alt="" style="width: 100%;height: 100%">' + '</i>' +
                        '<div class="collect_dv_r">' +
                        '<i class="photo_id">' + data.data[i].tittle + '' + data.data[i].room + '' + '<span class="rent_type">(' + data.data[i].type + ')</span>' +
                        '</i><s class="agent"></s><b class="faith"></b>' +
                        '<br>' + '<i class="intro">' + data.data[i].room + '|' + data.data[i].rentway + '|' + data.data[i].hlevel + '|' + data.data[i].floor + '/' + data.data[i].countfloor + '层</i>' +
                        '<s class="rent_fee"><span class="rent_num">' + data.data[i].price + '</span>/月</s>' + '<br>' +
                        '<i class="intro"><s class="address"></s>' + data.data[i].address + '</i><s class="today">' + data.data[i].addtime + '</s>' + '<br>' +
                        '<i class="intro_1">' + data.data[i].features.slice(0, 4) + '</i> <i class="intro_2">' + data.data[i].features.slice(5, 9) + '</i></div></li>';
                }
                //console.log(item);
                $('.all_room').html(item);
            }
        }
    })
}