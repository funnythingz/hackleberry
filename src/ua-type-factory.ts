module HACKLEBERRY {

  /**
  * UserAgentからprefixを判別
  */
  export function uaTypeFactory(ua: string): string {

    if(ua.match(/AppleWebKit/)) {
      return 'webkit';
    } else if(ua.match(/Opera/)) {
      return 'o';
    } else if(ua.match(/Firefox/)) {
      return 'moz';
    } else if(ua.match(/Trident/)) {
      return 'ms'
    }
    return null;
  }

}
