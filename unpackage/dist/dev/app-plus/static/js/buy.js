window.onload = function () {
    var aInput = document.getElementsByTagName('input');
    var oUser = aInput[0];
    var oPwd = aInput[1]
    var aI = document.getElementsByTagName('i')[0];



    //卡号输入检测

    oUser.onfocus = function () {
        aI.innerHTML = '';
        oUser.removeAttribute("placeholder");
    }

    oUser.onkeyup = function () {

    }

    oUser.onblur = function () {
        var tel = /1[3|4|5|7|8][0-9]\d{8}$/;
        if (!tel.test(this.value)) {
            aI.innerHTML = '卡号不正确';
        } else if (this.value == "") {
            aI.innerHTML = '卡号不可为空';
        }
    }

    //金额输入检测
    if (oPwd) {
        oPwd.onfocus = function () {
            if (oUser.value == "") {
                aI.innerHTML = '卡号不可为空';
            }
            oPwd.removeAttribute("placeholder");
        }
        oPwd.onblur = function () {
            if (this.value == "") {
                aI.innerHTML = '金额不可为空';
            }
            oPwd.setAttribute("placeholder");
            oPwd.style.placeholder = '请输入金额';
        }
    }



}