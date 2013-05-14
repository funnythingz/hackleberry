(function(window){
if(typeof(HACKLEBERRY) == 'undefined' || !HACKLEBERRY ){
  window.HACKLEBERRY = {}
}
HACKLEBERRY = {
  /*
    StyleSheetをベンダープレフィックスつけて切り替える
  */
  changeStylesheet: function(args){
    var
      ua = navigator.userAgent,
      a = '',
      rtn = '',
      head = ''
    ;
    if(ua.match(/AppleWebKit/)) a = 'webkit';
    else if(ua.match(/Opera/)) a = 'o';
    else if(ua.match(/Firefox/)) a = 'moz';
    else if(ua.match(/Trident/)) a = 'ms';
    head = document.getElementsByTagName("head")[0];
    for(var i = 0, L = args.file.length; i < L; i++){
      var
        b = args.file[i],
        prefix = (args.pure)? '': a + '_',
        os = ''
      ;
      if(args.ios_android_change){
        if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0){
          os = 'ios_';
        }else if(ua.indexOf('Android') > 0){
          os = 'android_';
        }
      }
      document.write('<link rel="stylesheet" type="text/css" href="'+ (args.path + prefix + os + b) +'">');
    }
  },
  scrollFixed: function(args){
    var d = document;
    var sideMenu = d.getElementById(args.id);
    var flag = false;
    var getScrollTop = function(){
      return (d.documentElement.scrollTop || d.body.scrollTop);
    }
    window.addEventListener('scroll',function(){
      if(getScrollTop() > args.position && !flag){
        sideMenu.setAttribute('class', 'fixed');
        flag = true;
      }else if(getScrollTop() < args.position && flag){
        sideMenu.removeAttribute('class');
        flag = false;
      }
    });
  }
}
})(window);
