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
