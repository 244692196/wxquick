//记录是否验证通过
var flag = false;
var keyFlag = false;
var countFlag = false;
var repeatkeyFlag = false;

//记录点击次数
var acount_index = 0;
var pwd_index = 0;
var pwd2_index = 0;

function validate(){
    if(keyFlag==true&&countFlag==true&&repeatkeyFlag==true){
        flag = true;
    }
    return flag;
}
function getLength(str){
    return str.replace(/[^\x00-xff]/g,"xx").length;  //\x00-xff 此区间是单子节 ，除了此区间都是双字节。
}
function findStr(str,n){
    var tmp=0;
    for(var i=0;i<str.length;i++){
        if(str.charAt(i)==n){
            tmp++;
        }
    }
    return tmp;
}
window.onload=function(){
    var aInput=document.getElementsByTagName('input');
    var oName=aInput[0];
    //var dx=aInput[1];
    var pwd=aInput[3];
    var pwd2=aInput[4];

    var aP=document.getElementsByTagName('p');
    var name_msg=aP[0];
    var dx_msg=aP[0];
    var pwd_msg=aP[0];
    var pwd2_msg=aP[0];
    var name_length=0;
    var send=document.getElementById('send'),

	    times=60,
	    timer=null;
	    send.onclick=function(){
	      // 计时开始
            timer = setInterval(djs,1000);
	    }
        function djs(){
    		send.value = times+"秒后重试";
			send.setAttribute('disabled','disabled');
            send.style.background='#ccc';
            send.style.border='1px solid #ccc';
			times--;
			if(times <= 0){
				send.value = "发送验证码";
				send.removeAttribute('disabled');
				times = 60;
				clearInterval(timer);
			}
		}


    //用户名检测

    oName.onfocus=function(){
        name_msg.style.display='block';
        oName.removeAttribute("placeholder");
        oName.style.border='1px solid #fff';
    }

    oName.onblur=function(){
        acount_index++;
        // 含有非法字符 ，不能为空 ，长度少于5个字符 ，长度大于25个字符
        var tel = /^[A-Za-z0-9]{8,14}$/;
        if(!tel.test(this.value)){
            name_msg.innerHTML='<i>账号应为8-14个字母或数字</i>';
            oName.style.border='1px solid red';
            countFlag=false;
        }
        else{
            // if(pwd_index!=0){
            //     pwd.blur;
            // }
            // if(pwd2_index!=0){
            //     pwd2.blur;
            // }
            name_msg.innerHTML='';
            oName.style.border='1px solid #fff';
            countFlag=true;
        }
    }

    //短信验证码检测

    // dx.onfocus=function(){
    //     dx_msg.style.display='block';
    //     dx.removeAttribute("placeholder");
    //     dx.style.border='1px solid #fff';
    // }

    //密码检测
    pwd.onfocus=function(){
        pwd_msg.style.display='block';
        pwd.removeAttribute("placeholder");
        pwd.style.border='1px solid #fff';
    }
    pwd.onblur=function(){
        pwd_index++;
        var m=findStr(pwd.value,pwd.value[0]);
        var re_n=/[^\d]/g;
        var re_t=/[^a-zA-Z]/g;
        var tel = /^[A-Za-z0-9]{8,14}$/;
        if(this.value==""){
            pwd_msg.innerHTML='<i>密码不可为空</i>';
            pwd.style.border='1px solid red';
            keyFlag = false;
        }else if(!tel.test(this.value)){
            pwd_msg.innerHTML='<i>密码长度应为8到14个字母或数字</i>';
            pwd.style.border='1px solid red';
            keyFlag = false;
        }else{
            // if(acount_index!=0){
            //     oName.blur;
            // }
            // if(pwd2_index!=0){
            //     pwd2.blur;
            // }
            pwd_msg.innerHTML='';
            pwd.style.border='1px solid #fff';
            keyFlag = true;
        }
    }

    //确认密码
    pwd2.onblur=function(){
        pwd2_index++;
        if(this.value!=pwd.value){
            pwd2_msg.innerHTML='<i></i>两次密码输入到不一致';
            pwd.style.border='1px solid red';
            repeatkeyFlag = false;
        }else if(this.value==""){
            pwd2_msg.innerHTML='<i></i>请输入密码';
            pwd.style.border='1px solid red';
            repeatkeyFlag = false;
        }else{
            // if(acount_index!=0){
            //     oName.blur;
            // }
            // if(pwd_index!=0){
            //     pwd.blur;
            // }
            pwd2_msg.innerHTML='';
            pwd2.style.border='1px solid #fff';
            repeatkeyFlag = true;
        }
    }
        
}