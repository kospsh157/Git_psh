<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, initial-scale=1, user-scalable=no">
    <title>::::SKB IX::::</title>
    <link rel="stylesheet" href="/css/home.css"/>
    <link rel="stylesheet" href="/css/guide.css"/>
    <link rel="stylesheet" href="/css/jquery-ui.css"/>
    <link rel="stylesheet" href="/css/main.css"/>
    <link rel="stylesheet" href="/css/map.css"/>
    <link rel="stylesheet" href="/css/bootstrap.css">

    <script src="/js/jquery-2.1.4.min.js"></script>
    <script src="/js/jquery-ui.min.js"></script>
    <script src="/js/common.js"></script>

    <script src="/js/amcharts/amcharts/amcharts.js"></script>
    <script src="/js/amcharts/amcharts/serial.js"></script>

    <script src="/js/lib/highchart/highcharts.js"></script>
    <script src="/js/jquery.preloaders.js"></script>

    <script type="text/javascript">
    function startSpinner() {
        $.preloader.start({
            modal: true,
            src: 'sprites2.png'
        });
    }

    function stopSpinner() {
        $.preloader.stop();
    }

    function getPage(total, cpage, viewCount) {
        var retStr = '';

        if(total > viewCount) {
            // 페이지 나누기
            var total_page = parseInt(Math.ceil(total / viewCount)); // 총 페이지 수
            var page_start = parseInt((Math.ceil(cpage / 10) - 1.0) * 10 + 1); // 시작 페이지
            var page_end = page_start + 10 - 1;

            if(page_end > total_page) {
                page_end = total_page; // 마지막페이지가 총페이지보다 크면 총페이지수를 마지막페이지로..
            }


            if(cpage > 1) {
                retStr += '<a href=\"javascript:doPagingClick(\'1\')\" class=\"first\"><img src=\"/images/btn_first.png\" alt=\"처음으로\"></a>'; // 첫페이지
            } else {
                // retStr += '<span class=\"mgr\"><a href=\"#\"><img src=\"/resources/admin/images/btn_pageFirst.gif\" alt=\"처음으로\"></a></span>'; // 첫페이지
            }


            if(page_start > 10) {
                var h = page_start - 1;
                retStr += '<a href=\"javascript:doPagingClick(\'' + h + '\')\" class=\"prev\"><img src=\"/images/btn_prev.png\" alt=\"이전\"></a>';
            }

            if(total_page != 0) {
                // retStr += "&nbsp;";
            }

            for(var i = page_start; i <= page_end; i++) {
                if(i == cpage) {
                    retStr += '<a href=\"#none\" class=\"on\">' + i + '</a>'; // 현재페이지
                } else {
                    retStr += '<a href=\"javascript:doPagingClick(\'' + i + '\')\">' + i + '</a>';
                }
            }

            // => 표시
            if(page_end < total_page) {
                var k = page_end + 1;
                retStr += '<a href=\"javascript:doPagingClick(\'' + k + '\')\" class=\"next\"><img src=\"/images/btn_next.png\" alt=\"다음\"></a>';
            } else {
                // retStr += '<span class=\"page_div\">|</span> <span class=\"page_bt\">다음</span>'; // 다음10개
            }

            if(cpage < total_page) {
                retStr += '<a href=\"javascript:doPagingClick(\'' + total_page + '\')\" class=\"last\"><img src=\"/images/btn_last.png\" alt=\"끝으로\"></a>'; // 마지막페이지
            } else {
                // retStr += '<span class=\"page_arrow\">▶</span>'; // 마지막페이지
            }

            retStr += '';
        } else {
            retStr = '';
        }

        return retStr;
    }

    </script>
</head>
