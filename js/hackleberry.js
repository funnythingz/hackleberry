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

  /**
  * scrollFixed
  */
  scrollFixed: function(args){
    var d = document;
    
    var
      elmObj = d.getElementById(args.id),
      flag = false,
      minWidth = (typeof args.responsiveMinWidth !== 'undefined')? args.responsiveMinWidth: false,
      adjustment = (typeof args.adjustment !== 'undefined')? args.adjustment: false
    ;

    var getScrollTop = function(){
      return (d.documentElement.scrollTop || d.body.scrollTop);
    };
    var fixed = function(){
      elmObj.setAttribute('class', 'fixed');
      if(adjustment) elmObj.parentNode.style.height = adjustment + 'px';
      flag = true;
    };
    var normal = function(){
      elmObj.removeAttribute('class');
      if(adjustment) elmObj.parentNode.removeAttribute('style');
      flag = false;
    };
    var scrollFunc = function(){
      if(getScrollTop() > args.position && !flag && window.innerWidth > minWidth) fixed();
      else if(getScrollTop() < args.position && flag) normal();
      else if(window.innerWidth <= minWidth) normal();
    };
    window.addEventListener('scroll', scrollFunc);
  },
  tapped: function(args){
    var elms = document.getElementsByClassName(args);
    var changeFunc = function(){
      event.stopPropagation();
      if(!(/tapped/).test(this.className)){
        this.className += ' ' + 'tapped';
      }else{
        this.className = this.className.replace('tapped', '');
      }
    };
    var offFunc = function(){
      this.className = this.className.replace('tapped', '');
    };
    for(var i = 0, L = elms.length; i < L; i++){
      var elm = elms[i];
      elm.addEventListener('touchstart', changeFunc, false);
      elm.addEventListener('touchmove', offFunc, false);
      elm.addEventListener('touchend', offFunc, false);
    }
  },

  /**
  * toggle
  * 表示切り替え
  */
  toggle: function(args){
    var toggleEvent = document.getElementById(args.action),
        toggleContentsArrayFlag = (args.contents instanceof(Array)),
        toggleContents = '',
        flag = (args.visible)? true: false,
        eventType = (args.event_type === 'touch')? 'touchstart': 'click',
        initCallback = (args.initCallback)? args.initCallback: function(){}, //初期化完了後のコールバック関数
        toggleCallback = (args.toggleCallback)? args.toggleCallback: function(){} //toggle後のコールバック関数
    ;
    var toggleContentsCheck = function(){
      if(toggleContentsArrayFlag){
        toggleContents = [];
        for(var i = 0, L = args.contents.length; i < L; i++){
          toggleContents.push(document.getElementById(args.contents[i]));
        }
      }else{
        toggleContents = document.getElementById(args.contents);
      }
    }
    var toggleFunc = function(){
      if(!flag){
        if(!toggleContentsArrayFlag){
          if(toggleContents.className.indexOf(args.hideClass) < 0){
            toggleContents.className += (' ' + args.hideClass);
          }
          if(toggleContents.className.indexOf(args.showClass) > 0){
            toggleContents.className = toggleContents.className.replace(args.showClass, '');
          }
        }else{
          for(var i = 0, L = args.contents.length; i < L; i++){
            if(toggleContents[i].className.indexOf(args.hideClass) < 0){
              toggleContents[i].className += (' ' + args.hideClass);
            }
          }
          for(var i = 0, L = args.contents.length; i < L; i++){
            if(toggleContents[i].className.indexOf(args.showClass) > 0){
              toggleContents[i].className = toggleContents[i].className.replace(args.showClass, '');
            }
          }
        }
      }else{
        if(!toggleContentsArrayFlag){
          if(toggleContents.className.indexOf(args.showClass) < 0){
            toggleContents.className += (' ' + args.showClass);
          }
          if(toggleContents.className.indexOf(args.hideClass) > 0){
            toggleContents.className = toggleContents.className.replace(args.hideClass, '');
          }
        }else{
          for(var i = 0, L = args.contents.length; i < L; i++){
            if(toggleContents[i].className.indexOf(args.showClass) < 0){
              toggleContents[i].className += (' ' + args.showClass);
            }
          }
          for(var i = 0, L = args.contents.length; i < L; i++){
            if(toggleContents[i].className.indexOf(args.hideClass) > 0){
              toggleContents[i].className = toggleContents[i].className.replace(args.hideClass, '');
            }
          }
        }
      }
    }
    var eventFunc = function(){
      toggleEvent.addEventListener(eventType,function(){
        console.log(args);
        flag = (flag)? false: true;
        toggleFunc();
        toggleCallback();
      },false);
    }
    var init = function(){
      toggleContentsCheck();
      eventFunc();
      toggleFunc();
      initCallback();
    }
    init();
  }
}
})(window);
