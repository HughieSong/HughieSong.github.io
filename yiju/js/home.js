$('#rent').click(
    function () {
        $('#need').show();
        $('#peed').hide();
    }
);
$('#landlord').click(
    function () {
        $('#peed').show();
        $('#need').hide();

    }
);

$('#address_box').hover(function () {
        $('#pop').show();
    }
);
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

/*$('#bottom_centent_box_inner').carousel({
 element: $('#banner'),
 time: 2000,
 left: $('#last'),
 right: $('#next'),
 oli: 4
 }, false, false);*/

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




//console.log(getUrlParams("id"));


$.ajax({
    type: 'post',
    url: 'http://www.zhijunxing.com/yiju/queryHousesTop.action',
    dataType: 'jsonp',//跨域
    success: function (data) {
        if (data.success) {
            console.log(data.data);
            var item = '';
            for (var i in data.data) {
                console.log(data.data[i].photo.split(',')[0]);
                //item += '<li><a data-number="data[i].id" href="../details.html?id=" + data.data[i].id ><img src="http://www.zhijunxing.com/yiju/upload/' +
                //    data.data[i].photo.split(',')[0] + '" alt="" class="img"/><div class="img_name">' + data.data[i].villageName + '</div> <i class="img_intro">' + data.data[i].room + '</i><s class="price">' + data.data[i].price + '</s>元/月</a></li>'
                item += '<li><a data-number="data[i].id" href="../yiju/details.html?id='+data.data[i].id +'">';
                item += '<img src="http://www.zhijunxing.com/yiju/upload/' + data.data[i].photo.split(',')[0] + '" alt="" class="img"/>';
                item += '<div class="img_name">' + data.data[i].villageName + '</div>';
                item += '<i class="img_intro">' + data.data[i].room + '</i>';
                item += '<s class="price">' + data.data[i].price + '</s>元/月</a></li>';
            }


            $('#bottom_intro').append(item);

            $('.img-show-wrap').carousel({
                element: $('#banner'),
                time: 2000,
                left: $('.zuo'),
                right: $('.you'),
                oli: 4
            }, false, false);
        } else {
            alert('发生未知错误')
        }
    }
});

/*
 var data222 = {
 "data": [
 {
 "address": "郑州市金水区紫金山附近",
 "addtime": "2016\/09\/01 10:29:26",
 "area": "70",
 "countfloor": "9",
 "direction": "南",
 "features": "干净卫生 交通便利",
 "floor": "3",
 "furniture": "床, 衣柜, 沙发, 书桌, 电视, 冰箱, 微波炉, 电磁炉, 洗衣机, 空调, 热水器, 宽带, 暖气",
 "hcondition": "紫金山小区2室1厅1卫",
 "hdescribe": null,
 "hlatitude": null,
 "hlevel": "精装修",
 "hlongitude": null,
 "id": 70,
 "lid": 2,
 "linkman": "李先生",
 "linkphone": "1838765693",
 "paymethod": "押一付三",
 "photo": "14726969664240.jpg,14726969664301.jpg,14726969664352.jpg,14726969664393.png",
 "price": "6000",
 "region": null,
 "rentway": "整租",
 "room": "2室1厅1卫",
 "shi": "2",
 "state": 0,
 "tittle": "干净卫生 交通便利",
 "top": 1,
 "type": "个人",
 "villageName": "紫金山小区"
 },
 {
 "address": "郑州市金水区福彩路与广电南路交叉口",
 "addtime": "2016\/09\/01 10:34:22",
 "area": "200",
 "countfloor": "20",
 "direction": "南",
 "features": "交通便利 环境良好 设施齐全",
 "floor": "7",
 "furniture": "床, 衣柜, 沙发, 书桌, 电视, 冰箱, 微波炉, 电磁炉, 洗衣机, 空调, 热水器, 宽带, 暖气",
 "hcondition": "中亨都市花园4室2厅2卫",
 "hdescribe": null,
 "hlatitude": null,
 "hlevel": "精装修",
 "hlongitude": null,
 "id": 72,
 "lid": 2,
 "linkman": "李先生",
 "linkphone": "18397564354",
 "paymethod": "押一付三",
 "photo": "14726972625950.jpg,14726972625991.jpg,14726972626032.jpg,14726972626083.png",
 "price": "8000",
 "region": null,
 "rentway": "整租",
 "room": "4室2厅2卫",
 "shi": "4",
 "state": 0,
 "tittle": "交通便利 环境良好 设施齐全",
 "top": 1,
 "type": "个人",
 "villageName": "中亨都市花园"
 },
 {
 "address": "郑州市高新区翠竹街",
 "addtime": "2016\/09\/01 10:39:26",
 "area": "130",
 "countfloor": "7",
 "direction": "南",
 "features": "交通便利 环境良好 设施齐全",
 "floor": "3",
 "furniture": "床,衣柜,沙发, 书桌, 电视, 冰箱, 微波炉, 电磁炉, 洗衣机, 空调, 热水器, 宽带, 暖气",
 "hcondition": "天使花园3室2厅1卫",
 "hdescribe": null,
 "hlatitude": null,
 "hlevel": "精装修",
 "hlongitude": null,
 "id": 73,
 "lid": 13,
 "linkman": "王先生",
 "linkphone": "18769345621",
 "paymethod": "押一付三",
 "photo": "14726975663010.jpg,14726975663041.jpg,14726975663092.jpg,14726975663133.png",
 "price": "5000",
 "region": null,
 "rentway": "整租",
 "room": "3室2厅1卫",
 "shi": "3",
 "state": 0,
 "tittle": "交通便利 环境良好 设施齐全",
 "top": 1,
 "type": "个人",
 "villageName": "天使花园"
 },
 {
 "address": "郑州市金水区高新区",
 "addtime": "2016\/09\/01 10:41:15",
 "area": "120",
 "countfloor": "25",
 "direction": "南",
 "features": "交通便利 环境良好 设施齐全",
 "floor": "4",
 "furniture": "床,衣柜,沙发,书桌,电视,冰箱,微波炉,电磁炉,洗衣机, 空调, 热水器, 宽带, 暖气",
 "hcondition": "福彩小区4室1厅2卫",
 "hdescribe": null,
 "hlatitude": null,
 "hlevel": "精装修",
 "hlongitude": null,
 "id": 74,
 "lid": 13,
 "linkman": "赵先生",
 "linkphone": "18798653645",
 "paymethod": "押一付三",
 "photo": "14726976755230.png, 14726976755241.jpg, 14726976755282.jpg, 14726976755323.jpg",
 "price": "6000",
 "region": null,
 "rentway": "整租",
 "room": "4室1厅2卫",
 "shi": "4",
 "state": 0,
 "tittle": "交通便利 环境良好 设施齐全",
 "top": 1,
 "type": "个人",
 "villageName": "福彩小区"
 }
 ],
 "success": true
 };

 */
