$(document).ready(function(){
   $(".main").append("<div id='overlay'></div>");
   $("#menu").click(function(){
      $("#guide").slideToggle();
      $("#overlay").toggleClass("show");
   })

	$(".text").focus(function(){        
		var txt_value =  $(this).val();  
		if(txt_value==this.defaultValue){  
        	$(this).val("").css("color","#313131");              
		} 
	});
})

function fjcHeight(){
	$(".proportion").each(function(i,n){
	        var FjcHeight=$(this).attr("F");
			var nowWidth=$(this).width();
			var thisHeight=nowWidth*parseFloat(FjcHeight);
	        $(this).css("height",thisHeight+"px");
	});     
}
function fontSizeHack(){
        var viewportW=$(".main").width();
		var fz=(viewportW/320)*0.625;
		$(".index-banner").css("font-size",(fz*100)+"%");
}
//用户注销
exitLogin=function(){
    document.cookie="userToken="+"";
    document.cookie="openId="+"";
    location.href="../pages/login.html";
}

$(window).resize(function(){
	fjcHeight();
	fontSizeHack();
})