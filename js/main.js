// each($(".app-footer a"),function (item,index) {
//   var path = document.location.href
//   var href = item.href;
//   if(href === path){
//     addClass(item, 'active');
//     return false;
//   }
// });

// each($(".sidebar a"),function (item,index){
//   var path = document.location.href
//   var href = item.href;
//   if (href === path) {
//     addClass(item, 'active');
//     return false;
//   }
// });

$(".app-footer a").each(function () {
  var path = document.location.pathname.split('/');
  var page = path[path.length -1];
  var href = $(this).attr('href');
  if(href === page){
    $(this).addClass('active');
    return false;
  }
});

$(".sidebar a").each(function(){
  var path = document.location.pathname.split('/');
  var page = path[path.length - 1];
  var href = $(this).attr("href");
  if (href === page) {
    $(this).addClass("active");
    return false;
  }
});

window.addEventListener("load",function() {
  // Set a timeout...
  setTimeout(function(){
    // Hide the address bar!
    window.scrollTo(0, 1);
  }, 0);
});

var tapTest = function () {
  var clickBtn = document.querySelector('#clickBtn'),
    tapBtn = document.querySelector('#tapBtn'),
    clickTime = document.querySelector('#clickTime'),
    tapTime = document.querySelector('#tapTime');

  var start = 0, end = 0;
  clickBtn.addEventListener('touchstart',function () {
    start = new Date();
  },false);

  tapBtn.addEventListener('touchstart',function () {
    start = new Date();
  },false);

  clickBtn.addEventListener('touchend',function (e) {
    // e.preventDefault();
  },false);

  clickBtn.addEventListener('click',function () {
    end = new Date();
    clickTime.innerHTML = (end - start) + 'ms';
  },false);

  tapBtn.addEventListener('tap',function () {
    end = new Date();
    tapTime.innerHTML = (end - start) + 'ms';
  },false);

  $('#mod').on('tap',function () {
    $(this).hide();
  });
}

var touch = function () {
  var touchPad = document.querySelector('#touchPad'),
      ball = document.querySelector('#ball'),
      desc = document.querySelector('#desc');
  var SWIPE_DISTANCE = 30;
  var SWIPE_TIME = 500;
  var point_start,point_end,time_start,time_end;
  var startEvt, moveEvt, endEvt;

  if("ontouchstart" in window){
    startEvt = "touchstart";
    moveEvt = "touchmove";
    endEvt = "touchend";
  } else{
    startEvt = "mousedown";
    moveEvt = "mousemove";
    endEvt = "mouseup";
  }
  var getTouchPos = function (e) {
    var touches =  e.touches;
    if(touches &&  touches[0]){
      return {x : e.touches[0].clientX, y : e.touches[0].clientY };
    }
    return {x : e.clientX, y : e.clientY };
  };
  var getDist = function (p1, p2) {
    if(!p1 || !p2) return 0;
    return Math.sqrt((p1.x - p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
  };
  var getAngle = function (p1,p2) {
    var r = Math.atan2(p2.y-p1.y, p2.x - p1.x);
    var a = r * 180 / Math.PI;
    return a;
  };
  var getSwipeDirection = function (p2,p1) {
    var dx = p2.x - p1.x;
    var dy = -p2.y + p1.y;
    var angle = Math.atan2(dy, dx) * 180 / Math.PI;
    if(angle < 45 && angle > -45) return 'right';
    if(angle >= 45 && angle < 135) return 'top';
    if(angle >= 135 || angle < -135) return 'left';
    if(angle >= -135 && angle <= -45) return 'bottom';
  };
  // 记录touchstart开始时间和位置
  var startEvtHandler = function (e) {
    var pos = getTouchPos(e);
    ball.style.left = pos.x + 'px';
    ball.style.top = pos.y + 'px';
    ball.style.display = 'block';
    var touches =  e.touches;
    if(!touches ||  touches.length == 1){
      point_start = getTouchPos(e);
      time_start = Date.now();
    }
  };

  var moveEvtHandler = function (e) {
    var pos = getTouchPos(e);
    ball.style.left = pos.x + 'px';
    ball.style.top = pos.y + 'px';

    point_end = getTouchPos(e);
    e.preventDefault();
  };

  var endEvtHandler = function  (e) {
    ball.style.display = 'none';
    var time_end = Date.now();
    if(getDist(point_start,point_end) > SWIPE_DISTANCE &&
      time_start - time_end < SWIPE_TIME ) {
      var dir = getSwipeDirection(point_end, point_start);
      touchPad.innerHTML = 'swipe' + dir;
    }
  };

  // demo1
  var touchHandler = function (e) {
    var type = e.type;
    // 注意touchend的touches和targetTouches为空，只偶有changeTouches获取上一次的touchTList
    if(type != 'touchend'){
      var pos = {
        x : e.touches[0].clientX,
        y : e.touches[0].clientY
      }
      ball.style.left = pos.x + 'px';
      ball.style.top = pos.y + 'px';
      desc.innerHTML = e.type + '(clientX:' + pos.x + ',clientY:' + pos.y + ')';
    } else{
      desc.innerHTML = e.type;
    }
    switch(type){
      case 'touchstart' :
        ball.style.display = 'block';
        break;
      case 'touchmove' :
        event.preventDefault();
        break;
      case 'touchend' :
        ball.style.display = 'none';
        break;

    }
  };
  touchPad.addEventListener('touchstart', startEvtHandler);
  touchPad.addEventListener('touchmove', moveEvtHandler);
  touchPad.addEventListener('touchend', endEvtHandler);
}

var main = function () {
  var path = document.location.pathname.split('/');
  var page = path[path.length - 1];
  console.log(page);
  if(page==="index.html"){
    touch();
  } else if(page==="about.html"){
    tapTest();
  }
}

main();

