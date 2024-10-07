/**add_jump  开始*/

var $add_x = $('#add_cart').offset().top;
var $add_y = $('#add_cart').offset().left;

var $to_x = $('#show_count').offset().top;
var $to_y = $('#show_count').offset().left;

$(".add_jump").css({'left': $add_y + 80, 'top': $add_x + 10, 'display': 'block'})
$('#add_cart').click(function () {
    $(".add_jump").stop().animate({
            'left': $to_y + 7,
            'top': $to_x + 7
        },
        "fast", function () {
            $(".add_jump").fadeOut('fast', function () {
                $('#show_count').html();
            });

        });
})
/**add_jump  结束*/



$('#jiahao').mousedown(function () {
    var num = $('#shuliang').val();
    var maxNum = parseInt($(this).prev().val());
    if ($('#shuliang').val() < maxNum) {
        $('#shuliang').val(function () {
            return num * 1 + 1;
        });
    }else {
        $('#shuliang').val(function () {
            layer.alert('已达到最大库存', {
                icon: 5,
                skin: 'layer-ext-moon'
            });
            return maxNum;
        });
    }
    var num1 = parseInt($('#shuliang').val());
    var num2 = parseFloat($('#danjia').html());
    $('#zongjia').html(function () {
        return ((num1 * 100) * (num2 * 100) / 10000).toFixed(2);
    });
});

$('#jianhao').mousedown(function () {
    var num = $('#shuliang').val();
    if ($('#shuliang').val() > 1) {
        $('#shuliang').val(function () {
            return num * 1 - 1;
        });
    }
    var num1 = parseInt($('#shuliang').val());
    var num2 = parseFloat($('#danjia').html());
    $('#zongjia').html(function () {
        return ((num1 * 100) * (num2 * 100) / 10000).toFixed(2);
    });
});

$(".num_show").change(function () {
    var num = parseInt($(this).val());
    let count = parseInt($(this).next().val());
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
    // $.get("/cart/updatecart/update/1/" + parseInt($(this).nextAll().filter(".goodsid").html()) + "/" + parseInt($(this).val()));
    var num1 = parseInt($('#shuliang').val());
    var num2 = parseFloat($('#danjia').html());
    $('#zongjia').html(function () {
        return ((num1 * 100) * (num2 * 100) / 10000).toFixed(2);
    });
});

$('#shuliang').change(function () {
    let count = parseInt($(this).next().val());
    $('#shuliang').val(function () {
        return parseInt($('#shuliang').val());
    });
    jieguo();
    if ($('#shuliang').val() < 1) {
        $('#shuliang').val(1);
        jieguo();
    }
    else if ($('#shuliang').val() > count) {
        $('#shuliang').val(count);
        jieguo();
    }
});

function jieguo() {
    var num1 = parseInt($('#shuliang').val());
    var num2 = parseFloat($('#danjia').html());
    $('#zongjia').html(function () {
        return ((num1 * 100) * (num2 * 100) / 10000).toFixed(2);
    });
}

$('#add_cart').mousedown(function () {

    $.get("/cart/updatecart/add/1/37/" + $('#shuliang').val(), function (data) {
        if (data.data != 0) {
            $("#show_count").html(data.data)
        }
    });

});

// $("#buy_btn").click(function () {
//     $(this).attr("href", function () {
//         return "/order/orderinfo/37/" + $('#shuliang').val();
//     });
// });