<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="../static/css/card.css" type="text/css" rel="stylesheet">

        <title>

        </title>
        <script type="text/javascript" src="../static/js/jquery.js"></script>
    </head>
    <script type="text/javascript">
        function gaveContent(json,cardHeigh,imgC,imgpath,nameAndCard,cardC,nameC) {
            //声明块和a标签
            var blockDiv = document.createElement('div');
            blockDiv.className = cardHeigh;
            var aTag = document.createElement('a');
            aTag.className ="aClass";
            aTag.href = "toBuyTicketv2.do?cardNo="+json.cardNo;
            //声明图片div
            var imgDiv = document.createElement('div');
            imgDiv.className = imgC;
            //声明图片元素并把图片元素追加到图片div里
            var img = document.createElement('img');
            img.src = imgpath;
            imgDiv.appendChild(img);
            //声明姓名和卡号div,赋值，并追加到nameAndCard DIV里。
            var nACDiv = document.createElement('div');
            var nameDiv = document.createElement('div');
            var cardDiv = document.createElement('div');
            nACDiv.className = nameAndCard;
            nameDiv.className = nameC;
            cardDiv.className = cardC;
            nameDiv.innerHTML= json.remark;
            cardDiv.innerHTML = json.cardNo;
            nACDiv.appendChild(nameDiv);
            nACDiv.appendChild(cardDiv);
            //把图片div和卡号姓名div追加到 a标签里。目的是点这个块直接就可以跳转，范围比较大。
            aTag.appendChild(imgDiv);
            aTag.appendChild(nACDiv);
            //将a标签追加到卡片块div里
            blockDiv.appendChild(aTag);
            return blockDiv;
        }
        function test() {
            var blockDiv = document.createElement('div');
            blockDiv.className = "cardHeigh";
            var imgDiv = document.createElement('div');
            imgDiv.className= "imgC";

            imgDiv.innerHTML="nihao";
            var nACDiv = document.createElement('div');
            nACDiv.className = "nameAndCard";
            nACDiv.innerHTML ="ni hao a ";
            blockDiv.appendChild(imgDiv);
            blockDiv.appendChild(nACDiv);
            return blockDiv;


        }
        $(function () {
            $("#txt_search").keyup(function (evt) {
                var k = window.event ? evt.keyCode : evt.which;
                //输入框的id为txt_search，这里监听输入框的keyup事件
                //不为空 && 不为上箭头或下箭头或回车

                if ($("#txt_search").val() != "" && k != 38 && k != 40 && k != 13) {
                    $.ajax({
                        type: 'post',
                        async: true, //同步执行，不然会有问题
                        url: "selectCard.do",   //提交的页面/方法名
                        data:{
                            remark:$("#txt_search").val()
                        },
                         //参数（如果没有参数：null）
                        error: function (msg) {//请求失败处理函数
                            alert("数据加载失败");
                        },
                        success: function (data) { //请求成功后处理函数。

                            document.getElementById('cardL').innerHTML = '';

                            for(var i in data){
                                document.getElementById('cardL').appendChild(gaveContent(data[i],"cardHeight","imgC","../static/img/card_number2.png","nameAndP","xx","xx"));
                            }
                        }
                    });
                }
            })
        })

    </script>
    <body>
        <div >
            <div style="height: 1rem">

            </div>
            <div class="titleheight">
                        <input id="txt_search" name="remark" type="text" >
            </div>
            <div id="cardL" class="bodyHeight">

                <c:forEach items="${cardList}" var="item" >
                    <div class="cardHeight">
                        <a href="toBuyTicketv2.do?cardNo=${item.cardNo}" class="aClass">
                            <div class="imgC">
                                <img src="../static/img/card_number2.png" style="align-self: center">
                            </div>
                            <div class="nameAndP">
                                <div class="xxx">
                                        ${item.cardNo}
                                </div>
                                <div class="xxx">
                                    张三
                                </div>
                            </div>
                        </a>
                    </div>
                </c:forEach>
            </div>
        </div>
    </body>
</html>