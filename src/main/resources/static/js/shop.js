xiaoji();
zongji();
if ($("input[type='checkbox']:checked").not($("#check_all")).length <= 0) {
    $("#jiesuan").css("background-color", '#fff4e8');
}

$(".add").click(function () {
    var num = parseInt($(this).next().val());
    if (num < parseInt($(this).prev().val())&& num > 0) {
        $.get("/cart/updatecart/add/1/" + parseInt($(this).nextAll().filter(".goodsid").html()) + "/1");
        $(this).next().val(function () {
            return num * 1 + 1;
        });
    }else if(num <=0){
        $(this).next().val(function () {
            layer.alert('已无库存', {
                icon: 5,
                skin: 'layer-ext-moon'
            });
            return 1;
        });
    }
    else {
        $(this).next().val(function () {
            layer.alert('已达到最大库存', {
                icon: 5,
                skin: 'layer-ext-moon'
            });
            return num;
        });
    }
    xiaoji();
    zongji();
});

$(".minus").click(function () {
    var num = parseInt($(this).prev().val());
    if (num > 1) {
        $.get("/cart/updatecart/add/1/" + parseInt($(this).nextAll().filter(".goodsid").html()) + "/-1");
        $(this).prev().val(function () {
            return num * 1 - 1;
        });
    }
    else {
        $(this).prev().val(function () {
            return 1;
        });
    }
    xiaoji();
    zongji();
});

$(".num_show").change(function () {
    var num = parseInt($(this).val());
    let count = parseInt($(this).prev().prev().val());
    if (num > count) {
        $(this).val(function () {
            return count;
        });
    }
    else if (num < 1) {
        $(this).val(function () {
            return 1;
        });
    }
    else {
        $(this).val(function () {
            return num;
        });
    }
    $.get("/cart/updatecart/update/1/" + parseInt($(this).nextAll().filter(".goodsid").html()) + "/" + parseInt($(this).val()));
    xiaoji();
    zongji();
});

$("#check_all").click(function () {
    $("input[type='checkbox']").not($("#check_all")).each(function () {
        $(this).prop("checked", $("#check_all").prop("checked"));

    });
    zongji();
    $("#zongshu").html($("input[type='checkbox']:checked").not($("#check_all")).length);
});
$("#zongshu").html($("input[type='checkbox']:checked").not($("#check_all")).length);
$("input[type='checkbox']").not($("#check_all")).click(function () {
    if ($(this).prop("checked") == false) {
        $("#check_all").prop("checked", false);
    }
    else if ($("input[type='checkbox']:checked").not($("#check_all")).length == $("input[type='checkbox']").not($("#check_all")).length) {
        $("#check_all").prop("checked", true);
    }
    zongji();
    $("#zongshu").html($("input[type='checkbox']:checked").not($("#check_all")).length);

});


function xiaoji() {
    $(".col07").html(function () {
        num1 = parseFloat($(this).prevAll().filter(".col05").html());
        num2 = parseInt($(this).prevAll().filter(".col06").find(".num_show").val());
        return ((num1 * 100) * (num2 * 100) / 10000).toFixed(2) + "元";
    })
}

function zongji() {
    var zong = 0;
    $("input[type='checkbox']").not($("#check_all")).each(function () {
        if ($(this).prop("checked")) {
            zong += parseFloat($(this).parent().nextAll().filter(".col07").html());
        }
    });
    $("#zong").html(zong.toFixed(2));

    if ($("input[type='checkbox']:checked").not($("#check_all")).length <= 0) {
        $("#jiesuan").css("background-color", '#fff4e8');
    }
    else {
        $("#jiesuan").css("background-color", '#ff3d3d');
    }
}


$("#jiesuan").click(function () {
    if ($("input[type='checkbox']:checked").not($("#check_all")).length <= 0) {
        return false;
    }
    else {
        $(this).attr("href", cart());
    }

});

function cart() {
    var url = "/order/orderinfo?";
    $("input[type='checkbox']:checked").not($("#check_all")).each(function (i) {
        url += "cart" + i + "=" + $(this).parents(".cart_list_td").attr("id") + "&";
    });
    return url;
}