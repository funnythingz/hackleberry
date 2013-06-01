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
    var elmObj = d.getElementById(args.id);
    var flag = false;
    var minWidth = (typeof args.responsiveMinWidth !== 'undefined')? args.responsiveMinWidth: false;
    var adjustment = (typeof args.adjustment !== 'undefined')? args.adjustment: false;
    var getScrollTop = function(){
      return (d.documentElement.scrollTop || d.body.scrollTop);
    }
    var fixed = function(){
      elmObj.setAttribute('class', 'fixed');
      if(adjustment) elmObj.parentNode.style.height = adjustment + 'px';
      flag = true;
    }
    var normal = function(){
      elmObj.removeAttribute('class');
      if(adjustment) elmObj.parentNode.removeAttribute('style');
      flag = false;
    }
    var scrollFunc = function(){
      if(getScrollTop() > args.position && !flag && window.innerWidth > minWidth) fixed();
      else if(getScrollTop() < args.position && flag) normal();
      else if(window.innerWidth <= minWidth) normal();
    }
    window.addEventListener('scroll', scrollFunc);
  }
}
})(window);
