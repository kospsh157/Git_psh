   /*
divId : 페이징 태그가 그려질 div
pageIndx : 현재 페이지 위치가 저장될 input 태그 id
recordCount : 페이지당 레코드 수
totalCount : 전체 조회 건수 
eventName : 페이징 하단의 숫자 등의 버튼이 클릭되었을 때 호출될 함수 이름
*/
var gfv_pageIndex = null;
var gfv_eventName = null;

function gfn_isNull(sValue)
{
    if (new String(sValue).valueOf() == "undefined") return true;
    if (sValue == null) return true;
    
    var v_ChkStr = new String(sValue);
    if (v_ChkStr == null) return true;
    if (v_ChkStr.toString().length == 0 ) return true;
    return false;
}

function FN_renderPaging(params){
   
    var divId = params.divId; //페이징이 그려질 div id
    gfv_pageIndex = params.pageIndex; //현재 위치가 저장될 input 태그
    var totalCount = params.totalCount; //전체 조회 건수
    var currentIndex = $("#"+params.pageIndex).val(); //현재 위치
    if($("#"+params.pageIndex).length == 0 || gfn_isNull(currentIndex) == true){
        currentIndex = 1;
    }
     
    var recordCount = params.recordCount; //페이지당 레코드 수   
    var totalIndexCount = Math.ceil(totalCount / recordCount); // 전체 인덱스 수
    gfv_eventName = params.eventName;
     
    $("#"+divId).empty();
    var preStr = "";
    var postStr = "";
    var str = "";
     
    var first = (parseInt((currentIndex-1) / 10) * 10) + 1;
    var last = (parseInt(totalIndexCount/10) == parseInt(currentIndex/10)) ? totalIndexCount%10 : 10;
    var prev = (parseInt((currentIndex-1)/10)*10) - 9 > 0 ? (parseInt((currentIndex-1)/10)*10) - 9 : 1; 
    var next = (parseInt((currentIndex-1)/10)+1) * 10 + 1 < totalIndexCount ? (parseInt((currentIndex-1)/10)+1) * 10 + 1 : totalIndexCount;
     
    if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨앞, 앞 태그 작성
        preStr += '<li><button href="#this" type="button" class="list_preBtn" onclick="javascript:'+params.eventName+'(1);">◀◀</button></li>' +
                '<li><button href="#this" type="button" class="list_preBtn" onclick="javascript:'+params.eventName+'('+prev+');">◀</button></li>';
    }
    else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨앞 태그 작성
        preStr += '<li><button href="#this" type="button" class="list_preBtn" onclick="javascript:'+params.eventName+'(1);">◀</button></li>';
    }
     
    if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨뒤, 뒤 태그 작성
       postStr += '<li><button href="#this" type="button" class="list_nextBtn" onclick="javascript:'+params.eventName+'('+next+');">▶</button></li>'+
       '<li><button href="#this" type="button" class="list_nextBtn" onclick="javascript:'+params.eventName+'('+totalIndexCount+');">▶▶</button></li>';
    }
    else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨뒤 태그 작성
        postStr += '<li><button href="#this" type="button" class="list_nextBtn" onclick="javascript:'+params.eventName+'('+totalIndexCount+');">▶</button></li>';
    }
     
    for(var i=first; i<(first+last); i++){
        if(i != currentIndex){
            str += '<li><a href="#this" onclick="_movePage('+i+')">'+i+'</a></li>';
        }
        else{
           str += '<li><a href="#this" class="seleted_pgNo" onclick="_movePage('+i+')">'+i+'</a></li>';
        }
    }
    $("#"+divId).append(preStr + str + postStr);
}
 
function _movePage(value){
    $("#"+gfv_pageIndex).val(value);
    if(typeof(gfv_eventName) == "function"){
        gfv_eventName(value);
    }
    else {
        eval(gfv_eventName + "(value);");
    }
}

function FN_renderPagingMy(params){
   
    var divId = params.divId; //페이징이 그려질 div id
    gfv_pageIndex = params.pageIndex; //현재 위치가 저장될 input 태그
    var totalCount = params.totalCount; //전체 조회 건수
    
    var currentIndex = params.pageIndex;    
     
    var recordCount = params.recordCount; //페이지당 레코드 수
    if(gfn_isNull(recordCount) == true){
        recordCount = 20;
    }
    var totalIndexCount = Math.ceil(totalCount / recordCount); // 전체 인덱스 수
    gfv_eventName = params.eventName;
     
    $("#"+divId).empty();
    var preStr = "";
    var postStr = "";
    var str = "";
    
    var max = params.max * 1;
    
   var totalCnt = totalCount/recordCount;
   var pageMaxLength = Math.ceil( totalCnt );    
   
   var PageNumCnt = getIdxNum( currentIndex, max );
   var fastPage = max * PageNumCnt + 1;
   var lastPage = fastPage + ( max -1 );
   
   lastPage = lastPage > pageMaxLength ? pageMaxLength : lastPage;
     
    var first = (parseInt((currentIndex-1) / max) * max) + 1;
    var last = (parseInt(totalIndexCount/max) == parseInt(currentIndex/max) ) ? ( totalIndexCount%max == 0 ) : max;
    var prev = (parseInt((currentIndex-1)/max)*max) - 9 > 0 ? (parseInt((currentIndex-1)/max)*max) - 9 : 1; 
    var next = (parseInt((currentIndex-1)/max)+1) * max + 1 < totalIndexCount ? (parseInt((currentIndex-1)/max)+1) * max + 1 : totalIndexCount;
     
    if(totalIndexCount > params.max){ //전체 인덱스가 10이 넘을 경우, 맨앞, 앞 태그 작성
        preStr += '<button href="#this" type="button" class="list_preBtn" onclick="javascript:'+params.eventName+'(1);">◀◀</button>' +
                '<button href="#this" type="button" class="list_preBtn" onclick="javascript:'+params.eventName+'('+(fastPage-1)+');">◀</button>';
    }
    else if(totalIndexCount <=params.max && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨앞 태그 작성
        preStr += '<button href="#this" type="button" class="list_preBtn" onclick="javascript:'+params.eventName+'(1);">◀</button>';
    }
     
    if(totalIndexCount > params.max){ //전체 인덱스가 10이 넘을 경우, 맨뒤, 뒤 태그 작성
       postStr += '<button href="#this" type="button" class="list_nextBtn" onclick="javascript:'+params.eventName+'('+next+');">▶</button>'+
       '<button href="#this" type="button" class="list_nextBtn" onclick="javascript:'+params.eventName+'('+totalIndexCount+');">▶▶</button>';
       last = -1;
    }
    else if(totalIndexCount <=params.max && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨뒤 태그 작성
        postStr += '<button href="#this" type="button" class="list_nextBtn" onclick="javascript:'+params.eventName+'('+totalIndexCount+');">▶</button>';
    }
     
    for(var i=fastPage; i<=lastPage; i++){
        if(i != currentIndex){
            str += '<a href="#" onclick="javascript:' + params.eventName + '('+i+')">'+i+'</a>';
        }
        else{
           str += '<a href="#" class="seleted_pgNo" onclick="javascript:' + params.eventName + '('+i+')">'+i+'</a>';
        }
    }
    $("#"+divId).append( '<li>' + preStr + str + postStr + '</li>' );
    
    $(".pageNumber > ul li").css("float","unset");
    $(".pageNumber > ul li").css("text-align","center");
    $(".pageNumber > ul li").css("text-align","center");
    $(".pageNumber").css("float","unset");
    $(".pageNumber").css("margin","unset");
}


function getIdxNum( currentIndex, max )
{
   var cnt = 0;
   
   while( true )
   {
      if( currentIndex > max  )
      {
         currentIndex -= max;
         cnt++;
      }
      else
      {
         break;
      }         
   }
   
   return cnt;
}
