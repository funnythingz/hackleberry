_global = this

if _global.HACKLEBERRY?
  _global.HACKLEBERRY

_global.HACKLEBERRY = {

  ###
  * StyleSheetをベンダープレフィックスつけて切り替える
  ###
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
    return

  ###
  * 指定されたスクロール位置になったらposition:fixedの切り替えを行う
  ###
  scrollFixed: (args) ->
    d = document
    elmObj = d.getElementById(args.id)
    flag = false
    minWidth = if args.responsiveMinWidth? then args.responsiveMinWidth else false
    adjustment = if args.adjustment? then args.adjustment else false

    getScrollTop = ->
      d.documentElement.scrollTop or d.body.scrollTop

    fixed = ->
      elmObj.setAttribute('class', 'fixed')
      if adjustment
        elmObj.parentNode.style.height = "#{adjustment}px"
        flag = true
        return

    normal = ->
      elmObj.removeAttribute('class')
      if adjustment
        elmObj.parentNode.removeAttribute('style')
        flag = false

    scrollFunc = ->
      if getScrollTop() > args.position and !flag and window.innerWidth > minWidth
        fixed()
        return
      else if getScrollTop() < args.position and flag
        normal()
        return
      else if window.innerWidth <= minWidth
        normal()
        return

    window.addEventListener('scroll', scrollFunc)

    return

  ###
  * 指定されたクラスが付与されている要素に
  * touchイベント発火時にtappedクラスを付与する
  ###
  tapped: (args) ->
    d = document
    elms = d.getElementsByClassName(args)

    changeFunc = ->
      event.stopPropagation()
      if(!(/tapped/).test(this.className))
        this.className += ' tapped'
        return
      else
        this.className = this.className.replace('tapped', '')
        return

    offFunc = ->
      this.className = this.className.replace('tapped', '')
      return

    for elm in elms
      elm.addEventListener('touchstart', changeFunc, false)
      elm.addEventListener('touchmove', offFunc, false)
      elm.addEventListener('touchend', offFunc, false)


    return

  ###
  * toggle
  * 表示切替
  ###
  toggle: (args) ->
    d = document
    toggleEvent = d.getElementById(args.action)
    toggleContentsArrayFlag = args.contents instanceof Array
    toggleContents = ''
    flag = if args.visible then true else false
    eventType = if args.event_type == 'touch' then 'tochstart' else 'click'
    initCallback = if args.initCallback then args.initCallback else ->
    toggleCallback = if args.toggleCallback then args.toggleCallback else ->

    toggleContentsCheck = ->
      if toggleContentsArrayFlag
        toggleContents = []
        for elm in args.contents
          toggleContents.push(d.getElementById(elm))
      else
        toggleContents = d.getElementById(args.contents)
      return

    toggleFunc = ->
      if !flag
        if !toggleContentsArrayFlag
          if toggleContents.className.indexOf(args.hideClass) < 0
            toggleContents.className += (' ' + args.hideClass)
          if toggleContents.className.indexOf(args.showClass) > 0
            toggleContents.className = toggleContents.className.replace(args.showClass, '')
          return
        else
          for elm in toggleContents
            if elm.className.indexOf(args.hideClass) < 0
              elm.className += (' ' + args.hideClass)

          for elm in toggleContents
            if elm.className.indexOf(args.showClass) > 0
              elm.className = elm.className.replace(args.showClass, '')

          return

      else
        if !toggleContentsArrayFlag
          if toggleContents.className.indexOf(args.showClass) < 0
            toggleContents.className += (' ' + args.showClass)
          if toggleContents.className.indexOf(args.hideClass) > 0
            toggleContents.className = toggleContents.className.replace(args.hideClass, '')
          return
        else
          for elm in args.contents
            if elm.className.indexOf(args.showClass) < 0
              elm.className += (' ' + args.showClass)
          for elm in args.contents
            if elm.className.indexOf(args.hideClass) > 0
              elm.className = elm.className.replace(args.hideClass, '')
          return

    eventFunc = ->
      toggleEvent.addEventListener(eventType, ->
        flag = if flag then false else true
        toggleFunc()
        toggleCallback()
        return
      , false);
      return

    init = ->
      toggleContentsCheck()
      eventFunc()
      toggleFunc()
      initCallback()
      return

    init()
    return

}
