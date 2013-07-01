_global = this

if _global.HACKLEBERRY?
  _global.HACKLEBERRY

_global.HACKLEBERRY = {
  changeStylesheet: (args) ->
    ua = navigator.userAgent
    head = document.getElementsByTagName('head')[0]
    type
    os = ''

    if ua.match(/AppleWebKit/)
      type = 'webkit'
    else if ua.match(/Opera/)
      type = 'o'
    else if ua.match(/Firefox/)
      type = 'moz'
    else if ua.match(/Trident/)
      type = 'ms'

    for val, i in args.file
      os
      prefix = if args.pure then '' else "#{type}_"

      if args.ios_android_change
        if ua.indexOf('iPhone') > 0 or ua.indexOf('iPad') > 0 or ua.indexOf('iPod') > 0
          os = 'ios_'
        else if ua.indexOf('Android') > 0
          os = 'android_'
      
      rtn = '<link rel="stylesheet" type="text/css" href="' + args.path + prefix + os + val + '">'
      document.write(rtn)
      console.log rtn
    return
}
