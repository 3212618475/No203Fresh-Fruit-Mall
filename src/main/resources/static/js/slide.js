//实现轮播图得js
$(function () {
    var $slides = $('.slide_pics li');
    var len = $slides.length;//一共有多少张轮播图
    var nowli = 0;
    var prevli = 0;
    var $prev = $('.prev');
    var $next = $('.next');
    var ismove = false;
    var timer = null;
    $slides.not(':first').css({left: 760});
    $slides.each(function (index, el) {
        var $li = $('<li>');
        if (index == 0) {
            $li.addClass('active');
        }
        $li.appendTo($('.points'));
    });
    var $points = $('.points li');
    timer = setInterval(autoPlay, 3000);

    //鼠标切入时停止播放
    $('.slide').mouseenter(function () {
        clearInterval(timer);
    });
    //鼠标切出时继续播放
    $('.slide').mouseleave(function () {
        timer = setInterval(autoPlay, 3000);
    });
    //点击向左，出现左边得图片
    $prev.click(function () {
        if (ismove) {
            return;
        }
        nowli--;
        move();
        $points.eq(nowli).addClass(' active').siblings().removeClass(' active');
    });
    //点击向右，出现左边得图片
    $next.click(function () {
        if (ismove) {
            return;
        }
        nowli++;
        move();
        $points.eq(nowli).addClass(' active').siblings().removeClass(' active');
    });


//	点击下面得原点切换图片
    $points.click(function (event) {
        if (ismove) {
            return;
        }
        nowli = $(this).index();
        if (nowli == prevli) {
            return;
        }
        $(this).addClass(' active').siblings().removeClass(' active');
        move();

    });

    function autoPlay() {
        nowli++;
        move();
        $points.eq(nowli).addClass(' active').siblings().removeClass(' active');
    }

    function move() {
        ismove = true;
        if (nowli < 0) {
            nowli = len - 1;
            prevli = 0;
            $slides.eq(nowli).css({left: -760});
            $slides.eq(nowli).animate({left: 0}, 800, 'easeOutExpo');
            $slides.eq(prevli).animate({left: 760}, 800, 'easeOutExpo', function () {
                ismove = false;
            });
            prevli = nowli;
            return;
        }
        if (nowli > len - 1) {
            nowli = 0;
            pervli = len - 1;
            $slides.eq(nowli).css({left: 760});
            $slides.eq(nowli).animate({left: 0}, 800, 'easeOutExpo');
            $slides.eq(prevli).animate({left: -760}, 800, 'easeOutExpo', function () {
                ismove = false;
            });
            prevli = nowli;
            return;
        }
        if (prevli < nowli) {
            $slides.eq(nowli).css({left: 760});
            $slides.eq(prevli).animate({left: -760}, 800, 'easeOutExpo');
            $slides.eq(nowli).animate({left: 0}, 800, 'easeOutExpo', function () {
                ismove = false;
            });
            prevli = nowli;

        } else {
            $slides.eq(nowli).css({left: -760});
            $slides.eq(prevli).animate({left: 760}, 800, 'easeOutExpo');
            $slides.eq(nowli).animate({left: 0}, 800, 'easeOutExpo', function () {
                ismove = false;
            });
            prevli = nowli;
        }
    }
})
