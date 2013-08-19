module HACKLEBERRY {

  /*
  * 指定されたスクロール位置になったらposition:fixedの切り替えを行う
  */
  export function scrollFixed(args) {
  
    var elm = document.getElementById(args.id);
    var flag = false;
    var minWidth = (args.responsiveMinWidth)? args.responsiveMinWidth : false;
    var adjustment = (args.adjustment)? args.adjustment : false;

    function getScrollTop() {
      return document.documentElement.scrollTop || document.body.scrollTop;
    }

    function fixed() {
      elm.setAttribute('class', 'fixed');
      if(adjustment) {
        elm.parentNode['style'].height = adjustment + 'px';
        flag = true;
        return;
      }
      return null;
    }

    function normal() {
      elm.removeAttribute('class');
      if(adjustment) {
        elm.parentNode['style'] = '';
        flag = false;
        return;
      }
      return null;
    }

    function scrollFunc() {
      if (getScrollTop() > args.position && !flag && window.innerWidth > minWidth) {
        fixed();
        return;
      } else if(getScrollTop() < args.position && flag) {
        normal();
        return;
      } else if(window.innerWidth <= minWidth) {
        normal();
        return;
      }
      return null;
    }

    window.addEventListener('scroll', scrollFunc);
  }

}
