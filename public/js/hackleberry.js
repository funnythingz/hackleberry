var HACKLEBERRY;
(function (HACKLEBERRY) {
    function uaTypeFactory(ua) {
        if (ua.match(/AppleWebKit/)) {
            return 'webkit';
        } else if (ua.match(/Opera/)) {
            return 'o';
        } else if (ua.match(/Firefox/)) {
            return 'moz';
        } else if (ua.match(/Trident/)) {
            return 'ms';
        }
        return;
    }
    HACKLEBERRY.uaTypeFactory = uaTypeFactory;
})(HACKLEBERRY || (HACKLEBERRY = {}));
var HACKLEBERRY;
(function (HACKLEBERRY) {
    function changeStylesheet(args) {
        var ua = navigator.userAgent;
        var head = document.getElementsByTagName('head')[0];

        for (var val in args.file) {
            var prefix = (args.pure) ? '' : this.uaTypeFactory(ua) + '_';
            document.write('<link rel="stylesheet" type="text/css" href="' + args.path + prefix + args.file[val] + '">');
        }
    }
    HACKLEBERRY.changeStylesheet = changeStylesheet;
})(HACKLEBERRY || (HACKLEBERRY = {}));
var HACKLEBERRY;
(function (HACKLEBERRY) {
    function scrollFixed(args) {
        var elm = document.getElementById(args.id);
        var flag = false;
        var minWidth = (args.responsiveMinWidth) ? args.responsiveMinWidth : false;
        var adjustment = (args.adjustment) ? args.adjustment : false;

        function getScrollTop() {
            return document.documentElement.scrollTop || document.body.scrollTop;
        }

        function fixed() {
            elm.setAttribute('class', 'fixed');
            if (adjustment) {
                elm.parentNode['style'].height = adjustment + 'px';
                flag = true;
                return;
            }
            return null;
        }

        function normal() {
            elm.removeAttribute('class');
            if (adjustment) {
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
            } else if (getScrollTop() < args.position && flag) {
                normal();
                return;
            } else if (window.innerWidth <= minWidth) {
                normal();
                return;
            }
            return null;
        }

        window.addEventListener('scroll', scrollFunc);
    }
    HACKLEBERRY.scrollFixed = scrollFixed;
})(HACKLEBERRY || (HACKLEBERRY = {}));
var HACKLEBERRY;
(function (HACKLEBERRY) {
    function tapped(tap, tapped) {
        var elms = document.getElementsByClassName(tap);

        function changeFunc() {
            event.stopPropagation();
            var re = new RegExp(tapped);

            if (!re.test(this.className)) {
                this.className += ' ' + tapped;
            } else {
                offFunc();
            }
        }

        function offFunc() {
            this.className = this.className.replace(tapped, '');
        }

        for (var i = 0, L = elms.length; i < L; i++) {
            var val = elms[i];
            val.addEventListener('touchstart', changeFunc, false);
            val.addEventListener('touchmove', offFunc, false);
            val.addEventListener('touchend', offFunc, false);
        }
    }
    HACKLEBERRY.tapped = tapped;
})(HACKLEBERRY || (HACKLEBERRY = {}));
var HACKLEBERRY;
(function (HACKLEBERRY) {
    function toggle(args) {
        var d = document;
        var toggleEvent = d.getElementById(args.action);
        var toggleContentsArrayFlag = args.contents instanceof Array;
        var toggleContents;
        var flag = (args.visible) ? true : false;
        var eventType = (args.event_type === 'touch') ? 'tochstart' : 'click';
        var initCallback = (args.initCallback) ? args.initCallback : function () {
        };
        var toggleCallback = (args.toggleCallback) ? args.toggleCallback : function () {
        };

        function getToggleContents() {
            if (toggleContentsArrayFlag) {
                toggleContents = [];
                for (var elm in args.contents) {
                    toggleContents.push(d.getElementById(elm));
                }
            } else {
                toggleContents = d.getElementById(args.contents);
            }
        }

        function toggleFunc() {
            if (!flag) {
                if (!toggleContentsArrayFlag) {
                    if (toggleContents.className.indexOf(' ' + args.hideClass + ' ') < 0) {
                        toggleContents.className += (' ' + args.hideClass + ' ');
                    }
                    if (toggleContents.className.indexOf(' ' + args.showClass + ' ') > 0) {
                        toggleContents.className = toggleContents.className.replace(' ' + args.showClass + ' ', '');
                    }
                    return;
                }
                for (var elm in toggleContents) {
                    if (toggleContents[elm].className.indexOf(' ' + args.hideClass + ' ') < 0) {
                        toggleContents[elm].className += (' ' + args.hideClass + ' ');
                    }
                }
                for (var elm in toggleContents) {
                    if (toggleContents[elm].className.indexOf(' ' + args.showClass + ' ') > 0) {
                        toggleContents[elm].className = toggleContents[elm].className.replace(' ' + args.showClass + ' ', '');
                    }
                }
                return;
            }

            if (!toggleContentsArrayFlag) {
                if (toggleContents.className.indexOf(' ' + args.showClass + ' ') < 0) {
                    toggleContents.className += (' ' + args.showClass + ' ');
                }
                if (toggleContents.className.indexOf(' ' + args.hideClass + ' ') > 0) {
                    toggleContents.className = toggleContents.className.replace(' ' + args.hideClass + ' ', '');
                }
                return;
            }
            for (elm in toggleContents) {
                if (elm.className.indexOf(' ' + args.showClass + ' ') < 0) {
                    elm.className += (' ' + args.showClass + ' ');
                }
            }
            for (elm in toggleContents) {
                if (elm.className.indexOf(' ' + args.hideClass + ' ') > 0) {
                    elm.className = elm.className.replace(' ' + args.hideClass + ' ', '');
                }
            }
            return;
        }

        function eventFunc() {
            toggleEvent.addEventListener(eventType, function () {
                flag = (flag) ? false : true;
                toggleFunc();
                toggleCallback();
            }, false);
        }

        function init() {
            getToggleContents();
            eventFunc();
            toggleFunc();
            initCallback();
        }

        init();
    }
    HACKLEBERRY.toggle = toggle;
})(HACKLEBERRY || (HACKLEBERRY = {}));
