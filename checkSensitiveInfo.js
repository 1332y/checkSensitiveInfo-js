// ==UserScript==
// @name         checkSensitveInfo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       leezy
// @include        *
// @grant        none
// ==/UserScript==

let Regex = {
    "Mobile" : /((\+86)|(86))?((13[0-9])|(14[56789])|(15([0-3]|[5-9]))|(16[2567])|(17[01345678])|(18[0-9])|(19[189]))(\d{8})/g,
    "Phone" : /(((0\d{2,3}-)|(\(0\d{2,3}\))|(（0\d{2,3}）)|(0\d{2,3}\/))([1-9]{1})(\d{6,})(-(\d{3,}))?)/g,
    "Idcard" : /(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|51|52|53|54|61|62|63|64|65|71|81|82|91)(\d{4}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])|(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|51|52|53|54|61|62|63|64|65|71|81|82|91)(\d{4}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2})/g,
    "Email" : /([0-9a-zA-Z\_\.]{1,19}@[0-9a-zA-Z\_\.]{1,23}\.(com|cn|net|org|edu))/g,
    "BankCard" : /(([1346][1-5])|(5[0-4])|([34][6-7])|([2][1-3]))\d{4}((19[3-9])|(20[01]))\d((0[1-9])|(1[0-2]))(([0-2]\d)|(3[0-1]))\d{3}([0-9]|[Xx])/g,
    "Company" : /[\u4e00-\u9fa5]+?有限公司/g
}

let SensitveInfo = {}

function search(reg) {
    let wrap = document.body;
    let innerHTML = wrap.innerHTML;
    if (reg) {
        //replace
        //innerHTML = innerHTML.replace(reg, "<span class="secInfo" style="color: red;">$&</span>");
        //match
        innerHTML = innerHTML.match(reg);
    }
    //wrap.innerHTML = innerHTML;
    return innerHTML;
}

function postToServer(data) {
    let httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
    let url = "http://127.0.0.1:8080";
    httpRequest.open("POST", url, true);
    //httpRequest.setRequestHeader("Content-Type", "application/json"); //设置请求头信息
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            console.log("发生成功");
        }
    }
    //httpRequest.send(JSON.stringify(data)); //设置为发送给服务器数据
    httpRequest.send(data);
}


for (let key in Regex) {
    let reg = Regex[key];
    SensitveInfo[key] = search(reg);
}

alert(JSON.stringify(SensitveInfo));


/*
//replace
let secInfo = document.querySelectorAll(".secInfo")
let jsonObj = [];
for (let i = 0; i < secInfo.length; i++) {
    //secInfo[i].style.backgroundColor = "red";
    jsonObj[i] = secInfo[i].innerHTML
    //alert(secInfo[i].innerHTML)
}
alert(jsonObj)
*/

postToServer(JSON.stringify(SensitveInfo))
