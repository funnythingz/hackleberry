(function(window){
if(typeof(HACKLEBERRY) == 'undefined' || !HACKLEBERRY ){
  window.HACKLEBERRY = {}
}
HACKLEBERRY = {
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
        css_file=document.createElement("link"),
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
      css_file.setAttribute("rel", "stylesheet");
      css_file.setAttribute("type", "text/css");
      css_file.setAttribute("href", args.path + prefix + os + b);
      if (typeof css_file!="undefined"){
        head.appendChild(css_file);
      }
    }
  }
}
})(window);