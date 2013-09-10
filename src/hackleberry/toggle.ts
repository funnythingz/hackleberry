module HACKLEBERRY {

  /*
  * toggle
  * 表示切替
  */
  export function toggle(args) {
    var d = document;
    var toggleEvent = d.getElementById(args.action);
    var toggleContentsArrayFlag = args.contents instanceof Array;
    var toggleContents: any;
    var flag = (args.visible)? true : false;
    var eventType = (args.event_type === 'touch')? 'tochstart' : 'click';
    var initCallback = (args.initCallback)? args.initCallback : function(){};
    var toggleCallback = (args.toggleCallback)? args.toggleCallback : function(){};

    function toggleContentsCheck() {
      if(toggleContentsArrayFlag) {
        toggleContents = [];
        for(var elm in args.contents) {
          toggleContents.push(d.getElementById(elm));
        }
        return;
      }
      toggleContents = d.getElementById(args.contents);
      return
    }

    function toggleFunc() {
      if(!flag) {
        if(!toggleContentsArrayFlag) {
          if(toggleContents.className.indexOf(' ' + args.hideClass + ' ') < 0) {
            toggleContents.className += (' ' + args.hideClass + ' ');
          }
          if(toggleContents.className.indexOf(' ' + args.showClass + ' ') > 0) {
            toggleContents.className = toggleContents.className.replace(' ' + args.showClass + ' ', '');
          }
          return;
        }
        for(var elm in toggleContents) {
          if(toggleContents[elm].className.indexOf(' ' + args.hideClass + ' ') < 0) {
            toggleContents[elm].className += (' ' + args.hideClass + ' ');
          }
        }
        for(var elm in toggleContents) {
          if(toggleContents[elm].className.indexOf(' ' + args.showClass + ' ') > 0) {
            toggleContents[elm].className = toggleContents[elm].className.replace(' ' + args.showClass + ' ', '');
          }
        }
        return;
      }

      if(!toggleContentsArrayFlag) {
        if(toggleContents.className.indexOf(' ' + args.showClass + ' ') < 0) {
          toggleContents.className += (' ' + args.showClass + ' ');
        }
        if(toggleContents.className.indexOf(' ' + args.hideClass + ' ') > 0) {
          toggleContents.className = toggleContents.className.replace(' ' + args.hideClass + ' ', '');
        }
        return;
      }
      for(elm in toggleContents) {
        if(elm.className.indexOf(' ' + args.showClass + ' ') < 0) {
          elm.className += (' ' + args.showClass + ' ');
        }
      }
      for(elm in toggleContents) {
        if(elm.className.indexOf(' ' + args.hideClass + ' ') > 0) {
          elm.className = elm.className.replace(' ' + args.hideClass + ' ', '');
        }
      }
      return;
    }

    function eventFunc() {
      toggleEvent.addEventListener(eventType, function(){
        flag = (flag)? false : true;
        toggleFunc();
        toggleCallback();
      }, false);
    }

    function init() {
      toggleContentsCheck();
      eventFunc();
      toggleFunc();
      initCallback();
    }

    init();
  }

}
