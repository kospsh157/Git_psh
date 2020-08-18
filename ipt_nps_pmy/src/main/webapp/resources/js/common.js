$(function () {

    //header
    $('header li').mouseenter(function() {
        $(this).addClass('on').children('ul').stop().slideDown(300);
    });
    $('header li').mouseleave(function() {
        $(this).removeClass('on').children('ul').stop().slideUp(300);
    });

    //btn_del 클릭시
    $('.btn_del>a').click(function(){
        $(this).parent().remove();
    });

    //btn_search 클릭시
    $('.btn_open a').click(function(){
        var $this = $(this),
            boxSearch = $('.box_search');

        if(boxSearch.is(":visible") == true){
            $this.removeClass('on');
            $('.box_search').slideUp(300);
        }else{
            $this.addClass('on');
            $('.box_search').slideDown(300);
        }

    });
    $('.btn_open00 a').click(function(){
        var $this = $(this),
            boxSearch00 = $('.box_search00');

        if(boxSearch00.is(":visible") == true){
            $this.removeClass('on');
            $('.box_search00').slideUp(300);
        }else{
            $this.addClass('on');
            $('.box_search00').slideDown(300);
        }

    });
    $('.btn_open01 a').click(function(){
        var $this = $(this),
            boxSearch01 = $('.box_search01');

        if(boxSearch01.is(":visible") == true){
            $this.removeClass('on');
            $('.box_search01').slideUp(300);
        }else{
            $this.addClass('on');
            $('.box_search01').slideDown(300);
        }

    });

    //datepicker
    $(".datepicker").datepicker({
        showOn : "button",
        buttonImage:"/images/ico_calendar.png",
        buttonImageOnly:true,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-MM-dd',
        showMonthAfterYear:true,
        monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],// 개월 텍스트 설정
        monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12']// 개월 텍스트 설정
    });


});
