/**
 * Created by Administrator on 2016/10/23 0023.
 */
$('#address_box').on({
    mouseover: function () {
        $('#pop').show();
    }, mouseout: function () {
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
$('#direction_box').on({
    mouseover: function () {
        $('#dire_dv_l').show();
    }, mouseout: function () {
        $('#dire_dv_l').hide();
    }
});
$('#dire_dv_l').hover(function () {
    $(this).show();
}, function () {
    $(this).hide();
});
$('#dire_dv_l li').click(function () {
    $('.dir_opt').html($(this).html());
    dataArr.direction = $(this).html();
    console.log(dataArr.direction);

    $('#dire_dv_l').hide();
});

$('#fit_box').on({
    mouseover: function () {
        $('#dire_dv_r').show();
    }, mouseout: function () {
        $('#dire_dv_r').hide();
    }
});
$('#dire_dv_r').hover(function () {
    $(this).show();
}, function () {
    $(this).hide();
});
$('#dire_dv_r li').click(function () {
    $('.dir_fit').html($(this).html());
    dataArr.level = $(this).html();
    console.log(dataArr.level);

    $('#dire_dv_r').hide();
});
$('#fee_box').on({
    mouseover: function () {
        $('#fee_dv').show();
    }, mouseout: function () {
        $('#fee_dv').hide();
    }
});
$('#fee_dv').hover(function () {
    $(this).show();
}, function () {
    $(this).hide();
});
$('#fee_dv li').click(function () {
    $('.rent_kind').html($(this).html());
    dataArr.paymethod = $(this).html();
    console.log(dataArr.paymethod);
    $('#fee_dv').hide();
});
$('.dire_dv li').hover(function () {
    $(this).addClass('dire_check').siblings().removeClass('dire_check');
});
$('#config li').toggle(function () {
    $(this).addClass('checked');
    $(this).children('b').addClass('checked_mark');
    dataArr.furniture = $('.checked').children('i').text();
    console.log(dataArr.furniture);

}, function () {
    $(this).removeClass('checked');
    $(this).children('b').removeClass('checked_mark');
});
$('.kind_r i').click(function () {
    $('.kind_r s').removeClass('circle_inner_check');
    $(this).children().addClass('circle_inner_check');
});
$('.kind_i i').click(function () {
    $('.kind_i s').removeClass('circle_inner_check');
    $(this).children().addClass('circle_inner_check');
});

/*
$('#fee_input').click(function(){
   $('.rent_intro').html('');
});
*/

/*-------------------------上传发布数据---------------------*/
var dataArr = {};
$('.kind_r i').click(function () {
    dataArr.rentway = $('.kind_r .circle_inner_check').parent().parent().text();
    console.log(dataArr.rentway);

});
$('.kind_i i').click(function () {
    dataArr.type = $('.kind_i .circle_inner_check').parent().parent().text();
    console.log(dataArr.type);
});


$('#publish').click(function () {
    var dataForm= $.param(dataArr);
    var arrSplit=dataForm+'&'+$('form').serialize();
    var arrArr=arrSplit.split('&');
    var arrObj={};
    for(var i=0 ;i<arrArr.length;i++){
        arrObj[arrArr[i].split('=')[0]]=decodeURIComponent(arrArr[i].split('=')[1])
    }
    console.log(arrObj);
   // console.log( arrSplit.split('&'));
  //  console.log(arrArr[0].split('=')[0]);

    //console.log(dataForm+'&'+$('form').serialize());

    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/addHouses.action',
        dataType: 'jsonp',
        data: {
            data:dataForm+'&'+$('form').serialize()
        },
        success:function(data){
            console.log(data);
            if(data.resultCode=='0000'){
                $('.reg_pop_dv').show();
            }
        }

    })
});

$.ajax({
    type: 'post',
    url: 'http://www.zhijunxing.com/yiju/queryHousesBylid.action',
    dataType: 'jsonp',
    data: {
        pageNo:1
    },
    success:function(data){
        console.log(data.rowCount);
    }

})


$('.con_l').click(function () {
    $('.reg_pop_dv').hide();
});
$('.con_r').click(function () {
    $('.reg_pop_dv').hide();
});
$('.off').click(function () {
    $('.reg_pop_dv').hide();
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
