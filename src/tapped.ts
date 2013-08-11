module HACKLEBERRY {

  /*
  * 指定されたクラスが付与されている要素に
  * touchイベント発火時にtappedクラスを付与する
  */
  export function tapped(tap, tapped) {
    var elms = document.getElementsByClassName(tap);

    function changeFunc() {
      event.stopPropagation();
      var re = new RegExp(tapped);

      if(!re.test(this.className)) {
        this.className += ' ' + tapped;
        return;
      }
      offFunc();
    }

    function offFunc() {
      this.className = this.className.replace(tapped, '');
      return;
    }

    for(var i, L = elms.length; i < L; i++) {
      var val = elms[i];
      val.addEventListener('touchstart', changeFunc, false);
      val.addEventListener('touchmove', offFunc, false);
      val.addEventListener('touchend', offFunc, false);
    }
  }

}
