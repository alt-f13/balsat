"use strict";angular.module("yoApp",["ngAnimate","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngWebSocket","ui.bootstrap","ui.bootstrap-slider","uiSwitch","ui.toggle","ui-notification"]).config(["$routeProvider","NotificationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MessengerCtrl",controllerAs:"akbCtrl"}).when("/charge",{templateUrl:"views/charge.html",controller:"ChargeCtrl",controllerAs:"chargeCtrl"}).when("/settings",{templateUrl:"views/settings.html",controller:"SettingsCtrl",controllerAs:"settings"}).otherwise({redirectTo:"/"}),b.setOptions({delay:10,startTop:20,startRight:10,verticalSpacing:20,horizontalSpacing:20,positionX:"right",positionY:"top"})}]),angular.module("yoApp").controller("MainCtrl",["$scope","Messages","Notification",function(a,b,c){a.form=b.collection,a.model=b,a.primary=function(){c("Primary notification")},a.primary(),a.error=function(){c.error("Error notification")},a.success=function(a){c.success(a)},a.info=function(){c.info("Information notification")},a.warning=function(){c.warning("Warning notification")},a.wsConnect=function(a){b.connect("ip")},a.wsStatus=b.status,a.wsSend=function(){console.log(a.form),b.send(a.form)},a.ip="esp8266fs.local.",a.defs={I:{min:0,max:12,key:"A",step:"0.3"},U:{min:1,max:16,key:"В",step:"0.1"},H:{min:0,max:24,key:"ч.",step:1},IH:{min:100,max:600,key:"А/ч",step:"1"},M:{min:0,max:240,key:"мин.",step:"1"},S:{min:30,max:180,key:"сек",step:"1"},PROC:{min:0,max:100,key:"%",step:"1"}},console.log(b.status())}]),angular.module("yoApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("yoApp").controller("MessengerCtrl",["$scope","$http","Messages",function(a,b,c){a.model=c,a.form=c.collection,a.log=c.log,a.slider={value:50,options:{floor:0,ceil:100,step:1,minLimit:10,maxLimit:90}}}]),angular.module("yoApp").factory("Messages",["$websocket",function(a){function b(b){return a("ws://"+b+"/ws",null,{reconnectIfNotNormalClose:!0})}var c=location.hostname;"localhost"===c?(c="esp8266fs.local.",c="10.11.1.249"):"balsat.2d-it.ru"===c&&(c="ws.2d-it.ru");var d=b(c),e={},f=[];return d.onMessage(function(a){console.log("timestamp:"+a.timeStamp+"  %c rs232:  "+a.data,"background: #222; color: #bada55");var b;try{b=JSON.parse(a.data)}catch(c){console.error("JSON.parse filed",a.data)}Object.assign(e,b),f.push(b)}),d.onError(function(a){console.error("connection Error",a)}),d.onClose(function(a){console.log("connection closed",a)}),d.onOpen(function(){console.log("connection open"),d.send("ping")}),{collection:e,log:f,status:function(){return d.readyState},send:function(a){angular.isString(a)?d.send(a):angular.isObject(a)&&d.send(JSON.stringify(a))},connect:function(a){return a}}}]),angular.module("yoApp").filter("capitalize",function(){function a(a){return a.charAt(0).toUpperCase()+a.substr(1).toLowerCase()}return function(b,c){return b?c?b.replace(/([^\W_]+[^\s-]*) */g,a):a(b):""}}),angular.module("yoApp").controller("AkbCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("yoApp").controller("ChargeCtrl",["$scope","Messages","$http",function(a,b,c){a.model=b,a.form=b.collection,a.log=b.log,a.slider={value:50,options:{floor:0,ceil:100,step:1,minLimit:10,maxLimit:90}},a.form.srvDUZ=[5,7]}]),angular.module("yoApp").directive("bslider",function(){return{templateUrl:"bslider.html",scope:{bindModel:"=ngModel",defs:"=defs",range:"="},transclude:!0,link:function(a,b,c){}}}),angular.module("yoApp").controller("SettingsCtrl",["$scope","$http",function(a,b){b.get("http://10.11.1.249/config.json").then(function(a,b){console.log(a)})}]),angular.module("yoApp").directive("rangeslider",function(){return{templateUrl:"rangeslider.html",scope:{bindModel:"=ngModel",defs:"=defs",range:"="},transclude:!0,link:function(a,b,c){}}}),angular.module("yoApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/akb.html",'<script type="text/ng-template" id="edit.akb.html"><div class="modal-header">\n     <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">x</button>\n     <h4>ЗАРЯД АКБ <small>Редактирование профиля</small></h4>\n  </div>\n  <div class="modal-body">\n    <!-- ПРОФИЛЬ -->\n\n  </div></script> <!--\nsmainZU Максимальное напряжение (В): "min": ~smainZUl~, "max": ~smainZUh~\nslastZU Напряжение начала снижения тока(В): "min": ~slastZUl~, "max": ~slastZUh~\nsmainZI Максимальный ток (A): "min": ~smainZIl~, "max": ~smainZIh~\nsmainZRQ Длительность заряда за период (с): "min": 5, "max": 25\nsmainZRD Длительность разряда от длительности заряда (%): "min": 10, "max": 50\nslastZFI Ток окончания заряда (А): "min": ~slastZFIl~, "max": ~slastZFIh~\nslastZFT Выдержка при установленном напряжении (ч): "min": 1, "max": 6\nsrvlowZI Максимальный ток (A): "min": ~srvlowZIl~, "max": ~srvlowZIh~\nsrvlowZT Максимальная длительность паузы (с): "min": 1, "max": 300\nsrvlowZH Продолжительность дозаряда(час): "min": 1, "max": 240\nmScn Число циклов разряд-заряд: "min": 1, "max": 10" step="1\nmsetDU Минимальное напряжение (В): "min": ~msetDUl~, "max": ~msetDUh~" step="~steps~\nmsetDI Ток разряда (А): "min": ~msetDIl~, "max": ~msetDIh~" step="~steps~\nmsetWT Пауза перед разрядом (ч): "min": 0, "max": 5" step="0.5\nfdisFU Разряд при увеличении напряжения более (В): "min": 0.05, "max": 1.0\nfdisFI Ток разряда (А): "min": ~fdisFIl~, "max": ~fdisFIh~\nfdisT Пауза (мин): "min": 1, "max": 30  --> <button type="button" class="btn btn-primary" ng-click="createAlert()"></button> <div class="container"> <img src="/images/kulon912.png" alt=""> <h2>ЗАРЯД АКБ</h2><h3>РАСШИРЕННЫЙ РЕЖИМ</h3> <h3 style="text-align:center;color:#999">Параметры аккумулятора: {{form.tekU}} B {{form.tekI}} Aч</h3> </div> <div class="container"> <div class="jumbotron"> <h4> {{form.stat_m}} </h4> <h2> {{form.tekU}} <br> {{form.tekI}} </h2> <h4> {{form.info_msg}} </h4> </div> </div> <div class="container-fluid"> <div class="row"> <div class="col-md-6"> <div class="page-header"> <h1>Заряд</h1> </div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">Заряд</h3> </div> <!-- <div class="panel-body">\n\n        </div> --> <ul class="list-group"> <li class="list-group-item"> <bslider ng-model="form.smainZU" defs="defs.A">Максимальное напряжение (В) {{defs.A}} </bslider></li> <li class="list-group-item"> <bslider ng-model="form.slastZU">Напряжение начала снижения тока(В) </bslider></li> <li class="list-group-item"> <bslider ng-model="form.smainZI">Максимальный ток (A) </bslider></li> </ul> </div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"> Асимметричный заряд <switch ng-model="form.smainZR"></switch> </h3> </div> <ul class="list-group" ng-show="form.smainZR"> <!-- Асимметричный заряд --> <li class="list-group-item"> <bslider ng-model="form.smainZRQ">Длительность заряда за период (с) </bslider></li> <li class="list-group-item"> <bslider ng-model="form.smainZRD">Длительность разряда от длительности заряда (%) </bslider></li> <!-- Асимметричный заряд --> <li class="list-group-item"> <h4 class="list-group-item-heading">Окончание заряда <switch width="100px" on="по напряжению" off="по силе тока" ng-model="form.slastZF"></switch></h4> </li> <!-- окончание заряда --> <li class="list-group-item" ng-show="form.slastZF"> <bslider ng-model="form.slastZFI">Ток окончания заряда (А) </bslider></li> <!-- или --> <li class="list-group-item" ng-show="!form.slastZF"> <bslider ng-model="form.slastZFT">Выдержка при установленном напряжении (ч): </bslider></li> <!-- окончание заряда переключатель --> </ul> </div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"> Дозаряд <switch ng-model="form.srvDopCh"></switch> </h3> </div> <ul class="list-group" ng-show="form.srvDopCh"> <!-- ДОЗАРЯД --> <li class="list-group-item"> <bslider ng-model="form.srvlowZI">Максимальный ток (A) </bslider></li> <li class="list-group-item"> <bslider ng-model="form.srvlowZT">Максимальная длительность паузы (с) </bslider></li> <li class="list-group-item"> <bslider ng-model="form.srvlowZH">Продолжительность дозаряда(час) </bslider></li> <li class="list-group-item"> <bslider ng-model="form.mScn">Число циклов разряд-заряд </bslider></li> <!-- ДОЗАРЯД --> </ul> </div> </div> <div class="col-md-6"> <div class="page-header"> <h1>Разряд</h1> </div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"> РАЗРЯД </h3> </div> <!-- <div class="panel-body">\n\n        </div>\n        <div class="panel-footer">\n        </div> --> <ul class="list-group"> <li class="list-group-item list-group-item-info"> <bslider ng-model="form.msetDU">Минимальное напряжение (В) </bslider></li> <li class="list-group-item"> <bslider ng-model="form.msetDI">Ток разряда (А) </bslider></li> <li class="list-group-item"> <bslider ng-model="form.msetWT">Пауза перед разрядом (ч) </bslider></li> </ul> </div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"> Доразряд <switch ng-model="form.fdis" class="pull-right"></switch> </h3> </div> <ul class="list-group" ng-show="form.fdis"> <li class="list-group-item"> <bslider ng-model="form.fdisFU">Разряд при увеличении напряжения более (В) </bslider></li> <li class="list-group-item"> <bslider ng-model="form.fdisFI">Ток разряда (А) </bslider></li> <li class="list-group-item"> <bslider ng-model="form.fdisT">Пауза (мин) </bslider></li> </ul> </div> </div> </div> </div> {{form}}'),a.put("views/bslider.html",'<script type="text/ng-template" id="bslider.html"><div class="form-group form-horizontal bslider">\n    <div class="row">\n      <div class="col-xs-9">\n        <label class="control-label">\n          <ng-transclude></ng-transclude>\n        </label>\n        <slider class="bslider-slider" ng-model="bindModel" min="defs.min" step="defs.step" max="defs.max"></slider>\n\n      </div>\n      <div class="col-xs-3">\n        <input type="number"  min="{{defs.min}}" step="{{defs.step}}" max="{{defs.max}}" class="form-control big" ng-model="bindModel">\n        <span class="big absolute">{{defs.key}}</span>\n      </div>\n    </div>\n  </div></script>'),a.put("views/charge.html",'<script type="text/ng-template" id="edit.akb.html"><div class="modal-header">\n     <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel">x</button>\n     <h4>ЗАРЯД АКБ <small>Редактирование профиля</small></h4>\n  </div>\n  <div class="modal-body">\n    <!-- ПРОФИЛЬ -->\n\n  </div></script> <!--\nsmainZU Максимальное напряжение: "min": ~smainZUl~, "max": ~smainZUh~\nslastZU Напряжение начала снижения тока: "min": ~slastZUl~, "max": ~slastZUh~\nsmainZI Максимальный ток: "min": ~smainZIl~, "max": ~smainZIh~\nsmainZRQ Длительность заряда за период: "min": 5, "max": 25\nsmainZRD Длительность разряда от длительности заряда: "min": 10, "max": 50\nslastZFI Ток окончания заряда: "min": ~slastZFIl~, "max": ~slastZFIh~\nslastZFT Выдержка при установленном напряжении: "min": 1, "max": 6\nsrvlowZI Максимальный ток: "min": ~srvlowZIl~, "max": ~srvlowZIh~\nsrvlowZT Максимальная длительность паузы: "min": 1, "max": 300\nsrvlowZH Продолжительность дозаряда: "min": 1, "max": 240\nmScn Число циклов разряд-заряд: "min": 1, "max": 10" step="1\nmsetDU Минимальное напряжение: "min": ~msetDUl~, "max": ~msetDUh~" step="~steps~\nmsetDI Ток разряда: "min": ~msetDIl~, "max": ~msetDIh~" step="~steps~\nmsetWT Пауза перед разрядом: "min": 0, "max": 5" step="0.5\nfdisFU Разряд при увеличении напряжения более: "min": 0.05, "max": 1.0\nfdisFI Ток разряда: "min": ~fdisFIl~, "max": ~fdisFIh~\nfdisT Пауза: "min": 1, "max": 30  --> <div class="container"> <div class="jumbotron"> <img src="/images/service.png" class="pull-left" alt=""> <h2>СЕРВИС АКБ<br> <small>РАСШИРЕННЫЙ РЕЖИМ</small> </h2> <h3 class="text-center">Параметры аккумулятора: {{form.tekU}} B {{form.tekI}} Aч</h3> <h4> {{form.stat_m}} </h4> <h2> {{form.tekU}} <br> {{form.tekI}} </h2> <h4> {{form.info_msg}} </h4> </div> </div> <div class="container-fluid"> <div class="row"> <div class="col-md-6"> <div class="page-header"> <h1>Заряд</h1> </div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title pull-left">Заряд</h3> <toggle ng-model="form.ZR" class="pull-right"> <div class="clearfix"></div> </toggle></div> <!-- <div class="panel-body">\n\n        </div> --> <ul class="list-group" ng-show="form.ZR"> <li class="list-group-item"> <bslider ng-model="form.setUp" defs="defs.U">Максимальное напряжение </bslider></li> <li class="list-group-item"> <bslider ng-model="form.setIp" defs="defs.I">Максимальный ток </bslider></li> <li class="list-group-item"> <bslider ng-model="form.lastZU" defs="defs.U">Напряжение начала снижения тока </bslider></li> <li class="list-group-item"> <h4 class="list-group-item-heading">Окончание заряда <toggle on="по напряжению" off="по силе тока" ng-model="form.lastZF"></toggle></h4> </li> <!-- окончание заряда --> <li class="list-group-item" ng-show="!form.lastZF"> <bslider ng-model="form.lastZFI" defs="defs.I">Ток окончания заряда </bslider></li> <!-- или --> <li class="list-group-item" ng-show="form.lastZF"> <bslider ng-model="form.lastZFT" defs="defs.H">Выдержка при установленном напряжении </bslider></li> <!-- окончание заряда переключатель --> <li class="list-group-item"> <bslider ng-model="form.mScn">Число циклов разряд-заряд </bslider></li> </ul> <div class="panel-footer" ng-show="form.ZR"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title pull-left"> Асимметричный заряд </h3> <toggle ng-model="form.mainZR" class="pull-right"></toggle> <div class="clearfix"></div> </div> <ul class="list-group" ng-show="form.mainZR"> <!-- Асимметричный заряд --> <li class="list-group-item"> <bslider ng-model="form.mainZRQ" defs="defs.S">Длительность заряда за период </bslider></li> <li class="list-group-item"> <bslider ng-model="form.mainZRD" defs="defs.PROC">Длительность разряда от длительности заряда </bslider></li> <!-- Асимметричный заряд --> </ul> </div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title pull-left"> Дозаряд </h3> <toggle ng-model="form.srvDopCh" class="pull-right"></toggle> <div class="clearfix"></div> </div> <ul class="list-group" ng-show="form.srvDopCh"> <!-- ДОЗАРЯД --> <li class="list-group-item"> <rangeslider ng-model="form.srvDUZ" defs="defs.I">Диапазон напряжений дозаряда</rangeslider> </li> <li class="list-group-item"> <bslider ng-model="form.srvlowZI" defs="defs.I">Максимальный ток </bslider></li> <li class="list-group-item"> <bslider ng-model="form.srvlowZT" defs="defs.S">Максимальная длительность паузы </bslider></li> <li class="list-group-item"> <bslider ng-model="form.srvlowZH" defs="defs.H">Продолжительность дозаряда </bslider></li> <!-- ДОЗАРЯД --> </ul> </div> </div> </div> </div> <div class="col-md-6"> <div class="page-header"> <h1>Разряд</h1> </div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"> РАЗРЯД </h3> </div> <!-- <div class="panel-body">\n\n        </div>\n        <div class="panel-footer">\n        </div> --> <ul class="list-group"> <li class="list-group-item list-group-item-info"> <bslider ng-model="form.setDU" defs="defs.U">Минимальное напряжение </bslider></li> <li class="list-group-item"> <bslider ng-model="form.setDI" defs="defs.I">Ток разряда </bslider></li> <li class="list-group-item"> <bslider ng-model="form.setWT" defs="defs.H">Пауза перед разрядом </bslider></li> </ul> <div class="panel-footer"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"> Доразряд <switch ng-model="form.fdis" class="pull-right"></switch> </h3> </div> <ul class="list-group" ng-show="form.fdis"> <li class="list-group-item"> <bslider ng-model="form.fdisFU" defs="defs.U">Разряд при увеличении напряжения более </bslider></li> <li class="list-group-item"> <bslider ng-model="form.fdisFI" defs="defs.I">Ток разряда </bslider></li> <li class="list-group-item"> <bslider ng-model="form.fdisT" defs="defs.M">Пауза </bslider></li> </ul> </div> </div> </div> </div> </div> </div>'),a.put("views/main.html",'<script type="text/ng-template" id="edit.akb.html"><div class="modal-header">\n     <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">x</button>\n     <h4>ЗАРЯД АКБ <small>Редактирование профиля</small></h4>\n  </div>\n  <div class="modal-body">\n    <!-- ПРОФИЛЬ -->\n\n  </div></script> <!--\n{\n"err_num":"0",\n"err_msg":"",\n"stat_m":"Тестовый режим",\n"info_msg":"Время заряда 05ч 30м",\n"tekU":"14.6В",\n"tekI":"0.3А",\n"setUp":"14.8",\n"setIp":"5.2",\n"setUpn":"14.5",\n"setIpn":"6.2",\n"setdelSb":"0",\n"setDp":"1",\n"setPb":"1",\n"setPon":"5",\n"setPoff":"10",\n"setp1":"Прфиль 1",\n"setp2":"Мой вариант",\n"setp3":"Просто заряд"\n}\n  --> <div class="container"> <div class="jumbotron"> <img src="/images/kulon912.png" class="pull-left" alt=""> <h3 class="text-center">Параметры аккумулятора: {{form.tekU}} B {{form.tekI}} Aч</h3> <h4> {{form.stat_m}} </h4> <h2> {{form.tekU}} <br> {{form.tekI}} </h2> <h4> {{form.info_msg}} </h4> </div> </div> <ul class="list-group"> <li class="list-group-item"> <bslider ng-model="form.setUp" defs="defs.U">setUp </bslider></li> <li class="list-group-item"> <bslider ng-model="form.setIp" defs="defs.I">setIp </bslider></li> <li class="list-group-item"> <bslider ng-model="form.setUpn" defs="defs.U">setUpn </bslider></li> <li class="list-group-item"> <bslider ng-model="form.setIpn" defs="defs.I">setIpn </bslider></li> <li class="list-group-item"> setdelSb: <toggle ng-model="form.setdelSb" on="1" off="0"></toggle> </li> <li class="list-group-item"> setDp: <toggle ng-model="form.setDp" on="1" off="0">setDp</toggle> </li> <li class="list-group-item"> setPb: <toggle ng-model="form.setPb" on="1" off="0"></toggle> </li> <li class="list-group-item"> <bslider ng-model="form.setPon" defs="defs.I">setPon </bslider></li> <li class="list-group-item"> <bslider ng-model="form.setPoff" defs="defs.I">setPoff </bslider></li> </ul> <div class="list-group"> <a ng-href="#!/setp1" class="list-group-item">{{form.setp1}}</a> <a ng-href="#!/setp2" class="list-group-item">{{form.setp2}}</a> <a ng-href="#!/setp3" class="list-group-item">{{form.setp3}}</a> </div>'),a.put("views/power.html","<p>This is the power view.</p>"),a.put("views/settings.html","<p>Здесь будут настройки</p>")}]);