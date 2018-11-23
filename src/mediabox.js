(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.MediaBox = factory();
    }
}(this, function () {
    "use strict";

    var MediaBox = function (element, params) {
        var default_params = { autoplay: '1' },
            params = params || 0;

        if (!this || !(this instanceof MediaBox)) {
            return new MediaBox(element, params);
        }

        if (!element) {
            return false;
        }

        this.params = Object.assign(default_params, params);
        this.selector = element instanceof NodeList ? element : document.querySelectorAll(element);
        this.root     = document.querySelector('body');
        this.run();
    };

    MediaBox.prototype = {
        run: function () {
            Array.prototype.forEach.call(this.selector, function (el) {
                el.addEventListener('click', function (e) {
                    e.preventDefault();

                    var link = this.parseUrl(el.getAttribute('href'));
                    this.render(link);
                    this.events();
                }.bind(this), false);
            }.bind(this));

            this.root.addEventListener('keyup', function (e) {
                if ((e.keyCode || e.which) === 27) {
                    this.close(this.root.querySelector('.mediabox-wrap'));
                }
            }.bind(this), false);
        },
        template: function (s, d) {
            var p;

            for (p in d) {
                if (d.hasOwnProperty(p)) {
                    s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
                }
            }
            return s;
        },
        parseUrl: function (url) {
            var service = {},
                matches;

            if (matches = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)) {
                service.provider = "youtube";
                service.id       = matches[2];
            } else if (matches = url.match(/https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/)) {
                service.provider = "vimeo";
                service.id       = matches[3];
            } else {
                service.provider = "Unknown";
                service.id       = '';
            }

            return service;
        },
        render: function (service) {
            var embedLink,
                lightbox,
                urlParams;

            if (service.provider === 'youtube') {
                embedLink = 'https://www.youtube.com/embed/' + service.id;
            } else if (service.provider === 'vimeo') {
                embedLink = 'https://player.vimeo.com/video/' + service.id;
            } else {
                throw new Error("Invalid video URL");
            }

            urlParams = this.serialize(this.params);

            lightbox = this.template(
                '<div class="mediabox-wrap" role="dialog" aria-hidden="false"><div class="mediabox-content" role="document" tabindex="0"><span id="mediabox-esc" class="mediabox-close" aria-label="close" tabindex="1"></span><iframe src="{embed}{params}" frameborder="0" allowfullscreen></iframe></div></div>', {
                    embed: embedLink,
                    params: urlParams
                });

            this.lastFocusElement = document.activeElement;
            this.root.insertAdjacentHTML('beforeend', lightbox);
            document.body.classList.add('stop-scroll');
        },
        events: function () {
            var wrapper = document.querySelector('.mediabox-wrap');
            var content = document.querySelector('.mediabox-content');

            wrapper.addEventListener('click', function (e) {
                if (e.target && e.target.nodeName === 'SPAN' && e.target.className === 'mediabox-close' || e.target.nodeName === 'DIV' && e.target.className === 'mediabox-wrap' || (e.target.className === 'mediabox-content' && e.target.nodeName !== 'IFRAME')) {
                    this.close(wrapper);
                }
            }.bind(this), false);

            document.addEventListener('focus', function(e) {
                if (content && !content.contains(e.target)) {
                    e.stopPropagation();
                    content.focus();
                }
            }, true);

            content.addEventListener('keypress', function(e) {
                if (e.keyCode === 13) {
                    this.close(wrapper);
                }
            }.bind(this), false);
        },
        close: function (el) {
            if (el === null) return true;
            var timer = null;

            if (timer) {
                clearTimeout(timer);
            }

            el.classList.add('mediabox-hide');

            timer = setTimeout(function() {
                var el = document.querySelector('.mediabox-wrap');
                if (el !== null) {
                    document.body.classList.remove('stop-scroll');
                    this.root.removeChild(el);
                    this.lastFocusElement.focus();
                }
            }.bind(this), 500);
        },
        serialize: function (obj) {
            return '?'+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
        }
    };

    return MediaBox;
}));

/**
 * Object.assign polyfill for IE support
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
 */
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
                }
            }
            }
        }
        return to;
        },
        writable: true,
        configurable: true
    });
}