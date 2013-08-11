/// <reference path="ua-type-factory.ts" />
module HACKLEBERRY {

  /**
  * StyleSheetをベンダープレフィックスつけて切り替える
  */
  export function changeStylesheet(args) {

    var ua = navigator.userAgent;
    var head = document.getElementsByTagName('head')[0];

    for(var val in args.file) {
      var prefix = (args.pure)? '': this.uaTypeFactory(ua) + '_';
      document.write('<link rel="stylesheet" type="text/css" href="' + args.path + prefix + args.file[val] + '">');
    }
    
  }

}
