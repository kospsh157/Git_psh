/**
 * 날짜 관련 공통 util js
 */
function fn_dateCheck(sdate1, sdate2) {
//    var sdate1 = new Date($("#datepicker01").val());
//    var sdate2 = new Date($("#datepicker02").val());

    var sDiff = sdate1.getTime() - sdate2.getTime();
    sDiff = Math.ceil(sDiff / (1000 * 3600 * 24));

    var dateList = {};

    var date = sdate1;
    var dateStr = date.getFullYear() + "-" + fn_getFullDate(date.getMonth() + 1) + "-" + fn_getFullDate(date.getDate());
    var regdate = {};

    regdate["REGDATE"] = dateStr;
    dateList[dateStr] = regdate;

    for(var i = 0; i< Math.abs( sDiff ); ++i) {
        date = new Date( date );

        date.setDate( date.getDate() + 1 );
        var dateStr = date.getFullYear() + "-" + fn_getFullDate(date.getMonth() + 1) + "-" + fn_getFullDate(date.getDate());
        var regdate = {};
        regdate["REGDATE"] = dateStr;
        dateList[dateStr] = regdate;
    }

    return dateList;
}

function fn_getFullDate(data) {
    return data < 10 ? "0" + data : data;
}
