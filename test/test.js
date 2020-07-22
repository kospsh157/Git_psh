 //=Create object of FilePicker Constructor function function & set Properties===

//문자열에서 숫자만 가져오기
function fn1(str){
    var res;
    res = str.replace(/[^0-9]/g,"");
    var y = res.substring(0,4);
    var m = res.substring(4,5);
    var rm
    if(m < 10){
        rm = "0"+m;
    }
    var d = res.substring(5,8);
    var full = y+rm+d;
    
    return full;
}

//문자열 날짜형태로 바꾸기 함수
function calculus1(str){    
    var end_ymd = str;    
    var yyyy = end_ymd.substr(0,4);
    var mm = end_ymd.substr(4,2);
    var dd = end_ymd.substr(6);  
    var com_ymd = new Date(yyyy,mm-1,dd)
    var inputdate = com_ymd.format('yyyy-MM-dd');  //임의 함수 써서 포맷팅함
    
    return inputdate;
}


//날짜 포맷 함수 
Date.prototype.format = function(f) {
                        if (!this.valueOf()) return " ";

                        var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
                        var d = this;
                        
                        return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
                            switch ($1) {
                                case "yyyy": return d.getFullYear();
                                case "yy": return (d.getFullYear() % 1000).zf(2);
                                case "MM": return (d.getMonth() + 1).zf(2);
                                case "dd": return d.getDate().zf(2);
                                case "E": return weekName[d.getDay()];
                                case "HH": return d.getHours().zf(2);
                                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                                case "mm": return d.getMinutes().zf(2);
                                case "ss": return d.getSeconds().zf(2);
                                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                                default: return $1;
                            }
                        });
                    };
                   String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
                   String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
                   Number.prototype.zf = function(len){return this.toString().zf(len);};
                   
                   /* 타임 라인 추가 할 때 현재 날짜 집어넣기 */
                   function nowDate(){
                       var today = new Date();
                       var tempDate = today.toLocaleDateString('ko-KR');
                       var numberDate = fn1(tempDate);
                       var date = calculus1(numberDate);
                       return date;
                   }
                   //타임라인 하나만 그리기 함수
                function paintingTimeLine(email, date, url, filename){
                    $(".tm-items").prepend(
                            '<li>'+
                            '<div class="tm-info">'+
                                '<div class="tm-icon"><i class="fa fa-google-plus-square"></i></div>'+
                                '<time class="tm-datetime" datetime="2013-11-22 19:13">'+
                                    '<div class="tm-datetime-time">'+ date +'</div>'+
                                '</time>'+
                            '</div>'+
                                '<div class="tm-box">'+
                                '<p id="down">'+ '<a style="font-size:20px;" target="_blank" href='+url+
                                    '>' + '<i class="fa fa-google-plus-square"></i>' + filename + '</a>'+ 
                                '</p>'+
                                '<div class="tm-meta">'+ "올린 사원 : " +
                                    email + 
                                '</div>'+
                            '</div>'+
                        '</li>'
                    );
                }; // 함수 종료
/*  디비에 데이터 저장 아작스 함수  */
function addGoogleTag(sendData){
    var gdAddData = sendData;
    var result = 0;
    $.ajax({
        
        url:'ajax/googleDrive/addGoogleTag.do',
        data:gdAddData,
        type:'POST',
        success:function(data){
            console.log("구글 디비 저장 아작스 성공");
        },
        complete:function(){
        },
        error:function(){
            console.log("구글 디비 저장 아작스 실패");
        },
    });  //아작스끝
}; // 디비 등록 아작스 함수 끝 


function SetPicker() {
    var picker = new FilePicker(
        {
            apiKey: '',
            clientId: '',
            buttonEl: document.getElementById("goGoogleDrive"),
            onClick: function (file) {
                PopupCenter('https://drive.google.com/file/d/' + file.id + '/view', "", 1000, 500);
            }
        });
}

//====================Create POPUP function==============
function PopupCenter(url, title, w, h) {
    //debugger;
    var left = (screen.width / 1) - (w / 2);
    var top = (screen.height / 1) - (h / 2);
    return window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

//===============Create Constructor function==============
function FilePicker(User) {
    //Configuration
    this.apiKey = User.apiKey;
    this.clientId = User.clientId;

    //Button
    this.buttonEl = User.buttonEl;

    //Click Events
    this.onClick = User.onClick;
    this.buttonEl.addEventListener('click', this.open.bind(this));


    //Disable the button until the API loads, as it won't work properly until then.
    this.buttonEl.disabled = true;

    //Load the drive API
    gapi.client.setApiKey(this.apiKey);
    gapi.client.load('drive', 'v2', this.DriveApiLoaded.bind(this));
    gapi.load('picker', '1', { callback: this.PickerApiLoaded.bind(this) });
}

FilePicker.prototype = {
    //==========Check Authentication & Call ShowPicker() function=======
    open: function () {
        // Check if the user has already authenticated
        var token = gapi.auth.getToken();
        if (token) {
            this.ShowPicker();
        } else {
            // The user has not yet authenticated with Google
            // We need to do the authentication before displaying the drive picker.

            this.DoAuth(false, function ()
            { this.ShowPicker(); }.bind(this));
        }
    },

    //========Show the file picker once authentication has been done.=========
    ShowPicker: function () {
        var accessToken = gapi.auth.getToken().access_token;

        //========Show Different Display View in Picker Dialog box=======

        //View all the documents of Google drive
        //var DisplayView = new google.picker.View(google.picker.ViewId.DOCS);


        //View all the documents of a Specific folder of Google drive
        //var DisplayView = new google.picker.DocsView().setParent('PUT YOUR FOLDER ID');


        //View all the documents & folders of google drive
        var DisplayView = new google.picker.DocsView().setIncludeFolders(true);


        //Only view all Folders in Google drive.
        //var DisplayView = new google.picker.DocsView()
        //    .setIncludeFolders(true)
        //    .setMimeTypes('application/vnd.google-apps.folder')
        //    .setSelectFolderEnabled(true);


        //Use DocsUploadView to upload documents to Google Drive.
        //var UploadView = new google.picker.DocsUploadView();

        //addViewGroup(new google.picker.ViewGroup(google.picker.ViewId.DOCS).
        // addView(google.picker.ViewId.DOCUMENTS).
        // addView(google.picker.ViewId.PRESENTATIONS)).


        //========Show Different Upload View in Picker Dialog box=======

        //User can upload file in any folder (by select folder)
        var UploadView = new google.picker.DocsUploadView().setIncludeFolders(true);

        //User can upload file in specific folder
        //var UploadView = new google.picker.DocsUploadView().setParent('당신의 폴더 ID')

        this.picker = new google.picker.PickerBuilder().
            addView(DisplayView).
            enableFeature(google.picker.Feature.MULTISELECT_ENABLED).
            setAppId(this.clientId).
            addView(UploadView).
            setOAuthToken(accessToken).
            setCallback(this.PickerResponse.bind(this)).
            setTitle('구글드라이브 UPLOAD').
            setSize(650,400).
            build().
            setVisible(true);
    },

    //====Called when a file has been selected in the Google Picker Dialog Box======
    PickerResponse: function (data) {
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var file = data[google.picker.Response.DOCUMENTS][0],
                id = file[google.picker.Document.ID],
                request = gapi.client.drive.files.get({ fileId: id });
            //this.ShowPicker(); 
            //request.execute(this.GetFileDetails.bind(this));
            var link = "https://drive.google.com/open?id="+id;
            var filename = file.name;
            
            //현재 날짜 불러오기
            var nowDateforAdd = nowDate();
            
            // 디비에 저장할 데이터 생성 
            var gdAddData = {
                    "gddate":nowDateforAdd,
                    "gdurl":link,
                    "mail":nowEmail,
                    "pjtseq":pjtSeq,
                    "filename":filename
            };
            
            // 위의 데이터를 보내서 디비에 등록
            // 비디 등록 되었는지 확인해보기
                addGoogleTag(gdAddData); //여기서 디비등록하고 성공해야만 뷰단 그려짐
            
                // 타임라인 추가하는 함수 ( 뷰단 에만 추가되는 함수  디비등록 성공하면 실행)
                paintingTimeLine(nowEmail, nowDateforAdd, link, filename);
           // document.getElementById('down').innerHTML = "<a style='font-size:20px;' target='_blank' href="+link+ ">"+ "<i class='fa fa-google-plus-square'></i>"+filename+"</a>";
        }
    },

    //====Called when file details have been retrieved from Google Drive========
    GetFileDetails: function (file) {
        if (this.onClick) {
            this.onClick(file);
        }
    },

    //====Called when the Google Drive file picker API has finished loading.=======
    PickerApiLoaded: function () {
        this.buttonEl.disabled = false;
    },

    //========Called when the Google Drive API has finished loading.==========
    DriveApiLoaded: function () {
        this.DoAuth(true);
    },

    //========Authenticate with Google Drive via the Google Picker API.=====
    DoAuth: function (immediate, callback) {
        gapi.auth.authorize({
            client_id: this.clientId,
            scope: 'https://www.googleapis.com/auth/drive',
            immediate: immediate
        }, callback);
    }
};