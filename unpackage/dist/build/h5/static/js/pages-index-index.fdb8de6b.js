(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"1df2":function(a,t,e){"use strict";e.r(t);var i=e("26f2"),o=e.n(i);for(var n in i)"default"!==n&&function(a){e.d(t,a,function(){return i[a]})}(n);t["default"]=o.a},"26f2":function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=e("42da"),o={name:"buy",data:function(){return{components:"components",payedPage:i.gobalData.url_payback,priceDatas:[],cardFaceNo:"",nickname:"",priceShow:0,isShow:0,cardNo:"",fallCon:""}},onLoad:function(){i.gobalData.openId=uni.getStorageSync("wxopenid"),i.gobalData.openId||uni.redirectTo({url:"/pages/Impower"}),this.getPrice()},onNavigationBarButtonTap:function(){uni.navigateTo({url:"/pages/basics/Record"})},onShow:function(){sessionStorage.getItem("cardCsn")&&(this.cardFaceNo=sessionStorage.getItem("cardCsn"))},watch:{cardFaceNo:function(){var a=/^\d{8,19}$/;a.test(this.cardFaceNo)?this.priceShow=1:this.priceShow=0,sessionStorage.getItem("nickname")&&this.cardFaceNo==sessionStorage.getItem("cardCsn")?this.nickname="昵称:"+sessionStorage.getItem("nickname"):this.nickname=""}},methods:{getPrice:function(){var a=this;this.isShow="加载中...",this.$api.post({url:i.gobalData.url_getPriceList,data:{cityNo:i.gobalData.cityCode}}).then(function(t){a.isShow=0,"1"==t.data.resultCode?a.priceDatas=t.data.data:a.fallCon=t.data.message}).catch(function(t){a.isShow=0,a.fallCon=t.errMsg})},mpOrder:function(a){var t=this;this.isShow="正在生成订单",this.$api.post({url:i.gobalData.jsapi_place_order,data:{openId:i.gobalData.openId,tradePayNo:(new Date).getTime(),payAmount:a,payTypeCode:"WECHAT_PAY",terminalNo:i.gobalData.terminalNo,operatorNo:i.gobalData.operatorNo,cardCsn:this.cardFaceNo,cardNo:this.cardNo,cardFaceNo:this.cardFaceNo,rechargeNo:i.gobalData.rechargeNo,cityNo:i.gobalData.cityCode,subject:"聊城公交公司",detail:"IC卡充值",extra:"test"}}).then(function(a){t.isShow=0,0===a.data.code?n(a):t.fallCon=a.data.msg}).catch(function(a){t.isShow=0,console.log(a),t.fallCon=a.errMsg})},mpPay:function(a,t){uni.navigateTo({url:"/pages/basics/Result"})},buyInitInfo:function(a){var t=this;console.info("待校验的卡号："+this.cardFaceNo),this.isShow="校验卡号",this.$api.post({url:i.gobalData.url_verifyCard,data:{cardFaceNo:this.cardFaceNo},header:{ContentType:"application/x-www-form-urlencoded"}}).then(function(e){console.log(e.data),t.isShow=0,"1"==e.data.retCode?(t.cardNo=e.data.outputBo.cardSeqNo,t.mpOrder(a.payPrice)):t.fallCon=e.data.retMsg}).catch(function(a){t.isShow=0,t.fallCon=a.errMsg})},hideModal:function(){this.fallCon=""}}};function n(a){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:a.data.param.appId,timeStamp:a.data.param.timeStamp,nonceStr:a.data.param.nonceStr,package:a.data.param.package,signType:a.data.param.signType,paySign:a.data.param.paySign},function(a){"get_brand_wcpay_request:ok"==a.err_msg&&(this.mpPay(),that.mes="OK"),"get_brand_wcpay_request:cancel"==a.err_msg&&(that.mes="cancel",this.mpPay),"get_brand_wcpay_request:fail"==a.err_msg&&(that.mes="fail")})}t.default=o},3628:function(a,t,e){"use strict";e.r(t);var i=e("55be"),o=e("1df2");for(var n in o)"default"!==n&&function(a){e.d(t,a,function(){return o[a]})}(n);e("e581");var r,s=e("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"17fcb912",null,!1,i["a"],r);t["default"]=c.exports},"42da":function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.gobalData=void 0;var i="http://sg.oxoxo.xyz",o="http://sg.oxoxo.xyz",n={busID:2,busName:"聊城公交一卡通",terminalNo:"0102",openId:"",cityCode:"2521",operatorNo:"00005010",rechargeNo:"cz00005",url_getcode:i+"/pay-api/auth/getOpenId",url_getCard:i+"/platform/getBandCard",url_getPriceList:i+"/platform/getPriceByCityNo",url_tiedCard:i+"/platform/addBandCard",url_delCard:i+"/platform/updateCardStatus",url_getRecord:i+"/platform/getQuickInfoByOpenId",url_verifyCard:i+"/agent/checkic",jsapi_place_order:o+"/pay/kk/weixin/h5pay/do"};t.gobalData=n},"55be":function(a,t,e){"use strict";var i,o=function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("v-uni-view",{staticClass:"main",attrs:{id:"buy_form"}},[i("v-uni-view",[i("table",{attrs:{width:"98%",height:"80px",border:"0",align:"center",cellpadding:"10",cellspacing:"0"}},[i("tr",[i("td",{staticClass:"buy-bar",attrs:{width:"80%",align:"left",valign:"middle"}},[i("span",{staticClass:"nickname",style:{opacity:a.nickname?"1":"0"}},[a._v(a._s(a.nickname))]),i("v-uni-input",{staticClass:"input__field--minoru",attrs:{id:" cardNoL",name:"cardId",type:"text",placeholder:"请输入卡号"},model:{value:a.cardFaceNo,callback:function(t){a.cardFaceNo=t},expression:" cardFaceNo"}})],1),i("td",{attrs:{width:"20%",align:"left"}},[i("v-uni-navigator",{attrs:{url:"/pages/basics/IndexList"}},[i("img",{attrs:{src:e("d3a7")}})])],1)])]),i("h3",[i("p",{staticClass:"buy"},[a._v("购买金额")])]),i("table",{attrs:{width:"100%",border:"0",cellspacing:"0",cellpadding:"2"}},[i("tr",[i("td",{attrs:{height:"10"}}),i("td",{attrs:{height:"10"}}),i("td",{attrs:{height:"10"}})])]),i("v-uni-view",{attrs:{id:"priceList"}},a._l(a.priceDatas,function(t,e){return i("span",{key:e,staticStyle:{width:"33%",display:"inline"}},[i("v-uni-button",{staticClass:"btn whitebtn btn95 mb20",staticStyle:{width:"30%",display:"inline-block",margin:"5px 1% 5px 2%"},style:{borderColor:a.priceShow?"":"#BDBDBD"},attrs:{type:"button"},on:{click:function(e){arguments[0]=e=a.$handleEvent(e),a.priceShow&&a.buyInitInfo(t)}}},[i("table",{attrs:{width:"100%",border:"0",cellspacing:"0",cellpadding:"0"}},[i("tr",[i("td",{staticClass:"f20 blue",style:{color:a.priceShow?"":"#BDBDBD"},attrs:{align:"center",valign:"middle"}},[a._v(a._s(t.payPrice/100)+"元")])]),i("tr",[i("td",{staticClass:"f12 blue2",style:{color:a.priceShow?"":"#BDBDBD"},attrs:{align:"center",valign:"middle"}},[a._v("售价:"+a._s(t.price/100)+"元")])])])])],1)}),0),a.isShow?i("v-uni-view",{staticClass:"cu-load load-modal"},[i("v-uni-image",{staticStyle:{width:"18%"},attrs:{src:"../../static/img/load.png",mode:"aspectFit"}}),i("v-uni-view",{staticClass:"gray-text"},[a._v(a._s(a.isShow))])],1):a._e(),i("v-uni-view",{staticClass:"cu-modal",class:a.fallCon?"show":"",on:{click:function(t){arguments[0]=t=a.$handleEvent(t),a.hideModal.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"cu-dialog"},[i("v-uni-view",{staticClass:"bg-img"},[i("v-uni-image",{staticClass:"emoji",attrs:{src:"../../static/img/cardFall.png"}})],1),i("v-uni-view",{staticClass:"cu-bar bg-white"},[i("v-uni-view",{staticClass:"action margin-0 flex-sub  solid-left",on:{click:function(t){arguments[0]=t=a.$handleEvent(t),a.hideModal.apply(void 0,arguments)}}},[a._v(a._s(a.fallCon))])],1)],1)],1)],1),i("tab-bar",{attrs:{PageCur:a.components}})],1)},n=[];e.d(t,"b",function(){return o}),e.d(t,"c",function(){return n}),e.d(t,"a",function(){return i})},a1d7:function(a,t,e){t=a.exports=e("2350")(!1),t.push([a.i,".main[data-v-17fcb912]{width:100%;margin:0 auto;position:relative;overflow:hidden}.main *[data-v-17fcb912]{-webkit-transition:.5s;transition:.5s}.nickname[data-v-17fcb912]{position:absolute;top:%?6?%;left:%?25?%;color:#8d8d8d;margin:0 %?25?%;font-size:%?30?%;z-index:10}.bg-img[data-v-17fcb912]{padding:%?40?% 0}.emoji[data-v-17fcb912]{width:%?70?%;height:%?70?%}",""])},ca57:function(a,t,e){var i=e("a1d7");"string"===typeof i&&(i=[[a.i,i,""]]),i.locals&&(a.exports=i.locals);var o=e("4f06").default;o("e0b1bbc0",i,!0,{sourceMap:!1,shadowMode:!1})},d3a7:function(a,t){a.exports="data:image/png;base64,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"},e581:function(a,t,e){"use strict";var i=e("ca57"),o=e.n(i);o.a}}]);