/**
 * Created by Administrator on 2016/10/24 0024.
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

var id = getUrlParams("id");

$.ajax({
    url:"http://www.zhijunxing.com/yiju/queryHousesByid.action",
    type: "get",
    data: {id:id},
    dataType: "jsonp",
    success: function(data){
        console.log(data);

    },
    error: function(){
       alert("error!")
    }
});














function getUrlParams(name){

    var href = window.location.href;

    var str = (href.substr(href.indexOf("?")+1)).split("&");

    var params = [];

    for(var i=0; i<str.length; i++){

        params.push(str[i].split("="))
    }
    // console.log(params);

    for(var i=0; i<params.length; i++){
        if(params[i][0] == name){
            return params[i][1];
        }
    }
}
//正则获取id
//var id = /\d+/.exec(location.search);
//console.log(id);