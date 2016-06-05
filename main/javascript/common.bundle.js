webpackJsonp([11], [
    /* 0 */
    /***/ function (module, exports, __webpack_require__) {

        __webpack_require__(1);
        __webpack_require__(47);
        __webpack_require__(18);
        __webpack_require__(68);
        module.exports = __webpack_require__(43);


        /***/
    },
    /* 1 */
    /***/ function (module, exports, __webpack_require__) {

        __webpack_require__(2);
        __webpack_require__(6);

        /***/
    },
    /* 2 */
    /***/ function (module, exports, __webpack_require__) {

        // style-loader: Adds some css to the DOM by adding a <style> tag

        // load the styles
        var content = __webpack_require__(3);
        if (typeof content === 'string') content = [[module.id, content, '']];
        // add the styles to the DOM
        var update = __webpack_require__(5)(content, {});
        if (content.locals) module.exports = content.locals;
        // Hot Module Replacement
        if (false) {
            // When the styles change, update the <style> tags
            if (!content.locals) {
                module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/sass-loader/index.js!./node_modules/bootstrap-sass-loader/bootstrap-sass-styles.loader.js!./bootstrap-sass.config.js", function () {
                    var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/sass-loader/index.js!./node_modules/bootstrap-sass-loader/bootstrap-sass-styles.loader.js!./bootstrap-sass.config.js");
                    if (typeof newContent === 'string') newContent = [[module.id, newContent, '']];
                    update(newContent);
                });
            }
            // When the module is disposed, remove the <style> tags
            module.hot.dispose(function () {
                update();
            });
        }

        /***/
    },
    /* 3 */
    /***/ function (module, exports, __webpack_require__) {

        exports = module.exports = __webpack_require__(4)();
        // imports


        // module
        exports.push([module.id, "", ""]);

        // exports


        /***/
    },
    /* 4 */
    /***/ function (module, exports) {

        /*
         MIT License http://www.opensource.org/licenses/mit-license.php
         Author Tobias Koppers @sokra
         */
        // css base code, injected by the css-loader
        "use strict";

        module.exports = function () {
            var list = [];

            // return the list of modules as css string
            list.toString = function toString() {
                var result = [];
                for (var i = 0; i < this.length; i++) {
                    var item = this[i];
                    if (item[2]) {
                        result.push("@media " + item[2] + "{" + item[1] + "}");
                    } else {
                        result.push(item[1]);
                    }
                }
                return result.join("");
            };

            // import a list of modules into the list
            list.i = function (modules, mediaQuery) {
                if (typeof modules === "string") modules = [[null, modules, ""]];
                var alreadyImportedModules = {};
                for (var i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    if (typeof id === "number") alreadyImportedModules[id] = true;
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    // skip already imported module
                    // this implementation is not 100% perfect for weird media query combinations
                    //  when a module is imported multiple times with different media queries.
                    //  I hope this will never occur (Hey this way we have smaller bundles)
                    if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
                        if (mediaQuery && !item[2]) {
                            item[2] = mediaQuery;
                        } else if (mediaQuery) {
                            item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
                        }
                        list.push(item);
                    }
                }
            };
            return list;
        };

        /***/
    },
    /* 5 */
    /***/ function (module, exports, __webpack_require__) {

        /*
         MIT License http://www.opensource.org/licenses/mit-license.php
         Author Tobias Koppers @sokra
         */
        var stylesInDom = {},
            memoize = function (fn) {
                var memo;
                return function () {
                    if (typeof memo === "undefined") memo = fn.apply(this, arguments);
                    return memo;
                };
            },
            isOldIE = memoize(function () {
                return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
            }),
            getHeadElement = memoize(function () {
                return document.head || document.getElementsByTagName("head")[0];
            }),
            singletonElement = null,
            singletonCounter = 0;

        module.exports = function (list, options) {
            if (false) {
                if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
            }

            options = options || {};
            // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
            // tags it will allow on a page
            if (typeof options.singleton === "undefined") options.singleton = isOldIE();

            var styles = listToStyles(list);
            addStylesToDom(styles, options);

            return function update(newList) {
                var mayRemove = [];
                for (var i = 0; i < styles.length; i++) {
                    var item = styles[i];
                    var domStyle = stylesInDom[item.id];
                    domStyle.refs--;
                    mayRemove.push(domStyle);
                }
                if (newList) {
                    var newStyles = listToStyles(newList);
                    addStylesToDom(newStyles, options);
                }
                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];
                    if (domStyle.refs === 0) {
                        for (var j = 0; j < domStyle.parts.length; j++)
                            domStyle.parts[j]();
                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        }

        function addStylesToDom(styles, options) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i];
                var domStyle = stylesInDom[item.id];
                if (domStyle) {
                    domStyle.refs++;
                    for (var j = 0; j < domStyle.parts.length; j++) {
                        domStyle.parts[j](item.parts[j]);
                    }
                    for (; j < item.parts.length; j++) {
                        domStyle.parts.push(addStyle(item.parts[j], options));
                    }
                } else {
                    var parts = [];
                    for (var j = 0; j < item.parts.length; j++) {
                        parts.push(addStyle(item.parts[j], options));
                    }
                    stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
                }
            }
        }

        function listToStyles(list) {
            var styles = [];
            var newStyles = {};
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var id = item[0];
                var css = item[1];
                var media = item[2];
                var sourceMap = item[3];
                var part = {css: css, media: media, sourceMap: sourceMap};
                if (!newStyles[id])
                    styles.push(newStyles[id] = {id: id, parts: [part]});
                else
                    newStyles[id].parts.push(part);
            }
            return styles;
        }

        function createStyleElement() {
            var styleElement = document.createElement("style");
            var head = getHeadElement();
            styleElement.type = "text/css";
            head.appendChild(styleElement);
            return styleElement;
        }

        function createLinkElement() {
            var linkElement = document.createElement("link");
            var head = getHeadElement();
            linkElement.rel = "stylesheet";
            head.appendChild(linkElement);
            return linkElement;
        }

        function addStyle(obj, options) {
            var styleElement, update, remove;

            if (options.singleton) {
                var styleIndex = singletonCounter++;
                styleElement = singletonElement || (singletonElement = createStyleElement());
                update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
                remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
            } else if (obj.sourceMap &&
                typeof URL === "function" &&
                typeof URL.createObjectURL === "function" &&
                typeof URL.revokeObjectURL === "function" &&
                typeof Blob === "function" &&
                typeof btoa === "function") {
                styleElement = createLinkElement();
                update = updateLink.bind(null, styleElement);
                remove = function () {
                    styleElement.parentNode.removeChild(styleElement);
                    if (styleElement.href)
                        URL.revokeObjectURL(styleElement.href);
                };
            } else {
                styleElement = createStyleElement();
                update = applyToTag.bind(null, styleElement);
                remove = function () {
                    styleElement.parentNode.removeChild(styleElement);
                };
            }

            update(obj);

            return function updateStyle(newObj) {
                if (newObj) {
                    if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
                        return;
                    update(obj = newObj);
                } else {
                    remove();
                }
            };
        }

        var replaceText = (function () {
            var textStore = [];

            return function (index, replacement) {
                textStore[index] = replacement;
                return textStore.filter(Boolean).join('\n');
            };
        })();

        function applyToSingletonTag(styleElement, index, remove, obj) {
            var css = remove ? "" : obj.css;

            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = replaceText(index, css);
            } else {
                var cssNode = document.createTextNode(css);
                var childNodes = styleElement.childNodes;
                if (childNodes[index]) styleElement.removeChild(childNodes[index]);
                if (childNodes.length) {
                    styleElement.insertBefore(cssNode, childNodes[index]);
                } else {
                    styleElement.appendChild(cssNode);
                }
            }
        }

        function applyToTag(styleElement, obj) {
            var css = obj.css;
            var media = obj.media;
            var sourceMap = obj.sourceMap;

            if (media) {
                styleElement.setAttribute("media", media)
            }

            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = css;
            } else {
                while (styleElement.firstChild) {
                    styleElement.removeChild(styleElement.firstChild);
                }
                styleElement.appendChild(document.createTextNode(css));
            }
        }

        function updateLink(linkElement, obj) {
            var css = obj.css;
            var media = obj.media;
            var sourceMap = obj.sourceMap;

            if (sourceMap) {
                // http://stackoverflow.com/a/26603875
                css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
            }

            var blob = new Blob([css], {type: "text/css"});

            var oldSrc = linkElement.href;

            linkElement.href = URL.createObjectURL(blob);

            if (oldSrc)
                URL.revokeObjectURL(oldSrc);
        }


        /***/
    },
    /* 6 */
    /***/ function (module, exports, __webpack_require__) {

        __webpack_require__(7);
        __webpack_require__(9);
        __webpack_require__(10);
        __webpack_require__(11);
        __webpack_require__(12);
        __webpack_require__(13);
        __webpack_require__(14);
        __webpack_require__(15);
        __webpack_require__(16);
        __webpack_require__(17);

        /***/
    },
    /* 7 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (jQuery) {/* ========================================================================
         * Bootstrap: transition.js v3.3.5
         * http://getbootstrap.com/javascript/#transitions
         * ========================================================================
         * Copyright 2011-2015 Twitter, Inc.
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         * ======================================================================== */

            'use strict';

            +(function ($) {
                'use strict';

                // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
                // ============================================================

                function transitionEnd() {
                    var el = document.createElement('bootstrap');

                    var transEndEventNames = {
                        WebkitTransition: 'webkitTransitionEnd',
                        MozTransition: 'transitionend',
                        OTransition: 'oTransitionEnd otransitionend',
                        transition: 'transitionend'
                    };

                    for (var name in transEndEventNames) {
                        if (el.style[name] !== undefined) {
                            return {end: transEndEventNames[name]};
                        }
                    }

                    return false; // explicit for ie8 (  ._.)
                }

                // http://blog.alexmaccaw.com/css-transitions
                $.fn.emulateTransitionEnd = function (duration) {
                    var called = false;
                    var $el = this;
                    $(this).one('bsTransitionEnd', function () {
                        called = true;
                    });
                    var callback = function callback() {
                        if (!called) $($el).trigger($.support.transition.end);
                    };
                    setTimeout(callback, duration);
                    return this;
                };

                $(function () {
                    $.support.transition = transitionEnd();

                    if (!$.support.transition) return;

                    $.event.special.bsTransitionEnd = {
                        bindType: $.support.transition.end,
                        delegateType: $.support.transition.end,
                        handle: function handle(e) {
                            if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
                        }
                    };
                });
            })(jQuery);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 8 */,
    /* 9 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (jQuery) {/* ========================================================================
         * Bootstrap: alert.js v3.3.5
         * http://getbootstrap.com/javascript/#alerts
         * ========================================================================
         * Copyright 2011-2015 Twitter, Inc.
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         * ======================================================================== */

            'use strict';

            +(function ($) {
                'use strict';

                // ALERT CLASS DEFINITION
                // ======================

                var dismiss = '[data-dismiss="alert"]';
                var Alert = function Alert(el) {
                    $(el).on('click', dismiss, this.close);
                };

                Alert.VERSION = '3.3.5';

                Alert.TRANSITION_DURATION = 150;

                Alert.prototype.close = function (e) {
                    var $this = $(this);
                    var selector = $this.attr('data-target');

                    if (!selector) {
                        selector = $this.attr('href');
                        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
                    }

                    var $parent = $(selector);

                    if (e) e.preventDefault();

                    if (!$parent.length) {
                        $parent = $this.closest('.alert');
                    }

                    $parent.trigger(e = $.Event('close.bs.alert'));

                    if (e.isDefaultPrevented()) return;

                    $parent.removeClass('in');

                    function removeElement() {
                        // detach from parent, fire event then clean up data
                        $parent.detach().trigger('closed.bs.alert').remove();
                    }

                    $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
                };

                // ALERT PLUGIN DEFINITION
                // =======================

                function Plugin(option) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data('bs.alert');

                        if (!data) $this.data('bs.alert', data = new Alert(this));
                        if (typeof option == 'string') data[option].call($this);
                    });
                }

                var old = $.fn.alert;

                $.fn.alert = Plugin;
                $.fn.alert.Constructor = Alert;

                // ALERT NO CONFLICT
                // =================

                $.fn.alert.noConflict = function () {
                    $.fn.alert = old;
                    return this;
                };

                // ALERT DATA-API
                // ==============

                $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
            })(jQuery);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 10 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (jQuery) {/* ========================================================================
         * Bootstrap: button.js v3.3.5
         * http://getbootstrap.com/javascript/#buttons
         * ========================================================================
         * Copyright 2011-2015 Twitter, Inc.
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         * ======================================================================== */

            'use strict';

            +(function ($) {
                'use strict';

                // BUTTON PUBLIC CLASS DEFINITION
                // ==============================

                var Button = function Button(element, options) {
                    this.$element = $(element);
                    this.options = $.extend({}, Button.DEFAULTS, options);
                    this.isLoading = false;
                };

                Button.VERSION = '3.3.5';

                Button.DEFAULTS = {
                    loadingText: 'loading...'
                };

                Button.prototype.setState = function (state) {
                    var d = 'disabled';
                    var $el = this.$element;
                    var val = $el.is('input') ? 'val' : 'html';
                    var data = $el.data();

                    state += 'Text';

                    if (data.resetText == null) $el.data('resetText', $el[val]());

                    // push to event loop to allow forms to submit
                    setTimeout($.proxy(function () {
                        $el[val](data[state] == null ? this.options[state] : data[state]);

                        if (state == 'loadingText') {
                            this.isLoading = true;
                            $el.addClass(d).attr(d, d);
                        } else if (this.isLoading) {
                            this.isLoading = false;
                            $el.removeClass(d).removeAttr(d);
                        }
                    }, this), 0);
                };

                Button.prototype.toggle = function () {
                    var changed = true;
                    var $parent = this.$element.closest('[data-toggle="buttons"]');

                    if ($parent.length) {
                        var $input = this.$element.find('input');
                        if ($input.prop('type') == 'radio') {
                            if ($input.prop('checked')) changed = false;
                            $parent.find('.active').removeClass('active');
                            this.$element.addClass('active');
                        } else if ($input.prop('type') == 'checkbox') {
                            if ($input.prop('checked') !== this.$element.hasClass('active')) changed = false;
                            this.$element.toggleClass('active');
                        }
                        $input.prop('checked', this.$element.hasClass('active'));
                        if (changed) $input.trigger('change');
                    } else {
                        this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
                        this.$element.toggleClass('active');
                    }
                };

                // BUTTON PLUGIN DEFINITION
                // ========================

                function Plugin(option) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data('bs.button');
                        var options = typeof option == 'object' && option;

                        if (!data) $this.data('bs.button', data = new Button(this, options));

                        if (option == 'toggle') data.toggle(); else if (option) data.setState(option);
                    });
                }

                var old = $.fn.button;

                $.fn.button = Plugin;
                $.fn.button.Constructor = Button;

                // BUTTON NO CONFLICT
                // ==================

                $.fn.button.noConflict = function () {
                    $.fn.button = old;
                    return this;
                };

                // BUTTON DATA-API
                // ===============

                $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
                    var $btn = $(e.target);
                    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn');
                    Plugin.call($btn, 'toggle');
                    if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault();
                }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
                    $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
                });
            })(jQuery);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 11 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (jQuery) {/* ========================================================================
         * Bootstrap: dropdown.js v3.3.5
         * http://getbootstrap.com/javascript/#dropdowns
         * ========================================================================
         * Copyright 2011-2015 Twitter, Inc.
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         * ======================================================================== */

            'use strict';

            +(function ($) {
                'use strict';

                // DROPDOWN CLASS DEFINITION
                // =========================

                var backdrop = '.dropdown-backdrop';
                var toggle = '[data-toggle="dropdown"]';
                var Dropdown = function Dropdown(element) {
                    $(element).on('click.bs.dropdown', this.toggle);
                };

                Dropdown.VERSION = '3.3.5';

                function getParent($this) {
                    var selector = $this.attr('data-target');

                    if (!selector) {
                        selector = $this.attr('href');
                        selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
                    }

                    var $parent = selector && $(selector);

                    return $parent && $parent.length ? $parent : $this.parent();
                }

                function clearMenus(e) {
                    if (e && e.which === 3) return;
                    $(backdrop).remove();
                    $(toggle).each(function () {
                        var $this = $(this);
                        var $parent = getParent($this);
                        var relatedTarget = {relatedTarget: this};

                        if (!$parent.hasClass('open')) return;

                        if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;

                        $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));

                        if (e.isDefaultPrevented()) return;

                        $this.attr('aria-expanded', 'false');
                        $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
                    });
                }

                Dropdown.prototype.toggle = function (e) {
                    var $this = $(this);

                    if ($this.is('.disabled, :disabled')) return;

                    var $parent = getParent($this);
                    var isActive = $parent.hasClass('open');

                    clearMenus();

                    if (!isActive) {
                        if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                            // if mobile we use a backdrop because click events don't delegate
                            $(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click', clearMenus);
                        }

                        var relatedTarget = {relatedTarget: this};
                        $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));

                        if (e.isDefaultPrevented()) return;

                        $this.trigger('focus').attr('aria-expanded', 'true');

                        $parent.toggleClass('open').trigger('shown.bs.dropdown', relatedTarget);
                    }

                    return false;
                };

                Dropdown.prototype.keydown = function (e) {
                    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;

                    var $this = $(this);

                    e.preventDefault();
                    e.stopPropagation();

                    if ($this.is('.disabled, :disabled')) return;

                    var $parent = getParent($this);
                    var isActive = $parent.hasClass('open');

                    if (!isActive && e.which != 27 || isActive && e.which == 27) {
                        if (e.which == 27) $parent.find(toggle).trigger('focus');
                        return $this.trigger('click');
                    }

                    var desc = ' li:not(.disabled):visible a';
                    var $items = $parent.find('.dropdown-menu' + desc);

                    if (!$items.length) return;

                    var index = $items.index(e.target);

                    if (e.which == 38 && index > 0) index--; // up
                    if (e.which == 40 && index < $items.length - 1) index++; // down
                    if (!~index) index = 0;

                    $items.eq(index).trigger('focus');
                };

                // DROPDOWN PLUGIN DEFINITION
                // ==========================

                function Plugin(option) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data('bs.dropdown');

                        if (!data) $this.data('bs.dropdown', data = new Dropdown(this));
                        if (typeof option == 'string') data[option].call($this);
                    });
                }

                var old = $.fn.dropdown;

                $.fn.dropdown = Plugin;
                $.fn.dropdown.Constructor = Dropdown;

                // DROPDOWN NO CONFLICT
                // ====================

                $.fn.dropdown.noConflict = function () {
                    $.fn.dropdown = old;
                    return this;
                };

                // APPLY TO STANDARD DROPDOWN ELEMENTS
                // ===================================

                $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
                    e.stopPropagation();
                }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown);
            })(jQuery);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 12 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (jQuery) {/* ========================================================================
         * Bootstrap: modal.js v3.3.5
         * http://getbootstrap.com/javascript/#modals
         * ========================================================================
         * Copyright 2011-2015 Twitter, Inc.
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         * ======================================================================== */

            'use strict';

            +(function ($) {
                'use strict';

                // MODAL CLASS DEFINITION
                // ======================

                var Modal = function Modal(element, options) {
                    this.options = options;
                    this.$body = $(document.body);
                    this.$element = $(element);
                    this.$dialog = this.$element.find('.modal-dialog');
                    this.$backdrop = null;
                    this.isShown = null;
                    this.originalBodyPad = null;
                    this.scrollbarWidth = 0;
                    this.ignoreBackdropClick = false;

                    if (this.options.remote) {
                        this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
                            this.$element.trigger('loaded.bs.modal');
                        }, this));
                    }
                };

                Modal.VERSION = '3.3.5';

                Modal.TRANSITION_DURATION = 300;
                Modal.BACKDROP_TRANSITION_DURATION = 150;

                Modal.DEFAULTS = {
                    backdrop: true,
                    keyboard: true,
                    show: true
                };

                Modal.prototype.toggle = function (_relatedTarget) {
                    return this.isShown ? this.hide() : this.show(_relatedTarget);
                };

                Modal.prototype.show = function (_relatedTarget) {
                    var that = this;
                    var e = $.Event('show.bs.modal', {relatedTarget: _relatedTarget});

                    this.$element.trigger(e);

                    if (this.isShown || e.isDefaultPrevented()) return;

                    this.isShown = true;

                    this.checkScrollbar();
                    this.setScrollbar();
                    this.$body.addClass('modal-open');

                    this.escape();
                    this.resize();

                    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

                    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
                        that.$element.one('mouseup.dismiss.bs.modal', function (e) {
                            if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
                        });
                    });

                    this.backdrop(function () {
                        var transition = $.support.transition && that.$element.hasClass('fade');

                        if (!that.$element.parent().length) {
                            that.$element.appendTo(that.$body); // don't move modals dom position
                        }

                        that.$element.show().scrollTop(0);

                        that.adjustDialog();

                        if (transition) {
                            that.$element[0].offsetWidth; // force reflow
                        }

                        that.$element.addClass('in');

                        that.enforceFocus();

                        var e = $.Event('shown.bs.modal', {relatedTarget: _relatedTarget});

                        transition ? that.$dialog // wait for modal to slide in
                            .one('bsTransitionEnd', function () {
                                that.$element.trigger('focus').trigger(e);
                            }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
                    });
                };

                Modal.prototype.hide = function (e) {
                    if (e) e.preventDefault();

                    e = $.Event('hide.bs.modal');

                    this.$element.trigger(e);

                    if (!this.isShown || e.isDefaultPrevented()) return;

                    this.isShown = false;

                    this.escape();
                    this.resize();

                    $(document).off('focusin.bs.modal');

                    this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');

                    this.$dialog.off('mousedown.dismiss.bs.modal');

                    $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
                };

                Modal.prototype.enforceFocus = function () {
                    $(document).off('focusin.bs.modal') // guard against infinite focus loop
                        .on('focusin.bs.modal', $.proxy(function (e) {
                            if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                                this.$element.trigger('focus');
                            }
                        }, this));
                };

                Modal.prototype.escape = function () {
                    if (this.isShown && this.options.keyboard) {
                        this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
                            e.which == 27 && this.hide();
                        }, this));
                    } else if (!this.isShown) {
                        this.$element.off('keydown.dismiss.bs.modal');
                    }
                };

                Modal.prototype.resize = function () {
                    if (this.isShown) {
                        $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
                    } else {
                        $(window).off('resize.bs.modal');
                    }
                };

                Modal.prototype.hideModal = function () {
                    var that = this;
                    this.$element.hide();
                    this.backdrop(function () {
                        that.$body.removeClass('modal-open');
                        that.resetAdjustments();
                        that.resetScrollbar();
                        that.$element.trigger('hidden.bs.modal');
                    });
                };

                Modal.prototype.removeBackdrop = function () {
                    this.$backdrop && this.$backdrop.remove();
                    this.$backdrop = null;
                };

                Modal.prototype.backdrop = function (callback) {
                    var that = this;
                    var animate = this.$element.hasClass('fade') ? 'fade' : '';

                    if (this.isShown && this.options.backdrop) {
                        var doAnimate = $.support.transition && animate;

                        this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);

                        this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
                            if (this.ignoreBackdropClick) {
                                this.ignoreBackdropClick = false;
                                return;
                            }
                            if (e.target !== e.currentTarget) return;
                            this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
                        }, this));

                        if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

                        this.$backdrop.addClass('in');

                        if (!callback) return;

                        doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
                    } else if (!this.isShown && this.$backdrop) {
                        this.$backdrop.removeClass('in');

                        var callbackRemove = function callbackRemove() {
                            that.removeBackdrop();
                            callback && callback();
                        };
                        $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
                    } else if (callback) {
                        callback();
                    }
                };

                // these following methods are used to handle overflowing modals

                Modal.prototype.handleUpdate = function () {
                    this.adjustDialog();
                };

                Modal.prototype.adjustDialog = function () {
                    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

                    this.$element.css({
                        paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
                        paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
                    });
                };

                Modal.prototype.resetAdjustments = function () {
                    this.$element.css({
                        paddingLeft: '',
                        paddingRight: ''
                    });
                };

                Modal.prototype.checkScrollbar = function () {
                    var fullWindowWidth = window.innerWidth;
                    if (!fullWindowWidth) {
                        // workaround for missing window.innerWidth in IE8
                        var documentElementRect = document.documentElement.getBoundingClientRect();
                        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
                    }
                    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
                    this.scrollbarWidth = this.measureScrollbar();
                };

                Modal.prototype.setScrollbar = function () {
                    var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
                    this.originalBodyPad = document.body.style.paddingRight || '';
                    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
                };

                Modal.prototype.resetScrollbar = function () {
                    this.$body.css('padding-right', this.originalBodyPad);
                };

                Modal.prototype.measureScrollbar = function () {
                    // thx walsh
                    var scrollDiv = document.createElement('div');
                    scrollDiv.className = 'modal-scrollbar-measure';
                    this.$body.append(scrollDiv);
                    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                    this.$body[0].removeChild(scrollDiv);
                    return scrollbarWidth;
                };

                // MODAL PLUGIN DEFINITION
                // =======================

                function Plugin(option, _relatedTarget) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data('bs.modal');
                        var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);

                        if (!data) $this.data('bs.modal', data = new Modal(this, options));
                        if (typeof option == 'string') data[option](_relatedTarget); else if (options.show) data.show(_relatedTarget);
                    });
                }

                var old = $.fn.modal;

                $.fn.modal = Plugin;
                $.fn.modal.Constructor = Modal;

                // MODAL NO CONFLICT
                // =================

                $.fn.modal.noConflict = function () {
                    $.fn.modal = old;
                    return this;
                };

                // MODAL DATA-API
                // ==============

                $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
                    var $this = $(this);
                    var href = $this.attr('href');
                    var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
                    var option = $target.data('bs.modal') ? 'toggle' : $.extend({remote: !/#/.test(href) && href}, $target.data(), $this.data());

                    if ($this.is('a')) e.preventDefault();

                    $target.one('show.bs.modal', function (showEvent) {
                        if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
                        $target.one('hidden.bs.modal', function () {
                            $this.is(':visible') && $this.trigger('focus');
                        });
                    });
                    Plugin.call($target, option, this);
                });
            })(jQuery);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 13 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (jQuery) {/* ========================================================================
         * Bootstrap: tooltip.js v3.3.5
         * http://getbootstrap.com/javascript/#tooltip
         * Inspired by the original jQuery.tipsy by Jason Frame
         * ========================================================================
         * Copyright 2011-2015 Twitter, Inc.
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         * ======================================================================== */

            'use strict';

            +(function ($) {
                'use strict';

                // TOOLTIP PUBLIC CLASS DEFINITION
                // ===============================

                var Tooltip = function Tooltip(element, options) {
                    this.type = null;
                    this.options = null;
                    this.enabled = null;
                    this.timeout = null;
                    this.hoverState = null;
                    this.$element = null;
                    this.inState = null;

                    this.init('tooltip', element, options);
                };

                Tooltip.VERSION = '3.3.5';

                Tooltip.TRANSITION_DURATION = 150;

                Tooltip.DEFAULTS = {
                    animation: true,
                    placement: 'top',
                    selector: false,
                    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                    trigger: 'hover focus',
                    title: '',
                    delay: 0,
                    html: false,
                    container: false,
                    viewport: {
                        selector: 'body',
                        padding: 0
                    }
                };

                Tooltip.prototype.init = function (type, element, options) {
                    this.enabled = true;
                    this.type = type;
                    this.$element = $(element);
                    this.options = this.getOptions(options);
                    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
                    this.inState = {click: false, hover: false, focus: false};

                    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
                        throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
                    }

                    var triggers = this.options.trigger.split(' ');

                    for (var i = triggers.length; i--;) {
                        var trigger = triggers[i];

                        if (trigger == 'click') {
                            this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
                        } else if (trigger != 'manual') {
                            var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
                            var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

                            this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
                            this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
                        }
                    }

                    this.options.selector ? this._options = $.extend({}, this.options, {
                        trigger: 'manual',
                        selector: ''
                    }) : this.fixTitle();
                };

                Tooltip.prototype.getDefaults = function () {
                    return Tooltip.DEFAULTS;
                };

                Tooltip.prototype.getOptions = function (options) {
                    options = $.extend({}, this.getDefaults(), this.$element.data(), options);

                    if (options.delay && typeof options.delay == 'number') {
                        options.delay = {
                            show: options.delay,
                            hide: options.delay
                        };
                    }

                    return options;
                };

                Tooltip.prototype.getDelegateOptions = function () {
                    var options = {};
                    var defaults = this.getDefaults();

                    this._options && $.each(this._options, function (key, value) {
                        if (defaults[key] != value) options[key] = value;
                    });

                    return options;
                };

                Tooltip.prototype.enter = function (obj) {
                    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

                    if (!self) {
                        self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
                        $(obj.currentTarget).data('bs.' + this.type, self);
                    }

                    if (obj instanceof $.Event) {
                        self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true;
                    }

                    if (self.tip().hasClass('in') || self.hoverState == 'in') {
                        self.hoverState = 'in';
                        return;
                    }

                    clearTimeout(self.timeout);

                    self.hoverState = 'in';

                    if (!self.options.delay || !self.options.delay.show) return self.show();

                    self.timeout = setTimeout(function () {
                        if (self.hoverState == 'in') self.show();
                    }, self.options.delay.show);
                };

                Tooltip.prototype.isInStateTrue = function () {
                    for (var key in this.inState) {
                        if (this.inState[key]) return true;
                    }

                    return false;
                };

                Tooltip.prototype.leave = function (obj) {
                    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

                    if (!self) {
                        self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
                        $(obj.currentTarget).data('bs.' + this.type, self);
                    }

                    if (obj instanceof $.Event) {
                        self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false;
                    }

                    if (self.isInStateTrue()) return;

                    clearTimeout(self.timeout);

                    self.hoverState = 'out';

                    if (!self.options.delay || !self.options.delay.hide) return self.hide();

                    self.timeout = setTimeout(function () {
                        if (self.hoverState == 'out') self.hide();
                    }, self.options.delay.hide);
                };

                Tooltip.prototype.show = function () {
                    var e = $.Event('show.bs.' + this.type);

                    if (this.hasContent() && this.enabled) {
                        this.$element.trigger(e);

                        var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                        if (e.isDefaultPrevented() || !inDom) return;
                        var that = this;

                        var $tip = this.tip();

                        var tipId = this.getUID(this.type);

                        this.setContent();
                        $tip.attr('id', tipId);
                        this.$element.attr('aria-describedby', tipId);

                        if (this.options.animation) $tip.addClass('fade');

                        var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;

                        var autoToken = /\s?auto?\s?/i;
                        var autoPlace = autoToken.test(placement);
                        if (autoPlace) placement = placement.replace(autoToken, '') || 'top';

                        $tip.detach().css({
                            top: 0,
                            left: 0,
                            display: 'block'
                        }).addClass(placement).data('bs.' + this.type, this);

                        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
                        this.$element.trigger('inserted.bs.' + this.type);

                        var pos = this.getPosition();
                        var actualWidth = $tip[0].offsetWidth;
                        var actualHeight = $tip[0].offsetHeight;

                        if (autoPlace) {
                            var orgPlacement = placement;
                            var viewportDim = this.getPosition(this.$viewport);

                            placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement;

                            $tip.removeClass(orgPlacement).addClass(placement);
                        }

                        var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

                        this.applyPlacement(calculatedOffset, placement);

                        var complete = function complete() {
                            var prevHoverState = that.hoverState;
                            that.$element.trigger('shown.bs.' + that.type);
                            that.hoverState = null;

                            if (prevHoverState == 'out') that.leave(that);
                        };

                        $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
                    }
                };

                Tooltip.prototype.applyPlacement = function (offset, placement) {
                    var $tip = this.tip();
                    var width = $tip[0].offsetWidth;
                    var height = $tip[0].offsetHeight;

                    // manually read margins because getBoundingClientRect includes difference
                    var marginTop = parseInt($tip.css('margin-top'), 10);
                    var marginLeft = parseInt($tip.css('margin-left'), 10);

                    // we must check for NaN for ie 8/9
                    if (isNaN(marginTop)) marginTop = 0;
                    if (isNaN(marginLeft)) marginLeft = 0;

                    offset.top += marginTop;
                    offset.left += marginLeft;

                    // $.fn.offset doesn't round pixel values
                    // so we use setOffset directly with our own function B-0
                    $.offset.setOffset($tip[0], $.extend({
                        using: function using(props) {
                            $tip.css({
                                top: Math.round(props.top),
                                left: Math.round(props.left)
                            });
                        }
                    }, offset), 0);

                    $tip.addClass('in');

                    // check to see if placing tip in new offset caused the tip to resize itself
                    var actualWidth = $tip[0].offsetWidth;
                    var actualHeight = $tip[0].offsetHeight;

                    if (placement == 'top' && actualHeight != height) {
                        offset.top = offset.top + height - actualHeight;
                    }

                    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);

                    if (delta.left) offset.left += delta.left; else offset.top += delta.top;

                    var isVertical = /top|bottom/.test(placement);
                    var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
                    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';

                    $tip.offset(offset);
                    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
                };

                Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
                    this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '');
                };

                Tooltip.prototype.setContent = function () {
                    var $tip = this.tip();
                    var title = this.getTitle();

                    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
                    $tip.removeClass('fade in top bottom left right');
                };

                Tooltip.prototype.hide = function (callback) {
                    var that = this;
                    var $tip = $(this.$tip);
                    var e = $.Event('hide.bs.' + this.type);

                    function complete() {
                        if (that.hoverState != 'in') $tip.detach();
                        that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
                        callback && callback();
                    }

                    this.$element.trigger(e);

                    if (e.isDefaultPrevented()) return;

                    $tip.removeClass('in');

                    $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();

                    this.hoverState = null;

                    return this;
                };

                Tooltip.prototype.fixTitle = function () {
                    var $e = this.$element;
                    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
                        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
                    }
                };

                Tooltip.prototype.hasContent = function () {
                    return this.getTitle();
                };

                Tooltip.prototype.getPosition = function ($element) {
                    $element = $element || this.$element;

                    var el = $element[0];
                    var isBody = el.tagName == 'BODY';

                    var elRect = el.getBoundingClientRect();
                    if (elRect.width == null) {
                        // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
                        elRect = $.extend({}, elRect, {
                            width: elRect.right - elRect.left,
                            height: elRect.bottom - elRect.top
                        });
                    }
                    var elOffset = isBody ? {top: 0, left: 0} : $element.offset();
                    var scroll = {scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()};
                    var outerDims = isBody ? {width: $(window).width(), height: $(window).height()} : null;

                    return $.extend({}, elRect, scroll, outerDims, elOffset);
                };

                Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
                    return placement == 'bottom' ? {
                        top: pos.top + pos.height,
                        left: pos.left + pos.width / 2 - actualWidth / 2
                    } : placement == 'top' ? {
                        top: pos.top - actualHeight,
                        left: pos.left + pos.width / 2 - actualWidth / 2
                    } : placement == 'left' ? {
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left - actualWidth
                    } :
                        /* placement == 'right' */{
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left + pos.width
                    };
                };

                Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
                    var delta = {top: 0, left: 0};
                    if (!this.$viewport) return delta;

                    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
                    var viewportDimensions = this.getPosition(this.$viewport);

                    if (/right|left/.test(placement)) {
                        var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
                        var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
                        if (topEdgeOffset < viewportDimensions.top) {
                            // top overflow
                            delta.top = viewportDimensions.top - topEdgeOffset;
                        } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
                            // bottom overflow
                            delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
                        }
                    } else {
                        var leftEdgeOffset = pos.left - viewportPadding;
                        var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
                        if (leftEdgeOffset < viewportDimensions.left) {
                            // left overflow
                            delta.left = viewportDimensions.left - leftEdgeOffset;
                        } else if (rightEdgeOffset > viewportDimensions.right) {
                            // right overflow
                            delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
                        }
                    }

                    return delta;
                };

                Tooltip.prototype.getTitle = function () {
                    var title;
                    var $e = this.$element;
                    var o = this.options;

                    title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);

                    return title;
                };

                Tooltip.prototype.getUID = function (prefix) {
                    do prefix += ~~(Math.random() * 1000000); while (document.getElementById(prefix));
                    return prefix;
                };

                Tooltip.prototype.tip = function () {
                    if (!this.$tip) {
                        this.$tip = $(this.options.template);
                        if (this.$tip.length != 1) {
                            throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!');
                        }
                    }
                    return this.$tip;
                };

                Tooltip.prototype.arrow = function () {
                    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
                };

                Tooltip.prototype.enable = function () {
                    this.enabled = true;
                };

                Tooltip.prototype.disable = function () {
                    this.enabled = false;
                };

                Tooltip.prototype.toggleEnabled = function () {
                    this.enabled = !this.enabled;
                };

                Tooltip.prototype.toggle = function (e) {
                    var self = this;
                    if (e) {
                        self = $(e.currentTarget).data('bs.' + this.type);
                        if (!self) {
                            self = new this.constructor(e.currentTarget, this.getDelegateOptions());
                            $(e.currentTarget).data('bs.' + this.type, self);
                        }
                    }

                    if (e) {
                        self.inState.click = !self.inState.click;
                        if (self.isInStateTrue()) self.enter(self); else self.leave(self);
                    } else {
                        self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
                    }
                };

                Tooltip.prototype.destroy = function () {
                    var that = this;
                    clearTimeout(this.timeout);
                    this.hide(function () {
                        that.$element.off('.' + that.type).removeData('bs.' + that.type);
                        if (that.$tip) {
                            that.$tip.detach();
                        }
                        that.$tip = null;
                        that.$arrow = null;
                        that.$viewport = null;
                    });
                };

                // TOOLTIP PLUGIN DEFINITION
                // =========================

                function Plugin(option) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data('bs.tooltip');
                        var options = typeof option == 'object' && option;

                        if (!data && /destroy|hide/.test(option)) return;
                        if (!data) $this.data('bs.tooltip', data = new Tooltip(this, options));
                        if (typeof option == 'string') data[option]();
                    });
                }

                var old = $.fn.tooltip;

                $.fn.tooltip = Plugin;
                $.fn.tooltip.Constructor = Tooltip;

                // TOOLTIP NO CONFLICT
                // ===================

                $.fn.tooltip.noConflict = function () {
                    $.fn.tooltip = old;
                    return this;
                };
            })(jQuery);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 14 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (jQuery) {/* ========================================================================
         * Bootstrap: popover.js v3.3.5
         * http://getbootstrap.com/javascript/#popovers
         * ========================================================================
         * Copyright 2011-2015 Twitter, Inc.
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         * ======================================================================== */

            'use strict';

            +(function ($) {
                'use strict';

                // POPOVER PUBLIC CLASS DEFINITION
                // ===============================

                var Popover = function Popover(element, options) {
                    this.init('popover', element, options);
                };

                if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');

                Popover.VERSION = '3.3.5';

                Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
                    placement: 'right',
                    trigger: 'click',
                    content: '',
                    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
                });

                // NOTE: POPOVER EXTENDS tooltip.js
                // ================================

                Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);

                Popover.prototype.constructor = Popover;

                Popover.prototype.getDefaults = function () {
                    return Popover.DEFAULTS;
                };

                Popover.prototype.setContent = function () {
                    var $tip = this.tip();
                    var title = this.getTitle();
                    var content = this.getContent();

                    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
                    $tip.find('.popover-content').children().detach().end()[// we use append for html objects to maintain js events
                        this.options.html ? typeof content == 'string' ? 'html' : 'append' : 'text'](content);

                    $tip.removeClass('fade top bottom left right in');

                    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
                    // this manually by checking the contents.
                    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
                };

                Popover.prototype.hasContent = function () {
                    return this.getTitle() || this.getContent();
                };

                Popover.prototype.getContent = function () {
                    var $e = this.$element;
                    var o = this.options;

                    return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
                };

                Popover.prototype.arrow = function () {
                    return this.$arrow = this.$arrow || this.tip().find('.arrow');
                };

                // POPOVER PLUGIN DEFINITION
                // =========================

                function Plugin(option) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data('bs.popover');
                        var options = typeof option == 'object' && option;

                        if (!data && /destroy|hide/.test(option)) return;
                        if (!data) $this.data('bs.popover', data = new Popover(this, options));
                        if (typeof option == 'string') data[option]();
                    });
                }

                var old = $.fn.popover;

                $.fn.popover = Plugin;
                $.fn.popover.Constructor = Popover;

                // POPOVER NO CONFLICT
                // ===================

                $.fn.popover.noConflict = function () {
                    $.fn.popover = old;
                    return this;
                };
            })(jQuery);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 15 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (jQuery) {/* ========================================================================
         * Bootstrap: scrollspy.js v3.3.5
         * http://getbootstrap.com/javascript/#scrollspy
         * ========================================================================
         * Copyright 2011-2015 Twitter, Inc.
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         * ======================================================================== */

            'use strict';

            +(function ($) {
                'use strict';

                // SCROLLSPY CLASS DEFINITION
                // ==========================

                function ScrollSpy(element, options) {
                    this.$body = $(document.body);
                    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
                    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
                    this.selector = (this.options.target || '') + ' .nav li > a';
                    this.offsets = [];
                    this.targets = [];
                    this.activeTarget = null;
                    this.scrollHeight = 0;

                    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this));
                    this.refresh();
                    this.process();
                }

                ScrollSpy.VERSION = '3.3.5';

                ScrollSpy.DEFAULTS = {
                    offset: 10
                };

                ScrollSpy.prototype.getScrollHeight = function () {
                    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
                };

                ScrollSpy.prototype.refresh = function () {
                    var that = this;
                    var offsetMethod = 'offset';
                    var offsetBase = 0;

                    this.offsets = [];
                    this.targets = [];
                    this.scrollHeight = this.getScrollHeight();

                    if (!$.isWindow(this.$scrollElement[0])) {
                        offsetMethod = 'position';
                        offsetBase = this.$scrollElement.scrollTop();
                    }

                    this.$body.find(this.selector).map(function () {
                        var $el = $(this);
                        var href = $el.data('target') || $el.attr('href');
                        var $href = /^#./.test(href) && $(href);

                        return $href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]] || null;
                    }).sort(function (a, b) {
                        return a[0] - b[0];
                    }).each(function () {
                        that.offsets.push(this[0]);
                        that.targets.push(this[1]);
                    });
                };

                ScrollSpy.prototype.process = function () {
                    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
                    var scrollHeight = this.getScrollHeight();
                    var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
                    var offsets = this.offsets;
                    var targets = this.targets;
                    var activeTarget = this.activeTarget;
                    var i;

                    if (this.scrollHeight != scrollHeight) {
                        this.refresh();
                    }

                    if (scrollTop >= maxScroll) {
                        return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
                    }

                    if (activeTarget && scrollTop < offsets[0]) {
                        this.activeTarget = null;
                        return this.clear();
                    }

                    for (i = offsets.length; i--;) {
                        activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
                    }
                };

                ScrollSpy.prototype.activate = function (target) {
                    this.activeTarget = target;

                    this.clear();

                    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';

                    var active = $(selector).parents('li').addClass('active');

                    if (active.parent('.dropdown-menu').length) {
                        active = active.closest('li.dropdown').addClass('active');
                    }

                    active.trigger('activate.bs.scrollspy');
                };

                ScrollSpy.prototype.clear = function () {
                    $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
                };

                // SCROLLSPY PLUGIN DEFINITION
                // ===========================

                function Plugin(option) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data('bs.scrollspy');
                        var options = typeof option == 'object' && option;

                        if (!data) $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
                        if (typeof option == 'string') data[option]();
                    });
                }

                var old = $.fn.scrollspy;

                $.fn.scrollspy = Plugin;
                $.fn.scrollspy.Constructor = ScrollSpy;

                // SCROLLSPY NO CONFLICT
                // =====================

                $.fn.scrollspy.noConflict = function () {
                    $.fn.scrollspy = old;
                    return this;
                };

                // SCROLLSPY DATA-API
                // ==================

                $(window).on('load.bs.scrollspy.data-api', function () {
                    $('[data-spy="scroll"]').each(function () {
                        var $spy = $(this);
                        Plugin.call($spy, $spy.data());
                    });
                });
            })(jQuery);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 16 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (jQuery) {/* ========================================================================
         * Bootstrap: tab.js v3.3.5
         * http://getbootstrap.com/javascript/#tabs
         * ========================================================================
         * Copyright 2011-2015 Twitter, Inc.
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         * ======================================================================== */

            'use strict';

            +(function ($) {
                'use strict';

                // TAB CLASS DEFINITION
                // ====================

                var Tab = function Tab(element) {
                    // jscs:disable requireDollarBeforejQueryAssignment
                    this.element = $(element);
                    // jscs:enable requireDollarBeforejQueryAssignment
                };

                Tab.VERSION = '3.3.5';

                Tab.TRANSITION_DURATION = 150;

                Tab.prototype.show = function () {
                    var $this = this.element;
                    var $ul = $this.closest('ul:not(.dropdown-menu)');
                    var selector = $this.data('target');

                    if (!selector) {
                        selector = $this.attr('href');
                        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
                    }

                    if ($this.parent('li').hasClass('active')) return;

                    var $previous = $ul.find('.active:last a');
                    var hideEvent = $.Event('hide.bs.tab', {
                        relatedTarget: $this[0]
                    });
                    var showEvent = $.Event('show.bs.tab', {
                        relatedTarget: $previous[0]
                    });

                    $previous.trigger(hideEvent);
                    $this.trigger(showEvent);

                    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;

                    var $target = $(selector);

                    this.activate($this.closest('li'), $ul);
                    this.activate($target, $target.parent(), function () {
                        $previous.trigger({
                            type: 'hidden.bs.tab',
                            relatedTarget: $this[0]
                        });
                        $this.trigger({
                            type: 'shown.bs.tab',
                            relatedTarget: $previous[0]
                        });
                    });
                };

                Tab.prototype.activate = function (element, container, callback) {
                    var $active = container.find('> .active');
                    var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);

                    function next() {
                        $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);

                        element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);

                        if (transition) {
                            element[0].offsetWidth; // reflow for transition
                            element.addClass('in');
                        } else {
                            element.removeClass('fade');
                        }

                        if (element.parent('.dropdown-menu').length) {
                            element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
                        }

                        callback && callback();
                    }

                    $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();

                    $active.removeClass('in');
                };

                // TAB PLUGIN DEFINITION
                // =====================

                function Plugin(option) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data('bs.tab');

                        if (!data) $this.data('bs.tab', data = new Tab(this));
                        if (typeof option == 'string') data[option]();
                    });
                }

                var old = $.fn.tab;

                $.fn.tab = Plugin;
                $.fn.tab.Constructor = Tab;

                // TAB NO CONFLICT
                // ===============

                $.fn.tab.noConflict = function () {
                    $.fn.tab = old;
                    return this;
                };

                // TAB DATA-API
                // ============

                var clickHandler = function clickHandler(e) {
                    e.preventDefault();
                    Plugin.call($(this), 'show');
                };

                $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
            })(jQuery);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 17 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (jQuery) {/* ========================================================================
         * Bootstrap: affix.js v3.3.5
         * http://getbootstrap.com/javascript/#affix
         * ========================================================================
         * Copyright 2011-2015 Twitter, Inc.
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         * ======================================================================== */

            'use strict';

            +(function ($) {
                'use strict';

                // AFFIX CLASS DEFINITION
                // ======================

                var Affix = function Affix(element, options) {
                    this.options = $.extend({}, Affix.DEFAULTS, options);

                    this.$target = $(this.options.target).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));

                    this.$element = $(element);
                    this.affixed = null;
                    this.unpin = null;
                    this.pinnedOffset = null;

                    this.checkPosition();
                };

                Affix.VERSION = '3.3.5';

                Affix.RESET = 'affix affix-top affix-bottom';

                Affix.DEFAULTS = {
                    offset: 0,
                    target: window
                };

                Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
                    var scrollTop = this.$target.scrollTop();
                    var position = this.$element.offset();
                    var targetHeight = this.$target.height();

                    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false;

                    if (this.affixed == 'bottom') {
                        if (offsetTop != null) return scrollTop + this.unpin <= position.top ? false : 'bottom';
                        return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : 'bottom';
                    }

                    var initializing = this.affixed == null;
                    var colliderTop = initializing ? scrollTop : position.top;
                    var colliderHeight = initializing ? targetHeight : height;

                    if (offsetTop != null && scrollTop <= offsetTop) return 'top';
                    if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom) return 'bottom';

                    return false;
                };

                Affix.prototype.getPinnedOffset = function () {
                    if (this.pinnedOffset) return this.pinnedOffset;
                    this.$element.removeClass(Affix.RESET).addClass('affix');
                    var scrollTop = this.$target.scrollTop();
                    var position = this.$element.offset();
                    return this.pinnedOffset = position.top - scrollTop;
                };

                Affix.prototype.checkPositionWithEventLoop = function () {
                    setTimeout($.proxy(this.checkPosition, this), 1);
                };

                Affix.prototype.checkPosition = function () {
                    if (!this.$element.is(':visible')) return;

                    var height = this.$element.height();
                    var offset = this.options.offset;
                    var offsetTop = offset.top;
                    var offsetBottom = offset.bottom;
                    var scrollHeight = Math.max($(document).height(), $(document.body).height());

                    if (typeof offset != 'object') offsetBottom = offsetTop = offset;
                    if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element);
                    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element);

                    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);

                    if (this.affixed != affix) {
                        if (this.unpin != null) this.$element.css('top', '');

                        var affixType = 'affix' + (affix ? '-' + affix : '');
                        var e = $.Event(affixType + '.bs.affix');

                        this.$element.trigger(e);

                        if (e.isDefaultPrevented()) return;

                        this.affixed = affix;
                        this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;

                        this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
                    }

                    if (affix == 'bottom') {
                        this.$element.offset({
                            top: scrollHeight - height - offsetBottom
                        });
                    }
                };

                // AFFIX PLUGIN DEFINITION
                // =======================

                function Plugin(option) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data('bs.affix');
                        var options = typeof option == 'object' && option;

                        if (!data) $this.data('bs.affix', data = new Affix(this, options));
                        if (typeof option == 'string') data[option]();
                    });
                }

                var old = $.fn.affix;

                $.fn.affix = Plugin;
                $.fn.affix.Constructor = Affix;

                // AFFIX NO CONFLICT
                // =================

                $.fn.affix.noConflict = function () {
                    $.fn.affix = old;
                    return this;
                };

                // AFFIX DATA-API
                // ==============

                $(window).on('load', function () {
                    $('[data-spy="affix"]').each(function () {
                        var $spy = $(this);
                        var data = $spy.data();

                        data.offset = data.offset || {};

                        if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
                        if (data.offsetTop != null) data.offset.top = data.offsetTop;

                        Plugin.call($spy, data);
                    });
                });
            })(jQuery);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 18 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function ($) {// // 通用變量 - SolidZORO 2014-11-25 11:20:48
            //
            //
            // //浏览器当前窗口可视区域宽度
            // var windows_widnth = $(window).width();
            // //浏览器当前窗口可视区域高度
            // var windows_height = $(window).height();
            // //浏览器当前窗口文档的高度
            // var document_height = $(document).height();
            // //浏览器当前窗口文档body的高度
            // var document_body_height = $(document.body).height();
            // //浏览器当前窗口文档body的总高度 包括border padding margin
            // var document_outer_height = $(document.body).outerHeight(true);
            // //浏览器当前窗口文档对象宽度
            // var document_width = $(document).width();
            // //浏览器当前窗口文档body的高度
            // var document_width = $(document.body).width();
            // //浏览器当前窗口文档body的总宽度 包括border padding m
            // var document_outer_width = $(document.body).outerWidth(true);

            'use strict';

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {'default': obj};
            }

            __webpack_require__(19);

            __webpack_require__(20);

            var _enquire = __webpack_require__(21);

            var _enquire2 = _interopRequireDefault(_enquire);

            var _isotope = __webpack_require__(22);

            var _isotope2 = _interopRequireDefault(_isotope);

            var _screen_variable = __webpack_require__(38);

            var _common = __webpack_require__(39);

            var _common2 = _interopRequireDefault(_common);

            /**
             * Common instance
             * @type {Common}
             */
            var common = new _common2['default']();

            // $("html, body").animate({ scrollTop: 0 });

            $(function () {
                window.scrollTo(0, 0);
            });

            /** 应用下载出初始自定义 scrollbar */
                // $('.app-download').mCustomScrollbar({
                //     axis: 'x',
                //     theme: 'dark-thin',
                //     autoExpandScrollbar: true,
                //     // autoHideScrollbar: true,
                //     advanced: {
                //         autoExpandHorizontalScroll: true
                //     },
                //     mouseWheel: {
                //         enable: true,
                //         axis: 'x',
                //         preventDefault: true,
                //         normalizeDelta: true
                //     },
                //     scrollButtons: {
                //         enable:true
                //     },
                //     // callbacks: {
                //     //     onOverflowX: function() {
                //     //         console.log(this);
                //     //     }
                //     // }
                //     // autoDraggerLength: true
                // });

            $('img.lazy').unveil(200, function () {
                $(this).load(function () {
                    this.style.opacity = 1;
                });
            });

            /** if (廣東電信) 加电信後綴 */
            if (location.href.indexOf('fj189') !== -1) {
                common.fjSuffix();
                $('.saya-header').addClass('fj189');
            }

            /** if(Android 客戶端) 加 Android 後綴 */
            if (location.href.indexOf('client_android') !== -1) {
                common.androidSuffix();
            }

            if (location.href.indexOf('gd10002') !== -1) {
                common.chinanetSuffix();
            }

            /** 初始化 tooltip */
            common.initTooltip($('[data-tooltip="tooltip"]'));

            /** 分享到微信 tooltipsy */
            // common.initWeixinQr();

            /** 文章及论坛内页收藏 */
            // $('body').on('click', '.do-fav', function () {
            //     common.favorite($(this));
            // });

            // 页面加载完成恢复 slider 高度
            // $('.col-full-slide .swiper-container').css('height', 'auto');

            // /** 点赞 */
            // $('body').on('click', '.do-like', function () {
            //     common.like($(this));
            // });

            // /** 点赞和收藏动画 */
            // $('body').on('click', '.do-like, .do-fav, .like-num', function () {
            //     common.animateLikeFavIcon($(this));
            // });

            // /** 收藏过的文章 font-awesome 字体改变 */
            // if ($('.do-fav').hasClass('faved')) {
            //     common.changeFavoriteFont($('.do-fav'));
            // }

            if ($('.is-login .fa-bell-o').length) {
                setInterval(function () {
                    common.getNotifications();
                }, 30000);
            }

            /** 合作伙伴图标动画 */
            $('.partner-list a').hover(function () {
                common.animatePartnerIcon($(this));
            });

            $('.katana-article-tag .share .weixin').popover({
                html: true,
                trigger: 'hover'
            });

            if ($('body').hasClass('katana-specified-tag')) {
                var $sidebar = $('.katana-specified-tag .sidebar');
                _enquire2['default'].register("screen and (min-width: " + _screen_variable.screen_all_min + "px) and (max-width: " + _screen_variable.screen_xs_max + "px)", {
                    match: function match() {
                        $('.katana-specified-tag .main .pages').before($sidebar);
                        $sidebar.find('.stick').removeClass('stick');
                        $sidebar.show();
                    }
                });
            }

            // $(window).resize(function () {
            //     // // 判斷slide是否初始化
            //     // if ($('#slider-swiper').length) {
            //     //     common.adjustSwiperHeight();
            //     // }
            //     common.setGotoBoxPosition();
            // });

            /** 文章标题 top 值改变 */
                // common.changeArticleTitleTop();

                // // 活动用 S
                // function awardsText(time, data, customHtml) {
                //     if (customHtml === undefined) {
                //         customHtml = '';
                //     }

                //     var $likeBox = $('.like-box');
                //     $likeBox.find('.awards').html(data.msg + customHtml);
                //     $likeBox.find('.awards').addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                //         $likeBox.find('.awards').removeClass('animated flipInX');
                //     });

                //     $likeBox.find('.awards-icon').find('i').removeClass().addClass('fa fa-meh-o');

                //     // setTimeout(function () {
                //     //     $likeBox.children('.awards').addClass('animated flipOutX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                //     //         $(this).removeClass('animated flipOutX').text('');
                //     //     });
                //     // }, time);
                // }
                // // 活动用 E

                // 电脑版
            _enquire2['default'].register("screen and (min-width: " + _screen_variable.screen_md_min + "px) and (max-width: " + _screen_variable.screen_md_max + "px)", {

                match: function match() {
                    /** headroom 初始化 */
                    common.headerScrollDesktop();

                    /** jQuery menu aim */
                    common.menuDelay();

                    /** hold住邊欄 */
                    common.stickSidebar();

                    /** 应用信息插入 sidebar 最前 */
                    common.appinfoBeforeArticle();

                    /** 初始化应用下载二维码 */
                    common.initAppDownloadQr();

                    /** 初始化侧边微信微博二维码 */
                    common.initSocialQr();

                    /** 微信二维码初始化 */
                    // common.initWeixinQr();

                    /** ios 专题页侧边栏 */
                    if ($('.body-page').length && $('.stick').length) {
                        common.iosPageScrollpy();
                    }

                    /** 论坛 截圖如果高大於寬，則高寬減半 */
                    $('.katana-topic-detail .topic img').each(function () {
                        if ($(this).height() >= '600' && $(this).width() < $(this).height()) {
                            $(this).css({
                                'width': '48%',
                                'height': 'auto',
                                'transition': 'all 1s'
                            });
                        }
                    });

                    /** 下拉菜单 */
                    $('.saya-header .header-desktop .drop').on('click', function () {
                        $('.drop-menu').toggle();
                    });

                    /** 点击搜索添加or移除 class */
                    $('.saya-header .search .input-search').on('focus', function () {
                        common.addSearchClass();
                    });
                    $('.saya-header .search .input-search').on('blur', function () {
                        common.removeSearchClass();
                    });

                    /** if(首页) 新窗口打开所有链接 */
                    // if ($('body').hasClass('katana-article-index')) {
                    //     $('.saya-container a').attr('target', '_blank');
                    //     $('.saya-container .pages .pagination a').removeAttr('target');
                    // }

                    /** if(分类页) 新窗口打开文章 */
                    // if ($('body').hasClass('katana-article-category')) {
                    //     $('.col-full-list a').attr('target', '_blank');
                    // }
                }
            });

            /** 手机版 */
            _enquire2['default'].register("screen and (min-width: " + _screen_variable.screen_all_min + "px) and (max-width: " + _screen_variable.screen_xs_max + "px)", {

                match: function match() {
                    /** headroom 初始化 */
                    common.headerScrollMobile();

                    /** 下拉菜单 */
                    $('.saya-header .header-mobile .exp-menu, .saya-header .header-mobile .message-hint').on('click', function () {
                        $('.drop-menu').toggle();
                    });

                    /** 点击搜索添加or移除 class & overlay */
                    $('.saya-header .search .input-search').on('focus', function () {
                        common.addSearchOverlay();
                    });

                    $('.saya-header .search .input-search').on('blur', function () {
                        common.removeSearchOverlay();
                    });

                    /**
                     * 微信提示 用户点击提示后显示正常页面
                     */
                    $('.weixin-overlay, .weixin-redirect-prompt').on('click', function () {
                        $('.weixin-overlay, .weixin-redirect-prompt').removeClass('show');
                    });

                    /** 应用信息插入文章最后 */
                    common.appinfoAfterArticle();
                }
            });

            $(window).load(function () {
                if ($('.body-bootstrap-tag').length) {
                    var list = document.querySelector('.cascading-list');
                    var iso = new _isotope2['default'](list, {
                        // options...
                        itemSelector: '.item',
                        layoutMode: 'fitRows'
                    });
                }

                $('.stick').removeClass('affix').addClass('affix-top');

                if ($('.katana-article-detail').length) {
                    // comment 定位
                    if (location.hash.indexOf('comment') > -1) {
                        // $(window).scrollTo($('.loading-comments'));
                        $('html, body').animate({
                            scrollTop: $('.comments-count').offset().top - 70
                        }, 1000);
                    }
                }

                // $(document).on('click', 'img#imagelightbox', function() {
                //     $(this).remove();
                //     $('#imagelightbox-overlay').remove();
                //     $('#imagelightboxmask').remove();
                //     $('#imagelightboxclose').remove();
                //     $('#imagelightboxprev').remove();
                //     $('#imagelightboxnext').remove();
                //     $('.imagelightbox-arrow').remove();
                // });
            });
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 19 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (__webpack_provided_window_dot_jQuery) {
            /**
             * jQuery Unveil
             * A very lightweight jQuery plugin to lazy load images
             * http://luis-almeida.github.com/unveil
             *
             * Licensed under the MIT license.
             * Copyright 2013 Luís Almeida
             * https://github.com/luis-almeida
             */

            "use strict";

            ;
            (function ($) {

                $.fn.unveil = function (threshold, callback) {

                    var $w = $(window),
                        th = threshold || 0,
                        retina = window.devicePixelRatio > 1,
                        attrib = retina ? "data-src-retina" : "data-src",
                        images = this,
                        loaded;

                    this.one("unveil", function () {
                        var source = this.getAttribute(attrib);
                        source = source || this.getAttribute("data-src");
                        if (source) {
                            this.setAttribute("src", source);
                            if (typeof callback === "function") callback.call(this);
                        }
                    });

                    function unveil() {
                        var inview = images.filter(function () {
                            var $e = $(this);
                            if ($e.is(":hidden")) return;

                            var wt = $w.scrollTop(),
                                wb = wt + $w.height(),
                                et = $e.offset().top,
                                eb = et + $e.height();

                            return eb >= wt - th && et <= wb + th;
                        });

                        loaded = inview.trigger("unveil");
                        images = images.not(loaded);
                    }

                    $w.scroll(unveil);
                    $w.resize(unveil);

                    unveil();

                    return this;
                };
            })(__webpack_provided_window_dot_jQuery || window.Zepto);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 20 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /*** IMPORTS FROM imports-loader ***/
        'use strict';

        (function () {

            !(function (root, factory) {
                if (true) {
                    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
                        return factory(root, $);
                    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                } else if (typeof exports === 'object') {
                    factory(root, require('jquery'));
                } else {
                    factory(root, root.jQuery || root.Zepto);
                }
            })(this, function (global, $) {

                'use strict';

                /**
                 * Name of the plugin
                 * @private
                 * @const
                 * @type {String}
                 */
                var PLUGIN_NAME = 'remodal';

                /**
                 * Namespace for CSS and events
                 * @private
                 * @const
                 * @type {String}
                 */
                var NAMESPACE = global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.NAMESPACE || PLUGIN_NAME;

                /**
                 * Animationstart event with vendor prefixes
                 * @private
                 * @const
                 * @type {String}
                 */
                var ANIMATIONSTART_EVENTS = $.map(['animationstart', 'webkitAnimationStart', 'MSAnimationStart', 'oAnimationStart'], function (eventName) {
                    return eventName + '.' + NAMESPACE;
                }).join(' ');

                /**
                 * Animationend event with vendor prefixes
                 * @private
                 * @const
                 * @type {String}
                 */
                var ANIMATIONEND_EVENTS = $.map(['animationend', 'webkitAnimationEnd', 'MSAnimationEnd', 'oAnimationEnd'], function (eventName) {
                    return eventName + '.' + NAMESPACE;
                }).join(' ');

                /**
                 * Default settings
                 * @private
                 * @const
                 * @type {Object}
                 */
                var DEFAULTS = $.extend({
                    hashTracking: true,
                    closeOnConfirm: true,
                    closeOnCancel: true,
                    closeOnEscape: true,
                    closeOnOutsideClick: true,
                    modifier: ''
                }, global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.DEFAULTS);

                /**
                 * States of the Remodal
                 * @private
                 * @const
                 * @enum {String}
                 */
                var STATES = {
                    CLOSING: 'closing',
                    CLOSED: 'closed',
                    OPENING: 'opening',
                    OPENED: 'opened'
                };

                /**
                 * Reasons of the state change.
                 * @private
                 * @const
                 * @enum {String}
                 */
                var STATE_CHANGE_REASONS = {
                    CONFIRMATION: 'confirmation',
                    CANCELLATION: 'cancellation'
                };

                /**
                 * Is animation supported?
                 * @private
                 * @const
                 * @type {Boolean}
                 */
                var IS_ANIMATION = (function () {
                    var style = document.createElement('div').style;

                    return style.animationName !== undefined || style.WebkitAnimationName !== undefined || style.MozAnimationName !== undefined || style.msAnimationName !== undefined || style.OAnimationName !== undefined;
                })();

                /**
                 * Is iOS?
                 * @private
                 * @const
                 * @type {Boolean}
                 */
                var IS_IOS = /iPad|iPhone|iPod/.test(navigator.platform);

                /**
                 * Current modal
                 * @private
                 * @type {Remodal}
                 */
                var current;

                /**
                 * Scrollbar position
                 * @private
                 * @type {Number}
                 */
                var scrollTop;

                /**
                 * Returns an animation duration
                 * @private
                 * @param {jQuery} $elem
                 * @returns {Number}
                 */
                function getAnimationDuration($elem) {
                    if (IS_ANIMATION && $elem.css('animation-name') === 'none' && $elem.css('-webkit-animation-name') === 'none' && $elem.css('-moz-animation-name') === 'none' && $elem.css('-o-animation-name') === 'none' && $elem.css('-ms-animation-name') === 'none') {
                        return 0;
                    }

                    var duration = $elem.css('animation-duration') || $elem.css('-webkit-animation-duration') || $elem.css('-moz-animation-duration') || $elem.css('-o-animation-duration') || $elem.css('-ms-animation-duration') || '0s';

                    var delay = $elem.css('animation-delay') || $elem.css('-webkit-animation-delay') || $elem.css('-moz-animation-delay') || $elem.css('-o-animation-delay') || $elem.css('-ms-animation-delay') || '0s';

                    var iterationCount = $elem.css('animation-iteration-count') || $elem.css('-webkit-animation-iteration-count') || $elem.css('-moz-animation-iteration-count') || $elem.css('-o-animation-iteration-count') || $elem.css('-ms-animation-iteration-count') || '1';

                    var max;
                    var len;
                    var num;
                    var i;

                    duration = duration.split(', ');
                    delay = delay.split(', ');
                    iterationCount = iterationCount.split(', ');

                    // The 'duration' size is the same as the 'delay' size
                    for (i = 0, len = duration.length, max = Number.NEGATIVE_INFINITY; i < len; i++) {
                        num = parseFloat(duration[i]) * parseInt(iterationCount[i], 10) + parseFloat(delay[i]);

                        if (num > max) {
                            max = num;
                        }
                    }

                    return num;
                }

                /**
                 * Returns a scrollbar width
                 * @private
                 * @returns {Number}
                 */
                function getScrollbarWidth() {
                    if ($(document.body).height() <= $(window).height()) {
                        return 0;
                    }

                    var outer = document.createElement('div');
                    var inner = document.createElement('div');
                    var widthNoScroll;
                    var widthWithScroll;

                    outer.style.visibility = 'hidden';
                    outer.style.width = '100px';
                    document.body.appendChild(outer);

                    widthNoScroll = outer.offsetWidth;

                    // Force scrollbars
                    outer.style.overflow = 'scroll';

                    // Add inner div
                    inner.style.width = '100%';
                    outer.appendChild(inner);

                    widthWithScroll = inner.offsetWidth;

                    // Remove divs
                    outer.parentNode.removeChild(outer);

                    return widthNoScroll - widthWithScroll;
                }

                /**
                 * Locks the screen
                 * @private
                 */
                function lockScreen() {
                    if (IS_IOS) {
                        return;
                    }

                    var $html = $('html');
                    var lockedClass = namespacify('is-locked');
                    var paddingRight;
                    var $body;

                    if (!$html.hasClass(lockedClass)) {
                        $body = $(document.body);

                        // Zepto does not support '-=', '+=' in the `css` method
                        paddingRight = parseInt($body.css('padding-right'), 10) + getScrollbarWidth();

                        $body.css('padding-right', paddingRight + 'px');
                        $html.addClass(lockedClass);
                    }
                }

                /**
                 * Unlocks the screen
                 * @private
                 */
                function unlockScreen() {
                    if (IS_IOS) {
                        return;
                    }

                    var $html = $('html');
                    var lockedClass = namespacify('is-locked');
                    var paddingRight;
                    var $body;

                    if ($html.hasClass(lockedClass)) {
                        $body = $(document.body);

                        // Zepto does not support '-=', '+=' in the `css` method
                        paddingRight = parseInt($body.css('padding-right'), 10) - getScrollbarWidth();

                        $body.css('padding-right', paddingRight + 'px');
                        $html.removeClass(lockedClass);
                    }
                }

                /**
                 * Sets a state for an instance
                 * @private
                 * @param {Remodal} instance
                 * @param {STATES} state
                 * @param {Boolean} isSilent If true, Remodal does not trigger events
                 * @param {String} Reason of a state change.
                 */
                function setState(instance, state, isSilent, reason) {

                    var newState = namespacify('is', state);
                    var allStates = [namespacify('is', STATES.CLOSING), namespacify('is', STATES.OPENING), namespacify('is', STATES.CLOSED), namespacify('is', STATES.OPENED)].join(' ');

                    instance.$bg.removeClass(allStates).addClass(newState);

                    instance.$overlay.removeClass(allStates).addClass(newState);

                    instance.$wrapper.removeClass(allStates).addClass(newState);

                    instance.$modal.removeClass(allStates).addClass(newState);

                    instance.state = state;
                    !isSilent && instance.$modal.trigger({
                        type: state,
                        reason: reason
                    }, [{reason: reason}]);
                }

                /**
                 * Synchronizes with the animation
                 * @param {Function} doBeforeAnimation
                 * @param {Function} doAfterAnimation
                 * @param {Remodal} instance
                 */
                function syncWithAnimation(doBeforeAnimation, doAfterAnimation, instance) {
                    var runningAnimationsCount = 0;

                    var handleAnimationStart = function handleAnimationStart(e) {
                        if (e.target !== this) {
                            return;
                        }

                        runningAnimationsCount++;
                    };

                    var handleAnimationEnd = function handleAnimationEnd(e) {
                        if (e.target !== this) {
                            return;
                        }

                        if (--runningAnimationsCount === 0) {

                            // Remove event listeners
                            $.each(['$bg', '$overlay', '$wrapper', '$modal'], function (index, elemName) {
                                instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS);
                            });

                            doAfterAnimation();
                        }
                    };

                    $.each(['$bg', '$overlay', '$wrapper', '$modal'], function (index, elemName) {
                        instance[elemName].on(ANIMATIONSTART_EVENTS, handleAnimationStart).on(ANIMATIONEND_EVENTS, handleAnimationEnd);
                    });

                    doBeforeAnimation();

                    // If the animation is not supported by a browser or its duration is 0
                    if (getAnimationDuration(instance.$bg) === 0 && getAnimationDuration(instance.$overlay) === 0 && getAnimationDuration(instance.$wrapper) === 0 && getAnimationDuration(instance.$modal) === 0) {

                        // Remove event listeners
                        $.each(['$bg', '$overlay', '$wrapper', '$modal'], function (index, elemName) {
                            instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS);
                        });

                        doAfterAnimation();
                    }
                }

                /**
                 * Closes immediately
                 * @private
                 * @param {Remodal} instance
                 */
                function halt(instance) {
                    if (instance.state === STATES.CLOSED) {
                        return;
                    }

                    $.each(['$bg', '$overlay', '$wrapper', '$modal'], function (index, elemName) {
                        instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS);
                    });

                    instance.$bg.removeClass(instance.settings.modifier);
                    instance.$overlay.removeClass(instance.settings.modifier).hide();
                    instance.$wrapper.hide();
                    unlockScreen();
                    setState(instance, STATES.CLOSED, true);
                }

                /**
                 * Parses a string with options
                 * @private
                 * @param str
                 * @returns {Object}
                 */
                function parseOptions(str) {
                    var obj = {};
                    var arr;
                    var len;
                    var val;
                    var i;

                    // Remove spaces before and after delimiters
                    str = str.replace(/\s*:\s*/g, ':').replace(/\s*,\s*/g, ',');

                    // Parse a string
                    arr = str.split(',');
                    for (i = 0, len = arr.length; i < len; i++) {
                        arr[i] = arr[i].split(':');
                        val = arr[i][1];

                        // Convert a string value if it is like a boolean
                        if (typeof val === 'string' || val instanceof String) {
                            val = val === 'true' || (val === 'false' ? false : val);
                        }

                        // Convert a string value if it is like a number
                        if (typeof val === 'string' || val instanceof String) {
                            val = !isNaN(val) ? +val : val;
                        }

                        obj[arr[i][0]] = val;
                    }

                    return obj;
                }

                /**
                 * Generates a string separated by dashes and prefixed with NAMESPACE
                 * @private
                 * @param {...String}
                 * @returns {String}
                 */
                function namespacify() {
                    var result = NAMESPACE;

                    for (var i = 0; i < arguments.length; ++i) {
                        result += '-' + arguments[i];
                    }

                    return result;
                }

                /**
                 * Handles the hashchange event
                 * @private
                 * @listens hashchange
                 */
                function handleHashChangeEvent() {
                    var id = location.hash.replace('#', '');
                    var instance;
                    var $elem;

                    if (!id) {

                        // Check if we have currently opened modal and animation was completed
                        if (current && current.state === STATES.OPENED && current.settings.hashTracking) {
                            current.close();
                        }
                    } else {

                        // Catch syntax error if your hash is bad
                        try {
                            $elem = $('[data-' + PLUGIN_NAME + '-id="' + id + '"]');
                        } catch (err) {
                        }

                        if ($elem && $elem.length) {
                            instance = $[PLUGIN_NAME].lookup[$elem.data(PLUGIN_NAME)];

                            if (instance && instance.settings.hashTracking) {
                                instance.open();
                            }
                        }
                    }
                }

                /**
                 * Remodal constructor
                 * @constructor
                 * @param {jQuery} $modal
                 * @param {Object} options
                 */
                function Remodal($modal, options) {
                    var $body = $(document.body);
                    var remodal = this;

                    remodal.settings = $.extend({}, DEFAULTS, options);
                    remodal.index = $[PLUGIN_NAME].lookup.push(remodal) - 1;
                    remodal.state = STATES.CLOSED;

                    remodal.$overlay = $('.' + namespacify('overlay'));

                    if (!remodal.$overlay.length) {
                        remodal.$overlay = $('<div>').addClass(namespacify('overlay') + ' ' + namespacify('is', STATES.CLOSED)).hide();
                        $body.append(remodal.$overlay);
                    }

                    remodal.$bg = $('.' + namespacify('bg')).addClass(namespacify('is', STATES.CLOSED));

                    remodal.$modal = $modal.addClass(NAMESPACE + ' ' + namespacify('is-initialized') + ' ' + remodal.settings.modifier + ' ' + namespacify('is', STATES.CLOSED)).attr('tabindex', '-1');

                    remodal.$wrapper = $('<div>').addClass(namespacify('wrapper') + ' ' + remodal.settings.modifier + ' ' + namespacify('is', STATES.CLOSED)).hide().append(remodal.$modal);
                    $body.append(remodal.$wrapper);

                    // Add the event listener for the close button
                    remodal.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="close"]', function (e) {
                        e.preventDefault();

                        remodal.close();
                    });

                    // Add the event listener for the cancel button
                    remodal.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="cancel"]', function (e) {
                        e.preventDefault();

                        remodal.$modal.trigger(STATE_CHANGE_REASONS.CANCELLATION);

                        if (remodal.settings.closeOnCancel) {
                            remodal.close(STATE_CHANGE_REASONS.CANCELLATION);
                        }
                    });

                    // Add the event listener for the confirm button
                    remodal.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="confirm"]', function (e) {
                        e.preventDefault();

                        remodal.$modal.trigger(STATE_CHANGE_REASONS.CONFIRMATION);

                        if (remodal.settings.closeOnConfirm) {
                            remodal.close(STATE_CHANGE_REASONS.CONFIRMATION);
                        }
                    });

                    // Add the event listener for the overlay
                    remodal.$wrapper.on('click.' + NAMESPACE, function (e) {
                        var $target = $(e.target);

                        if (!$target.hasClass(namespacify('wrapper'))) {
                            return;
                        }

                        if (remodal.settings.closeOnOutsideClick) {
                            remodal.close();
                        }
                    });
                }

                /**
                 * Opens a modal window
                 * @public
                 */
                Remodal.prototype.open = function () {
                    var remodal = this;
                    var id;

                    // Check if the animation was completed
                    if (remodal.state === STATES.OPENING || remodal.state === STATES.CLOSING) {
                        return;
                    }

                    id = remodal.$modal.attr('data-' + PLUGIN_NAME + '-id');

                    if (id && remodal.settings.hashTracking) {
                        scrollTop = $(window).scrollTop();
                        location.hash = id;
                    }

                    if (current && current !== remodal) {
                        halt(current);
                    }

                    current = remodal;
                    lockScreen();
                    remodal.$bg.addClass(remodal.settings.modifier);
                    remodal.$overlay.addClass(remodal.settings.modifier).show();
                    remodal.$wrapper.show().scrollTop(0);
                    remodal.$modal.focus();

                    syncWithAnimation(function () {
                        setState(remodal, STATES.OPENING);
                    }, function () {
                        setState(remodal, STATES.OPENED);
                    }, remodal);
                };

                /**
                 * Closes a modal window
                 * @public
                 * @param {String} reason
                 */
                Remodal.prototype.close = function (reason) {
                    var remodal = this;

                    // Check if the animation was completed
                    if (remodal.state === STATES.OPENING || remodal.state === STATES.CLOSING) {
                        return;
                    }

                    if (remodal.settings.hashTracking && remodal.$modal.attr('data-' + PLUGIN_NAME + '-id') === location.hash.substr(1)) {
                        location.hash = '';
                        $(window).scrollTop(scrollTop);
                    }

                    syncWithAnimation(function () {
                        setState(remodal, STATES.CLOSING, false, reason);
                    }, function () {
                        remodal.$bg.removeClass(remodal.settings.modifier);
                        remodal.$overlay.removeClass(remodal.settings.modifier).hide();
                        remodal.$wrapper.hide();
                        unlockScreen();

                        setState(remodal, STATES.CLOSED, false, reason);
                    }, remodal);
                };

                /**
                 * Returns a current state of a modal
                 * @public
                 * @returns {STATES}
                 */
                Remodal.prototype.getState = function () {
                    return this.state;
                };

                /**
                 * Destroys a modal
                 * @public
                 */
                Remodal.prototype.destroy = function () {
                    var lookup = $[PLUGIN_NAME].lookup;
                    var instanceCount;

                    halt(this);
                    this.$wrapper.remove();

                    delete lookup[this.index];
                    instanceCount = $.grep(lookup, function (instance) {
                        return !!instance;
                    }).length;

                    if (instanceCount === 0) {
                        this.$overlay.remove();
                        this.$bg.removeClass(namespacify('is', STATES.CLOSING) + ' ' + namespacify('is', STATES.OPENING) + ' ' + namespacify('is', STATES.CLOSED) + ' ' + namespacify('is', STATES.OPENED));
                    }
                };

                /**
                 * Special plugin object for instances
                 * @public
                 * @type {Object}
                 */
                $[PLUGIN_NAME] = {
                    lookup: []
                };

                /**
                 * Plugin constructor
                 * @constructor
                 * @param {Object} options
                 * @returns {JQuery}
                 */
                $.fn[PLUGIN_NAME] = function (opts) {
                    var instance;
                    var $elem;

                    this.each(function (index, elem) {
                        $elem = $(elem);

                        if ($elem.data(PLUGIN_NAME) == null) {
                            instance = new Remodal($elem, opts);
                            $elem.data(PLUGIN_NAME, instance.index);

                            if (instance.settings.hashTracking && $elem.attr('data-' + PLUGIN_NAME + '-id') === location.hash.substr(1)) {
                                instance.open();
                            }
                        } else {
                            instance = $[PLUGIN_NAME].lookup[$elem.data(PLUGIN_NAME)];
                        }
                    });

                    return instance;
                };

                $(document).ready(function () {

                    // data-remodal-target opens a modal window with the special Id
                    $(document).on('click', '[data-' + PLUGIN_NAME + '-target]', function (e) {
                        e.preventDefault();

                        var elem = e.currentTarget;
                        var id = elem.getAttribute('data-' + PLUGIN_NAME + '-target');
                        var $target = $('[data-' + PLUGIN_NAME + '-id="' + id + '"]');

                        $[PLUGIN_NAME].lookup[$target.data(PLUGIN_NAME)].open();
                    });

                    // Auto initialization of modal windows
                    // They should have the 'remodal' class attribute
                    // Also you can write the `data-remodal-options` attribute to pass params into the modal
                    $(document).find('.' + NAMESPACE).each(function (i, container) {
                        var $container = $(container);
                        var options = $container.data(PLUGIN_NAME + '-options');

                        if (!options) {
                            options = {};
                        } else if (typeof options === 'string' || options instanceof String) {
                            options = parseOptions(options);
                        }

                        $container[PLUGIN_NAME](options);
                    });

                    // Handles the keydown event
                    $(document).on('keydown.' + NAMESPACE, function (e) {
                        if (current && current.settings.closeOnEscape && current.state === STATES.OPENED && e.keyCode === 27) {
                            current.close();
                        }
                    });

                    // Handles the hashchange event
                    $(window).on('hashchange.' + NAMESPACE, handleHashChangeEvent);
                });
            });
        }).call(window);

        /*
         *  Remodal - v1.0.5
         *  Responsive, lightweight, fast, synchronized with CSS animations, fully customizable modal window plugin with declarative configuration and hash tracking.
         *  http://vodkabears.github.io/remodal/
         *
         *  Made by Ilya Makarov
         *  Under MIT License
         */

        /***/
    },
    /* 21 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_RESULT__;
        /*!
         * enquire.js v2.1.2 - Awesome Media Queries in JavaScript
         * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
         * License: MIT (http://www.opensource.org/licenses/mit-license.php)
         */

        'use strict';

        ;
        (function (name, context, factory) {
            var matchMedia = window.matchMedia;

            if (typeof module !== 'undefined' && module.exports) {
                module.exports = factory(matchMedia);
            } else if (true) {
                !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return context[name] = factory(matchMedia);
                }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else {
                context[name] = factory(matchMedia);
            }
        })('enquire', undefined, function (matchMedia) {

            'use strict';

            /*jshint unused:false */
            /**
             * Helper function for iterating over a collection
             *
             * @param collection
             * @param fn
             */
            function each(collection, fn) {
                var i = 0,
                    length = collection.length,
                    cont;

                for (i; i < length; i++) {
                    cont = fn(collection[i], i);
                    if (cont === false) {
                        break; //allow early exit
                    }
                }
            }

            /**
             * Helper function for determining whether target object is an array
             *
             * @param target the object under test
             * @return {Boolean} true if array, false otherwise
             */
            function isArray(target) {
                return Object.prototype.toString.apply(target) === '[object Array]';
            }

            /**
             * Helper function for determining whether target object is a function
             *
             * @param target the object under test
             * @return {Boolean} true if function, false otherwise
             */
            function isFunction(target) {
                return typeof target === 'function';
            }

            /**
             * Delegate to handle a media query being matched and unmatched.
             *
             * @param {object} options
             * @param {function} options.match callback for when the media query is matched
             * @param {function} [options.unmatch] callback for when the media query is unmatched
             * @param {function} [options.setup] one-time callback triggered the first time a query is matched
             * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
             * @constructor
             */
            function QueryHandler(options) {
                this.options = options;
                !options.deferSetup && this.setup();
            }

            QueryHandler.prototype = {

                /**
                 * coordinates setup of the handler
                 *
                 * @function
                 */
                setup: function setup() {
                    if (this.options.setup) {
                        this.options.setup();
                    }
                    this.initialised = true;
                },

                /**
                 * coordinates setup and triggering of the handler
                 *
                 * @function
                 */
                on: function on() {
                    !this.initialised && this.setup();
                    this.options.match && this.options.match();
                },

                /**
                 * coordinates the unmatch event for the handler
                 *
                 * @function
                 */
                off: function off() {
                    this.options.unmatch && this.options.unmatch();
                },

                /**
                 * called when a handler is to be destroyed.
                 * delegates to the destroy or unmatch callbacks, depending on availability.
                 *
                 * @function
                 */
                destroy: function destroy() {
                    this.options.destroy ? this.options.destroy() : this.off();
                },

                /**
                 * determines equality by reference.
                 * if object is supplied compare options, if function, compare match callback
                 *
                 * @function
                 * @param {object || function} [target] the target for comparison
                 */
                equals: function equals(target) {
                    return this.options === target || this.options.match === target;
                }

            };
            /**
             * Represents a single media query, manages it's state and registered handlers for this query
             *
             * @constructor
             * @param {string} query the media query string
             * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
             */
            function MediaQuery(query, isUnconditional) {
                this.query = query;
                this.isUnconditional = isUnconditional;
                this.handlers = [];
                this.mql = matchMedia(query);

                var self = this;
                this.listener = function (mql) {
                    self.mql = mql;
                    self.assess();
                };
                this.mql.addListener(this.listener);
            }

            MediaQuery.prototype = {

                /**
                 * add a handler for this query, triggering if already active
                 *
                 * @param {object} handler
                 * @param {function} handler.match callback for when query is activated
                 * @param {function} [handler.unmatch] callback for when query is deactivated
                 * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
                 * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
                 */
                addHandler: function addHandler(handler) {
                    var qh = new QueryHandler(handler);
                    this.handlers.push(qh);

                    this.matches() && qh.on();
                },

                /**
                 * removes the given handler from the collection, and calls it's destroy methods
                 *
                 * @param {object || function} handler the handler to remove
                 */
                removeHandler: function removeHandler(handler) {
                    var handlers = this.handlers;
                    each(handlers, function (h, i) {
                        if (h.equals(handler)) {
                            h.destroy();
                            return !handlers.splice(i, 1); //remove from array and exit each early
                        }
                    });
                },

                /**
                 * Determine whether the media query should be considered a match
                 *
                 * @return {Boolean} true if media query can be considered a match, false otherwise
                 */
                matches: function matches() {
                    return this.mql.matches || this.isUnconditional;
                },

                /**
                 * Clears all handlers and unbinds events
                 */
                clear: function clear() {
                    each(this.handlers, function (handler) {
                        handler.destroy();
                    });
                    this.mql.removeListener(this.listener);
                    this.handlers.length = 0; //clear array
                },

                /*
                 * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
                 */
                assess: function assess() {
                    var action = this.matches() ? 'on' : 'off';

                    each(this.handlers, function (handler) {
                        handler[action]();
                    });
                }
            };
            /**
             * Allows for registration of query handlers.
             * Manages the query handler's state and is responsible for wiring up browser events
             *
             * @constructor
             */
            function MediaQueryDispatch() {
                if (!matchMedia) {
                    throw new Error('matchMedia not present, legacy browsers require a polyfill');
                }

                this.queries = {};
                this.browserIsIncapable = !matchMedia('only all').matches;
            }

            MediaQueryDispatch.prototype = {

                /**
                 * Registers a handler for the given media query
                 *
                 * @param {string} q the media query
                 * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
                 * @param {function} options.match fired when query matched
                 * @param {function} [options.unmatch] fired when a query is no longer matched
                 * @param {function} [options.setup] fired when handler first triggered
                 * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
                 * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
                 */
                register: function register(q, options, shouldDegrade) {
                    var queries = this.queries,
                        isUnconditional = shouldDegrade && this.browserIsIncapable;

                    if (!queries[q]) {
                        queries[q] = new MediaQuery(q, isUnconditional);
                    }

                    //normalise to object in an array
                    if (isFunction(options)) {
                        options = {match: options};
                    }
                    if (!isArray(options)) {
                        options = [options];
                    }
                    each(options, function (handler) {
                        if (isFunction(handler)) {
                            handler = {match: handler};
                        }
                        queries[q].addHandler(handler);
                    });

                    return this;
                },

                /**
                 * unregisters a query and all it's handlers, or a specific handler for a query
                 *
                 * @param {string} q the media query to target
                 * @param {object || function} [handler] specific handler to unregister
                 */
                unregister: function unregister(q, handler) {
                    var query = this.queries[q];

                    if (query) {
                        if (handler) {
                            query.removeHandler(handler);
                        } else {
                            query.clear();
                            delete this.queries[q];
                        }
                    }

                    return this;
                }
            };

            return new MediaQueryDispatch();
        });

        /***/
    },
    /* 22 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /*!
         * Isotope v2.2.2
         *
         * Licensed GPLv3 for open source use
         * or Isotope Commercial License for commercial use
         *
         * http://isotope.metafizzy.co
         * Copyright 2015 Metafizzy
         */

        'use strict';

        (function (window, factory) {
            'use strict';
            // universal module definition

            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(29), __webpack_require__(23), __webpack_require__(25), __webpack_require__(26), __webpack_require__(37), __webpack_require__(32),
                    // include default layout modes
                    __webpack_require__(33), __webpack_require__(35), __webpack_require__(36)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Outlayer, getSize, matchesSelector, utils, Item, LayoutMode) {
                    return factory(window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode);
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports == 'object') {
                // CommonJS
                module.exports = factory(window, require('outlayer'), require('get-size'), require('desandro-matches-selector'), require('fizzy-ui-utils'), require('./item'), require('./layout-mode'),
                    // include default layout modes
                    require('./layout-modes/masonry'), require('./layout-modes/fit-rows'), require('./layout-modes/vertical'));
            } else {
                // browser global
                window.Isotope = factory(window, window.Outlayer, window.getSize, window.matchesSelector, window.fizzyUIUtils, window.Isotope.Item, window.Isotope.LayoutMode);
            }
        })(window, function factory(window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode) {

            'use strict';

            // -------------------------- vars -------------------------- //

            var jQuery = window.jQuery;

            // -------------------------- helpers -------------------------- //

            var trim = String.prototype.trim ? function (str) {
                return str.trim();
            } : function (str) {
                return str.replace(/^\s+|\s+$/g, '');
            };

            var docElem = document.documentElement;

            var getText = docElem.textContent ? function (elem) {
                return elem.textContent;
            } : function (elem) {
                return elem.innerText;
            };

            // -------------------------- isotopeDefinition -------------------------- //

            // create an Outlayer layout class
            var Isotope = Outlayer.create('isotope', {
                layoutMode: "masonry",
                isJQueryFiltering: true,
                sortAscending: true
            });

            Isotope.Item = Item;
            Isotope.LayoutMode = LayoutMode;

            Isotope.prototype._create = function () {
                this.itemGUID = 0;
                // functions that sort items
                this._sorters = {};
                this._getSorters();
                // call super
                Outlayer.prototype._create.call(this);

                // create layout modes
                this.modes = {};
                // start filteredItems with all items
                this.filteredItems = this.items;
                // keep of track of sortBys
                this.sortHistory = ['original-order'];
                // create from registered layout modes
                for (var name in LayoutMode.modes) {
                    this._initLayoutMode(name);
                }
            };

            Isotope.prototype.reloadItems = function () {
                // reset item ID counter
                this.itemGUID = 0;
                // call super
                Outlayer.prototype.reloadItems.call(this);
            };

            Isotope.prototype._itemize = function () {
                var items = Outlayer.prototype._itemize.apply(this, arguments);
                // assign ID for original-order
                for (var i = 0, len = items.length; i < len; i++) {
                    var item = items[i];
                    item.id = this.itemGUID++;
                }
                this._updateItemsSortData(items);
                return items;
            };

            // -------------------------- layout -------------------------- //

            Isotope.prototype._initLayoutMode = function (name) {
                var Mode = LayoutMode.modes[name];
                // set mode options
                // HACK extend initial options, back-fill in default options
                var initialOpts = this.options[name] || {};
                this.options[name] = Mode.options ? utils.extend(Mode.options, initialOpts) : initialOpts;
                // init layout mode instance
                this.modes[name] = new Mode(this);
            };

            Isotope.prototype.layout = function () {
                // if first time doing layout, do all magic
                if (!this._isLayoutInited && this.options.isInitLayout) {
                    this.arrange();
                    return;
                }
                this._layout();
            };

            // private method to be used in layout() & magic()
            Isotope.prototype._layout = function () {
                // don't animate first layout
                var isInstant = this._getIsInstant();
                // layout flow
                this._resetLayout();
                this._manageStamps();
                this.layoutItems(this.filteredItems, isInstant);

                // flag for initalized
                this._isLayoutInited = true;
            };

            // filter + sort + layout
            Isotope.prototype.arrange = function (opts) {
                // set any options pass
                this.option(opts);
                this._getIsInstant();
                // filter, sort, and layout

                // filter
                var filtered = this._filter(this.items);
                this.filteredItems = filtered.matches;

                var _this = this;

                function hideReveal() {
                    _this.reveal(filtered.needReveal);
                    _this.hide(filtered.needHide);
                }

                this._bindArrangeComplete();

                if (this._isInstant) {
                    this._noTransition(hideReveal);
                } else {
                    hideReveal();
                }

                this._sort();
                this._layout();
            };
            // alias to _init for main plugin method
            Isotope.prototype._init = Isotope.prototype.arrange;

            // HACK
            // Don't animate/transition first layout
            // Or don't animate/transition other layouts
            Isotope.prototype._getIsInstant = function () {
                var isInstant = this.options.isLayoutInstant !== undefined ? this.options.isLayoutInstant : !this._isLayoutInited;
                this._isInstant = isInstant;
                return isInstant;
            };

            // listen for layoutComplete, hideComplete and revealComplete
            // to trigger arrangeComplete
            Isotope.prototype._bindArrangeComplete = function () {
                // listen for 3 events to trigger arrangeComplete
                var isLayoutComplete, isHideComplete, isRevealComplete;
                var _this = this;

                function arrangeParallelCallback() {
                    if (isLayoutComplete && isHideComplete && isRevealComplete) {
                        _this.dispatchEvent('arrangeComplete', null, [_this.filteredItems]);
                    }
                }

                this.once('layoutComplete', function () {
                    isLayoutComplete = true;
                    arrangeParallelCallback();
                });
                this.once('hideComplete', function () {
                    isHideComplete = true;
                    arrangeParallelCallback();
                });
                this.once('revealComplete', function () {
                    isRevealComplete = true;
                    arrangeParallelCallback();
                });
            };

            // -------------------------- filter -------------------------- //

            Isotope.prototype._filter = function (items) {
                var filter = this.options.filter;
                filter = filter || '*';
                var matches = [];
                var hiddenMatched = [];
                var visibleUnmatched = [];

                var test = this._getFilterTest(filter);

                // test each item
                for (var i = 0, len = items.length; i < len; i++) {
                    var item = items[i];
                    if (item.isIgnored) {
                        continue;
                    }
                    // add item to either matched or unmatched group
                    var isMatched = test(item);
                    // item.isFilterMatched = isMatched;
                    // add to matches if its a match
                    if (isMatched) {
                        matches.push(item);
                    }
                    // add to additional group if item needs to be hidden or revealed
                    if (isMatched && item.isHidden) {
                        hiddenMatched.push(item);
                    } else if (!isMatched && !item.isHidden) {
                        visibleUnmatched.push(item);
                    }
                }

                // return collections of items to be manipulated
                return {
                    matches: matches,
                    needReveal: hiddenMatched,
                    needHide: visibleUnmatched
                };
            };

            // get a jQuery, function, or a matchesSelector test given the filter
            Isotope.prototype._getFilterTest = function (filter) {
                if (jQuery && this.options.isJQueryFiltering) {
                    // use jQuery
                    return function (item) {
                        return jQuery(item.element).is(filter);
                    };
                }
                if (typeof filter == 'function') {
                    // use filter as function
                    return function (item) {
                        return filter(item.element);
                    };
                }
                // default, use filter as selector string
                return function (item) {
                    return matchesSelector(item.element, filter);
                };
            };

            // -------------------------- sorting -------------------------- //

            /**
             * @params {Array} elems
             * @public
             */
            Isotope.prototype.updateSortData = function (elems) {
                // get items
                var items;
                if (elems) {
                    elems = utils.makeArray(elems);
                    items = this.getItems(elems);
                } else {
                    // update all items if no elems provided
                    items = this.items;
                }

                this._getSorters();
                this._updateItemsSortData(items);
            };

            Isotope.prototype._getSorters = function () {
                var getSortData = this.options.getSortData;
                for (var key in getSortData) {
                    var sorter = getSortData[key];
                    this._sorters[key] = mungeSorter(sorter);
                }
            };

            /**
             * @params {Array} items - of Isotope.Items
             * @private
             */
            Isotope.prototype._updateItemsSortData = function (items) {
                // do not update if no items
                var len = items && items.length;

                for (var i = 0; len && i < len; i++) {
                    var item = items[i];
                    item.updateSortData();
                }
            };

            // ----- munge sorter ----- //

            // encapsulate this, as we just need mungeSorter
            // other functions in here are just for munging
            var mungeSorter = (function () {
                // add a magic layer to sorters for convienent shorthands
                // `.foo-bar` will use the text of .foo-bar querySelector
                // `[foo-bar]` will use attribute
                // you can also add parser
                // `.foo-bar parseInt` will parse that as a number
                function mungeSorter(sorter) {
                    // if not a string, return function or whatever it is
                    if (typeof sorter != 'string') {
                        return sorter;
                    }
                    // parse the sorter string
                    var args = trim(sorter).split(' ');
                    var query = args[0];
                    // check if query looks like [an-attribute]
                    var attrMatch = query.match(/^\[(.+)\]$/);
                    var attr = attrMatch && attrMatch[1];
                    var getValue = getValueGetter(attr, query);
                    // use second argument as a parser
                    var parser = Isotope.sortDataParsers[args[1]];
                    // parse the value, if there was a parser
                    sorter = parser ? function (elem) {
                        return elem && parser(getValue(elem));
                    } :
                        // otherwise just return value
                        function (elem) {
                            return elem && getValue(elem);
                        };

                    return sorter;
                }

                // get an attribute getter, or get text of the querySelector
                function getValueGetter(attr, query) {
                    var getValue;
                    // if query looks like [foo-bar], get attribute
                    if (attr) {
                        getValue = function (elem) {
                            return elem.getAttribute(attr);
                        };
                    } else {
                        // otherwise, assume its a querySelector, and get its text
                        getValue = function (elem) {
                            var child = elem.querySelector(query);
                            return child && getText(child);
                        };
                    }
                    return getValue;
                }

                return mungeSorter;
            })();

            // parsers used in getSortData shortcut strings
            Isotope.sortDataParsers = {
                'parseInt': (function (_parseInt) {
                    function parseInt(_x) {
                        return _parseInt.apply(this, arguments);
                    }

                    parseInt.toString = function () {
                        return _parseInt.toString();
                    };

                    return parseInt;
                })(function (val) {
                    return parseInt(val, 10);
                }),
                'parseFloat': (function (_parseFloat) {
                    function parseFloat(_x2) {
                        return _parseFloat.apply(this, arguments);
                    }

                    parseFloat.toString = function () {
                        return _parseFloat.toString();
                    };

                    return parseFloat;
                })(function (val) {
                    return parseFloat(val);
                })
            };

            // ----- sort method ----- //

            // sort filteredItem order
            Isotope.prototype._sort = function () {
                var sortByOpt = this.options.sortBy;
                if (!sortByOpt) {
                    return;
                }
                // concat all sortBy and sortHistory
                var sortBys = [].concat.apply(sortByOpt, this.sortHistory);
                // sort magic
                var itemSorter = getItemSorter(sortBys, this.options.sortAscending);
                this.filteredItems.sort(itemSorter);
                // keep track of sortBy History
                if (sortByOpt != this.sortHistory[0]) {
                    // add to front, oldest goes in last
                    this.sortHistory.unshift(sortByOpt);
                }
            };

            // returns a function used for sorting
            function getItemSorter(sortBys, sortAsc) {
                return function sorter(itemA, itemB) {
                    // cycle through all sortKeys
                    for (var i = 0, len = sortBys.length; i < len; i++) {
                        var sortBy = sortBys[i];
                        var a = itemA.sortData[sortBy];
                        var b = itemB.sortData[sortBy];
                        if (a > b || a < b) {
                            // if sortAsc is an object, use the value given the sortBy key
                            var isAscending = sortAsc[sortBy] !== undefined ? sortAsc[sortBy] : sortAsc;
                            var direction = isAscending ? 1 : -1;
                            return (a > b ? 1 : -1) * direction;
                        }
                    }
                    return 0;
                };
            }

            // -------------------------- methods -------------------------- //

            // get layout mode
            Isotope.prototype._mode = function () {
                var layoutMode = this.options.layoutMode;
                var mode = this.modes[layoutMode];
                if (!mode) {
                    // TODO console.error
                    throw new Error('No layout mode: ' + layoutMode);
                }
                // HACK sync mode's options
                // any options set after init for layout mode need to be synced
                mode.options = this.options[layoutMode];
                return mode;
            };

            Isotope.prototype._resetLayout = function () {
                // trigger original reset layout
                Outlayer.prototype._resetLayout.call(this);
                this._mode()._resetLayout();
            };

            Isotope.prototype._getItemLayoutPosition = function (item) {
                return this._mode()._getItemLayoutPosition(item);
            };

            Isotope.prototype._manageStamp = function (stamp) {
                this._mode()._manageStamp(stamp);
            };

            Isotope.prototype._getContainerSize = function () {
                return this._mode()._getContainerSize();
            };

            Isotope.prototype.needsResizeLayout = function () {
                return this._mode().needsResizeLayout();
            };

            // -------------------------- adding & removing -------------------------- //

            // HEADS UP overwrites default Outlayer appended
            Isotope.prototype.appended = function (elems) {
                var items = this.addItems(elems);
                if (!items.length) {
                    return;
                }
                // filter, layout, reveal new items
                var filteredItems = this._filterRevealAdded(items);
                // add to filteredItems
                this.filteredItems = this.filteredItems.concat(filteredItems);
            };

            // HEADS UP overwrites default Outlayer prepended
            Isotope.prototype.prepended = function (elems) {
                var items = this._itemize(elems);
                if (!items.length) {
                    return;
                }
                // start new layout
                this._resetLayout();
                this._manageStamps();
                // filter, layout, reveal new items
                var filteredItems = this._filterRevealAdded(items);
                // layout previous items
                this.layoutItems(this.filteredItems);
                // add to items and filteredItems
                this.filteredItems = filteredItems.concat(this.filteredItems);
                this.items = items.concat(this.items);
            };

            Isotope.prototype._filterRevealAdded = function (items) {
                var filtered = this._filter(items);
                this.hide(filtered.needHide);
                // reveal all new items
                this.reveal(filtered.matches);
                // layout new items, no transition
                this.layoutItems(filtered.matches, true);
                return filtered.matches;
            };

            /**
             * Filter, sort, and layout newly-appended item elements
             * @param {Array or NodeList or Element} elems
             */
            Isotope.prototype.insert = function (elems) {
                var items = this.addItems(elems);
                if (!items.length) {
                    return;
                }
                // append item elements
                var i, item;
                var len = items.length;
                for (i = 0; i < len; i++) {
                    item = items[i];
                    this.element.appendChild(item.element);
                }
                // filter new stuff
                var filteredInsertItems = this._filter(items).matches;
                // set flag
                for (i = 0; i < len; i++) {
                    items[i].isLayoutInstant = true;
                }
                this.arrange();
                // reset flag
                for (i = 0; i < len; i++) {
                    delete items[i].isLayoutInstant;
                }
                this.reveal(filteredInsertItems);
            };

            var _remove = Isotope.prototype.remove;
            Isotope.prototype.remove = function (elems) {
                elems = utils.makeArray(elems);
                var removeItems = this.getItems(elems);
                // do regular thing
                _remove.call(this, elems);
                // bail if no items to remove
                var len = removeItems && removeItems.length;
                if (!len) {
                    return;
                }
                // remove elems from filteredItems
                for (var i = 0; i < len; i++) {
                    var item = removeItems[i];
                    // remove item from collection
                    utils.removeFrom(this.filteredItems, item);
                }
            };

            Isotope.prototype.shuffle = function () {
                // update random sortData
                for (var i = 0, len = this.items.length; i < len; i++) {
                    var item = this.items[i];
                    item.sortData.random = Math.random();
                }
                this.options.sortBy = 'random';
                this._sort();
                this._layout();
            };

            /**
             * trigger fn without transition
             * kind of hacky to have this in the first place
             * @param {Function} fn
             * @returns ret
             * @private
             */
            Isotope.prototype._noTransition = function (fn) {
                // save transitionDuration before disabling
                var transitionDuration = this.options.transitionDuration;
                // disable transition
                this.options.transitionDuration = 0;
                // do it
                var returnValue = fn.call(this);
                // re-enable transition for reveal
                this.options.transitionDuration = transitionDuration;
                return returnValue;
            };

            // ----- helper methods ----- //

            /**
             * getter method for getting filtered item elements
             * @returns {Array} elems - collection of item elements
             */
            Isotope.prototype.getFilteredItemElements = function () {
                var elems = [];
                for (var i = 0, len = this.filteredItems.length; i < len; i++) {
                    elems.push(this.filteredItems[i].element);
                }
                return elems;
            };

            // -----  ----- //

            return Isotope;
        });

        /***/
    },
    /* 23 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /*!
         * getSize v1.2.2
         * measure size of elements
         * MIT license
         */

        /*jshint browser: true, strict: true, undef: true, unused: true */
        'use strict';

        (function (window, undefined) {

            'use strict';

            // -------------------------- helpers -------------------------- //

            // get a number from a string, not a percentage
            function getStyleSize(value) {
                var num = parseFloat(value);
                // not a percent like '100%', and a number
                var isValid = value.indexOf('%') === -1 && !isNaN(num);
                return isValid && num;
            }

            function noop() {
            }

            var logError = typeof console === 'undefined' ? noop : function (message) {
                console.error(message);
            };

            // -------------------------- measurements -------------------------- //

            var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];

            function getZeroSize() {
                var size = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                };
                for (var i = 0, len = measurements.length; i < len; i++) {
                    var measurement = measurements[i];
                    size[measurement] = 0;
                }
                return size;
            }

            function defineGetSize(getStyleProperty) {

                // -------------------------- setup -------------------------- //

                var isSetup = false;

                var getStyle, boxSizingProp, isBoxSizeOuter;

                /**
                 * setup vars and functions
                 * do it on initial getSize(), rather than on script load
                 * For Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=548397
                 */
                function setup() {
                    // setup once
                    if (isSetup) {
                        return;
                    }
                    isSetup = true;

                    var getComputedStyle = window.getComputedStyle;
                    getStyle = (function () {
                        var getStyleFn = getComputedStyle ? function (elem) {
                            return getComputedStyle(elem, null);
                        } : function (elem) {
                            return elem.currentStyle;
                        };

                        return function getStyle(elem) {
                            var style = getStyleFn(elem);
                            if (!style) {
                                logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See http://bit.ly/getsizebug1');
                            }
                            return style;
                        };
                    })();

                    // -------------------------- box sizing -------------------------- //

                    boxSizingProp = getStyleProperty('boxSizing');

                    /**
                     * WebKit measures the outer-width on style.width on border-box elems
                     * IE & Firefox measures the inner-width
                     */
                    if (boxSizingProp) {
                        var div = document.createElement('div');
                        div.style.width = '200px';
                        div.style.padding = '1px 2px 3px 4px';
                        div.style.borderStyle = 'solid';
                        div.style.borderWidth = '1px 2px 3px 4px';
                        div.style[boxSizingProp] = 'border-box';

                        var body = document.body || document.documentElement;
                        body.appendChild(div);
                        var style = getStyle(div);

                        isBoxSizeOuter = getStyleSize(style.width) === 200;
                        body.removeChild(div);
                    }
                }

                // -------------------------- getSize -------------------------- //

                function getSize(elem) {
                    setup();

                    // use querySeletor if elem is string
                    if (typeof elem === 'string') {
                        elem = document.querySelector(elem);
                    }

                    // do not proceed on non-objects
                    if (!elem || typeof elem !== 'object' || !elem.nodeType) {
                        return;
                    }

                    var style = getStyle(elem);

                    // if hidden, everything is 0
                    if (style.display === 'none') {
                        return getZeroSize();
                    }

                    var size = {};
                    size.width = elem.offsetWidth;
                    size.height = elem.offsetHeight;

                    var isBorderBox = size.isBorderBox = !!(boxSizingProp && style[boxSizingProp] && style[boxSizingProp] === 'border-box');

                    // get all measurements
                    for (var i = 0, len = measurements.length; i < len; i++) {
                        var measurement = measurements[i];
                        var value = style[measurement];
                        value = mungeNonPixel(elem, value);
                        var num = parseFloat(value);
                        // any 'auto', 'medium' value will be 0
                        size[measurement] = !isNaN(num) ? num : 0;
                    }

                    var paddingWidth = size.paddingLeft + size.paddingRight;
                    var paddingHeight = size.paddingTop + size.paddingBottom;
                    var marginWidth = size.marginLeft + size.marginRight;
                    var marginHeight = size.marginTop + size.marginBottom;
                    var borderWidth = size.borderLeftWidth + size.borderRightWidth;
                    var borderHeight = size.borderTopWidth + size.borderBottomWidth;

                    var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

                    // overwrite width and height if we can get it from style
                    var styleWidth = getStyleSize(style.width);
                    if (styleWidth !== false) {
                        size.width = styleWidth + (
                                // add padding and border unless it's already including it
                                isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
                    }

                    var styleHeight = getStyleSize(style.height);
                    if (styleHeight !== false) {
                        size.height = styleHeight + (
                                // add padding and border unless it's already including it
                                isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
                    }

                    size.innerWidth = size.width - (paddingWidth + borderWidth);
                    size.innerHeight = size.height - (paddingHeight + borderHeight);

                    size.outerWidth = size.width + marginWidth;
                    size.outerHeight = size.height + marginHeight;

                    return size;
                }

                // IE8 returns percent values, not pixels
                // taken from jQuery's curCSS
                function mungeNonPixel(elem, value) {
                    // IE8 and has percent value
                    if (window.getComputedStyle || value.indexOf('%') === -1) {
                        return value;
                    }
                    var style = elem.style;
                    // Remember the original values
                    var left = style.left;
                    var rs = elem.runtimeStyle;
                    var rsLeft = rs && rs.left;

                    // Put in the new values to get a computed value out
                    if (rsLeft) {
                        rs.left = elem.currentStyle.left;
                    }
                    style.left = value;
                    value = style.pixelLeft;

                    // Revert the changed values
                    style.left = left;
                    if (rsLeft) {
                        rs.left = rsLeft;
                    }

                    return value;
                }

                return getSize;
            }

            // transport
            if (true) {
                // AMD for RequireJS
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(24)], __WEBPACK_AMD_DEFINE_FACTORY__ = (defineGetSize), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports === 'object') {
                // CommonJS for Component
                module.exports = defineGetSize(require('desandro-get-style-property'));
            } else {
                // browser global
                window.getSize = defineGetSize(window.getStyleProperty);
            }
        })(window);
        /*global define: false, exports: false, require: false, module: false, console: false */

        /***/
    },
    /* 24 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_RESULT__;
        /*!
         * getStyleProperty v1.0.4
         * original by kangax
         * http://perfectionkills.com/feature-testing-css-properties/
         * MIT license
         */

        /*jshint browser: true, strict: true, undef: true */
        'use strict';

        (function (window) {

            'use strict';

            var prefixes = 'Webkit Moz ms Ms O'.split(' ');
            var docElemStyle = document.documentElement.style;

            function getStyleProperty(propName) {
                if (!propName) {
                    return;
                }

                // test standard property first
                if (typeof docElemStyle[propName] === 'string') {
                    return propName;
                }

                // capitalize
                propName = propName.charAt(0).toUpperCase() + propName.slice(1);

                // test vendor specific properties
                var prefixed;
                for (var i = 0, len = prefixes.length; i < len; i++) {
                    prefixed = prefixes[i] + propName;
                    if (typeof docElemStyle[prefixed] === 'string') {
                        return prefixed;
                    }
                }
            }

            // transport
            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return getStyleProperty;
                }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports === 'object') {
                // CommonJS for Component
                module.exports = getStyleProperty;
            } else {
                // browser global
                window.getStyleProperty = getStyleProperty;
            }
        })(window);
        /*global define: false, exports: false, module: false */

        /***/
    },
    /* 25 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_RESULT__;
        /**
         * matchesSelector v1.0.3
         * matchesSelector( element, '.selector' )
         * MIT license
         */

        /*jshint browser: true, strict: true, undef: true, unused: true */
        'use strict';

        (function (ElemProto) {

            'use strict';

            var matchesMethod = (function () {
                // check for the standard method name first
                if (ElemProto.matches) {
                    return 'matches';
                }
                // check un-prefixed
                if (ElemProto.matchesSelector) {
                    return 'matchesSelector';
                }
                // check vendor prefixes
                var prefixes = ['webkit', 'moz', 'ms', 'o'];

                for (var i = 0, len = prefixes.length; i < len; i++) {
                    var prefix = prefixes[i];
                    var method = prefix + 'MatchesSelector';
                    if (ElemProto[method]) {
                        return method;
                    }
                }
            })();

            // ----- match ----- //

            function match(elem, selector) {
                return elem[matchesMethod](selector);
            }

            // ----- appendToFragment ----- //

            function checkParent(elem) {
                // not needed if already has parent
                if (elem.parentNode) {
                    return;
                }
                var fragment = document.createDocumentFragment();
                fragment.appendChild(elem);
            }

            // ----- query ----- //

            // fall back to using QSA
            // thx @jonathantneal https://gist.github.com/3062955
            function query(elem, selector) {
                // append to fragment if no parent
                checkParent(elem);

                // match elem with all selected elems of parent
                var elems = elem.parentNode.querySelectorAll(selector);
                for (var i = 0, len = elems.length; i < len; i++) {
                    // return true if match
                    if (elems[i] === elem) {
                        return true;
                    }
                }
                // otherwise return false
                return false;
            }

            // ----- matchChild ----- //

            function matchChild(elem, selector) {
                checkParent(elem);
                return match(elem, selector);
            }

            // ----- matchesSelector ----- //

            var matchesSelector;

            if (matchesMethod) {
                // IE9 supports matchesSelector, but doesn't work on orphaned elems
                // check for that
                var div = document.createElement('div');
                var supportsOrphans = match(div, 'div');
                matchesSelector = supportsOrphans ? match : matchChild;
            } else {
                matchesSelector = query;
            }

            // transport
            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return matchesSelector;
                }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports === 'object') {
                module.exports = matchesSelector;
            } else {
                // browser global
                window.matchesSelector = matchesSelector;
            }
        })(Element.prototype);
        /*global define: false, module: false */

        /***/
    },
    /* 26 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /**
         * Fizzy UI utils v1.0.1
         * MIT license
         */

        'use strict';

        (function (window, factory) {
            /*global define: false, module: false, require: false */
            'use strict';
            // universal module definition

            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(27), __webpack_require__(25)], __WEBPACK_AMD_DEFINE_RESULT__ = function (docReady, matchesSelector) {
                    return factory(window, docReady, matchesSelector);
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports == 'object') {
                // CommonJS
                module.exports = factory(window, require('doc-ready'), require('desandro-matches-selector'));
            } else {
                // browser global
                window.fizzyUIUtils = factory(window, window.docReady, window.matchesSelector);
            }
        })(window, function factory(window, docReady, matchesSelector) {

            'use strict';

            var utils = {};

            // ----- extend ----- //

            // extends objects
            utils.extend = function (a, b) {
                for (var prop in b) {
                    a[prop] = b[prop];
                }
                return a;
            };

            // ----- modulo ----- //

            utils.modulo = function (num, div) {
                return (num % div + div) % div;
            };

            // ----- isArray ----- //

            var objToString = Object.prototype.toString;
            utils.isArray = function (obj) {
                return objToString.call(obj) == '[object Array]';
            };

            // ----- makeArray ----- //

            // turn element or nodeList into an array
            utils.makeArray = function (obj) {
                var ary = [];
                if (utils.isArray(obj)) {
                    // use object if already an array
                    ary = obj;
                } else if (obj && typeof obj.length == 'number') {
                    // convert nodeList to array
                    for (var i = 0, len = obj.length; i < len; i++) {
                        ary.push(obj[i]);
                    }
                } else {
                    // array of single index
                    ary.push(obj);
                }
                return ary;
            };

            // ----- indexOf ----- //

            // index of helper cause IE8
            utils.indexOf = Array.prototype.indexOf ? function (ary, obj) {
                return ary.indexOf(obj);
            } : function (ary, obj) {
                for (var i = 0, len = ary.length; i < len; i++) {
                    if (ary[i] === obj) {
                        return i;
                    }
                }
                return -1;
            };

            // ----- removeFrom ----- //

            utils.removeFrom = function (ary, obj) {
                var index = utils.indexOf(ary, obj);
                if (index != -1) {
                    ary.splice(index, 1);
                }
            };

            // ----- isElement ----- //

            // http://stackoverflow.com/a/384380/182183
            utils.isElement = typeof HTMLElement == 'function' || typeof HTMLElement == 'object' ? function isElementDOM2(obj) {
                return obj instanceof HTMLElement;
            } : function isElementQuirky(obj) {
                return obj && typeof obj == 'object' && obj.nodeType == 1 && typeof obj.nodeName == 'string';
            };

            // ----- setText ----- //

            utils.setText = (function () {
                var setTextProperty;

                function setText(elem, text) {
                    // only check setTextProperty once
                    setTextProperty = setTextProperty || (document.documentElement.textContent !== undefined ? 'textContent' : 'innerText');
                    elem[setTextProperty] = text;
                }

                return setText;
            })();

            // ----- getParent ----- //

            utils.getParent = function (elem, selector) {
                while (elem != document.body) {
                    elem = elem.parentNode;
                    if (matchesSelector(elem, selector)) {
                        return elem;
                    }
                }
            };

            // ----- getQueryElement ----- //

            // use element as selector string
            utils.getQueryElement = function (elem) {
                if (typeof elem == 'string') {
                    return document.querySelector(elem);
                }
                return elem;
            };

            // ----- handleEvent ----- //

            // enable .ontype to trigger from .addEventListener( elem, 'type' )
            utils.handleEvent = function (event) {
                var method = 'on' + event.type;
                if (this[method]) {
                    this[method](event);
                }
            };

            // ----- filterFindElements ----- //

            utils.filterFindElements = function (elems, selector) {
                // make array of elems
                elems = utils.makeArray(elems);
                var ffElems = [];

                for (var i = 0, len = elems.length; i < len; i++) {
                    var elem = elems[i];
                    // check that elem is an actual element
                    if (!utils.isElement(elem)) {
                        continue;
                    }
                    // filter & find items if we have a selector
                    if (selector) {
                        // filter siblings
                        if (matchesSelector(elem, selector)) {
                            ffElems.push(elem);
                        }
                        // find children
                        var childElems = elem.querySelectorAll(selector);
                        // concat childElems to filterFound array
                        for (var j = 0, jLen = childElems.length; j < jLen; j++) {
                            ffElems.push(childElems[j]);
                        }
                    } else {
                        ffElems.push(elem);
                    }
                }

                return ffElems;
            };

            // ----- debounceMethod ----- //

            utils.debounceMethod = function (_class, methodName, threshold) {
                // original method
                var method = _class.prototype[methodName];
                var timeoutName = methodName + 'Timeout';

                _class.prototype[methodName] = function () {
                    var timeout = this[timeoutName];
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    var args = arguments;

                    var _this = this;
                    this[timeoutName] = setTimeout(function () {
                        method.apply(_this, args);
                        delete _this[timeoutName];
                    }, threshold || 100);
                };
            };

            // ----- htmlInit ----- //

            // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
            utils.toDashed = function (str) {
                return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
                    return $1 + '-' + $2;
                }).toLowerCase();
            };

            var console = window.console;
            /**
             * allow user to initialize classes via .js-namespace class
             * htmlInit( Widget, 'widgetName' )
             * options are parsed from data-namespace-option attribute
             */
            utils.htmlInit = function (WidgetClass, namespace) {
                docReady(function () {
                    var dashedNamespace = utils.toDashed(namespace);
                    var elems = document.querySelectorAll('.js-' + dashedNamespace);
                    var dataAttr = 'data-' + dashedNamespace + '-options';

                    for (var i = 0, len = elems.length; i < len; i++) {
                        var elem = elems[i];
                        var attr = elem.getAttribute(dataAttr);
                        var options;
                        try {
                            options = attr && JSON.parse(attr);
                        } catch (error) {
                            // log error, do not initialize
                            if (console) {
                                console.error('Error parsing ' + dataAttr + ' on ' + elem.nodeName.toLowerCase() + (elem.id ? '#' + elem.id : '') + ': ' + error);
                            }
                            continue;
                        }
                        // initialize
                        var instance = new WidgetClass(elem, options);
                        // make available via $().data('layoutname')
                        var jQuery = window.jQuery;
                        if (jQuery) {
                            jQuery.data(elem, namespace, instance);
                        }
                    }
                });
            };

            // -----  ----- //

            return utils;
        });
        /*jshint browser: true, undef: true, unused: true, strict: true */

        /***/
    },
    /* 27 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /*!
         * docReady v1.0.4
         * Cross browser DOMContentLoaded event emitter
         * MIT license
         */

        /*jshint browser: true, strict: true, undef: true, unused: true*/
        'use strict';

        (function (window) {

            'use strict';

            var document = window.document;
            // collection of functions to be triggered on ready
            var queue = [];

            function docReady(fn) {
                // throw out non-functions
                if (typeof fn !== 'function') {
                    return;
                }

                if (docReady.isReady) {
                    // ready now, hit it
                    fn();
                } else {
                    // queue function when ready
                    queue.push(fn);
                }
            }

            docReady.isReady = false;

            // triggered on various doc ready events
            function onReady(event) {
                // bail if already triggered or IE8 document is not ready just yet
                var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
                if (docReady.isReady || isIE8NotReady) {
                    return;
                }

                trigger();
            }

            function trigger() {
                docReady.isReady = true;
                // process queue
                for (var i = 0, len = queue.length; i < len; i++) {
                    var fn = queue[i];
                    fn();
                }
            }

            function defineDocReady(eventie) {
                // trigger ready if page is ready
                if (document.readyState === 'complete') {
                    trigger();
                } else {
                    // listen for events
                    eventie.bind(document, 'DOMContentLoaded', onReady);
                    eventie.bind(document, 'readystatechange', onReady);
                    eventie.bind(window, 'load', onReady);
                }

                return docReady;
            }

            // transport
            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(28)], __WEBPACK_AMD_DEFINE_FACTORY__ = (defineDocReady), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports === 'object') {
                module.exports = defineDocReady(require('eventie'));
            } else {
                // browser global
                window.docReady = defineDocReady(window.eventie);
            }
        })(window);
        /*global define: false, require: false, module: false */

        /***/
    },
    /* 28 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /*!
         * eventie v1.0.6
         * event binding helper
         *   eventie.bind( elem, 'click', myFn )
         *   eventie.unbind( elem, 'click', myFn )
         * MIT license
         */

        /*jshint browser: true, undef: true, unused: true */
        "use strict";

        (function (window) {

            'use strict';

            var docElem = document.documentElement;

            var bind = function bind() {
            };

            function getIEEvent(obj) {
                var event = window.event;
                // add event.target
                event.target = event.target || event.srcElement || obj;
                return event;
            }

            if (docElem.addEventListener) {
                bind = function (obj, type, fn) {
                    obj.addEventListener(type, fn, false);
                };
            } else if (docElem.attachEvent) {
                bind = function (obj, type, fn) {
                    obj[type + fn] = fn.handleEvent ? function () {
                        var event = getIEEvent(obj);
                        fn.handleEvent.call(fn, event);
                    } : function () {
                        var event = getIEEvent(obj);
                        fn.call(obj, event);
                    };
                    obj.attachEvent("on" + type, obj[type + fn]);
                };
            }

            var unbind = function unbind() {
            };

            if (docElem.removeEventListener) {
                unbind = function (obj, type, fn) {
                    obj.removeEventListener(type, fn, false);
                };
            } else if (docElem.detachEvent) {
                unbind = function (obj, type, fn) {
                    obj.detachEvent("on" + type, obj[type + fn]);
                    try {
                        delete obj[type + fn];
                    } catch (err) {
                        // can't delete window object properties
                        obj[type + fn] = undefined;
                    }
                };
            }

            var eventie = {
                bind: bind,
                unbind: unbind
            };

            // ----- module definition ----- //

            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_FACTORY__ = (eventie), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports === 'object') {
                // CommonJS
                module.exports = eventie;
            } else {
                // browser global
                window.eventie = eventie;
            }
        })(window);
        /*global define: false, module: false */

        /***/
    },
    /* 29 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /*!
         * Outlayer v1.4.2
         * the brains and guts of a layout library
         * MIT license
         */

        'use strict';

        (function (window, factory) {
            'use strict';
            // universal module definition

            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(28), __webpack_require__(30), __webpack_require__(23), __webpack_require__(26), __webpack_require__(31)], __WEBPACK_AMD_DEFINE_RESULT__ = function (eventie, EventEmitter, getSize, utils, Item) {
                    return factory(window, eventie, EventEmitter, getSize, utils, Item);
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports == 'object') {
                // CommonJS
                module.exports = factory(window, require('eventie'), require('wolfy87-eventemitter'), require('get-size'), require('fizzy-ui-utils'), require('./item'));
            } else {
                // browser global
                window.Outlayer = factory(window, window.eventie, window.EventEmitter, window.getSize, window.fizzyUIUtils, window.Outlayer.Item);
            }
        })(window, function factory(window, eventie, EventEmitter, getSize, utils, Item) {
            'use strict';

            // ----- vars ----- //

            var console = window.console;
            var jQuery = window.jQuery;
            var noop = function noop() {
            };

            // -------------------------- Outlayer -------------------------- //

            // globally unique identifiers
            var GUID = 0;
            // internal store of all Outlayer intances
            var instances = {};

            /**
             * @param {Element, String} element
             * @param {Object} options
             * @constructor
             */
            function Outlayer(element, options) {
                var queryElement = utils.getQueryElement(element);
                if (!queryElement) {
                    if (console) {
                        console.error('Bad element for ' + this.constructor.namespace + ': ' + (queryElement || element));
                    }
                    return;
                }
                this.element = queryElement;
                // add jQuery
                if (jQuery) {
                    this.$element = jQuery(this.element);
                }

                // options
                this.options = utils.extend({}, this.constructor.defaults);
                this.option(options);

                // add id for Outlayer.getFromElement
                var id = ++GUID;
                this.element.outlayerGUID = id; // expando
                instances[id] = this; // associate via id

                // kick it off
                this._create();

                if (this.options.isInitLayout) {
                    this.layout();
                }
            }

            // settings are for internal use only
            Outlayer.namespace = 'outlayer';
            Outlayer.Item = Item;

            // default options
            Outlayer.defaults = {
                containerStyle: {
                    position: 'relative'
                },
                isInitLayout: true,
                isOriginLeft: true,
                isOriginTop: true,
                isResizeBound: true,
                isResizingContainer: true,
                // item options
                transitionDuration: '0.4s',
                hiddenStyle: {
                    opacity: 0,
                    transform: 'scale(0.001)'
                },
                visibleStyle: {
                    opacity: 1,
                    transform: 'scale(1)'
                }
            };

            // inherit EventEmitter
            utils.extend(Outlayer.prototype, EventEmitter.prototype);

            /**
             * set options
             * @param {Object} opts
             */
            Outlayer.prototype.option = function (opts) {
                utils.extend(this.options, opts);
            };

            Outlayer.prototype._create = function () {
                // get items from children
                this.reloadItems();
                // elements that affect layout, but are not laid out
                this.stamps = [];
                this.stamp(this.options.stamp);
                // set container style
                utils.extend(this.element.style, this.options.containerStyle);

                // bind resize method
                if (this.options.isResizeBound) {
                    this.bindResize();
                }
            };

            // goes through all children again and gets bricks in proper order
            Outlayer.prototype.reloadItems = function () {
                // collection of item elements
                this.items = this._itemize(this.element.children);
            };

            /**
             * turn elements into Outlayer.Items to be used in layout
             * @param {Array or NodeList or HTMLElement} elems
             * @returns {Array} items - collection of new Outlayer Items
             */
            Outlayer.prototype._itemize = function (elems) {

                var itemElems = this._filterFindItemElements(elems);
                var Item = this.constructor.Item;

                // create new Outlayer Items for collection
                var items = [];
                for (var i = 0, len = itemElems.length; i < len; i++) {
                    var elem = itemElems[i];
                    var item = new Item(elem, this);
                    items.push(item);
                }

                return items;
            };

            /**
             * get item elements to be used in layout
             * @param {Array or NodeList or HTMLElement} elems
             * @returns {Array} items - item elements
             */
            Outlayer.prototype._filterFindItemElements = function (elems) {
                return utils.filterFindElements(elems, this.options.itemSelector);
            };

            /**
             * getter method for getting item elements
             * @returns {Array} elems - collection of item elements
             */
            Outlayer.prototype.getItemElements = function () {
                var elems = [];
                for (var i = 0, len = this.items.length; i < len; i++) {
                    elems.push(this.items[i].element);
                }
                return elems;
            };

            // ----- init & layout ----- //

            /**
             * lays out all items
             */
            Outlayer.prototype.layout = function () {
                this._resetLayout();
                this._manageStamps();

                // don't animate first layout
                var isInstant = this.options.isLayoutInstant !== undefined ? this.options.isLayoutInstant : !this._isLayoutInited;
                this.layoutItems(this.items, isInstant);

                // flag for initalized
                this._isLayoutInited = true;
            };

            // _init is alias for layout
            Outlayer.prototype._init = Outlayer.prototype.layout;

            /**
             * logic before any new layout
             */
            Outlayer.prototype._resetLayout = function () {
                this.getSize();
            };

            Outlayer.prototype.getSize = function () {
                this.size = getSize(this.element);
            };

            /**
             * get measurement from option, for columnWidth, rowHeight, gutter
             * if option is String -> get element from selector string, & get size of element
             * if option is Element -> get size of element
             * else use option as a number
             *
             * @param {String} measurement
             * @param {String} size - width or height
             * @private
             */
            Outlayer.prototype._getMeasurement = function (measurement, size) {
                var option = this.options[measurement];
                var elem;
                if (!option) {
                    // default to 0
                    this[measurement] = 0;
                } else {
                    // use option as an element
                    if (typeof option === 'string') {
                        elem = this.element.querySelector(option);
                    } else if (utils.isElement(option)) {
                        elem = option;
                    }
                    // use size of element, if element
                    this[measurement] = elem ? getSize(elem)[size] : option;
                }
            };

            /**
             * layout a collection of item elements
             * @api public
             */
            Outlayer.prototype.layoutItems = function (items, isInstant) {
                items = this._getItemsForLayout(items);

                this._layoutItems(items, isInstant);

                this._postLayout();
            };

            /**
             * get the items to be laid out
             * you may want to skip over some items
             * @param {Array} items
             * @returns {Array} items
             */
            Outlayer.prototype._getItemsForLayout = function (items) {
                var layoutItems = [];
                for (var i = 0, len = items.length; i < len; i++) {
                    var item = items[i];
                    if (!item.isIgnored) {
                        layoutItems.push(item);
                    }
                }
                return layoutItems;
            };

            /**
             * layout items
             * @param {Array} items
             * @param {Boolean} isInstant
             */
            Outlayer.prototype._layoutItems = function (items, isInstant) {
                this._emitCompleteOnItems('layout', items);

                if (!items || !items.length) {
                    // no items, emit event with empty array
                    return;
                }

                var queue = [];

                for (var i = 0, len = items.length; i < len; i++) {
                    var item = items[i];
                    // get x/y object from method
                    var position = this._getItemLayoutPosition(item);
                    // enqueue
                    position.item = item;
                    position.isInstant = isInstant || item.isLayoutInstant;
                    queue.push(position);
                }

                this._processLayoutQueue(queue);
            };

            /**
             * get item layout position
             * @param {Outlayer.Item} item
             * @returns {Object} x and y position
             */
            Outlayer.prototype._getItemLayoutPosition = function () /* item */ {
                return {
                    x: 0,
                    y: 0
                };
            };

            /**
             * iterate over array and position each item
             * Reason being - separating this logic prevents 'layout invalidation'
             * thx @paul_irish
             * @param {Array} queue
             */
            Outlayer.prototype._processLayoutQueue = function (queue) {
                for (var i = 0, len = queue.length; i < len; i++) {
                    var obj = queue[i];
                    this._positionItem(obj.item, obj.x, obj.y, obj.isInstant);
                }
            };

            /**
             * Sets position of item in DOM
             * @param {Outlayer.Item} item
             * @param {Number} x - horizontal position
             * @param {Number} y - vertical position
             * @param {Boolean} isInstant - disables transitions
             */
            Outlayer.prototype._positionItem = function (item, x, y, isInstant) {
                if (isInstant) {
                    // if not transition, just set CSS
                    item.goTo(x, y);
                } else {
                    item.moveTo(x, y);
                }
            };

            /**
             * Any logic you want to do after each layout,
             * i.e. size the container
             */
            Outlayer.prototype._postLayout = function () {
                this.resizeContainer();
            };

            Outlayer.prototype.resizeContainer = function () {
                if (!this.options.isResizingContainer) {
                    return;
                }
                var size = this._getContainerSize();
                if (size) {
                    this._setContainerMeasure(size.width, true);
                    this._setContainerMeasure(size.height, false);
                }
            };

            /**
             * Sets width or height of container if returned
             * @returns {Object} size
             *   @param {Number} width
             *   @param {Number} height
             */
            Outlayer.prototype._getContainerSize = noop;

            /**
             * @param {Number} measure - size of width or height
             * @param {Boolean} isWidth
             */
            Outlayer.prototype._setContainerMeasure = function (measure, isWidth) {
                if (measure === undefined) {
                    return;
                }

                var elemSize = this.size;
                // add padding and border width if border box
                if (elemSize.isBorderBox) {
                    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
                }

                measure = Math.max(measure, 0);
                this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
            };

            /**
             * emit eventComplete on a collection of items events
             * @param {String} eventName
             * @param {Array} items - Outlayer.Items
             */
            Outlayer.prototype._emitCompleteOnItems = function (eventName, items) {
                var _this = this;

                function onComplete() {
                    _this.dispatchEvent(eventName + 'Complete', null, [items]);
                }

                var count = items.length;
                if (!items || !count) {
                    onComplete();
                    return;
                }

                var doneCount = 0;

                function tick() {
                    doneCount++;
                    if (doneCount === count) {
                        onComplete();
                    }
                }

                // bind callback
                for (var i = 0, len = items.length; i < len; i++) {
                    var item = items[i];
                    item.once(eventName, tick);
                }
            };

            /**
             * emits events via eventEmitter and jQuery events
             * @param {String} type - name of event
             * @param {Event} event - original event
             * @param {Array} args - extra arguments
             */
            Outlayer.prototype.dispatchEvent = function (type, event, args) {
                // add original event to arguments
                var emitArgs = event ? [event].concat(args) : args;
                this.emitEvent(type, emitArgs);

                if (jQuery) {
                    // set this.$element
                    this.$element = this.$element || jQuery(this.element);
                    if (event) {
                        // create jQuery event
                        var $event = jQuery.Event(event);
                        $event.type = type;
                        this.$element.trigger($event, args);
                    } else {
                        // just trigger with type if no event available
                        this.$element.trigger(type, args);
                    }
                }
            };

            // -------------------------- ignore & stamps -------------------------- //

            /**
             * keep item in collection, but do not lay it out
             * ignored items do not get skipped in layout
             * @param {Element} elem
             */
            Outlayer.prototype.ignore = function (elem) {
                var item = this.getItem(elem);
                if (item) {
                    item.isIgnored = true;
                }
            };

            /**
             * return item to layout collection
             * @param {Element} elem
             */
            Outlayer.prototype.unignore = function (elem) {
                var item = this.getItem(elem);
                if (item) {
                    delete item.isIgnored;
                }
            };

            /**
             * adds elements to stamps
             * @param {NodeList, Array, Element, or String} elems
             */
            Outlayer.prototype.stamp = function (elems) {
                elems = this._find(elems);
                if (!elems) {
                    return;
                }

                this.stamps = this.stamps.concat(elems);
                // ignore
                for (var i = 0, len = elems.length; i < len; i++) {
                    var elem = elems[i];
                    this.ignore(elem);
                }
            };

            /**
             * removes elements to stamps
             * @param {NodeList, Array, or Element} elems
             */
            Outlayer.prototype.unstamp = function (elems) {
                elems = this._find(elems);
                if (!elems) {
                    return;
                }

                for (var i = 0, len = elems.length; i < len; i++) {
                    var elem = elems[i];
                    // filter out removed stamp elements
                    utils.removeFrom(this.stamps, elem);
                    this.unignore(elem);
                }
            };

            /**
             * finds child elements
             * @param {NodeList, Array, Element, or String} elems
             * @returns {Array} elems
             */
            Outlayer.prototype._find = function (elems) {
                if (!elems) {
                    return;
                }
                // if string, use argument as selector string
                if (typeof elems === 'string') {
                    elems = this.element.querySelectorAll(elems);
                }
                elems = utils.makeArray(elems);
                return elems;
            };

            Outlayer.prototype._manageStamps = function () {
                if (!this.stamps || !this.stamps.length) {
                    return;
                }

                this._getBoundingRect();

                for (var i = 0, len = this.stamps.length; i < len; i++) {
                    var stamp = this.stamps[i];
                    this._manageStamp(stamp);
                }
            };

            // update boundingLeft / Top
            Outlayer.prototype._getBoundingRect = function () {
                // get bounding rect for container element
                var boundingRect = this.element.getBoundingClientRect();
                var size = this.size;
                this._boundingRect = {
                    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
                    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
                    right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
                    bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
                };
            };

            /**
             * @param {Element} stamp
             **/
            Outlayer.prototype._manageStamp = noop;

            /**
             * get x/y position of element relative to container element
             * @param {Element} elem
             * @returns {Object} offset - has left, top, right, bottom
             */
            Outlayer.prototype._getElementOffset = function (elem) {
                var boundingRect = elem.getBoundingClientRect();
                var thisRect = this._boundingRect;
                var size = getSize(elem);
                var offset = {
                    left: boundingRect.left - thisRect.left - size.marginLeft,
                    top: boundingRect.top - thisRect.top - size.marginTop,
                    right: thisRect.right - boundingRect.right - size.marginRight,
                    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
                };
                return offset;
            };

            // -------------------------- resize -------------------------- //

            // enable event handlers for listeners
            // i.e. resize -> onresize
            Outlayer.prototype.handleEvent = function (event) {
                var method = 'on' + event.type;
                if (this[method]) {
                    this[method](event);
                }
            };

            /**
             * Bind layout to window resizing
             */
            Outlayer.prototype.bindResize = function () {
                // bind just one listener
                if (this.isResizeBound) {
                    return;
                }
                eventie.bind(window, 'resize', this);
                this.isResizeBound = true;
            };

            /**
             * Unbind layout to window resizing
             */
            Outlayer.prototype.unbindResize = function () {
                if (this.isResizeBound) {
                    eventie.unbind(window, 'resize', this);
                }
                this.isResizeBound = false;
            };

            // original debounce by John Hann
            // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/

            // this fires every resize
            Outlayer.prototype.onresize = function () {
                if (this.resizeTimeout) {
                    clearTimeout(this.resizeTimeout);
                }

                var _this = this;

                function delayed() {
                    _this.resize();
                    delete _this.resizeTimeout;
                }

                this.resizeTimeout = setTimeout(delayed, 100);
            };

            // debounced, layout on resize
            Outlayer.prototype.resize = function () {
                // don't trigger if size did not change
                // or if resize was unbound. See #9
                if (!this.isResizeBound || !this.needsResizeLayout()) {
                    return;
                }

                this.layout();
            };

            /**
             * check if layout is needed post layout
             * @returns Boolean
             */
            Outlayer.prototype.needsResizeLayout = function () {
                var size = getSize(this.element);
                // check that this.size and size are there
                // IE8 triggers resize on body size change, so they might not be
                var hasSizes = this.size && size;
                return hasSizes && size.innerWidth !== this.size.innerWidth;
            };

            // -------------------------- methods -------------------------- //

            /**
             * add items to Outlayer instance
             * @param {Array or NodeList or Element} elems
             * @returns {Array} items - Outlayer.Items
             **/
            Outlayer.prototype.addItems = function (elems) {
                var items = this._itemize(elems);
                // add items to collection
                if (items.length) {
                    this.items = this.items.concat(items);
                }
                return items;
            };

            /**
             * Layout newly-appended item elements
             * @param {Array or NodeList or Element} elems
             */
            Outlayer.prototype.appended = function (elems) {
                var items = this.addItems(elems);
                if (!items.length) {
                    return;
                }
                // layout and reveal just the new items
                this.layoutItems(items, true);
                this.reveal(items);
            };

            /**
             * Layout prepended elements
             * @param {Array or NodeList or Element} elems
             */
            Outlayer.prototype.prepended = function (elems) {
                var items = this._itemize(elems);
                if (!items.length) {
                    return;
                }
                // add items to beginning of collection
                var previousItems = this.items.slice(0);
                this.items = items.concat(previousItems);
                // start new layout
                this._resetLayout();
                this._manageStamps();
                // layout new stuff without transition
                this.layoutItems(items, true);
                this.reveal(items);
                // layout previous items
                this.layoutItems(previousItems);
            };

            /**
             * reveal a collection of items
             * @param {Array of Outlayer.Items} items
             */
            Outlayer.prototype.reveal = function (items) {
                this._emitCompleteOnItems('reveal', items);

                var len = items && items.length;
                for (var i = 0; len && i < len; i++) {
                    var item = items[i];
                    item.reveal();
                }
            };

            /**
             * hide a collection of items
             * @param {Array of Outlayer.Items} items
             */
            Outlayer.prototype.hide = function (items) {
                this._emitCompleteOnItems('hide', items);

                var len = items && items.length;
                for (var i = 0; len && i < len; i++) {
                    var item = items[i];
                    item.hide();
                }
            };

            /**
             * reveal item elements
             * @param {Array}, {Element}, {NodeList} items
             */
            Outlayer.prototype.revealItemElements = function (elems) {
                var items = this.getItems(elems);
                this.reveal(items);
            };

            /**
             * hide item elements
             * @param {Array}, {Element}, {NodeList} items
             */
            Outlayer.prototype.hideItemElements = function (elems) {
                var items = this.getItems(elems);
                this.hide(items);
            };

            /**
             * get Outlayer.Item, given an Element
             * @param {Element} elem
             * @param {Function} callback
             * @returns {Outlayer.Item} item
             */
            Outlayer.prototype.getItem = function (elem) {
                // loop through items to get the one that matches
                for (var i = 0, len = this.items.length; i < len; i++) {
                    var item = this.items[i];
                    if (item.element === elem) {
                        // return item
                        return item;
                    }
                }
            };

            /**
             * get collection of Outlayer.Items, given Elements
             * @param {Array} elems
             * @returns {Array} items - Outlayer.Items
             */
            Outlayer.prototype.getItems = function (elems) {
                elems = utils.makeArray(elems);
                var items = [];
                for (var i = 0, len = elems.length; i < len; i++) {
                    var elem = elems[i];
                    var item = this.getItem(elem);
                    if (item) {
                        items.push(item);
                    }
                }

                return items;
            };

            /**
             * remove element(s) from instance and DOM
             * @param {Array or NodeList or Element} elems
             */
            Outlayer.prototype.remove = function (elems) {
                var removeItems = this.getItems(elems);

                this._emitCompleteOnItems('remove', removeItems);

                // bail if no items to remove
                if (!removeItems || !removeItems.length) {
                    return;
                }

                for (var i = 0, len = removeItems.length; i < len; i++) {
                    var item = removeItems[i];
                    item.remove();
                    // remove item from collection
                    utils.removeFrom(this.items, item);
                }
            };

            // ----- destroy ----- //

            // remove and disable Outlayer instance
            Outlayer.prototype.destroy = function () {
                // clean up dynamic styles
                var style = this.element.style;
                style.height = '';
                style.position = '';
                style.width = '';
                // destroy items
                for (var i = 0, len = this.items.length; i < len; i++) {
                    var item = this.items[i];
                    item.destroy();
                }

                this.unbindResize();

                var id = this.element.outlayerGUID;
                delete instances[id]; // remove reference to instance by id
                delete this.element.outlayerGUID;
                // remove data for jQuery
                if (jQuery) {
                    jQuery.removeData(this.element, this.constructor.namespace);
                }
            };

            // -------------------------- data -------------------------- //

            /**
             * get Outlayer instance from element
             * @param {Element} elem
             * @returns {Outlayer}
             */
            Outlayer.data = function (elem) {
                elem = utils.getQueryElement(elem);
                var id = elem && elem.outlayerGUID;
                return id && instances[id];
            };

            // -------------------------- create Outlayer class -------------------------- //

            /**
             * create a layout class
             * @param {String} namespace
             */
            Outlayer.create = function (namespace, options) {
                // sub-class Outlayer
                function Layout() {
                    Outlayer.apply(this, arguments);
                }

                // inherit Outlayer prototype, use Object.create if there
                if (Object.create) {
                    Layout.prototype = Object.create(Outlayer.prototype);
                } else {
                    utils.extend(Layout.prototype, Outlayer.prototype);
                }
                // set contructor, used for namespace and Item
                Layout.prototype.constructor = Layout;

                Layout.defaults = utils.extend({}, Outlayer.defaults);
                // apply new options
                utils.extend(Layout.defaults, options);
                // keep prototype.settings for backwards compatibility (Packery v1.2.0)
                Layout.prototype.settings = {};

                Layout.namespace = namespace;

                Layout.data = Outlayer.data;

                // sub-class Item
                Layout.Item = function LayoutItem() {
                    Item.apply(this, arguments);
                };

                Layout.Item.prototype = new Item();

                // -------------------------- declarative -------------------------- //

                utils.htmlInit(Layout, namespace);

                // -------------------------- jQuery bridge -------------------------- //

                // make into jQuery plugin
                if (jQuery && jQuery.bridget) {
                    jQuery.bridget(namespace, Layout);
                }

                return Layout;
            };

            // ----- fin ----- //

            // back in global
            Outlayer.Item = Item;

            return Outlayer;
        });

        /***/
    },
    /* 30 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_RESULT__;
        /*** IMPORTS FROM imports-loader ***/
        'use strict';

        (function () {

            /*!
             * EventEmitter v4.2.11 - git.io/ee
             * Unlicense - http://unlicense.org/
             * Oliver Caldwell - http://oli.me.uk/
             * @preserve
             */

            ;
            (function () {
                'use strict';

                /**
                 * Class for managing events.
                 * Can be extended to provide event functionality in other classes.
                 *
                 * @class EventEmitter Manages event registering and emitting.
                 */
                function EventEmitter() {
                }

                // Shortcuts to improve speed and size
                var proto = EventEmitter.prototype;
                var exports = this;
                var originalGlobalValue = exports.EventEmitter;

                /**
                 * Finds the index of the listener for the event in its storage array.
                 *
                 * @param {Function[]} listeners Array of listeners to search through.
                 * @param {Function} listener Method to look for.
                 * @return {Number} Index of the specified listener, -1 if not found
                 * @api private
                 */
                function indexOfListener(listeners, listener) {
                    var i = listeners.length;
                    while (i--) {
                        if (listeners[i].listener === listener) {
                            return i;
                        }
                    }

                    return -1;
                }

                /**
                 * Alias a method while keeping the context correct, to allow for overwriting of target method.
                 *
                 * @param {String} name The name of the target method.
                 * @return {Function} The aliased method
                 * @api private
                 */
                function alias(name) {
                    return function aliasClosure() {
                        return this[name].apply(this, arguments);
                    };
                }

                /**
                 * Returns the listener array for the specified event.
                 * Will initialise the event object and listener arrays if required.
                 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
                 * Each property in the object response is an array of listener functions.
                 *
                 * @param {String|RegExp} evt Name of the event to return the listeners from.
                 * @return {Function[]|Object} All listener functions for the event.
                 */
                proto.getListeners = function getListeners(evt) {
                    var events = this._getEvents();
                    var response;
                    var key;

                    // Return a concatenated array of all matching events if
                    // the selector is a regular expression.
                    if (evt instanceof RegExp) {
                        response = {};
                        for (key in events) {
                            if (events.hasOwnProperty(key) && evt.test(key)) {
                                response[key] = events[key];
                            }
                        }
                    } else {
                        response = events[evt] || (events[evt] = []);
                    }

                    return response;
                };

                /**
                 * Takes a list of listener objects and flattens it into a list of listener functions.
                 *
                 * @param {Object[]} listeners Raw listener objects.
                 * @return {Function[]} Just the listener functions.
                 */
                proto.flattenListeners = function flattenListeners(listeners) {
                    var flatListeners = [];
                    var i;

                    for (i = 0; i < listeners.length; i += 1) {
                        flatListeners.push(listeners[i].listener);
                    }

                    return flatListeners;
                };

                /**
                 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
                 *
                 * @param {String|RegExp} evt Name of the event to return the listeners from.
                 * @return {Object} All listener functions for an event in an object.
                 */
                proto.getListenersAsObject = function getListenersAsObject(evt) {
                    var listeners = this.getListeners(evt);
                    var response;

                    if (listeners instanceof Array) {
                        response = {};
                        response[evt] = listeners;
                    }

                    return response || listeners;
                };

                /**
                 * Adds a listener function to the specified event.
                 * The listener will not be added if it is a duplicate.
                 * If the listener returns true then it will be removed after it is called.
                 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
                 *
                 * @param {String|RegExp} evt Name of the event to attach the listener to.
                 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
                 * @return {Object} Current instance of EventEmitter for chaining.
                 */
                proto.addListener = function addListener(evt, listener) {
                    var listeners = this.getListenersAsObject(evt);
                    var listenerIsWrapped = typeof listener === 'object';
                    var key;

                    for (key in listeners) {
                        if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                            listeners[key].push(listenerIsWrapped ? listener : {
                                listener: listener,
                                once: false
                            });
                        }
                    }

                    return this;
                };

                /**
                 * Alias of addListener
                 */
                proto.on = alias('addListener');

                /**
                 * Semi-alias of addListener. It will add a listener that will be
                 * automatically removed after its first execution.
                 *
                 * @param {String|RegExp} evt Name of the event to attach the listener to.
                 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
                 * @return {Object} Current instance of EventEmitter for chaining.
                 */
                proto.addOnceListener = function addOnceListener(evt, listener) {
                    return this.addListener(evt, {
                        listener: listener,
                        once: true
                    });
                };

                /**
                 * Alias of addOnceListener.
                 */
                proto.once = alias('addOnceListener');

                /**
                 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
                 * You need to tell it what event names should be matched by a regex.
                 *
                 * @param {String} evt Name of the event to create.
                 * @return {Object} Current instance of EventEmitter for chaining.
                 */
                proto.defineEvent = function defineEvent(evt) {
                    this.getListeners(evt);
                    return this;
                };

                /**
                 * Uses defineEvent to define multiple events.
                 *
                 * @param {String[]} evts An array of event names to define.
                 * @return {Object} Current instance of EventEmitter for chaining.
                 */
                proto.defineEvents = function defineEvents(evts) {
                    for (var i = 0; i < evts.length; i += 1) {
                        this.defineEvent(evts[i]);
                    }
                    return this;
                };

                /**
                 * Removes a listener function from the specified event.
                 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
                 *
                 * @param {String|RegExp} evt Name of the event to remove the listener from.
                 * @param {Function} listener Method to remove from the event.
                 * @return {Object} Current instance of EventEmitter for chaining.
                 */
                proto.removeListener = function removeListener(evt, listener) {
                    var listeners = this.getListenersAsObject(evt);
                    var index;
                    var key;

                    for (key in listeners) {
                        if (listeners.hasOwnProperty(key)) {
                            index = indexOfListener(listeners[key], listener);

                            if (index !== -1) {
                                listeners[key].splice(index, 1);
                            }
                        }
                    }

                    return this;
                };

                /**
                 * Alias of removeListener
                 */
                proto.off = alias('removeListener');

                /**
                 * Adds listeners in bulk using the manipulateListeners method.
                 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
                 * You can also pass it a regular expression to add the array of listeners to all events that match it.
                 * Yeah, this function does quite a bit. That's probably a bad thing.
                 *
                 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
                 * @param {Function[]} [listeners] An optional array of listener functions to add.
                 * @return {Object} Current instance of EventEmitter for chaining.
                 */
                proto.addListeners = function addListeners(evt, listeners) {
                    // Pass through to manipulateListeners
                    return this.manipulateListeners(false, evt, listeners);
                };

                /**
                 * Removes listeners in bulk using the manipulateListeners method.
                 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
                 * You can also pass it an event name and an array of listeners to be removed.
                 * You can also pass it a regular expression to remove the listeners from all events that match it.
                 *
                 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
                 * @param {Function[]} [listeners] An optional array of listener functions to remove.
                 * @return {Object} Current instance of EventEmitter for chaining.
                 */
                proto.removeListeners = function removeListeners(evt, listeners) {
                    // Pass through to manipulateListeners
                    return this.manipulateListeners(true, evt, listeners);
                };

                /**
                 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
                 * The first argument will determine if the listeners are removed (true) or added (false).
                 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
                 * You can also pass it an event name and an array of listeners to be added/removed.
                 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
                 *
                 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
                 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
                 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
                 * @return {Object} Current instance of EventEmitter for chaining.
                 */
                proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
                    var i;
                    var value;
                    var single = remove ? this.removeListener : this.addListener;
                    var multiple = remove ? this.removeListeners : this.addListeners;

                    // If evt is an object then pass each of its properties to this method
                    if (typeof evt === 'object' && !(evt instanceof RegExp)) {
                        for (i in evt) {
                            if (evt.hasOwnProperty(i) && (value = evt[i])) {
                                // Pass the single listener straight through to the singular method
                                if (typeof value === 'function') {
                                    single.call(this, i, value);
                                } else {
                                    // Otherwise pass back to the multiple function
                                    multiple.call(this, i, value);
                                }
                            }
                        }
                    } else {
                        // So evt must be a string
                        // And listeners must be an array of listeners
                        // Loop over it and pass each one to the multiple method
                        i = listeners.length;
                        while (i--) {
                            single.call(this, evt, listeners[i]);
                        }
                    }

                    return this;
                };

                /**
                 * Removes all listeners from a specified event.
                 * If you do not specify an event then all listeners will be removed.
                 * That means every event will be emptied.
                 * You can also pass a regex to remove all events that match it.
                 *
                 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
                 * @return {Object} Current instance of EventEmitter for chaining.
                 */
                proto.removeEvent = function removeEvent(evt) {
                    var type = typeof evt;
                    var events = this._getEvents();
                    var key;

                    // Remove different things depending on the state of evt
                    if (type === 'string') {
                        // Remove all listeners for the specified event
                        delete events[evt];
                    } else if (evt instanceof RegExp) {
                        // Remove all events matching the regex.
                        for (key in events) {
                            if (events.hasOwnProperty(key) && evt.test(key)) {
                                delete events[key];
                            }
                        }
                    } else {
                        // Remove all listeners in all events
                        delete this._events;
                    }

                    return this;
                };

                /**
                 * Alias of removeEvent.
                 *
                 * Added to mirror the node API.
                 */
                proto.removeAllListeners = alias('removeEvent');

                /**
                 * Emits an event of your choice.
                 * When emitted, every listener attached to that event will be executed.
                 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
                 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
                 * So they will not arrive within the array on the other side, they will be separate.
                 * You can also pass a regular expression to emit to all events that match it.
                 *
                 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
                 * @param {Array} [args] Optional array of arguments to be passed to each listener.
                 * @return {Object} Current instance of EventEmitter for chaining.
                 */
                proto.emitEvent = function emitEvent(evt, args) {
                    var listenersMap = this.getListenersAsObject(evt);
                    var listeners;
                    var listener;
                    var i;
                    var key;
                    var response;

                    for (key in listenersMap) {
                        if (listenersMap.hasOwnProperty(key)) {
                            listeners = listenersMap[key].slice(0);
                            i = listeners.length;

                            while (i--) {
                                // If the listener returns true then it shall be removed from the event
                                // The function is executed either with a basic call or an apply if there is an args array
                                listener = listeners[i];

                                if (listener.once === true) {
                                    this.removeListener(evt, listener.listener);
                                }

                                response = listener.listener.apply(this, args || []);

                                if (response === this._getOnceReturnValue()) {
                                    this.removeListener(evt, listener.listener);
                                }
                            }
                        }
                    }

                    return this;
                };

                /**
                 * Alias of emitEvent
                 */
                proto.trigger = alias('emitEvent');

                /**
                 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
                 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
                 *
                 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
                 * @param {...*} Optional additional arguments to be passed to each listener.
                 * @return {Object} Current instance of EventEmitter for chaining.
                 */
                proto.emit = function emit(evt) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    return this.emitEvent(evt, args);
                };

                /**
                 * Sets the current value to check against when executing listeners. If a
                 * listeners return value matches the one set here then it will be removed
                 * after execution. This value defaults to true.
                 *
                 * @param {*} value The new value to check for when executing listeners.
                 * @return {Object} Current instance of EventEmitter for chaining.
                 */
                proto.setOnceReturnValue = function setOnceReturnValue(value) {
                    this._onceReturnValue = value;
                    return this;
                };

                /**
                 * Fetches the current value to check against when executing listeners. If
                 * the listeners return value matches this one then it should be removed
                 * automatically. It will return true by default.
                 *
                 * @return {*|Boolean} The current value to check for or the default, true.
                 * @api private
                 */
                proto._getOnceReturnValue = function _getOnceReturnValue() {
                    if (this.hasOwnProperty('_onceReturnValue')) {
                        return this._onceReturnValue;
                    } else {
                        return true;
                    }
                };

                /**
                 * Fetches the events object and creates one if required.
                 *
                 * @return {Object} The events storage object.
                 * @api private
                 */
                proto._getEvents = function _getEvents() {
                    return this._events || (this._events = {});
                };

                /**
                 * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
                 *
                 * @return {Function} Non conflicting EventEmitter class.
                 */
                EventEmitter.noConflict = function noConflict() {
                    exports.EventEmitter = originalGlobalValue;
                    return EventEmitter;
                };

                // Expose the class either via AMD, CommonJS or the global object
                if (true) {
                    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                        return EventEmitter;
                    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                } else if (typeof module === 'object' && module.exports) {
                    module.exports = EventEmitter;
                } else {
                    exports.EventEmitter = EventEmitter;
                }
            }).call(this);
        }).call(window);

        /***/
    },
    /* 31 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /**
         * Outlayer Item
         */

        'use strict';

        (function (window, factory) {
            'use strict';
            // universal module definition
            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(30), __webpack_require__(23), __webpack_require__(24), __webpack_require__(26)], __WEBPACK_AMD_DEFINE_RESULT__ = function (EventEmitter, getSize, getStyleProperty, utils) {
                    return factory(window, EventEmitter, getSize, getStyleProperty, utils);
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports === 'object') {
                // CommonJS
                module.exports = factory(window, require('wolfy87-eventemitter'), require('get-size'), require('desandro-get-style-property'), require('fizzy-ui-utils'));
            } else {
                // browser global
                window.Outlayer = {};
                window.Outlayer.Item = factory(window, window.EventEmitter, window.getSize, window.getStyleProperty, window.fizzyUIUtils);
            }
        })(window, function factory(window, EventEmitter, getSize, getStyleProperty, utils) {
            'use strict';

            // ----- helpers ----- //

            var getComputedStyle = window.getComputedStyle;
            var getStyle = getComputedStyle ? function (elem) {
                return getComputedStyle(elem, null);
            } : function (elem) {
                return elem.currentStyle;
            };

            function isEmptyObj(obj) {
                for (var prop in obj) {
                    return false;
                }
                prop = null;
                return true;
            }

            // -------------------------- CSS3 support -------------------------- //

            var transitionProperty = getStyleProperty('transition');
            var transformProperty = getStyleProperty('transform');
            var supportsCSS3 = transitionProperty && transformProperty;
            var is3d = !!getStyleProperty('perspective');

            var transitionEndEvent = ({
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'otransitionend',
                transition: 'transitionend'
            })[transitionProperty];

            // properties that could have vendor prefix
            var prefixableProperties = ['transform', 'transition', 'transitionDuration', 'transitionProperty'];

            // cache all vendor properties
            var vendorProperties = (function () {
                var cache = {};
                for (var i = 0, len = prefixableProperties.length; i < len; i++) {
                    var prop = prefixableProperties[i];
                    var supportedProp = getStyleProperty(prop);
                    if (supportedProp && supportedProp !== prop) {
                        cache[prop] = supportedProp;
                    }
                }
                return cache;
            })();

            // -------------------------- Item -------------------------- //

            function Item(element, layout) {
                if (!element) {
                    return;
                }

                this.element = element;
                // parent layout class, i.e. Masonry, Isotope, or Packery
                this.layout = layout;
                this.position = {
                    x: 0,
                    y: 0
                };

                this._create();
            }

            // inherit EventEmitter
            utils.extend(Item.prototype, EventEmitter.prototype);

            Item.prototype._create = function () {
                // transition objects
                this._transn = {
                    ingProperties: {},
                    clean: {},
                    onEnd: {}
                };

                this.css({
                    position: 'absolute'
                });
            };

            // trigger specified handler for event type
            Item.prototype.handleEvent = function (event) {
                var method = 'on' + event.type;
                if (this[method]) {
                    this[method](event);
                }
            };

            Item.prototype.getSize = function () {
                this.size = getSize(this.element);
            };

            /**
             * apply CSS styles to element
             * @param {Object} style
             */
            Item.prototype.css = function (style) {
                var elemStyle = this.element.style;

                for (var prop in style) {
                    // use vendor property if available
                    var supportedProp = vendorProperties[prop] || prop;
                    elemStyle[supportedProp] = style[prop];
                }
            };

            // measure position, and sets it
            Item.prototype.getPosition = function () {
                var style = getStyle(this.element);
                var layoutOptions = this.layout.options;
                var isOriginLeft = layoutOptions.isOriginLeft;
                var isOriginTop = layoutOptions.isOriginTop;
                var xValue = style[isOriginLeft ? 'left' : 'right'];
                var yValue = style[isOriginTop ? 'top' : 'bottom'];
                // convert percent to pixels
                var layoutSize = this.layout.size;
                var x = xValue.indexOf('%') != -1 ? parseFloat(xValue) / 100 * layoutSize.width : parseInt(xValue, 10);
                var y = yValue.indexOf('%') != -1 ? parseFloat(yValue) / 100 * layoutSize.height : parseInt(yValue, 10);

                // clean up 'auto' or other non-integer values
                x = isNaN(x) ? 0 : x;
                y = isNaN(y) ? 0 : y;
                // remove padding from measurement
                x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
                y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

                this.position.x = x;
                this.position.y = y;
            };

            // set settled position, apply padding
            Item.prototype.layoutPosition = function () {
                var layoutSize = this.layout.size;
                var layoutOptions = this.layout.options;
                var style = {};

                // x
                var xPadding = layoutOptions.isOriginLeft ? 'paddingLeft' : 'paddingRight';
                var xProperty = layoutOptions.isOriginLeft ? 'left' : 'right';
                var xResetProperty = layoutOptions.isOriginLeft ? 'right' : 'left';

                var x = this.position.x + layoutSize[xPadding];
                // set in percentage or pixels
                style[xProperty] = this.getXValue(x);
                // reset other property
                style[xResetProperty] = '';

                // y
                var yPadding = layoutOptions.isOriginTop ? 'paddingTop' : 'paddingBottom';
                var yProperty = layoutOptions.isOriginTop ? 'top' : 'bottom';
                var yResetProperty = layoutOptions.isOriginTop ? 'bottom' : 'top';

                var y = this.position.y + layoutSize[yPadding];
                // set in percentage or pixels
                style[yProperty] = this.getYValue(y);
                // reset other property
                style[yResetProperty] = '';

                this.css(style);
                this.emitEvent('layout', [this]);
            };

            Item.prototype.getXValue = function (x) {
                var layoutOptions = this.layout.options;
                return layoutOptions.percentPosition && !layoutOptions.isHorizontal ? x / this.layout.size.width * 100 + '%' : x + 'px';
            };

            Item.prototype.getYValue = function (y) {
                var layoutOptions = this.layout.options;
                return layoutOptions.percentPosition && layoutOptions.isHorizontal ? y / this.layout.size.height * 100 + '%' : y + 'px';
            };

            Item.prototype._transitionTo = function (x, y) {
                this.getPosition();
                // get current x & y from top/left
                var curX = this.position.x;
                var curY = this.position.y;

                var compareX = parseInt(x, 10);
                var compareY = parseInt(y, 10);
                var didNotMove = compareX === this.position.x && compareY === this.position.y;

                // save end position
                this.setPosition(x, y);

                // if did not move and not transitioning, just go to layout
                if (didNotMove && !this.isTransitioning) {
                    this.layoutPosition();
                    return;
                }

                var transX = x - curX;
                var transY = y - curY;
                var transitionStyle = {};
                transitionStyle.transform = this.getTranslate(transX, transY);

                this.transition({
                    to: transitionStyle,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: true
                });
            };

            Item.prototype.getTranslate = function (x, y) {
                // flip cooridinates if origin on right or bottom
                var layoutOptions = this.layout.options;
                x = layoutOptions.isOriginLeft ? x : -x;
                y = layoutOptions.isOriginTop ? y : -y;

                if (is3d) {
                    return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
                }

                return 'translate(' + x + 'px, ' + y + 'px)';
            };

            // non transition + transform support
            Item.prototype.goTo = function (x, y) {
                this.setPosition(x, y);
                this.layoutPosition();
            };

            // use transition and transforms if supported
            Item.prototype.moveTo = supportsCSS3 ? Item.prototype._transitionTo : Item.prototype.goTo;

            Item.prototype.setPosition = function (x, y) {
                this.position.x = parseInt(x, 10);
                this.position.y = parseInt(y, 10);
            };

            // ----- transition ----- //

            /**
             * @param {Object} style - CSS
             * @param {Function} onTransitionEnd
             */

                // non transition, just trigger callback
            Item.prototype._nonTransition = function (args) {
                this.css(args.to);
                if (args.isCleaning) {
                    this._removeStyles(args.to);
                }
                for (var prop in args.onTransitionEnd) {
                    args.onTransitionEnd[prop].call(this);
                }
            };

            /**
             * proper transition
             * @param {Object} args - arguments
             *   @param {Object} to - style to transition to
             *   @param {Object} from - style to start transition from
             *   @param {Boolean} isCleaning - removes transition styles after transition
             *   @param {Function} onTransitionEnd - callback
             */
            Item.prototype._transition = function (args) {
                // redirect to nonTransition if no transition duration
                if (!parseFloat(this.layout.options.transitionDuration)) {
                    this._nonTransition(args);
                    return;
                }

                var _transition = this._transn;
                // keep track of onTransitionEnd callback by css property
                for (var prop in args.onTransitionEnd) {
                    _transition.onEnd[prop] = args.onTransitionEnd[prop];
                }
                // keep track of properties that are transitioning
                for (prop in args.to) {
                    _transition.ingProperties[prop] = true;
                    // keep track of properties to clean up when transition is done
                    if (args.isCleaning) {
                        _transition.clean[prop] = true;
                    }
                }

                // set from styles
                if (args.from) {
                    this.css(args.from);
                    // force redraw. http://blog.alexmaccaw.com/css-transitions
                    var h = this.element.offsetHeight;
                    // hack for JSHint to hush about unused var
                    h = null;
                }
                // enable transition
                this.enableTransition(args.to);
                // set styles that are transitioning
                this.css(args.to);

                this.isTransitioning = true;
            };

            // dash before all cap letters, including first for
            // WebkitTransform => -webkit-transform
            function toDashedAll(str) {
                return str.replace(/([A-Z])/g, function ($1) {
                    return '-' + $1.toLowerCase();
                });
            }

            var transitionProps = 'opacity,' + toDashedAll(vendorProperties.transform || 'transform');

            Item.prototype.enableTransition = function () /* style */ {
                // HACK changing transitionProperty during a transition
                // will cause transition to jump
                if (this.isTransitioning) {
                    return;
                }

                // make `transition: foo, bar, baz` from style object
                // HACK un-comment this when enableTransition can work
                // while a transition is happening
                // var transitionValues = [];
                // for ( var prop in style ) {
                //   // dash-ify camelCased properties like WebkitTransition
                //   prop = vendorProperties[ prop ] || prop;
                //   transitionValues.push( toDashedAll( prop ) );
                // }
                // enable transition styles
                this.css({
                    transitionProperty: transitionProps,
                    transitionDuration: this.layout.options.transitionDuration
                });
                // listen for transition end event
                this.element.addEventListener(transitionEndEvent, this, false);
            };

            Item.prototype.transition = Item.prototype[transitionProperty ? '_transition' : '_nonTransition'];

            // ----- events ----- //

            Item.prototype.onwebkitTransitionEnd = function (event) {
                this.ontransitionend(event);
            };

            Item.prototype.onotransitionend = function (event) {
                this.ontransitionend(event);
            };

            // properties that I munge to make my life easier
            var dashedVendorProperties = {
                '-webkit-transform': 'transform',
                '-moz-transform': 'transform',
                '-o-transform': 'transform'
            };

            Item.prototype.ontransitionend = function (event) {
                // disregard bubbled events from children
                if (event.target !== this.element) {
                    return;
                }
                var _transition = this._transn;
                // get property name of transitioned property, convert to prefix-free
                var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;

                // remove property that has completed transitioning
                delete _transition.ingProperties[propertyName];
                // check if any properties are still transitioning
                if (isEmptyObj(_transition.ingProperties)) {
                    // all properties have completed transitioning
                    this.disableTransition();
                }
                // clean style
                if (propertyName in _transition.clean) {
                    // clean up style
                    this.element.style[event.propertyName] = '';
                    delete _transition.clean[propertyName];
                }
                // trigger onTransitionEnd callback
                if (propertyName in _transition.onEnd) {
                    var onTransitionEnd = _transition.onEnd[propertyName];
                    onTransitionEnd.call(this);
                    delete _transition.onEnd[propertyName];
                }

                this.emitEvent('transitionEnd', [this]);
            };

            Item.prototype.disableTransition = function () {
                this.removeTransitionStyles();
                this.element.removeEventListener(transitionEndEvent, this, false);
                this.isTransitioning = false;
            };

            /**
             * removes style property from element
             * @param {Object} style
             **/
            Item.prototype._removeStyles = function (style) {
                // clean up transition styles
                var cleanStyle = {};
                for (var prop in style) {
                    cleanStyle[prop] = '';
                }
                this.css(cleanStyle);
            };

            var cleanTransitionStyle = {
                transitionProperty: '',
                transitionDuration: ''
            };

            Item.prototype.removeTransitionStyles = function () {
                // remove transition
                this.css(cleanTransitionStyle);
            };

            // ----- show/hide/remove ----- //

            // remove element from DOM
            Item.prototype.removeElem = function () {
                this.element.parentNode.removeChild(this.element);
                // remove display: none
                this.css({display: ''});
                this.emitEvent('remove', [this]);
            };

            Item.prototype.remove = function () {
                // just remove element if no transition support or no transition
                if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
                    this.removeElem();
                    return;
                }

                // start transition
                var _this = this;
                this.once('transitionEnd', function () {
                    _this.removeElem();
                });
                this.hide();
            };

            Item.prototype.reveal = function () {
                delete this.isHidden;
                // remove display: none
                this.css({display: ''});

                var options = this.layout.options;

                var onTransitionEnd = {};
                var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
                onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;

                this.transition({
                    from: options.hiddenStyle,
                    to: options.visibleStyle,
                    isCleaning: true,
                    onTransitionEnd: onTransitionEnd
                });
            };

            Item.prototype.onRevealTransitionEnd = function () {
                // check if still visible
                // during transition, item may have been hidden
                if (!this.isHidden) {
                    this.emitEvent('reveal');
                }
            };

            /**
             * get style property use for hide/reveal transition end
             * @param {String} styleProperty - hiddenStyle/visibleStyle
             * @returns {String}
             */
            Item.prototype.getHideRevealTransitionEndProperty = function (styleProperty) {
                var optionStyle = this.layout.options[styleProperty];
                // use opacity
                if (optionStyle.opacity) {
                    return 'opacity';
                }
                // get first property
                for (var prop in optionStyle) {
                    return prop;
                }
            };

            Item.prototype.hide = function () {
                // set flag
                this.isHidden = true;
                // remove display: none
                this.css({display: ''});

                var options = this.layout.options;

                var onTransitionEnd = {};
                var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
                onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;

                this.transition({
                    from: options.visibleStyle,
                    to: options.hiddenStyle,
                    // keep hidden stuff hidden
                    isCleaning: true,
                    onTransitionEnd: onTransitionEnd
                });
            };

            Item.prototype.onHideTransitionEnd = function () {
                // check if still hidden
                // during transition, item may have been un-hidden
                if (this.isHidden) {
                    this.css({display: 'none'});
                    this.emitEvent('hide');
                }
            };

            Item.prototype.destroy = function () {
                this.css({
                    position: '',
                    left: '',
                    right: '',
                    top: '',
                    bottom: '',
                    transition: '',
                    transform: ''
                });
            };

            return Item;
        });

        /***/
    },
    /* 32 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /**
         * Isotope LayoutMode
         */

        'use strict';

        (function (window, factory) {
            'use strict';
            // universal module definition

            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(23), __webpack_require__(29)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports == 'object') {
                // CommonJS
                module.exports = factory(require('get-size'), require('outlayer'));
            } else {
                // browser global
                window.Isotope = window.Isotope || {};
                window.Isotope.LayoutMode = factory(window.getSize, window.Outlayer);
            }
        })(window, function factory(getSize, Outlayer) {
            'use strict';

            // layout mode class
            function LayoutMode(isotope) {
                this.isotope = isotope;
                // link properties
                if (isotope) {
                    this.options = isotope.options[this.namespace];
                    this.element = isotope.element;
                    this.items = isotope.filteredItems;
                    this.size = isotope.size;
                }
            }

            /**
             * some methods should just defer to default Outlayer method
             * and reference the Isotope instance as `this`
             **/
            (function () {
                var facadeMethods = ['_resetLayout', '_getItemLayoutPosition', '_manageStamp', '_getContainerSize', '_getElementOffset', 'needsResizeLayout'];

                for (var i = 0, len = facadeMethods.length; i < len; i++) {
                    var methodName = facadeMethods[i];
                    LayoutMode.prototype[methodName] = getOutlayerMethod(methodName);
                }

                function getOutlayerMethod(methodName) {
                    return function () {
                        return Outlayer.prototype[methodName].apply(this.isotope, arguments);
                    };
                }
            })();

            // -----  ----- //

            // for horizontal layout modes, check vertical size
            LayoutMode.prototype.needsVerticalResizeLayout = function () {
                // don't trigger if size did not change
                var size = getSize(this.isotope.element);
                // check that this.size and size are there
                // IE8 triggers resize on body size change, so they might not be
                var hasSizes = this.isotope.size && size;
                return hasSizes && size.innerHeight != this.isotope.size.innerHeight;
            };

            // ----- measurements ----- //

            LayoutMode.prototype._getMeasurement = function () {
                this.isotope._getMeasurement.apply(this, arguments);
            };

            LayoutMode.prototype.getColumnWidth = function () {
                this.getSegmentSize('column', 'Width');
            };

            LayoutMode.prototype.getRowHeight = function () {
                this.getSegmentSize('row', 'Height');
            };

            /**
             * get columnWidth or rowHeight
             * segment: 'column' or 'row'
             * size 'Width' or 'Height'
             **/
            LayoutMode.prototype.getSegmentSize = function (segment, size) {
                var segmentName = segment + size;
                var outerSize = 'outer' + size;
                // columnWidth / outerWidth // rowHeight / outerHeight
                this._getMeasurement(segmentName, outerSize);
                // got rowHeight or columnWidth, we can chill
                if (this[segmentName]) {
                    return;
                }
                // fall back to item of first element
                var firstItemSize = this.getFirstItemSize();
                this[segmentName] = firstItemSize && firstItemSize[outerSize] ||
                        // or size of container
                    this.isotope.size['inner' + size];
            };

            LayoutMode.prototype.getFirstItemSize = function () {
                var firstItem = this.isotope.filteredItems[0];
                return firstItem && firstItem.element && getSize(firstItem.element);
            };

            // ----- methods that should reference isotope ----- //

            LayoutMode.prototype.layout = function () {
                this.isotope.layout.apply(this.isotope, arguments);
            };

            LayoutMode.prototype.getSize = function () {
                this.isotope.getSize();
                this.size = this.isotope.size;
            };

            // -------------------------- create -------------------------- //

            LayoutMode.modes = {};

            LayoutMode.create = function (namespace, options) {

                function Mode() {
                    LayoutMode.apply(this, arguments);
                }

                Mode.prototype = new LayoutMode();

                // default options
                if (options) {
                    Mode.options = options;
                }

                Mode.prototype.namespace = namespace;
                // register in Isotope
                LayoutMode.modes[namespace] = Mode;

                return Mode;
            };

            return LayoutMode;
        });

        /***/
    },
    /* 33 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /*!
         * Masonry layout mode
         * sub-classes Masonry
         * http://masonry.desandro.com
         */

        'use strict';

        (function (window, factory) {
            'use strict';
            // universal module definition
            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(32), __webpack_require__(34)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports == 'object') {
                // CommonJS
                module.exports = factory(require('../layout-mode'), require('masonry-layout'));
            } else {
                // browser global
                factory(window.Isotope.LayoutMode, window.Masonry);
            }
        })(window, function factory(LayoutMode, Masonry) {
            'use strict';

            // -------------------------- helpers -------------------------- //

            // extend objects
            function extend(a, b) {
                for (var prop in b) {
                    a[prop] = b[prop];
                }
                return a;
            }

            // -------------------------- masonryDefinition -------------------------- //

            // create an Outlayer layout class
            var MasonryMode = LayoutMode.create('masonry');

            // save on to these methods
            var _getElementOffset = MasonryMode.prototype._getElementOffset;
            var layout = MasonryMode.prototype.layout;
            var _getMeasurement = MasonryMode.prototype._getMeasurement;

            // sub-class Masonry
            extend(MasonryMode.prototype, Masonry.prototype);

            // set back, as it was overwritten by Masonry
            MasonryMode.prototype._getElementOffset = _getElementOffset;
            MasonryMode.prototype.layout = layout;
            MasonryMode.prototype._getMeasurement = _getMeasurement;

            var measureColumns = MasonryMode.prototype.measureColumns;
            MasonryMode.prototype.measureColumns = function () {
                // set items, used if measuring first item
                this.items = this.isotope.filteredItems;
                measureColumns.call(this);
            };

            // HACK copy over isOriginLeft/Top options
            var _manageStamp = MasonryMode.prototype._manageStamp;
            MasonryMode.prototype._manageStamp = function () {
                this.options.isOriginLeft = this.isotope.options.isOriginLeft;
                this.options.isOriginTop = this.isotope.options.isOriginTop;
                _manageStamp.apply(this, arguments);
            };

            return MasonryMode;
        });

        /***/
    },
    /* 34 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /*!
         * Masonry v3.3.2
         * Cascading grid layout library
         * http://masonry.desandro.com
         * MIT License
         * by David DeSandro
         */

        'use strict';

        (function (window, factory) {
            'use strict';
            // universal module definition
            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(29), __webpack_require__(23), __webpack_require__(26)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports === 'object') {
                // CommonJS
                module.exports = factory(require('outlayer'), require('get-size'), require('fizzy-ui-utils'));
            } else {
                // browser global
                window.Masonry = factory(window.Outlayer, window.getSize, window.fizzyUIUtils);
            }
        })(window, function factory(Outlayer, getSize, utils) {

            'use strict';

            // -------------------------- masonryDefinition -------------------------- //

            // create an Outlayer layout class
            var Masonry = Outlayer.create('masonry');

            Masonry.prototype._resetLayout = function () {
                this.getSize();
                this._getMeasurement('columnWidth', 'outerWidth');
                this._getMeasurement('gutter', 'outerWidth');
                this.measureColumns();

                // reset column Y
                var i = this.cols;
                this.colYs = [];
                while (i--) {
                    this.colYs.push(0);
                }

                this.maxY = 0;
            };

            Masonry.prototype.measureColumns = function () {
                this.getContainerWidth();
                // if columnWidth is 0, default to outerWidth of first item
                if (!this.columnWidth) {
                    var firstItem = this.items[0];
                    var firstItemElem = firstItem && firstItem.element;
                    // columnWidth fall back to item of first element
                    this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth ||
                            // if first elem has no width, default to size of container
                        this.containerWidth;
                }

                var columnWidth = this.columnWidth += this.gutter;

                // calculate columns
                var containerWidth = this.containerWidth + this.gutter;
                var cols = containerWidth / columnWidth;
                // fix rounding errors, typically with gutters
                var excess = columnWidth - containerWidth % columnWidth;
                // if overshoot is less than a pixel, round up, otherwise floor it
                var mathMethod = excess && excess < 1 ? 'round' : 'floor';
                cols = Math[mathMethod](cols);
                this.cols = Math.max(cols, 1);
            };

            Masonry.prototype.getContainerWidth = function () {
                // container is parent if fit width
                var container = this.options.isFitWidth ? this.element.parentNode : this.element;
                // check that this.size and size are there
                // IE8 triggers resize on body size change, so they might not be
                var size = getSize(container);
                this.containerWidth = size && size.innerWidth;
            };

            Masonry.prototype._getItemLayoutPosition = function (item) {
                item.getSize();
                // how many columns does this brick span
                var remainder = item.size.outerWidth % this.columnWidth;
                var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
                // round if off by 1 pixel, otherwise use ceil
                var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
                colSpan = Math.min(colSpan, this.cols);

                var colGroup = this._getColGroup(colSpan);
                // get the minimum Y value from the columns
                var minimumY = Math.min.apply(Math, colGroup);
                var shortColIndex = utils.indexOf(colGroup, minimumY);

                // position the brick
                var position = {
                    x: this.columnWidth * shortColIndex,
                    y: minimumY
                };

                // apply setHeight to necessary columns
                var setHeight = minimumY + item.size.outerHeight;
                var setSpan = this.cols + 1 - colGroup.length;
                for (var i = 0; i < setSpan; i++) {
                    this.colYs[shortColIndex + i] = setHeight;
                }

                return position;
            };

            /**
             * @param {Number} colSpan - number of columns the element spans
             * @returns {Array} colGroup
             */
            Masonry.prototype._getColGroup = function (colSpan) {
                if (colSpan < 2) {
                    // if brick spans only one column, use all the column Ys
                    return this.colYs;
                }

                var colGroup = [];
                // how many different places could this brick fit horizontally
                var groupCount = this.cols + 1 - colSpan;
                // for each group potential horizontal position
                for (var i = 0; i < groupCount; i++) {
                    // make an array of colY values for that one group
                    var groupColYs = this.colYs.slice(i, i + colSpan);
                    // and get the max value of the array
                    colGroup[i] = Math.max.apply(Math, groupColYs);
                }
                return colGroup;
            };

            Masonry.prototype._manageStamp = function (stamp) {
                var stampSize = getSize(stamp);
                var offset = this._getElementOffset(stamp);
                // get the columns that this stamp affects
                var firstX = this.options.isOriginLeft ? offset.left : offset.right;
                var lastX = firstX + stampSize.outerWidth;
                var firstCol = Math.floor(firstX / this.columnWidth);
                firstCol = Math.max(0, firstCol);
                var lastCol = Math.floor(lastX / this.columnWidth);
                // lastCol should not go over if multiple of columnWidth #425
                lastCol -= lastX % this.columnWidth ? 0 : 1;
                lastCol = Math.min(this.cols - 1, lastCol);
                // set colYs to bottom of the stamp
                var stampMaxY = (this.options.isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;
                for (var i = firstCol; i <= lastCol; i++) {
                    this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
                }
            };

            Masonry.prototype._getContainerSize = function () {
                this.maxY = Math.max.apply(Math, this.colYs);
                var size = {
                    height: this.maxY
                };

                if (this.options.isFitWidth) {
                    size.width = this._getContainerFitWidth();
                }

                return size;
            };

            Masonry.prototype._getContainerFitWidth = function () {
                var unusedCols = 0;
                // count unused columns
                var i = this.cols;
                while (--i) {
                    if (this.colYs[i] !== 0) {
                        break;
                    }
                    unusedCols++;
                }
                // fit container to columns that have been used
                return (this.cols - unusedCols) * this.columnWidth - this.gutter;
            };

            Masonry.prototype.needsResizeLayout = function () {
                var previousWidth = this.containerWidth;
                this.getContainerWidth();
                return previousWidth !== this.containerWidth;
            };

            return Masonry;
        });

        /***/
    },
    /* 35 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /**
         * fitRows layout mode
         */

        'use strict';

        (function (window, factory) {
            'use strict';
            // universal module definition
            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(32)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports == 'object') {
                // CommonJS
                module.exports = factory(require('../layout-mode'));
            } else {
                // browser global
                factory(window.Isotope.LayoutMode);
            }
        })(window, function factory(LayoutMode) {
            'use strict';

            var FitRows = LayoutMode.create('fitRows');

            FitRows.prototype._resetLayout = function () {
                this.x = 0;
                this.y = 0;
                this.maxY = 0;
                this._getMeasurement('gutter', 'outerWidth');
            };

            FitRows.prototype._getItemLayoutPosition = function (item) {
                item.getSize();

                var itemWidth = item.size.outerWidth + this.gutter;
                // if this element cannot fit in the current row
                var containerWidth = this.isotope.size.innerWidth + this.gutter;
                if (this.x !== 0 && itemWidth + this.x > containerWidth) {
                    this.x = 0;
                    this.y = this.maxY;
                }

                var position = {
                    x: this.x,
                    y: this.y
                };

                this.maxY = Math.max(this.maxY, this.y + item.size.outerHeight);
                this.x += itemWidth;

                return position;
            };

            FitRows.prototype._getContainerSize = function () {
                return {height: this.maxY};
            };

            return FitRows;
        });

        /***/
    },
    /* 36 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /**
         * vertical layout mode
         */

        'use strict';

        (function (window, factory) {
            'use strict';
            // universal module definition
            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(32)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports == 'object') {
                // CommonJS
                module.exports = factory(require('../layout-mode'));
            } else {
                // browser global
                factory(window.Isotope.LayoutMode);
            }
        })(window, function factory(LayoutMode) {
            'use strict';

            var Vertical = LayoutMode.create('vertical', {
                horizontalAlignment: 0
            });

            Vertical.prototype._resetLayout = function () {
                this.y = 0;
            };

            Vertical.prototype._getItemLayoutPosition = function (item) {
                item.getSize();
                var x = (this.isotope.size.innerWidth - item.size.outerWidth) * this.options.horizontalAlignment;
                var y = this.y;
                this.y += item.size.outerHeight;
                return {x: x, y: y};
            };

            Vertical.prototype._getContainerSize = function () {
                return {height: this.y};
            };

            return Vertical;
        });

        /***/
    },
    /* 37 */
    /***/ function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /**
         * Isotope Item
         **/

        'use strict';

        (function (window, factory) {
            'use strict';
            // universal module definition
            if (true) {
                // AMD
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(29)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (typeof exports == 'object') {
                // CommonJS
                module.exports = factory(require('outlayer'));
            } else {
                // browser global
                window.Isotope = window.Isotope || {};
                window.Isotope.Item = factory(window.Outlayer);
            }
        })(window, function factory(Outlayer) {
            'use strict';

            // -------------------------- Item -------------------------- //

            // sub-class Outlayer Item
            function Item() {
                Outlayer.Item.apply(this, arguments);
            }

            Item.prototype = new Outlayer.Item();

            Item.prototype._create = function () {
                // assign id, used for original-order sorting
                this.id = this.layout.itemGUID++;
                Outlayer.Item.prototype._create.call(this);
                this.sortData = {};
            };

            Item.prototype.updateSortData = function () {
                if (this.isIgnored) {
                    return;
                }
                // default sorters
                this.sortData.id = this.id;
                // for backward compatibility
                this.sortData['original-order'] = this.id;
                this.sortData.random = Math.random();
                // go thru getSortData obj and apply the sorters
                var getSortData = this.layout.options.getSortData;
                var sorters = this.layout._sorters;
                for (var key in getSortData) {
                    var sorter = sorters[key];
                    this.sortData[key] = sorter(this.element, this);
                }
            };

            var _destroy = Item.prototype.destroy;
            Item.prototype.destroy = function () {
                // call super
                _destroy.apply(this, arguments);
                // reset display, #741
                this.css({
                    display: ''
                });
            };

            return Item;
        });

        /***/
    },
    /* 38 */
    /***/ function (module, exports) {

        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var screen_all_min = 0;
        exports.screen_all_min = screen_all_min;
        var screen_xs_max = 768;

        exports.screen_xs_max = screen_xs_max;
        // 769px 及以上为电脑版
        var screen_md_min = 769;
        exports.screen_md_min = screen_md_min;
        var screen_md_max = 9999;
        exports.screen_md_max = screen_md_max;

        /***/
    },
    /* 39 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function ($) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true
            });

            var _createClass = (function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ('value' in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            })();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                }
            }

            __webpack_require__(40);

            __webpack_require__(41);

            __webpack_require__(42);

            /**
             * Common
             * @constructor
             * @classdesc Common Class Constructor
             */

            var Common = (function () {
                function Common() {
                    _classCallCheck(this, Common);
                }

                _createClass(Common, [{
                    key: 'chinanetSuffix',
                    value: function chinanetSuffix() {
                        $('a').each(function () {
                            var _href = $(this).attr('href');
                            $(this).attr('href', _href + '?gd10002');
                        });
                    }
                }, {
                    key: 'fjSuffix',
                    value: function fjSuffix() {
                        $('a').each(function () {
                            // 具有下列class的 a tag 不加后缀
                            if (!$(this).hasClass('goto-top') && !$(this).hasClass('fj_login') && !$(this).hasClass('fj_register') && !$(this).hasClass('imagelightbox') && !$(this).hasClass('js-widget-app-info')) {
                                var _href = $(this).attr('href');
                                if (_href !== undefined) {
                                    var hashIndex = _href.indexOf('#');
                                    if (hashIndex > -1) {
                                        var href = _href.substring(0, hashIndex) + '?fj189' + _href.substring(hashIndex);
                                        $(this).attr('href', href);
                                    } else {
                                        $(this).attr('href', _href + '?fj189');
                                    }
                                }
                            }
                        });
                    }
                }, {
                    key: 'androidSuffix',
                    value: function androidSuffix() {
                        $('a').each(function () {
                            var _href = $('a').attr('href');
                            $('a').attr('href', _href + '?client_android');
                        });
                    }
                }, {
                    key: 'headerScrollDesktop',
                    value: function headerScrollDesktop() {
                        var sayaHeader = document.querySelector('.saya-header');
                        if (sayaHeader !== null) {
                            var headerHeadroom = new Headroom(sayaHeader, {
                                "tolerance": 1,
                                "offset": 63,
                                "classes": {
                                    "top": "headroom-header-top-desktop",
                                    "notTop": "headroom-header-not-top-desktop"
                                }
                            });
                            headerHeadroom.init();
                        }
                    }
                }, {
                    key: 'headerScrollMobile',
                    value: function headerScrollMobile() {
                        var sayaHeader = document.querySelector('.saya-header');
                        if (sayaHeader !== null) {
                            var headerHeadroom = new Headroom(sayaHeader, {
                                "tolerance": 1,
                                "offset": 63,
                                "classes": {
                                    "top": "headroom-header-top-mobile",
                                    "notTop": "headroom-header-not-top-mobile",
                                    "unpinned": "headroom-header-unpinned-mobile"
                                }
                            });
                            headerHeadroom.init();
                        }
                    }
                }, {
                    key: 'activeSubmenu',
                    value: function activeSubmenu(row) {
                        var $row = $(row);
                        $row.children('.sub-menu').addClass('animated').show().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass('animated');
                        });
                    }
                }, {
                    key: 'deactivateSubMenu',
                    value: function deactivateSubMenu(row) {
                        var $row = $(row);
                        $row.children('.sub-menu').hide();
                    }
                }, {
                    key: 'menuDelay',
                    value: function menuDelay() {
                        $('.header-desktop #menu').menuAim({

                            activate: Common.prototype.activeSubmenu,
                            deactivate: Common.prototype.deactivateSubMenu,

                            // exit: deactivateSubMenu,

                            exitMenu: function exitMenu() {
                                return true;
                            },
                            tolerance: 0,
                            submenuDirection: 'below'
                        });
                    }
                }, {
                    key: 'addSearchClass',
                    value: function addSearchClass() {
                        $('.saya-header .search').addClass('search-focus');
                        $('.saya-header .logo').addClass('search-focus');
                    }
                }, {
                    key: 'removeSearchClass',
                    value: function removeSearchClass() {
                        $('.saya-header .search').removeClass('search-focus');
                        $('.saya-header .logo').removeClass('search-focus');
                    }
                }, {
                    key: 'addSearchOverlay',
                    value: function addSearchOverlay() {
                        Common.prototype.addSearchClass();
                        $('body').prepend('<div class="body-overlay"></div>');
                        $('.body-overlay').css('height', $(document).height());
                    }
                }, {
                    key: 'removeSearchOverlay',
                    value: function removeSearchOverlay() {
                        Common.prototype.removeSearchClass();
                        $('.body-overlay').remove();
                    }
                }, {
                    key: 'initTooltip',
                    value: function initTooltip(el) {
                        el.tooltip();
                    }
                }, {
                    key: 'initSocialQr',
                    value: function initSocialQr() {
                        $('.goto-box [data-toggle="popover"]').tooltipsy({
                            preload: true,
                            offset: [-10, 0],
                            css: {
                                'color': '#333',
                                'background-color': '#fff',
                                'padding': '10px'
                            }
                        });
                    }
                }, {
                    key: 'animatePartnerIcon',
                    value: function animatePartnerIcon(el) {
                        el.addClass('animated pulse');
                        el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            el.removeClass('animated pulse');
                        });
                    }
                }, {
                    key: 'stickSidebar',
                    value: function stickSidebar() {
                        var SAYA_HEADER_HEIGHT = $('.saya-header').outerHeight(),

                            /** 轮播图高度 */
                            COL_FULL_SLIDE_HEIGHT = $('.col-full-slide').outerHeight(),

                            /** 推广 tag 高度 */
                            COL_FULL_TAG_HEIGHT = $('.col-full-tag').outerHeight(),

                            /** 侧边栏高度 */
                            SIDEBAR_HEIGHT = $('.col-full-index .sidebar').outerHeight() || $('.sidebar').outerHeight(),

                            /** footer 高度 */
                            SAYA_FOOTER_HEIGHT = $('.saya-footer').outerHeight(),

                            /** 文章详细页 banner 高度 */
                            COL_FULL_BANNER_HEIGHT = $('.col-full-banner').outerHeight(),
                            affixTopHeight = SAYA_HEADER_HEIGHT + COL_FULL_SLIDE_HEIGHT + COL_FULL_TAG_HEIGHT + SIDEBAR_HEIGHT + COL_FULL_BANNER_HEIGHT,
                            affixBottomHeight = SAYA_FOOTER_HEIGHT;

                        /** 设置固定宽度 */
                        $('.stick').css('width', $('.sidebar').outerWidth());
                        // $('.stick').stick_in_parent({
                        //     parent: $('.col-full-index')

                        // });

                        /** 初始化 affix */
                        $('.stick').affix({
                            offset: {
                                top: affixTopHeight,
                                bottom: affixBottomHeight
                            }
                        });
                    }
                }, {
                    key: 'iosPageScrollpy',
                    value: function iosPageScrollpy() {
                        var SAYA_HEADER_HEIGHT = $('.saya-header').outerHeight(),
                            PAGE_HEADER = $('.body-bootstrap-full-header').outerHeight(),

                            /** 侧边栏高度 */
                            SIDEBAR_HEIGHT = $('.bs-sidebar').outerHeight(),
                            FUNC_HEIGHT = $('.body-page-func').outerHeight() + $('.body-page-comment').outerHeight(),

                            /** footer 高度 */
                            SAYA_FOOTER_HEIGHT = $('.saya-footer').outerHeight(),

                            /** 文章详细页 banner 高度 */
                            COL_FULL_BANNER_HEIGHT = $('.col-full-banner').outerHeight(),
                            affixTopHeight = SAYA_HEADER_HEIGHT + PAGE_HEADER + SIDEBAR_HEIGHT + 32,
                            affixBottomHeight = SAYA_FOOTER_HEIGHT + FUNC_HEIGHT;

                        /** 初始化 affix */
                        $('.stick').affix({
                            offset: {
                                top: affixTopHeight,
                                bottom: affixBottomHeight
                            }
                        });

                        /** Scrollspy 監聽側邊欄 */
                        var $window = $(window);
                        var $body = $(document.body);

                        $body.scrollspy({
                            target: '.scrollspi'
                        });

                        $body.scrollspy('refresh');
                    }

                    // 这两个应该在 article 里
                }, {
                    key: 'appinfoBeforeArticle',
                    value: function appinfoBeforeArticle() {
                        $('.katana-article .main .widget-app-info').prependTo($('.sidebar'));
                    }
                }, {
                    key: 'appinfoAfterArticle',
                    value: function appinfoAfterArticle() {
                        $('.katana-article .sidebar .widget-app-info').appendTo($('.katana-article .main .content'));
                    }
                }, {
                    key: 'initAppDownloadQr',
                    value: function initAppDownloadQr() {
                        $('.widget-app-info .app-download .platform').tooltipsy({
                            preload: true,
                            offset: [-10, 0],
                            css: {
                                'background-color': '#fff',
                                'color': '#333',
                                'border': '1px solid rgba(0,0,0,.2)',
                                'border-radius': '6px',
                                'box-shadow': '0 5px 10px rgba(0,0,0,.2)'
                            }
                        });

                        $('.relation-apps .download-links .platform').tooltipsy({
                            preload: true,
                            offset: [10, 0],
                            css: {
                                'background-color': '#fff',
                                'color': '#333',
                                'border': '1px solid rgba(0,0,0,.2)',
                                'border-radius': '6px',
                                'box-shadow': '0 5px 10px rgba(0,0,0,.2)'
                            }
                        });
                    }
                }, {
                    key: 'getNotifications',
                    value: function getNotifications() {
                        $.ajax({
                            url: '/ipa/notification',
                            type: 'get',
                            success: function success(data) {
                                if (data.total > 0) {
                                    // $('.is-login .message a').addClass('active');
                                    // $('.is-login .message .message-number, .header-mobile .message-hint').text(data.total);
                                    $('.is-login .message .message-number, .header-mobile .message-hint').removeClass('hidden');

                                    // // 用户中心页，以后再统一两个部分
                                    // $('.post-metabar .message .message-number').text(data.total);
                                    // $('.post-metabar .message .message-number').removeClass('hidden');
                                }
                            }
                        });
                    }
                }]);

                return Common;
            })();

            exports['default'] = Common;
            ;

            /**
             * 应用信息放在 sidebar 最前面
             * @method  appinfoBeforeArticle
             * @memberOf Common
             */

            /**
             * 应用下载二维码图片初始化
             * @method  initAppDownloadQr
             * @memberOf Common
             */

            /**
             * 分享到微信二维码初始化
             * @method  initWeixinQr
             * @memberOf Common
             */
            // Common.prototype.initWeixinQr = function () {
            //     $('.share .weixin').tooltipsy({
            //         preload: true,
            //         offset: [0, -10],
            //         css: {
            //             'background-color': '#fff',
            //             'color': '#333',
            //             'border': '1px solid rgba(0,0,0,.2)',
            //             'border-radius': '6px',
            //             'box-shadow': '0 5px 10px rgba(0,0,0,.2)'
            //         }
            //     });
            // };

            /**
             * 添加电信后缀
             * @method  chinanetSuffix
             * @memberOf Common
             */

            /**
             * 添加 Android 后缀
             * @method  androidSuffix
             * @memberOf Common
             */

            /**
             * headroom 桌面版初始化
             * @method  headerScrollDesktop
             * @memberOf Common
             */
            // Common.prototype.headerScrollDesktop = function () {

            //     // $('.saya-header').headroom({
            //     //
            //     // });

            //     // $('.katana-article, .katana-topic, .katana-search, .katana-user').headroom({
            //     //     "tolerance": 1,
            //     //     "offset": 63,
            //     //     "classes": {
            //     //         "top": "headroom-body-top",
            //     //         "notTop": "headroom-body-not-top"
            //     //     }
            //     // });
            // };

            /**
             * headroom 手机版初始化
             * @method  headerScrollMobile
             * @memberOf Common
             */
            // Common.prototype.headerScrollMobile = function () {
            //     // $('.saya-header').headroom({
            //     //     "tolerance": 1,
            //     //     "offset": 63,
            //     //     "classes": {
            //     //         // 手机版下滑隐藏 header
            //     //         "unpinned": "headroom-header-unpinned"
            //     //     }
            //     // });

            //     // $('.katana-article, .katana-forum, .katana-search, .katana-user').headroom({
            //     //     "tolerance": 1,
            //     //     "offset": 63,
            //     //     "classes": {
            //     //         "top": "headroom-body-top",
            //     //         "notTop": "headroom-body-not-top"
            //     //     }
            //     // });
            // };

            /**
             * 激活二级菜单
             * @param  {selector} row 父级菜单
             * @method  activeSubmenu
             * @memberOf Common
             */

            /**
             * 隐藏二级菜单
             * @param  {selector} row 父级菜单
             * @method  deactivateSubMenu
             * @memberOf Common
             */

            /**
             * 初始化 jQuery-menu-aim
             * @method  menuDelay
             * @memberOf Common
             */

            /**
             * 为搜索框添加 class
             * @method  addSearchClass
             * @memberOf Common
             */

            /**
             * 为搜索框删除 class
             * @method  removeSearchClass
             * @memberOf Common
             */

            /**
             * 点击搜索添加 overlay
             * @method  addSearchOverlay
             * @memberOf Common
             */

            /**
             * 去除 overlay
             * @method  removeSearchOverlay
             * @memberOf Common
             */

            /**
             * 调整 swiper 高度，fix safari mobile
             * @method  adjustSwiperHeight
             * @memberOf Common
             */

            /**
             * 初始化电脑版 Swiper
             * @param  {Swiper} swiper swiper 实例
             * @method  initSwiperDesktop
             * @memberOf Common
             */
            // Common.prototype.initSwiperDesktop = function (swiper) {

            //     // if ($('html').hasClass('com_sspai')) {
            //     //     swiper = new Swiper('.col-full-slide .swiper-container', {
            //     //         autoplay: 5000,
            //     //         speed: 700,
            //     //         loop: true,
            //     //         slidesPerView: 'auto',
            //     //         loopedSlides: 5,
            //     //         watchActiveIndex: true,
            //     //         centeredSlides: true,
            //     //         paginationClickable: true,
            //     //         resizeReInit: true,
            //     //         keyboardControl: true,
            //     //         grabCursor: true,
            //     //         nextButton: '.saya .swiper-next',
            //     //         prevButton: '.saya .swiper-prev'
            //     //     });
            //     //     return swiper;
            //     // } else {
            //     //     swiper = new Swiper('.col-full-slide .swiper-container', {
            //     //         autoplay: 5000,
            //     //         speed: 700,
            //     //         effect: 'coverflow',
            //     //         slidesPerView: 'auto',
            //     //         grabCursor: true,
            //     //         centeredSlides: true,
            //     //         loop: true,
            //     //         loopedSlides: 5,
            //     //         coverflow: {
            //     //             rotate: 50,
            //     //             stretch: 0,
            //     //             depth: 100,
            //     //             modifier: 1,
            //     //             // slideShadows: true
            //     //         },
            //     //         nextButton: '.saya .swiper-next',
            //     //         prevButton: '.saya .swiper-prev'
            //     //     });
            //     //     return swiper;
            //     // }
            // };

            /**
             * 初始化手机版 Swiper
             * @param  {Swiper} swiper swiper 实例
             * @method  initSwiperMobile
             * @memberOf Common
             */

            /**
             * 初始化 tooltip
             * @param  {selector} el 需要初始化的元素
             * @method  initTooltip
             * @memberOf Common
             */

            /**
             * 点赞
             * @param  {selector} el 点赞元素
             * @method  like
             * @memberOf Common
             */
            // Common.prototype.like = function (el) {
            //     var objectId = el.data('id');
            //     var objectType = el.data('type');
            //     var self = el;
            //     var $likeBox = $('.like-box');

            //     $.ajax({
            //         type: 'post',
            //         url: '/ipa/like',
            //         data: {
            //             object_id: objectId,
            //             object_type: objectType
            //         },
            //         error: function () {
            //             alert('服务器错误');
            //         },
            //         success: function (data) {
            //             if (data.errCode > 0) {
            //                 alert(data.msg);
            //             } else {
            //                 var number = Number(self.find('.number').text());

            //                 if (data.status == 1) {
            //                     self.addClass('liked');
            //                     var num = self.find('.number').text(++number);
            //                 } else if (data.status === 0) {
            //                     self.removeClass('liked');
            //                     number = --number > 0 ? number : 0;
            //                     self.find('.number').text(number);
            //                 }
            //             }
            //         }
            //     });
            // };

            /**
             * 点赞和收藏动画
             * @param  {selector} el 点赞和收藏的element
             * @method  animateLikeFavIcon
             * @memberOf Common
             */
            // Common.prototype.animateLikeFavIcon = function (el) {
            //     el.addClass('animated rubberBand');
            //     /** 讓動畫只抖動一次 */
            //     el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            //         el.removeClass('animated rubberBand');
            //     });
            // };

            /**
             * 收藏或取消收藏
             * @param  {selector} el 收藏按钮
             * @method  favorite
             * @memberOf Common
             */
            // Common.prototype.favorite = function (el) {
            //     var self = el;
            //     var objectType = el.data('type');
            //     var objectId = el.data('id');

            //     $.ajax({
            //         type: 'post',
            //         url: '/ipa/favorite',
            //         data: {
            //             object_id: objectId,
            //             object_type: objectType
            //         },
            //         error: function () {
            //             alert('服务器错误');
            //         },
            //         success: function (data) {
            //             if (data.errCode > 0) {
            //                 alert('服务器错误');
            //             } else {

            //                 var number = Number(self.find('.number').text());
            //                 /** 添加收藏 */
            //                 if (data.status == 1) {
            //                     self.addClass('faved');
            //                     self.find('i').removeClass('fa-bookmark-o').addClass('fa-bookmark');
            //                     self.find('.txt').text('已收藏');
            //                 }

            //                 /** 取消收藏 */
            //                 if (data.status === 0) {
            //                     self.removeClass('faved');
            //                     self.find('i').removeClass('fa-bookmark').addClass('fa-bookmark-o');
            //                     self.find('.txt').text('收藏');
            //                 }
            //             }
            //         }
            //     });
            // };

            /**
             * 已收藏文章，收藏字体改变
             * @param  {selector} el 需要改变字体的 element
             * @method  changeFavoriteFont
             * @memberOf Common
             */
            // Common.prototype.changeFavoriteFont = function (el) {
            //     el.find('i').removeClass('fa-bookmark-o').addClass('fa-bookmark');
            // };

            /**
             * goto-box 位置设置
             * @method  initSocialQr
             * @memberOf Common
             */

            /**
             * 合作伙伴图标动画
             * @param  {selector} el 合作伙伴图标
             * @method  animatePartnerIcon
             * @memberOf Common
             */

            /**
             * 固定 sidebar 初始化
             * @method  stickSidebar
             * @memberOf Common
             */

            /**
             * ios 专题页 scrollpy 初始化
             * @method  iosPageScrollpy
             * @memberOf Common
             */

            /**
             * 应用信息插入文章末尾
             * @method  appinfoAfterArticle
             * @memberOf Common
             */
            module.exports = exports['default'];
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 40 */
    /***/ function (module, exports) {

        /*!
         * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
         * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
         * License: MIT
         */

        'use strict';

        (function (window, document) {

            'use strict';

            /* exported features */

            var features = {
                bind: !!(function () {
                }).bind,
                classList: 'classList' in document.documentElement,
                rAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
            };
            window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

            /**
             * Handles debouncing of events via requestAnimationFrame
             * @see http://www.html5rocks.com/en/tutorials/speed/animations/
             * @param {Function} callback The callback to handle whichever event
             */
            function Debouncer(callback) {
                this.callback = callback;
                this.ticking = false;
            }

            Debouncer.prototype = {
                constructor: Debouncer,

                /**
                 * dispatches the event to the supplied callback
                 * @private
                 */
                update: function update() {
                    this.callback && this.callback();
                    this.ticking = false;
                },

                /**
                 * ensures events don't get stacked
                 * @private
                 */
                requestTick: function requestTick() {
                    if (!this.ticking) {
                        requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
                        this.ticking = true;
                    }
                },

                /**
                 * Attach this as the event listeners
                 */
                handleEvent: function handleEvent() {
                    this.requestTick();
                }
            };
            /**
             * Check if object is part of the DOM
             * @constructor
             * @param {Object} obj element to check
             */
            function isDOMElement(obj) {
                return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
            }

            /**
             * Helper function for extending objects
             */
            function extend(object /*, objectN ... */) {
                if (arguments.length <= 0) {
                    throw new Error('Missing arguments in extend function');
                }

                var result = object || {},
                    key,
                    i;

                for (i = 1; i < arguments.length; i++) {
                    var replacement = arguments[i] || {};

                    for (key in replacement) {
                        // Recurse into object except if the object is a DOM element
                        if (typeof result[key] === 'object' && !isDOMElement(result[key])) {
                            result[key] = extend(result[key], replacement[key]);
                        } else {
                            result[key] = result[key] || replacement[key];
                        }
                    }
                }

                return result;
            }

            /**
             * Helper function for normalizing tolerance option to object format
             */
            function normalizeTolerance(t) {
                return t === Object(t) ? t : {down: t, up: t};
            }

            /**
             * UI enhancement for fixed headers.
             * Hides header when scrolling down
             * Shows header when scrolling up
             * @constructor
             * @param {DOMElement} elem the header element
             * @param {Object} options options for the widget
             */
            function Headroom(elem, options) {
                options = extend(options, Headroom.options);

                this.lastKnownScrollY = 0;
                this.elem = elem;
                this.debouncer = new Debouncer(this.update.bind(this));
                this.tolerance = normalizeTolerance(options.tolerance);
                this.classes = options.classes;
                this.offset = options.offset;
                this.scroller = options.scroller;
                this.initialised = false;
                this.onPin = options.onPin;
                this.onUnpin = options.onUnpin;
                this.onTop = options.onTop;
                this.onNotTop = options.onNotTop;
            }

            Headroom.prototype = {
                constructor: Headroom,

                /**
                 * Initialises the widget
                 */
                init: function init() {
                    if (!Headroom.cutsTheMustard) {
                        return;
                    }

                    this.elem.classList.add(this.classes.initial);

                    // defer event registration to handle browser
                    // potentially restoring previous scroll position
                    setTimeout(this.attachEvent.bind(this), 100);

                    return this;
                },

                /**
                 * Unattaches events and removes any classes that were added
                 */
                destroy: function destroy() {
                    var classes = this.classes;

                    this.initialised = false;
                    this.elem.classList.remove(classes.unpinned, classes.pinned, classes.top, classes.initial);
                    this.scroller.removeEventListener('scroll', this.debouncer, false);
                },

                /**
                 * Attaches the scroll event
                 * @private
                 */
                attachEvent: function attachEvent() {
                    if (!this.initialised) {
                        this.lastKnownScrollY = this.getScrollY();
                        this.initialised = true;
                        this.scroller.addEventListener('scroll', this.debouncer, false);

                        this.debouncer.handleEvent();
                    }
                },

                /**
                 * Unpins the header if it's currently pinned
                 */
                unpin: function unpin() {
                    var classList = this.elem.classList,
                        classes = this.classes;

                    if (classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
                        classList.add(classes.unpinned);
                        classList.remove(classes.pinned);
                        this.onUnpin && this.onUnpin.call(this);
                    }
                },

                /**
                 * Pins the header if it's currently unpinned
                 */
                pin: function pin() {
                    var classList = this.elem.classList,
                        classes = this.classes;

                    if (classList.contains(classes.unpinned)) {
                        classList.remove(classes.unpinned);
                        classList.add(classes.pinned);
                        this.onPin && this.onPin.call(this);
                    }
                },

                /**
                 * Handles the top states
                 */
                top: function top() {
                    var classList = this.elem.classList,
                        classes = this.classes;

                    if (!classList.contains(classes.top)) {
                        classList.add(classes.top);
                        classList.remove(classes.notTop);
                        this.onTop && this.onTop.call(this);
                    }
                },

                /**
                 * Handles the not top state
                 */
                notTop: function notTop() {
                    var classList = this.elem.classList,
                        classes = this.classes;

                    if (!classList.contains(classes.notTop)) {
                        classList.add(classes.notTop);
                        classList.remove(classes.top);
                        this.onNotTop && this.onNotTop.call(this);
                    }
                },

                /**
                 * Gets the Y scroll position
                 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
                 * @return {Number} pixels the page has scrolled along the Y-axis
                 */
                getScrollY: function getScrollY() {
                    return this.scroller.pageYOffset !== undefined ? this.scroller.pageYOffset : this.scroller.scrollTop !== undefined ? this.scroller.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                },

                /**
                 * Gets the height of the viewport
                 * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
                 * @return {int} the height of the viewport in pixels
                 */
                getViewportHeight: function getViewportHeight() {
                    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                },

                /**
                 * Gets the height of the document
                 * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
                 * @return {int} the height of the document in pixels
                 */
                getDocumentHeight: function getDocumentHeight() {
                    var body = document.body,
                        documentElement = document.documentElement;

                    return Math.max(body.scrollHeight, documentElement.scrollHeight, body.offsetHeight, documentElement.offsetHeight, body.clientHeight, documentElement.clientHeight);
                },

                /**
                 * Gets the height of the DOM element
                 * @param  {Object}  elm the element to calculate the height of which
                 * @return {int}     the height of the element in pixels
                 */
                getElementHeight: function getElementHeight(elm) {
                    return Math.max(elm.scrollHeight, elm.offsetHeight, elm.clientHeight);
                },

                /**
                 * Gets the height of the scroller element
                 * @return {int} the height of the scroller element in pixels
                 */
                getScrollerHeight: function getScrollerHeight() {
                    return this.scroller === window || this.scroller === document.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller);
                },

                /**
                 * determines if the scroll position is outside of document boundaries
                 * @param  {int}  currentScrollY the current y scroll position
                 * @return {bool} true if out of bounds, false otherwise
                 */
                isOutOfBounds: function isOutOfBounds(currentScrollY) {
                    var pastTop = currentScrollY < 0,
                        pastBottom = currentScrollY + this.getViewportHeight() > this.getScrollerHeight();

                    return pastTop || pastBottom;
                },

                /**
                 * determines if the tolerance has been exceeded
                 * @param  {int} currentScrollY the current scroll y position
                 * @return {bool} true if tolerance exceeded, false otherwise
                 */
                toleranceExceeded: function toleranceExceeded(currentScrollY, direction) {
                    return Math.abs(currentScrollY - this.lastKnownScrollY) >= this.tolerance[direction];
                },

                /**
                 * determine if it is appropriate to unpin
                 * @param  {int} currentScrollY the current y scroll position
                 * @param  {bool} toleranceExceeded has the tolerance been exceeded?
                 * @return {bool} true if should unpin, false otherwise
                 */
                shouldUnpin: function shouldUnpin(currentScrollY, toleranceExceeded) {
                    var scrollingDown = currentScrollY > this.lastKnownScrollY,
                        pastOffset = currentScrollY >= this.offset;

                    return scrollingDown && pastOffset && toleranceExceeded;
                },

                /**
                 * determine if it is appropriate to pin
                 * @param  {int} currentScrollY the current y scroll position
                 * @param  {bool} toleranceExceeded has the tolerance been exceeded?
                 * @return {bool} true if should pin, false otherwise
                 */
                shouldPin: function shouldPin(currentScrollY, toleranceExceeded) {
                    var scrollingUp = currentScrollY < this.lastKnownScrollY,
                        pastOffset = currentScrollY <= this.offset;

                    return scrollingUp && toleranceExceeded || pastOffset;
                },

                /**
                 * Handles updating the state of the widget
                 */
                update: function update() {
                    var currentScrollY = this.getScrollY(),
                        scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
                        toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);

                    if (this.isOutOfBounds(currentScrollY)) {
                        // Ignore bouncy scrolling in OSX
                        return;
                    }

                    if (currentScrollY <= this.offset) {
                        this.top();
                    } else {
                        this.notTop();
                    }

                    if (this.shouldUnpin(currentScrollY, toleranceExceeded)) {
                        this.unpin();
                    } else if (this.shouldPin(currentScrollY, toleranceExceeded)) {
                        this.pin();
                    }

                    this.lastKnownScrollY = currentScrollY;
                }
            };
            /**
             * Default options
             * @type {Object}
             */
            Headroom.options = {
                tolerance: {
                    up: 0,
                    down: 0
                },
                offset: 0,
                scroller: window,
                classes: {
                    pinned: 'headroom--pinned',
                    unpinned: 'headroom--unpinned',
                    top: 'headroom--top',
                    notTop: 'headroom--not-top',
                    initial: 'headroom'
                }
            };
            Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;

            window.Headroom = Headroom;
        })(window, document);

        /***/
    },
    /* 41 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (jQuery) {
            /**
             * menu-aim is a jQuery plugin for dropdown menus that can differentiate
             * between a user trying hover over a dropdown item vs trying to navigate into
             * a submenu's contents.
             *
             * menu-aim assumes that you have are using a menu with submenus that expand
             * to the menu's right. It will fire events when the user's mouse enters a new
             * dropdown item *and* when that item is being intentionally hovered over.
             *
             * __________________________
             * | Monkeys  >|   Gorilla  |
             * | Gorillas >|   Content  |
             * | Chimps   >|   Here     |
             * |___________|____________|
             *
             * In the above example, "Gorillas" is selected and its submenu content is
             * being shown on the right. Imagine that the user's cursor is hovering over
             * "Gorillas." When they move their mouse into the "Gorilla Content" area, they
             * may briefly hover over "Chimps." This shouldn't close the "Gorilla Content"
             * area.
             *
             * This problem is normally solved using timeouts and delays. menu-aim tries to
             * solve this by detecting the direction of the user's mouse movement. This can
             * make for quicker transitions when navigating up and down the menu. The
             * experience is hopefully similar to amazon.com/'s "Shop by Department"
             * dropdown.
             *
             * Use like so:
             *
             *      $("#menu").menuAim({
	 *          activate: $.noop,  // fired on row activation
	 *          deactivate: $.noop  // fired on row deactivation
	 *      });
             *
             *  ...to receive events when a menu's row has been purposefully (de)activated.
             *
             * The following options can be passed to menuAim. All functions execute with
             * the relevant row's HTML element as the execution context ('this'):
             *
             *      .menuAim({
	 *          // Function to call when a row is purposefully activated. Use this
	 *          // to show a submenu's content for the activated row.
	 *          activate: function() {},
	 *
	 *          // Function to call when a row is deactivated.
	 *          deactivate: function() {},
	 *
	 *          // Function to call when mouse enters a menu row. Entering a row
	 *          // does not mean the row has been activated, as the user may be
	 *          // mousing over to a submenu.
	 *          enter: function() {},
	 *
	 *          // Function to call when mouse exits a menu row.
	 *          exit: function() {},
	 *
	 *          // Selector for identifying which elements in the menu are rows
	 *          // that can trigger the above events. Defaults to "> li".
	 *          rowSelector: "> li",
	 *
	 *          // You may have some menu rows that aren't submenus and therefore
	 *          // shouldn't ever need to "activate." If so, filter submenu rows w/
	 *          // this selector. Defaults to "*" (all elements).
	 *          submenuSelector: "*",
	 *
	 *          // Direction the submenu opens relative to the main menu. Can be
	 *          // left, right, above, or below. Defaults to "right".
	 *          submenuDirection: "right"
	 *      });
             *
             * https://github.com/kamens/jQuery-menu-aim
             */
            "use strict";

            (function ($) {

                $.fn.menuAim = function (opts) {
                    // Initialize menu-aim for all elements in jQuery collection
                    this.each(function () {
                        init.call(this, opts);
                    });

                    return this;
                };

                function init(opts) {
                    var $menu = $(this),
                        activeRow = null,
                        mouseLocs = [],
                        lastDelayLoc = null,
                        timeoutId = null,
                        options = $.extend({
                            rowSelector: "> li",
                            submenuSelector: "*",
                            submenuDirection: "right",
                            tolerance: 75, // bigger = more forgivey when entering submenu
                            enter: $.noop,
                            exit: $.noop,
                            activate: $.noop,
                            deactivate: $.noop,
                            exitMenu: $.noop
                        }, opts);

                    var MOUSE_LOCS_TRACKED = 3,
                    // number of past mouse locations to track
                        DELAY = 300; // ms delay when user appears to be entering submenu

                    /**
                     * Keep track of the last few locations of the mouse.
                     */
                    var mousemoveDocument = function mousemoveDocument(e) {
                        mouseLocs.push({x: e.pageX, y: e.pageY});

                        if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
                            mouseLocs.shift();
                        }
                    };

                    /**
                     * Cancel possible row activations when leaving the menu entirely
                     */
                    var mouseleaveMenu = function mouseleaveMenu() {
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }

                        // If exitMenu is supplied and returns true, deactivate the
                        // currently active row on menu exit.
                        if (options.exitMenu(this)) {
                            if (activeRow) {
                                options.deactivate(activeRow);
                            }

                            activeRow = null;
                        }
                    };

                    /**
                     * Trigger a possible row activation whenever entering a new row.
                     */
                    var mouseenterRow = function mouseenterRow() {
                            if (timeoutId) {
                                // Cancel any previous activation delays
                                clearTimeout(timeoutId);
                            }

                            options.enter(this);
                            possiblyActivate(this);
                        },
                        mouseleaveRow = function mouseleaveRow() {
                            options.exit(this);
                        };

                    /*
                     * Immediately activate a row if the user clicks on it.
                     */
                    var clickRow = function clickRow() {
                        activate(this);
                    };

                    /**
                     * Activate a menu row.
                     */
                    var activate = function activate(row) {
                        if (row == activeRow) {
                            return;
                        }

                        if (activeRow) {
                            options.deactivate(activeRow);
                        }

                        options.activate(row);
                        activeRow = row;
                    };

                    /**
                     * Possibly activate a menu row. If mouse movement indicates that we
                     * shouldn't activate yet because user may be trying to enter
                     * a submenu's content, then delay and check again later.
                     */
                    var possiblyActivate = function possiblyActivate(row) {
                        var delay = activationDelay();

                        if (delay) {
                            timeoutId = setTimeout(function () {
                                possiblyActivate(row);
                            }, delay);
                        } else {
                            activate(row);
                        }
                    };

                    /**
                     * Return the amount of time that should be used as a delay before the
                     * currently hovered row is activated.
                     *
                     * Returns 0 if the activation should happen immediately. Otherwise,
                     * returns the number of milliseconds that should be delayed before
                     * checking again to see if the row should be activated.
                     */
                    var activationDelay = function activationDelay() {
                        if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
                            // If there is no other submenu row already active, then
                            // go ahead and activate immediately.
                            return 0;
                        }

                        var offset = $menu.offset(),
                            upperLeft = {
                                x: offset.left,
                                y: offset.top - options.tolerance
                            },
                            upperRight = {
                                x: offset.left + $menu.outerWidth(),
                                y: upperLeft.y
                            },
                            lowerLeft = {
                                x: offset.left,
                                y: offset.top + $menu.outerHeight() + options.tolerance
                            },
                            lowerRight = {
                                x: offset.left + $menu.outerWidth(),
                                y: lowerLeft.y
                            },
                            loc = mouseLocs[mouseLocs.length - 1],
                            prevLoc = mouseLocs[0];

                        if (!loc) {
                            return 0;
                        }

                        if (!prevLoc) {
                            prevLoc = loc;
                        }

                        if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x || prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
                            // If the previous mouse location was outside of the entire
                            // menu's bounds, immediately activate.
                            return 0;
                        }

                        if (lastDelayLoc && loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
                            // If the mouse hasn't moved since the last time we checked
                            // for activation status, immediately activate.
                            return 0;
                        }

                        // Detect if the user is moving towards the currently activated
                        // submenu.
                        //
                        // If the mouse is heading relatively clearly towards
                        // the submenu's content, we should wait and give the user more
                        // time before activating a new row. If the mouse is heading
                        // elsewhere, we can immediately activate a new row.
                        //
                        // We detect this by calculating the slope formed between the
                        // current mouse location and the upper/lower right points of
                        // the menu. We do the same for the previous mouse location.
                        // If the current mouse location's slopes are
                        // increasing/decreasing appropriately compared to the
                        // previous's, we know the user is moving toward the submenu.
                        //
                        // Note that since the y-axis increases as the cursor moves
                        // down the screen, we are looking for the slope between the
                        // cursor and the upper right corner to decrease over time, not
                        // increase (somewhat counterintuitively).
                        function slope(a, b) {
                            return (b.y - a.y) / (b.x - a.x);
                        };

                        var decreasingCorner = upperRight,
                            increasingCorner = lowerRight;

                        // Our expectations for decreasing or increasing slope values
                        // depends on which direction the submenu opens relative to the
                        // main menu. By default, if the menu opens on the right, we
                        // expect the slope between the cursor and the upper right
                        // corner to decrease over time, as explained above. If the
                        // submenu opens in a different direction, we change our slope
                        // expectations.
                        if (options.submenuDirection == "left") {
                            decreasingCorner = lowerLeft;
                            increasingCorner = upperLeft;
                        } else if (options.submenuDirection == "below") {
                            decreasingCorner = lowerRight;
                            increasingCorner = lowerLeft;
                        } else if (options.submenuDirection == "above") {
                            decreasingCorner = upperLeft;
                            increasingCorner = upperRight;
                        }

                        var decreasingSlope = slope(loc, decreasingCorner),
                            increasingSlope = slope(loc, increasingCorner),
                            prevDecreasingSlope = slope(prevLoc, decreasingCorner),
                            prevIncreasingSlope = slope(prevLoc, increasingCorner);

                        if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
                            // Mouse is moving from previous location towards the
                            // currently activated submenu. Delay before activating a
                            // new menu row, because user may be moving into submenu.
                            lastDelayLoc = loc;
                            return DELAY;
                        }

                        lastDelayLoc = null;
                        return 0;
                    };

                    /**
                     * Hook up initial menu events
                     */
                    $menu.mouseleave(mouseleaveMenu).find(options.rowSelector).mouseenter(mouseenterRow).mouseleave(mouseleaveRow).click(clickRow);

                    $(document).mousemove(mousemoveDocument);
                };
            })(jQuery);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 42 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function (jQuery) {/* tooltipsy by Brian Cray
         * Lincensed under GPL2 - http://www.gnu.org/licenses/gpl-2.0.html
         * Option quick reference:
         * - alignTo: "element" or "cursor" (Defaults to "element")
         * - offset: Tooltipsy distance from element or mouse cursor, dependent on alignTo setting. Set as array [x, y] (Defaults to [0, -1])
         * - content: HTML or text content of tooltip. Defaults to "" (empty string), which pulls content from target element's title attribute
         * - show: function(event, tooltip) to show the tooltip. Defaults to a show(100) effect
         * - hide: function(event, tooltip) to hide the tooltip. Defaults to a fadeOut(100) effect
         * - delay: A delay in milliseconds before showing a tooltip. Set to 0 for no delay. Defaults to 200
         * - css: object containing CSS properties and values. Defaults to {} to use stylesheet for styles
         * - className: DOM class for styling tooltips with CSS. Defaults to "tooltipsy"
         * - showEvent: Set a custom event to bind the show function. Defaults to mouseenter
         * - hideEvent: Set a custom event to bind the show function. Defaults to mouseleave
         * Method quick reference:
         * - $('element').data('tooltipsy').show(): Force the tooltip to show
         * - $('element').data('tooltipsy').hide(): Force the tooltip to hide
         * - $('element').data('tooltipsy').destroy(): Remove tooltip from DOM
         * More information visit http://tooltipsy.com/

         上 offset: [0, -10],
         下 offset: [0, 10],
         左 offset: [-10, 0],
         右 offset: [10, 0],

         */

            'use strict';

            (function ($) {
                $.tooltipsy = function (el, options) {
                    this.options = options;
                    this.$el = $(el);
                    this.title = this.$el.attr('title') || '';
                    this.placement = this.$el.attr('data-placement') || '';
                    this.$el.attr('title', '');
                    this.random = parseInt(Math.random() * 10000);
                    this.ready = false;
                    this.shown = false;
                    this.width = 0;
                    this.height = 0;
                    this.delaytimer = null;

                    this.$el.data("tooltipsy", this);
                    this.init();
                };

                $.tooltipsy.prototype = {
                    init: function init() {
                        var base = this,
                            settings,
                            $el = base.$el,
                            el = $el[0];

                        base.settings = settings = $.extend({}, base.defaults, base.options);
                        settings.delay = +settings.delay;

                        if (typeof settings.content === 'function') {
                            base.readify();
                        }

                        // 預加載
                        if (settings.preload == true) {
                            base.readify();
                        }

                        // if (this.placement == 'top') {
                        //     this.$el[0] = [0, -10];
                        // } else if (this.placement == 'bottom') {
                        //     this.$el[0] = [0, 10];
                        // } else if (this.placement == 'left') {
                        //     this.$el[0] = [-10, 0];
                        // } else if (this.placement == 'right') {
                        //     this.$el[0] = [10, 0];
                        // } else {
                        //     this.$el[0] = [0, -10];
                        // }

                        if (settings.showEvent === settings.hideEvent && settings.showEvent === 'click') {
                            $el.toggle(function (e) {
                                if (settings.showEvent === 'click' && el.tagName == 'A') {
                                    e.preventDefault();
                                }
                                if (settings.delay > 0) {
                                    base.delaytimer = window.setTimeout(function () {
                                        base.show(e);
                                    }, settings.delay);
                                } else {
                                    base.show(e);
                                }
                            }, function (e) {
                                if (settings.showEvent === 'click' && el.tagName == 'A') {
                                    e.preventDefault();
                                }
                                window.clearTimeout(base.delaytimer);
                                base.delaytimer = null;
                                base.hide(e);
                            });
                        } else {
                            $el.bind(settings.showEvent, function (e) {
                                if (settings.showEvent === 'click' && el.tagName == 'A') {
                                    e.preventDefault();
                                }
                                base.delaytimer = window.setTimeout(function () {
                                    base.show(e);
                                }, settings.delay || 0);
                            }).bind(settings.hideEvent, function (e) {
                                if (settings.showEvent === 'click' && el.tagName == 'A') {
                                    e.preventDefault();
                                }
                                window.clearTimeout(base.delaytimer);
                                base.delaytimer = null;
                                base.hide(e);
                            });
                        }
                    },

                    show: function show(e) {
                        if (this.ready === false) {
                            this.readify();
                        }

                        var base = this,
                            settings = base.settings,
                            $tipsy = base.$tipsy,
                            $el = base.$el,
                            el = $el[0],
                            offset = base.offset(el);

                        if (base.shown === false) {
                            if ((function (o) {
                                    var s = 0,
                                        k;
                                    for (k in o) {
                                        if (o.hasOwnProperty(k)) {
                                            s++;
                                        }
                                    }
                                    return s;
                                })(settings.css) > 0) {
                                base.$tip.css(settings.css);
                            }
                            base.width = $tipsy.outerWidth();
                            base.height = $tipsy.outerHeight();
                        }

                        if (settings.alignTo === 'cursor' && e) {
                            var tip_position = [e.clientX + settings.offset[0], e.clientY + settings.offset[1]];
                            if (tip_position[0] + base.width > $(window).width()) {
                                var tip_css = {
                                    top: tip_position[1] + 'px',
                                    right: tip_position[0] + 'px',
                                    left: 'auto'
                                };
                            } else {
                                var tip_css = {
                                    top: tip_position[1] + 'px',
                                    left: tip_position[0] + 'px',
                                    right: 'auto'
                                };
                            }
                        } else {
                            var tip_position = [(function () {
                                if (settings.offset[0] < 0) {
                                    return offset.left - Math.abs(settings.offset[0]) - base.width;
                                } else if (settings.offset[0] === 0) {
                                    return offset.left - (base.width - $el.outerWidth()) / 2;
                                } else {
                                    return offset.left + $el.outerWidth() + settings.offset[0];
                                }
                            })(), (function () {
                                if (settings.offset[1] < 0) {
                                    return offset.top - Math.abs(settings.offset[1]) - base.height;
                                } else if (settings.offset[1] === 0) {
                                    return offset.top - (base.height - base.$el.outerHeight()) / 2;
                                } else {
                                    return offset.top + base.$el.outerHeight() + settings.offset[1];
                                }
                            })()];
                        }
                        $tipsy.css({
                            top: tip_position[1] + 'px',
                            left: tip_position[0] + 'px'
                        });
                        base.settings.show(e, $tipsy.stop(true, true));
                    },

                    hide: function hide(e) {
                        var base = this;

                        if (base.ready === false) {
                            return;
                        }

                        if (e && e.relatedTarget === base.$tip[0]) {
                            base.$tip.bind('mouseleave', function (e) {
                                if (e.relatedTarget === base.$el[0]) {
                                    return;
                                }
                                base.settings.hide(e, base.$tipsy.stop(true, true));
                            });
                            return;
                        }
                        base.settings.hide(e, base.$tipsy.stop(true, true));
                    },

                    readify: function readify() {
                        this.ready = true;
                        this.$tipsy = $('<div id="tooltipsy' + this.random + '" style="position:fixed; z-index:2147483647; display:none">').appendTo('.tooltip-things');
                        this.$tip = $('<div class="' + this.settings.className + '-wrap">').appendTo(this.$tipsy);
                        this.$tip = $('<div class="' + this.settings.className + '-content">').appendTo(this.$tip);
                        this.$tip = this.$tip.after('<div class="' + this.settings.className + '-' + this.placement + '">');

                        this.$tip.data('rootel', this.$el);
                        var e = this.$el;
                        var t = this.$tip;
                        this.$tip.html(this.settings.content != '' ? typeof this.settings.content == 'string' ? this.settings.content : this.settings.content(e, t) : this.title);
                    },

                    offset: function offset(el) {
                        return this.$el[0].getBoundingClientRect();
                    },

                    destroy: function destroy() {
                        if (this.$tipsy) {
                            this.$tipsy.remove();
                            $.removeData(this.$el, 'tooltipsy');
                        }
                    },

                    defaults: {
                        alignTo: 'element',
                        offset: [0, -1],
                        content: '',
                        show: function show(e, $el) {
                            $el.fadeIn(100);
                        },
                        hide: function hide(e, $el) {
                            $el.fadeOut(100);
                        },
                        css: {},
                        className: 'tooltipsy',
                        delay: 100,
                        preload: false,
                        // direction: 'up',
                        showEvent: 'mouseenter',
                        hideEvent: 'mouseleave'
                    }

                };

                $.fn.tooltipsy = function (options) {
                    return this.each(function () {
                        new $.tooltipsy(this, options);
                    });
                };
            })(jQuery);
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 43 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function ($) {
            'use strict';

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {'default': obj};
            }

            var _account = __webpack_require__(44);

            var _account2 = _interopRequireDefault(_account);

            /**
             * new Account instance
             * @type {Account}
             */

            var account = new _account2['default']();

            $('body').on('click', '.origin .btn-login', function (e) {
                e.preventDefault();
                var isLegal = account.accountLoginCheck();

                if (isLegal) {
                    account.PostAccountLogin($(this));
                }
            });

            $('body').on('keypress', '.remodal #password', function (e) {
                if (e.keyCode === 13) {
                    $('.remodal .btn-login').trigger('click');
                    // $('.remodal').trigger('confirmation');
                }
            });
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 44 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function ($) {
            /**
             * Account
             * @constructor
             * @classdesc Account Class Constructor
             */

            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true
            });

            var _createClass = (function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ('value' in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            })();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                }
            }

            var Account = (function () {
                function Account() {
                    _classCallCheck(this, Account);
                }

                _createClass(Account, [{
                    key: 'accountLoginCheck',
                    value: function accountLoginCheck() {
                        this.email = $('.site-login #email').val();
                        this.password = $('.site-login #password').val();
                        this._token = $('input[name=_token]').val();
                        this.remember = $('input[name=remember]').prop('checked') ? 1 : 0;

                        var failed = false;
                        var msg;

                        $('.help-block').text('');

                        /** 邮箱正则 */
                        var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

                        /** 邮箱验证 */
                        if (this.email === '') {
                            msg = '邮箱不能为空';
                            $('.site-login .email .help-block').text(msg);
                            failed = true;
                        } else if (!reg.test(this.email)) {
                            msg = '邮箱格式不正确';
                            $('.site-login .email .help-block').text(msg);
                            failed = true;
                        }

                        /** 密码验证 */
                        if (this.password === '') {
                            msg = '密码不能为空';
                            $('.site-login .password .help-block').text(msg);
                            failed = true;
                        }

                        /**
                         * if(failed) 返回 false
                         * else 返回 true
                         */
                        if (failed) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }, {
                    key: 'PostAccountLogin',
                    value: function PostAccountLogin(self) {
                        $.ajax({
                            type: 'POST',
                            url: '/ipa/account/login',
                            data: {
                                email: this.email,
                                password: this.password,
                                _token: this._token,
                                remember: this.remember
                            },
                            beforeSend: function beforeSend() {
                                self.addClass('disabled');
                            },
                            error: function error() {
                                alert('服务器错误，请稍后再试');
                            },
                            success: function success(data) {
                                self.removeClass('disabled');
                                if (data.errCode > 0) {
                                    var msg = data.msg;
                                    $('.form-top-tip').text(msg);
                                } else if (data.ref) {
                                    location.href = data.ref;
                                } else {
                                    location.reload();
                                }
                            }
                        });
                    }
                }]);

                return Account;
            })();

            exports['default'] = Account;
            ;

            /**
             * 检查登录框
             * @method  accountLoginCheck
             * @memberOf Account
             */

            /**
             * 进行登录
             * @method  PostAccountLogin
             * @memberOf Account
             */
            module.exports = exports['default'];
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 45 */,
    /* 46 */,
    /* 47 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function ($) {
            'use strict';

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {'default': obj};
            }

            var _handlebars = __webpack_require__(48);

            var _handlebars2 = _interopRequireDefault(_handlebars);

            var _common = __webpack_require__(49);

            var _common2 = _interopRequireDefault(_common);

            var common = new _common2['default']();

            $('body').on('click', '.do-like', function () {
                common.like($(this));
            });

            $('body').on('click', '.do-fav', function () {
                common.favorite($(this));
            });

            if ($('.katana-user-post').length || $('.katana-article-detail').length) {

                var id = $('body').data('id');

                // if (location.hash) {
                //     var commentOffset = $('.loading-comments').offset().top;

                //     $('html, body').animate({
                //         scrollTop: commentOffset
                //     }, 1000);
                // }

                var likedUserSource = $('#likedUser-template').html();
                var likedUserTemplate = _handlebars2['default'].compile(likedUserSource);

                $.ajax({
                    url: '/ipa/like?owner_type=article&owner_id=' + id,
                    type: 'get',
                    success: function success(data) {
                        $('.liked-user').removeClass('hidden');
                        $('.liked-user .loading-users').addClass('hidden');

                        var likedUserHtml = likedUserTemplate(data);
                        $('.liked-user').append(likedUserHtml);

                        $('.liked-user .user[data-tooltip="tooltip"]').tooltip();

                        if ($('.liked-user .users').children().length > 5) {
                            if (data.total - 5 === 0) {
                                return false;
                            }

                            $('.liked-user .users .all').find('.count').text(data.total - 5);

                            $('.liked-user .users .user').each(function (index, item) {
                                if (index > 4 && index < $('.liked-user .users').children().length) {
                                    $(this).addClass('hidden');
                                }
                            });

                            $('.liked-user .users').children('.all').removeClass('hidden');
                        }
                    }
                });
            }

            $('body').on('click', '.liked-user .all', function () {

                if ($(this).hasClass('show-all')) {
                    $('.liked-user .users .user').each(function (index, item) {
                        if (index > 4 && index < $('.liked-user .users .user').length - 1) {
                            $(this).addClass('hidden');
                        }
                    });
                } else {
                    $(this).closest('.users').children().removeClass('hidden');
                    // // $(this).data('originaltitle') = '隐藏';
                    // $(this).attr('data-original-title', '隐藏').tooltip();
                    $(this).addClass('hidden');
                }

                $(this).toggleClass('show-all');
            });

            $('.post-user-action .share a').hover(function () {
                $(this).children('i').addClass('active');
            }, function () {
                $(this).children('i').removeClass('active');
            });

            /** 点赞和收藏动画 */
            // $('body').on('click', '.do-fav, .like-num', function () {
            //     common.animateFavIcon($(this));
            // });
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 48 */
    /***/ function (module, exports, __webpack_require__) {

        /*!

         handlebars v4.0.4

         Copyright (C) 2011-2015 by Yehuda Katz

         Permission is hereby granted, free of charge, to any person obtaining a copy
         of this software and associated documentation files (the "Software"), to deal
         in the Software without restriction, including without limitation the rights
         to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         copies of the Software, and to permit persons to whom the Software is
         furnished to do so, subject to the following conditions:

         The above copyright notice and this permission notice shall be included in
         all copies or substantial portions of the Software.

         THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         THE SOFTWARE.

         @license
         */
        'use strict';
        (function webpackUniversalModuleDefinition(root, factory) {
            if (true)module.exports = factory(); else if (typeof define === 'function' && define.amd)define(factory); else if (typeof exports === 'object')exports["Handlebars"] = factory(); else root["Handlebars"] = factory();
        })(undefined, function () {
            return (/******/(function (modules) { // webpackBootstrap
                /******/ // The module cache
                /******/
                var installedModules = {};
                /******/ // The require function
                /******/
                function __webpack_require__(moduleId) { /******/ // Check if module is in cache
                    /******/
                    if (installedModules[moduleId]) /******/return installedModules[moduleId].exports;
                    /******/ // Create a new module (and put it into the cache)
                    /******/
                    var module = installedModules[moduleId] = {
                        /******/
                        exports: {}, /******/
                        id: moduleId, /******/
                        loaded: false /******/
                    };
                    /******/ // Execute the module function
                    /******/
                    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                    /******/ // Flag the module as loaded
                    /******/
                    module.loaded = true;
                    /******/ // Return the exports of the module
                    /******/
                    return module.exports;
                    /******/
                }

                /******/ // expose the modules object (__webpack_modules__)
                /******/
                __webpack_require__.m = modules;
                /******/ // expose the module cache
                /******/
                __webpack_require__.c = installedModules;
                /******/ // __webpack_public_path__
                /******/
                __webpack_require__.p = "";
                /******/ // Load entry module and return exports
                /******/
                return __webpack_require__(0);
                /******/
            })(/************************************************************************/ /******/[/* 0 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                var _handlebarsRuntime = __webpack_require__(1); // Compiler imports
                var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);
                var _handlebarsCompilerAst = __webpack_require__(2);
                var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);
                var _handlebarsCompilerBase = __webpack_require__(3);
                var _handlebarsCompilerCompiler = __webpack_require__(4);
                var _handlebarsCompilerJavascriptCompiler = __webpack_require__(5);
                var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);
                var _handlebarsCompilerVisitor = __webpack_require__(6);
                var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);
                var _handlebarsNoConflict = __webpack_require__(7);
                var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
                var _create = _handlebarsRuntime2['default'].create;

                function create() {
                    var hb = _create();
                    hb.compile = function (input, options) {
                        return _handlebarsCompilerCompiler.compile(input, options, hb);
                    };
                    hb.precompile = function (input, options) {
                        return _handlebarsCompilerCompiler.precompile(input, options, hb);
                    };
                    hb.AST = _handlebarsCompilerAst2['default'];
                    hb.Compiler = _handlebarsCompilerCompiler.Compiler;
                    hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
                    hb.Parser = _handlebarsCompilerBase.parser;
                    hb.parse = _handlebarsCompilerBase.parse;
                    return hb;
                }

                var inst = create();
                inst.create = create;
                _handlebarsNoConflict2['default'](inst);
                inst.Visitor = _handlebarsCompilerVisitor2['default'];
                inst['default'] = inst;
                exports['default'] = inst;
                module.exports = exports['default'];
                /***/
            }, /* 1 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireWildcard = __webpack_require__(9)['default'];
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                var _handlebarsBase = __webpack_require__(10); // Each of these augment the Handlebars object. No need to setup here.
                // (This is done to easily share code between commonjs and browse envs)
                var base = _interopRequireWildcard(_handlebarsBase);
                var _handlebarsSafeString = __webpack_require__(11);
                var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
                var _handlebarsException = __webpack_require__(12);
                var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
                var _handlebarsUtils = __webpack_require__(13);
                var Utils = _interopRequireWildcard(_handlebarsUtils);
                var _handlebarsRuntime = __webpack_require__(14);
                var runtime = _interopRequireWildcard(_handlebarsRuntime);
                var _handlebarsNoConflict = __webpack_require__(7); // For compatibility and usage outside of module systems, make the Handlebars object a namespace
                var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

                function create() {
                    var hb = new base.HandlebarsEnvironment();
                    Utils.extend(hb, base);
                    hb.SafeString = _handlebarsSafeString2['default'];
                    hb.Exception = _handlebarsException2['default'];
                    hb.Utils = Utils;
                    hb.escapeExpression = Utils.escapeExpression;
                    hb.VM = runtime;
                    hb.template = function (spec) {
                        return runtime.template(spec, hb);
                    };
                    return hb;
                }

                var inst = create();
                inst.create = create;
                _handlebarsNoConflict2['default'](inst);
                inst['default'] = inst;
                exports['default'] = inst;
                module.exports = exports['default'];
                /***/
            }, /* 2 */function (module, exports, __webpack_require__) {
                'use strict';
                exports.__esModule = true;
                var AST = { // Public API used to evaluate derived attributes regarding AST nodes
                    helpers: { // a mustache is definitely a helper if:
                        // * it is an eligible helper, and
                        // * it has at least one parameter or hash segment
                        helperExpression: function helperExpression(node) {
                            return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
                        }, scopedId: function scopedId(path) {
                            return (/^\.|this\b/.test(path.original));
                        }, // an ID is simple if it only has one part, and that part is not
                        // `..` or `this`.
                        simpleId: function simpleId(path) {
                            return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
                        }
                    }
                }; // Must be exported as an object rather than the root of the module as the jison lexer
                // must modify the object to operate properly.
                exports['default'] = AST;
                module.exports = exports['default'];
                /***/
            }, /* 3 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireDefault = __webpack_require__(8)['default'];
                var _interopRequireWildcard = __webpack_require__(9)['default'];
                exports.__esModule = true;
                exports.parse = parse;
                var _parser = __webpack_require__(15);
                var _parser2 = _interopRequireDefault(_parser);
                var _whitespaceControl = __webpack_require__(16);
                var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);
                var _helpers = __webpack_require__(17);
                var Helpers = _interopRequireWildcard(_helpers);
                var _utils = __webpack_require__(13);
                exports.parser = _parser2['default'];
                var yy = {};
                _utils.extend(yy, Helpers);
                function parse(input, options) { // Just return if an already-compiled AST was passed in.
                    if (input.type === 'Program') {
                        return input;
                    }
                    _parser2['default'].yy = yy; // Altering the shared object here, but this is ok as parser is a sync operation
                    yy.locInfo = function (locInfo) {
                        return new yy.SourceLocation(options && options.srcName, locInfo);
                    };
                    var strip = new _whitespaceControl2['default'](options);
                    return strip.accept(_parser2['default'].parse(input));
                }

                /***/
            }, /* 4 */function (module, exports, __webpack_require__) { /* eslint-disable new-cap */
                'use strict';
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                exports.Compiler = Compiler;
                exports.precompile = precompile;
                exports.compile = compile;
                var _exception = __webpack_require__(12);
                var _exception2 = _interopRequireDefault(_exception);
                var _utils = __webpack_require__(13);
                var _ast = __webpack_require__(2);
                var _ast2 = _interopRequireDefault(_ast);
                var slice = [].slice;

                function Compiler() {
                } // the foundHelper register will disambiguate helper lookup from finding a
                // function in a context. This is necessary for mustache compatibility, which
                // requires that context functions in blocks are evaluated by blockHelperMissing,
                // and then proceed as if the resulting value was provided to blockHelperMissing.
                Compiler.prototype = {
                    compiler: Compiler, equals: function equals(other) {
                        var len = this.opcodes.length;
                        if (other.opcodes.length !== len) {
                            return false;
                        }
                        for (var i = 0; i < len; i++) {
                            var opcode = this.opcodes[i], otherOpcode = other.opcodes[i];
                            if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
                                return false;
                            }
                        } // We know that length is the same between the two arrays because they are directly tied
                        // to the opcode behavior above.
                        len = this.children.length;
                        for (var i = 0; i < len; i++) {
                            if (!this.children[i].equals(other.children[i])) {
                                return false;
                            }
                        }
                        return true;
                    }, guid: 0, compile: function compile(program, options) {
                        this.sourceNode = [];
                        this.opcodes = [];
                        this.children = [];
                        this.options = options;
                        this.stringParams = options.stringParams;
                        this.trackIds = options.trackIds;
                        options.blockParams = options.blockParams || []; // These changes will propagate to the other compiler components
                        var knownHelpers = options.knownHelpers;
                        options.knownHelpers = {
                            'helperMissing': true,
                            'blockHelperMissing': true,
                            'each': true,
                            'if': true,
                            'unless': true,
                            'with': true,
                            'log': true,
                            'lookup': true
                        };
                        if (knownHelpers) {
                            for (var _name in knownHelpers) { /* istanbul ignore else */
                                if (_name in knownHelpers) {
                                    options.knownHelpers[_name] = knownHelpers[_name];
                                }
                            }
                        }
                        return this.accept(program);
                    }, compileProgram: function compileProgram(program) {
                        var childCompiler = new this.compiler(), // eslint-disable-line new-cap
                            result = childCompiler.compile(program, this.options), guid = this.guid++;
                        this.usePartial = this.usePartial || result.usePartial;
                        this.children[guid] = result;
                        this.useDepths = this.useDepths || result.useDepths;
                        return guid;
                    }, accept: function accept(node) { /* istanbul ignore next: Sanity code */
                        if (!this[node.type]) {
                            throw new _exception2['default']('Unknown type: ' + node.type, node);
                        }
                        this.sourceNode.unshift(node);
                        var ret = this[node.type](node);
                        this.sourceNode.shift();
                        return ret;
                    }, Program: function Program(program) {
                        this.options.blockParams.unshift(program.blockParams);
                        var body = program.body, bodyLength = body.length;
                        for (var i = 0; i < bodyLength; i++) {
                            this.accept(body[i]);
                        }
                        this.options.blockParams.shift();
                        this.isSimple = bodyLength === 1;
                        this.blockParams = program.blockParams ? program.blockParams.length : 0;
                        return this;
                    }, BlockStatement: function BlockStatement(block) {
                        transformLiteralToPath(block);
                        var program = block.program, inverse = block.inverse;
                        program = program && this.compileProgram(program);
                        inverse = inverse && this.compileProgram(inverse);
                        var type = this.classifySexpr(block);
                        if (type === 'helper') {
                            this.helperSexpr(block, program, inverse);
                        } else if (type === 'simple') {
                            this.simpleSexpr(block); // now that the simple mustache is resolved, we need to
                            // evaluate it by executing `blockHelperMissing`
                            this.opcode('pushProgram', program);
                            this.opcode('pushProgram', inverse);
                            this.opcode('emptyHash');
                            this.opcode('blockValue', block.path.original);
                        } else {
                            this.ambiguousSexpr(block, program, inverse); // now that the simple mustache is resolved, we need to
                            // evaluate it by executing `blockHelperMissing`
                            this.opcode('pushProgram', program);
                            this.opcode('pushProgram', inverse);
                            this.opcode('emptyHash');
                            this.opcode('ambiguousBlockValue');
                        }
                        this.opcode('append');
                    }, DecoratorBlock: function DecoratorBlock(decorator) {
                        var program = decorator.program && this.compileProgram(decorator.program);
                        var params = this.setupFullMustacheParams(decorator, program, undefined), path = decorator.path;
                        this.useDecorators = true;
                        this.opcode('registerDecorator', params.length, path.original);
                    }, PartialStatement: function PartialStatement(partial) {
                        this.usePartial = true;
                        var program = partial.program;
                        if (program) {
                            program = this.compileProgram(partial.program);
                        }
                        var params = partial.params;
                        if (params.length > 1) {
                            throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
                        } else if (!params.length) {
                            if (this.options.explicitPartialContext) {
                                this.opcode('pushLiteral', 'undefined');
                            } else {
                                params.push({type: 'PathExpression', parts: [], depth: 0});
                            }
                        }
                        var partialName = partial.name.original, isDynamic = partial.name.type === 'SubExpression';
                        if (isDynamic) {
                            this.accept(partial.name);
                        }
                        this.setupFullMustacheParams(partial, program, undefined, true);
                        var indent = partial.indent || '';
                        if (this.options.preventIndent && indent) {
                            this.opcode('appendContent', indent);
                            indent = '';
                        }
                        this.opcode('invokePartial', isDynamic, partialName, indent);
                        this.opcode('append');
                    }, PartialBlockStatement: function PartialBlockStatement(partialBlock) {
                        this.PartialStatement(partialBlock);
                    }, MustacheStatement: function MustacheStatement(mustache) {
                        this.SubExpression(mustache);
                        if (mustache.escaped && !this.options.noEscape) {
                            this.opcode('appendEscaped');
                        } else {
                            this.opcode('append');
                        }
                    }, Decorator: function Decorator(decorator) {
                        this.DecoratorBlock(decorator);
                    }, ContentStatement: function ContentStatement(content) {
                        if (content.value) {
                            this.opcode('appendContent', content.value);
                        }
                    }, CommentStatement: function CommentStatement() {
                    }, SubExpression: function SubExpression(sexpr) {
                        transformLiteralToPath(sexpr);
                        var type = this.classifySexpr(sexpr);
                        if (type === 'simple') {
                            this.simpleSexpr(sexpr);
                        } else if (type === 'helper') {
                            this.helperSexpr(sexpr);
                        } else {
                            this.ambiguousSexpr(sexpr);
                        }
                    }, ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
                        var path = sexpr.path, name = path.parts[0], isBlock = program != null || inverse != null;
                        this.opcode('getContext', path.depth);
                        this.opcode('pushProgram', program);
                        this.opcode('pushProgram', inverse);
                        path.strict = true;
                        this.accept(path);
                        this.opcode('invokeAmbiguous', name, isBlock);
                    }, simpleSexpr: function simpleSexpr(sexpr) {
                        var path = sexpr.path;
                        path.strict = true;
                        this.accept(path);
                        this.opcode('resolvePossibleLambda');
                    }, helperSexpr: function helperSexpr(sexpr, program, inverse) {
                        var params = this.setupFullMustacheParams(sexpr, program, inverse), path = sexpr.path, name = path.parts[0];
                        if (this.options.knownHelpers[name]) {
                            this.opcode('invokeKnownHelper', params.length, name);
                        } else if (this.options.knownHelpersOnly) {
                            throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
                        } else {
                            path.strict = true;
                            path.falsy = true;
                            this.accept(path);
                            this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
                        }
                    }, PathExpression: function PathExpression(path) {
                        this.addDepth(path.depth);
                        this.opcode('getContext', path.depth);
                        var name = path.parts[0], scoped = _ast2['default'].helpers.scopedId(path), blockParamId = !path.depth && !scoped && this.blockParamIndex(name);
                        if (blockParamId) {
                            this.opcode('lookupBlockParam', blockParamId, path.parts);
                        } else if (!name) { // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
                            this.opcode('pushContext');
                        } else if (path.data) {
                            this.options.data = true;
                            this.opcode('lookupData', path.depth, path.parts, path.strict);
                        } else {
                            this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
                        }
                    }, StringLiteral: function StringLiteral(string) {
                        this.opcode('pushString', string.value);
                    }, NumberLiteral: function NumberLiteral(number) {
                        this.opcode('pushLiteral', number.value);
                    }, BooleanLiteral: function BooleanLiteral(bool) {
                        this.opcode('pushLiteral', bool.value);
                    }, UndefinedLiteral: function UndefinedLiteral() {
                        this.opcode('pushLiteral', 'undefined');
                    }, NullLiteral: function NullLiteral() {
                        this.opcode('pushLiteral', 'null');
                    }, Hash: function Hash(hash) {
                        var pairs = hash.pairs, i = 0, l = pairs.length;
                        this.opcode('pushHash');
                        for (; i < l; i++) {
                            this.pushParam(pairs[i].value);
                        }
                        while (i--) {
                            this.opcode('assignToHash', pairs[i].key);
                        }
                        this.opcode('popHash');
                    }, // HELPERS
                    opcode: function opcode(name) {
                        this.opcodes.push({opcode: name, args: slice.call(arguments, 1), loc: this.sourceNode[0].loc});
                    }, addDepth: function addDepth(depth) {
                        if (!depth) {
                            return;
                        }
                        this.useDepths = true;
                    }, classifySexpr: function classifySexpr(sexpr) {
                        var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);
                        var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]); // a mustache is an eligible helper if:
                        // * its id is simple (a single part, not `this` or `..`)
                        var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr); // if a mustache is an eligible helper but not a definite
                        // helper, it is ambiguous, and will be resolved in a later
                        // pass or at runtime.
                        var isEligible = !isBlockParam && (isHelper || isSimple); // if ambiguous, we can possibly resolve the ambiguity now
                        // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
                        if (isEligible && !isHelper) {
                            var _name2 = sexpr.path.parts[0], options = this.options;
                            if (options.knownHelpers[_name2]) {
                                isHelper = true;
                            } else if (options.knownHelpersOnly) {
                                isEligible = false;
                            }
                        }
                        if (isHelper) {
                            return 'helper';
                        } else if (isEligible) {
                            return 'ambiguous';
                        } else {
                            return 'simple';
                        }
                    }, pushParams: function pushParams(params) {
                        for (var i = 0, l = params.length; i < l; i++) {
                            this.pushParam(params[i]);
                        }
                    }, pushParam: function pushParam(val) {
                        var value = val.value != null ? val.value : val.original || '';
                        if (this.stringParams) {
                            if (value.replace) {
                                value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
                            }
                            if (val.depth) {
                                this.addDepth(val.depth);
                            }
                            this.opcode('getContext', val.depth || 0);
                            this.opcode('pushStringParam', value, val.type);
                            if (val.type === 'SubExpression') { // SubExpressions get evaluated and passed in
                                // in string params mode.
                                this.accept(val);
                            }
                        } else {
                            if (this.trackIds) {
                                var blockParamIndex = undefined;
                                if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
                                    blockParamIndex = this.blockParamIndex(val.parts[0]);
                                }
                                if (blockParamIndex) {
                                    var blockParamChild = val.parts.slice(1).join('.');
                                    this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
                                } else {
                                    value = val.original || value;
                                    if (value.replace) {
                                        value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
                                    }
                                    this.opcode('pushId', val.type, value);
                                }
                            }
                            this.accept(val);
                        }
                    }, setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
                        var params = sexpr.params;
                        this.pushParams(params);
                        this.opcode('pushProgram', program);
                        this.opcode('pushProgram', inverse);
                        if (sexpr.hash) {
                            this.accept(sexpr.hash);
                        } else {
                            this.opcode('emptyHash', omitEmpty);
                        }
                        return params;
                    }, blockParamIndex: function blockParamIndex(name) {
                        for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
                            var blockParams = this.options.blockParams[depth], param = blockParams && _utils.indexOf(blockParams, name);
                            if (blockParams && param >= 0) {
                                return [depth, param];
                            }
                        }
                    }
                };
                function precompile(input, options, env) {
                    if (input == null || typeof input !== 'string' && input.type !== 'Program') {
                        throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
                    }
                    options = options || {};
                    if (!('data' in options)) {
                        options.data = true;
                    }
                    if (options.compat) {
                        options.useDepths = true;
                    }
                    var ast = env.parse(input, options), environment = new env.Compiler().compile(ast, options);
                    return new env.JavaScriptCompiler().compile(environment, options);
                }

                function compile(input, options, env) {
                    if (options === undefined)options = {};
                    if (input == null || typeof input !== 'string' && input.type !== 'Program') {
                        throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
                    }
                    if (!('data' in options)) {
                        options.data = true;
                    }
                    if (options.compat) {
                        options.useDepths = true;
                    }
                    var compiled = undefined;

                    function compileInput() {
                        var ast = env.parse(input, options), environment = new env.Compiler().compile(ast, options), templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
                        return env.template(templateSpec);
                    } // Template is only compiled on first use and cached after that point.
                    function ret(context, execOptions) {
                        if (!compiled) {
                            compiled = compileInput();
                        }
                        return compiled.call(this, context, execOptions);
                    }

                    ret._setup = function (setupOptions) {
                        if (!compiled) {
                            compiled = compileInput();
                        }
                        return compiled._setup(setupOptions);
                    };
                    ret._child = function (i, data, blockParams, depths) {
                        if (!compiled) {
                            compiled = compileInput();
                        }
                        return compiled._child(i, data, blockParams, depths);
                    };
                    return ret;
                }

                function argEquals(a, b) {
                    if (a === b) {
                        return true;
                    }
                    if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
                        for (var i = 0; i < a.length; i++) {
                            if (!argEquals(a[i], b[i])) {
                                return false;
                            }
                        }
                        return true;
                    }
                }

                function transformLiteralToPath(sexpr) {
                    if (!sexpr.path.parts) {
                        var literal = sexpr.path; // Casting to string here to make false and 0 literal values play nicely with the rest
                        // of the system.
                        sexpr.path = {
                            type: 'PathExpression',
                            data: false,
                            depth: 0,
                            parts: [literal.original + ''],
                            original: literal.original + '',
                            loc: literal.loc
                        };
                    }
                }

                /***/
            }, /* 5 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                var _base = __webpack_require__(10);
                var _exception = __webpack_require__(12);
                var _exception2 = _interopRequireDefault(_exception);
                var _utils = __webpack_require__(13);
                var _codeGen = __webpack_require__(18);
                var _codeGen2 = _interopRequireDefault(_codeGen);

                function Literal(value) {
                    this.value = value;
                }

                function JavaScriptCompiler() {
                }

                JavaScriptCompiler.prototype = { // PUBLIC API: You can override these methods in a subclass to provide
                    // alternative compiled forms for name lookup and buffering semantics
                    nameLookup: function nameLookup(parent, name /* , type*/) {
                        if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
                            return [parent, '.', name];
                        } else {
                            return [parent, '[', JSON.stringify(name), ']'];
                        }
                    }, depthedLookup: function depthedLookup(name) {
                        return [this.aliasable('container.lookup'), '(depths, "', name, '")'];
                    }, compilerInfo: function compilerInfo() {
                        var revision = _base.COMPILER_REVISION, versions = _base.REVISION_CHANGES[revision];
                        return [revision, versions];
                    }, appendToBuffer: function appendToBuffer(source, location, explicit) { // Force a source as this simplifies the merge logic.
                        if (!_utils.isArray(source)) {
                            source = [source];
                        }
                        source = this.source.wrap(source, location);
                        if (this.environment.isSimple) {
                            return ['return ', source, ';'];
                        } else if (explicit) { // This is a case where the buffer operation occurs as a child of another
                            // construct, generally braces. We have to explicitly output these buffer
                            // operations to ensure that the emitted code goes in the correct location.
                            return ['buffer += ', source, ';'];
                        } else {
                            source.appendToBuffer = true;
                            return source;
                        }
                    }, initializeBuffer: function initializeBuffer() {
                        return this.quotedString('');
                    }, // END PUBLIC API
                    compile: function compile(environment, options, context, asObject) {
                        this.environment = environment;
                        this.options = options;
                        this.stringParams = this.options.stringParams;
                        this.trackIds = this.options.trackIds;
                        this.precompile = !asObject;
                        this.name = this.environment.name;
                        this.isChild = !!context;
                        this.context = context || {decorators: [], programs: [], environments: []};
                        this.preamble();
                        this.stackSlot = 0;
                        this.stackVars = [];
                        this.aliases = {};
                        this.registers = {list: []};
                        this.hashes = [];
                        this.compileStack = [];
                        this.inlineStack = [];
                        this.blockParams = [];
                        this.compileChildren(environment, options);
                        this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
                        this.useBlockParams = this.useBlockParams || environment.useBlockParams;
                        var opcodes = environment.opcodes, opcode = undefined, firstLoc = undefined, i = undefined, l = undefined;
                        for (i = 0, l = opcodes.length; i < l; i++) {
                            opcode = opcodes[i];
                            this.source.currentLocation = opcode.loc;
                            firstLoc = firstLoc || opcode.loc;
                            this[opcode.opcode].apply(this, opcode.args);
                        } // Flush any trailing content that might be pending.
                        this.source.currentLocation = firstLoc;
                        this.pushSource('');
                        /* istanbul ignore next */
                        if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
                            throw new _exception2['default']('Compile completed with content left on stack');
                        }
                        if (!this.decorators.isEmpty()) {
                            this.useDecorators = true;
                            this.decorators.prepend('var decorators = container.decorators;\n');
                            this.decorators.push('return fn;');
                            if (asObject) {
                                this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
                            } else {
                                this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
                                this.decorators.push('}\n');
                                this.decorators = this.decorators.merge();
                            }
                        } else {
                            this.decorators = undefined;
                        }
                        var fn = this.createFunctionContext(asObject);
                        if (!this.isChild) {
                            var ret = {compiler: this.compilerInfo(), main: fn};
                            if (this.decorators) {
                                ret.main_d = this.decorators; // eslint-disable-line camelcase
                                ret.useDecorators = true;
                            }
                            var _context = this.context;
                            var programs = _context.programs;
                            var decorators = _context.decorators;
                            for (i = 0, l = programs.length; i < l; i++) {
                                if (programs[i]) {
                                    ret[i] = programs[i];
                                    if (decorators[i]) {
                                        ret[i + '_d'] = decorators[i];
                                        ret.useDecorators = true;
                                    }
                                }
                            }
                            if (this.environment.usePartial) {
                                ret.usePartial = true;
                            }
                            if (this.options.data) {
                                ret.useData = true;
                            }
                            if (this.useDepths) {
                                ret.useDepths = true;
                            }
                            if (this.useBlockParams) {
                                ret.useBlockParams = true;
                            }
                            if (this.options.compat) {
                                ret.compat = true;
                            }
                            if (!asObject) {
                                ret.compiler = JSON.stringify(ret.compiler);
                                this.source.currentLocation = {start: {line: 1, column: 0}};
                                ret = this.objectLiteral(ret);
                                if (options.srcName) {
                                    ret = ret.toStringWithSourceMap({file: options.destName});
                                    ret.map = ret.map && ret.map.toString();
                                } else {
                                    ret = ret.toString();
                                }
                            } else {
                                ret.compilerOptions = this.options;
                            }
                            return ret;
                        } else {
                            return fn;
                        }
                    }, preamble: function preamble() { // track the last context pushed into place to allow skipping the
                        // getContext opcode when it would be a noop
                        this.lastContext = 0;
                        this.source = new _codeGen2['default'](this.options.srcName);
                        this.decorators = new _codeGen2['default'](this.options.srcName);
                    }, createFunctionContext: function createFunctionContext(asObject) {
                        var varDeclarations = '';
                        var locals = this.stackVars.concat(this.registers.list);
                        if (locals.length > 0) {
                            varDeclarations += ', ' + locals.join(', ');
                        } // Generate minimizer alias mappings
                        //
                        // When using true SourceNodes, this will update all references to the given alias
                        // as the source nodes are reused in situ. For the non-source node compilation mode,
                        // aliases will not be used, but this case is already being run on the client and
                        // we aren't concern about minimizing the template size.
                        var aliasCount = 0;
                        for (var alias in this.aliases) { // eslint-disable-line guard-for-in
                            var node = this.aliases[alias];
                            if (this.aliases.hasOwnProperty(alias) && node.children && node.referenceCount > 1) {
                                varDeclarations += ', alias' + ++aliasCount + '=' + alias;
                                node.children[0] = 'alias' + aliasCount;
                            }
                        }
                        var params = ['container', 'depth0', 'helpers', 'partials', 'data'];
                        if (this.useBlockParams || this.useDepths) {
                            params.push('blockParams');
                        }
                        if (this.useDepths) {
                            params.push('depths');
                        } // Perform a second pass over the output to merge content when possible
                        var source = this.mergeSource(varDeclarations);
                        if (asObject) {
                            params.push(source);
                            return Function.apply(this, params);
                        } else {
                            return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
                        }
                    }, mergeSource: function mergeSource(varDeclarations) {
                        var isSimple = this.environment.isSimple, appendOnly = !this.forceBuffer, appendFirst = undefined, sourceSeen = undefined, bufferStart = undefined, bufferEnd = undefined;
                        this.source.each(function (line) {
                            if (line.appendToBuffer) {
                                if (bufferStart) {
                                    line.prepend('  + ');
                                } else {
                                    bufferStart = line;
                                }
                                bufferEnd = line;
                            } else {
                                if (bufferStart) {
                                    if (!sourceSeen) {
                                        appendFirst = true;
                                    } else {
                                        bufferStart.prepend('buffer += ');
                                    }
                                    bufferEnd.add(';');
                                    bufferStart = bufferEnd = undefined;
                                }
                                sourceSeen = true;
                                if (!isSimple) {
                                    appendOnly = false;
                                }
                            }
                        });
                        if (appendOnly) {
                            if (bufferStart) {
                                bufferStart.prepend('return ');
                                bufferEnd.add(';');
                            } else if (!sourceSeen) {
                                this.source.push('return "";');
                            }
                        } else {
                            varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());
                            if (bufferStart) {
                                bufferStart.prepend('return buffer + ');
                                bufferEnd.add(';');
                            } else {
                                this.source.push('return buffer;');
                            }
                        }
                        if (varDeclarations) {
                            this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
                        }
                        return this.source.merge();
                    }, // [blockValue]
                    //
                    // On stack, before: hash, inverse, program, value
                    // On stack, after: return value of blockHelperMissing
                    //
                    // The purpose of this opcode is to take a block of the form
                    // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
                    // replace it on the stack with the result of properly
                    // invoking blockHelperMissing.
                    blockValue: function blockValue(name) {
                        var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'), params = [this.contextName(0)];
                        this.setupHelperArgs(name, 0, params);
                        var blockName = this.popStack();
                        params.splice(1, 0, blockName);
                        this.push(this.source.functionCall(blockHelperMissing, 'call', params));
                    }, // [ambiguousBlockValue]
                    //
                    // On stack, before: hash, inverse, program, value
                    // Compiler value, before: lastHelper=value of last found helper, if any
                    // On stack, after, if no lastHelper: same as [blockValue]
                    // On stack, after, if lastHelper: value
                    ambiguousBlockValue: function ambiguousBlockValue() { // We're being a bit cheeky and reusing the options value from the prior exec
                        var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'), params = [this.contextName(0)];
                        this.setupHelperArgs('', 0, params, true);
                        this.flushInline();
                        var current = this.topStack();
                        params.splice(1, 0, current);
                        this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
                    }, // [appendContent]
                    //
                    // On stack, before: ...
                    // On stack, after: ...
                    //
                    // Appends the string value of `content` to the current buffer
                    appendContent: function appendContent(content) {
                        if (this.pendingContent) {
                            content = this.pendingContent + content;
                        } else {
                            this.pendingLocation = this.source.currentLocation;
                        }
                        this.pendingContent = content;
                    }, // [append]
                    //
                    // On stack, before: value, ...
                    // On stack, after: ...
                    //
                    // Coerces `value` to a String and appends it to the current buffer.
                    //
                    // If `value` is truthy, or 0, it is coerced into a string and appended
                    // Otherwise, the empty string is appended
                    append: function append() {
                        if (this.isInline()) {
                            this.replaceStack(function (current) {
                                return [' != null ? ', current, ' : ""'];
                            });
                            this.pushSource(this.appendToBuffer(this.popStack()));
                        } else {
                            var local = this.popStack();
                            this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
                            if (this.environment.isSimple) {
                                this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
                            }
                        }
                    }, // [appendEscaped]
                    //
                    // On stack, before: value, ...
                    // On stack, after: ...
                    //
                    // Escape `value` and append it to the buffer
                    appendEscaped: function appendEscaped() {
                        this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
                    }, // [getContext]
                    //
                    // On stack, before: ...
                    // On stack, after: ...
                    // Compiler value, after: lastContext=depth
                    //
                    // Set the value of the `lastContext` compiler value to the depth
                    getContext: function getContext(depth) {
                        this.lastContext = depth;
                    }, // [pushContext]
                    //
                    // On stack, before: ...
                    // On stack, after: currentContext, ...
                    //
                    // Pushes the value of the current context onto the stack.
                    pushContext: function pushContext() {
                        this.pushStackLiteral(this.contextName(this.lastContext));
                    }, // [lookupOnContext]
                    //
                    // On stack, before: ...
                    // On stack, after: currentContext[name], ...
                    //
                    // Looks up the value of `name` on the current context and pushes
                    // it onto the stack.
                    lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
                        var i = 0;
                        if (!scoped && this.options.compat && !this.lastContext) { // The depthed query is expected to handle the undefined logic for the root level that
                            // is implemented below, so we evaluate that directly in compat mode
                            this.push(this.depthedLookup(parts[i++]));
                        } else {
                            this.pushContext();
                        }
                        this.resolvePath('context', parts, i, falsy, strict);
                    }, // [lookupBlockParam]
                    //
                    // On stack, before: ...
                    // On stack, after: blockParam[name], ...
                    //
                    // Looks up the value of `parts` on the given block param and pushes
                    // it onto the stack.
                    lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
                        this.useBlockParams = true;
                        this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
                        this.resolvePath('context', parts, 1);
                    }, // [lookupData]
                    //
                    // On stack, before: ...
                    // On stack, after: data, ...
                    //
                    // Push the data lookup operator
                    lookupData: function lookupData(depth, parts, strict) {
                        if (!depth) {
                            this.pushStackLiteral('data');
                        } else {
                            this.pushStackLiteral('container.data(data, ' + depth + ')');
                        }
                        this.resolvePath('data', parts, 0, true, strict);
                    }, resolvePath: function resolvePath(type, parts, i, falsy, strict) { // istanbul ignore next
                        var _this = this;
                        if (this.options.strict || this.options.assumeObjects) {
                            this.push(strictLookup(this.options.strict && strict, this, parts, type));
                            return;
                        }
                        var len = parts.length;
                        for (; i < len; i++) { /* eslint-disable no-loop-func */
                            this.replaceStack(function (current) {
                                var lookup = _this.nameLookup(current, parts[i], type); // We want to ensure that zero and false are handled properly if the context (falsy flag)
                                // needs to have the special handling for these values.
                                if (!falsy) {
                                    return [' != null ? ', lookup, ' : ', current];
                                } else { // Otherwise we can use generic falsy handling
                                    return [' && ', lookup];
                                }
                            });
                            /* eslint-enable no-loop-func */
                        }
                    }, // [resolvePossibleLambda]
                    //
                    // On stack, before: value, ...
                    // On stack, after: resolved value, ...
                    //
                    // If the `value` is a lambda, replace it on the stack by
                    // the return value of the lambda
                    resolvePossibleLambda: function resolvePossibleLambda() {
                        this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
                    }, // [pushStringParam]
                    //
                    // On stack, before: ...
                    // On stack, after: string, currentContext, ...
                    //
                    // This opcode is designed for use in string mode, which
                    // provides the string value of a parameter along with its
                    // depth rather than resolving it immediately.
                    pushStringParam: function pushStringParam(string, type) {
                        this.pushContext();
                        this.pushString(type); // If it's a subexpression, the string result
                        // will be pushed after this opcode.
                        if (type !== 'SubExpression') {
                            if (typeof string === 'string') {
                                this.pushString(string);
                            } else {
                                this.pushStackLiteral(string);
                            }
                        }
                    }, emptyHash: function emptyHash(omitEmpty) {
                        if (this.trackIds) {
                            this.push('{}'); // hashIds
                        }
                        if (this.stringParams) {
                            this.push('{}'); // hashContexts
                            this.push('{}'); // hashTypes
                        }
                        this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
                    }, pushHash: function pushHash() {
                        if (this.hash) {
                            this.hashes.push(this.hash);
                        }
                        this.hash = {values: [], types: [], contexts: [], ids: []};
                    }, popHash: function popHash() {
                        var hash = this.hash;
                        this.hash = this.hashes.pop();
                        if (this.trackIds) {
                            this.push(this.objectLiteral(hash.ids));
                        }
                        if (this.stringParams) {
                            this.push(this.objectLiteral(hash.contexts));
                            this.push(this.objectLiteral(hash.types));
                        }
                        this.push(this.objectLiteral(hash.values));
                    }, // [pushString]
                    //
                    // On stack, before: ...
                    // On stack, after: quotedString(string), ...
                    //
                    // Push a quoted version of `string` onto the stack
                    pushString: function pushString(string) {
                        this.pushStackLiteral(this.quotedString(string));
                    }, // [pushLiteral]
                    //
                    // On stack, before: ...
                    // On stack, after: value, ...
                    //
                    // Pushes a value onto the stack. This operation prevents
                    // the compiler from creating a temporary variable to hold
                    // it.
                    pushLiteral: function pushLiteral(value) {
                        this.pushStackLiteral(value);
                    }, // [pushProgram]
                    //
                    // On stack, before: ...
                    // On stack, after: program(guid), ...
                    //
                    // Push a program expression onto the stack. This takes
                    // a compile-time guid and converts it into a runtime-accessible
                    // expression.
                    pushProgram: function pushProgram(guid) {
                        if (guid != null) {
                            this.pushStackLiteral(this.programExpression(guid));
                        } else {
                            this.pushStackLiteral(null);
                        }
                    }, // [registerDecorator]
                    //
                    // On stack, before: hash, program, params..., ...
                    // On stack, after: ...
                    //
                    // Pops off the decorator's parameters, invokes the decorator,
                    // and inserts the decorator into the decorators list.
                    registerDecorator: function registerDecorator(paramSize, name) {
                        var foundDecorator = this.nameLookup('decorators', name, 'decorator'), options = this.setupHelperArgs(name, paramSize);
                        this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
                    }, // [invokeHelper]
                    //
                    // On stack, before: hash, inverse, program, params..., ...
                    // On stack, after: result of helper invocation
                    //
                    // Pops off the helper's parameters, invokes the helper,
                    // and pushes the helper's return value onto the stack.
                    //
                    // If the helper is not found, `helperMissing` is called.
                    invokeHelper: function invokeHelper(paramSize, name, isSimple) {
                        var nonHelper = this.popStack(), helper = this.setupHelper(paramSize, name), simple = isSimple ? [helper.name, ' || '] : '';
                        var lookup = ['('].concat(simple, nonHelper);
                        if (!this.options.strict) {
                            lookup.push(' || ', this.aliasable('helpers.helperMissing'));
                        }
                        lookup.push(')');
                        this.push(this.source.functionCall(lookup, 'call', helper.callParams));
                    }, // [invokeKnownHelper]
                    //
                    // On stack, before: hash, inverse, program, params..., ...
                    // On stack, after: result of helper invocation
                    //
                    // This operation is used when the helper is known to exist,
                    // so a `helperMissing` fallback is not required.
                    invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
                        var helper = this.setupHelper(paramSize, name);
                        this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
                    }, // [invokeAmbiguous]
                    //
                    // On stack, before: hash, inverse, program, params..., ...
                    // On stack, after: result of disambiguation
                    //
                    // This operation is used when an expression like `{{foo}}`
                    // is provided, but we don't know at compile-time whether it
                    // is a helper or a path.
                    //
                    // This operation emits more code than the other options,
                    // and can be avoided by passing the `knownHelpers` and
                    // `knownHelpersOnly` flags at compile-time.
                    invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
                        this.useRegister('helper');
                        var nonHelper = this.popStack();
                        this.emptyHash();
                        var helper = this.setupHelper(0, name, helperCall);
                        var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');
                        var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
                        if (!this.options.strict) {
                            lookup[0] = '(helper = ';
                            lookup.push(' != null ? helper : ', this.aliasable('helpers.helperMissing'));
                        }
                        this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
                    }, // [invokePartial]
                    //
                    // On stack, before: context, ...
                    // On stack after: result of partial invocation
                    //
                    // This operation pops off a context, invokes a partial with that context,
                    // and pushes the result of the invocation back.
                    invokePartial: function invokePartial(isDynamic, name, indent) {
                        var params = [], options = this.setupParams(name, 1, params);
                        if (isDynamic) {
                            name = this.popStack();
                            delete options.name;
                        }
                        if (indent) {
                            options.indent = JSON.stringify(indent);
                        }
                        options.helpers = 'helpers';
                        options.partials = 'partials';
                        options.decorators = 'container.decorators';
                        if (!isDynamic) {
                            params.unshift(this.nameLookup('partials', name, 'partial'));
                        } else {
                            params.unshift(name);
                        }
                        if (this.options.compat) {
                            options.depths = 'depths';
                        }
                        options = this.objectLiteral(options);
                        params.push(options);
                        this.push(this.source.functionCall('container.invokePartial', '', params));
                    }, // [assignToHash]
                    //
                    // On stack, before: value, ..., hash, ...
                    // On stack, after: ..., hash, ...
                    //
                    // Pops a value off the stack and assigns it to the current hash
                    assignToHash: function assignToHash(key) {
                        var value = this.popStack(), context = undefined, type = undefined, id = undefined;
                        if (this.trackIds) {
                            id = this.popStack();
                        }
                        if (this.stringParams) {
                            type = this.popStack();
                            context = this.popStack();
                        }
                        var hash = this.hash;
                        if (context) {
                            hash.contexts[key] = context;
                        }
                        if (type) {
                            hash.types[key] = type;
                        }
                        if (id) {
                            hash.ids[key] = id;
                        }
                        hash.values[key] = value;
                    }, pushId: function pushId(type, name, child) {
                        if (type === 'BlockParam') {
                            this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
                        } else if (type === 'PathExpression') {
                            this.pushString(name);
                        } else if (type === 'SubExpression') {
                            this.pushStackLiteral('true');
                        } else {
                            this.pushStackLiteral('null');
                        }
                    }, // HELPERS
                    compiler: JavaScriptCompiler, compileChildren: function compileChildren(environment, options) {
                        var children = environment.children, child = undefined, compiler = undefined;
                        for (var i = 0, l = children.length; i < l; i++) {
                            child = children[i];
                            compiler = new this.compiler(); // eslint-disable-line new-cap
                            var index = this.matchExistingProgram(child);
                            if (index == null) {
                                this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
                                index = this.context.programs.length;
                                child.index = index;
                                child.name = 'program' + index;
                                this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
                                this.context.decorators[index] = compiler.decorators;
                                this.context.environments[index] = child;
                                this.useDepths = this.useDepths || compiler.useDepths;
                                this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
                            } else {
                                child.index = index;
                                child.name = 'program' + index;
                                this.useDepths = this.useDepths || child.useDepths;
                                this.useBlockParams = this.useBlockParams || child.useBlockParams;
                            }
                        }
                    }, matchExistingProgram: function matchExistingProgram(child) {
                        for (var i = 0, len = this.context.environments.length; i < len; i++) {
                            var environment = this.context.environments[i];
                            if (environment && environment.equals(child)) {
                                return i;
                            }
                        }
                    }, programExpression: function programExpression(guid) {
                        var child = this.environment.children[guid], programParams = [child.index, 'data', child.blockParams];
                        if (this.useBlockParams || this.useDepths) {
                            programParams.push('blockParams');
                        }
                        if (this.useDepths) {
                            programParams.push('depths');
                        }
                        return 'container.program(' + programParams.join(', ') + ')';
                    }, useRegister: function useRegister(name) {
                        if (!this.registers[name]) {
                            this.registers[name] = true;
                            this.registers.list.push(name);
                        }
                    }, push: function push(expr) {
                        if (!(expr instanceof Literal)) {
                            expr = this.source.wrap(expr);
                        }
                        this.inlineStack.push(expr);
                        return expr;
                    }, pushStackLiteral: function pushStackLiteral(item) {
                        this.push(new Literal(item));
                    }, pushSource: function pushSource(source) {
                        if (this.pendingContent) {
                            this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
                            this.pendingContent = undefined;
                        }
                        if (source) {
                            this.source.push(source);
                        }
                    }, replaceStack: function replaceStack(callback) {
                        var prefix = ['('], stack = undefined, createdStack = undefined, usedLiteral = undefined;
                        /* istanbul ignore next */
                        if (!this.isInline()) {
                            throw new _exception2['default']('replaceStack on non-inline');
                        } // We want to merge the inline statement into the replacement statement via ','
                        var top = this.popStack(true);
                        if (top instanceof Literal) { // Literals do not need to be inlined
                            stack = [top.value];
                            prefix = ['(', stack];
                            usedLiteral = true;
                        } else { // Get or create the current stack name for use by the inline
                            createdStack = true;
                            var _name = this.incrStack();
                            prefix = ['((', this.push(_name), ' = ', top, ')'];
                            stack = this.topStack();
                        }
                        var item = callback.call(this, stack);
                        if (!usedLiteral) {
                            this.popStack();
                        }
                        if (createdStack) {
                            this.stackSlot--;
                        }
                        this.push(prefix.concat(item, ')'));
                    }, incrStack: function incrStack() {
                        this.stackSlot++;
                        if (this.stackSlot > this.stackVars.length) {
                            this.stackVars.push('stack' + this.stackSlot);
                        }
                        return this.topStackName();
                    }, topStackName: function topStackName() {
                        return 'stack' + this.stackSlot;
                    }, flushInline: function flushInline() {
                        var inlineStack = this.inlineStack;
                        this.inlineStack = [];
                        for (var i = 0, len = inlineStack.length; i < len; i++) {
                            var entry = inlineStack[i];
                            /* istanbul ignore if */
                            if (entry instanceof Literal) {
                                this.compileStack.push(entry);
                            } else {
                                var stack = this.incrStack();
                                this.pushSource([stack, ' = ', entry, ';']);
                                this.compileStack.push(stack);
                            }
                        }
                    }, isInline: function isInline() {
                        return this.inlineStack.length;
                    }, popStack: function popStack(wrapped) {
                        var inline = this.isInline(), item = (inline ? this.inlineStack : this.compileStack).pop();
                        if (!wrapped && item instanceof Literal) {
                            return item.value;
                        } else {
                            if (!inline) { /* istanbul ignore next */
                                if (!this.stackSlot) {
                                    throw new _exception2['default']('Invalid stack pop');
                                }
                                this.stackSlot--;
                            }
                            return item;
                        }
                    }, topStack: function topStack() {
                        var stack = this.isInline() ? this.inlineStack : this.compileStack, item = stack[stack.length - 1];
                        /* istanbul ignore if */
                        if (item instanceof Literal) {
                            return item.value;
                        } else {
                            return item;
                        }
                    }, contextName: function contextName(context) {
                        if (this.useDepths && context) {
                            return 'depths[' + context + ']';
                        } else {
                            return 'depth' + context;
                        }
                    }, quotedString: function quotedString(str) {
                        return this.source.quotedString(str);
                    }, objectLiteral: function objectLiteral(obj) {
                        return this.source.objectLiteral(obj);
                    }, aliasable: function aliasable(name) {
                        var ret = this.aliases[name];
                        if (ret) {
                            ret.referenceCount++;
                            return ret;
                        }
                        ret = this.aliases[name] = this.source.wrap(name);
                        ret.aliasable = true;
                        ret.referenceCount = 1;
                        return ret;
                    }, setupHelper: function setupHelper(paramSize, name, blockHelper) {
                        var params = [], paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
                        var foundHelper = this.nameLookup('helpers', name, 'helper'), callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : {}');
                        return {
                            params: params,
                            paramsInit: paramsInit,
                            name: foundHelper,
                            callParams: [callContext].concat(params)
                        };
                    }, setupParams: function setupParams(helper, paramSize, params) {
                        var options = {}, contexts = [], types = [], ids = [], objectArgs = !params, param = undefined;
                        if (objectArgs) {
                            params = [];
                        }
                        options.name = this.quotedString(helper);
                        options.hash = this.popStack();
                        if (this.trackIds) {
                            options.hashIds = this.popStack();
                        }
                        if (this.stringParams) {
                            options.hashTypes = this.popStack();
                            options.hashContexts = this.popStack();
                        }
                        var inverse = this.popStack(), program = this.popStack(); // Avoid setting fn and inverse if neither are set. This allows
                        // helpers to do a check for `if (options.fn)`
                        if (program || inverse) {
                            options.fn = program || 'container.noop';
                            options.inverse = inverse || 'container.noop';
                        } // The parameters go on to the stack in order (making sure that they are evaluated in order)
                        // so we need to pop them off the stack in reverse order
                        var i = paramSize;
                        while (i--) {
                            param = this.popStack();
                            params[i] = param;
                            if (this.trackIds) {
                                ids[i] = this.popStack();
                            }
                            if (this.stringParams) {
                                types[i] = this.popStack();
                                contexts[i] = this.popStack();
                            }
                        }
                        if (objectArgs) {
                            options.args = this.source.generateArray(params);
                        }
                        if (this.trackIds) {
                            options.ids = this.source.generateArray(ids);
                        }
                        if (this.stringParams) {
                            options.types = this.source.generateArray(types);
                            options.contexts = this.source.generateArray(contexts);
                        }
                        if (this.options.data) {
                            options.data = 'data';
                        }
                        if (this.useBlockParams) {
                            options.blockParams = 'blockParams';
                        }
                        return options;
                    }, setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
                        var options = this.setupParams(helper, paramSize, params);
                        options = this.objectLiteral(options);
                        if (useRegister) {
                            this.useRegister('options');
                            params.push('options');
                            return ['options=', options];
                        } else if (params) {
                            params.push(options);
                            return '';
                        } else {
                            return options;
                        }
                    }
                };
                (function () {
                    var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');
                    var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
                    for (var i = 0, l = reservedWords.length; i < l; i++) {
                        compilerWords[reservedWords[i]] = true;
                    }
                })();
                JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
                    return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
                };
                function strictLookup(requireTerminal, compiler, parts, type) {
                    var stack = compiler.popStack(), i = 0, len = parts.length;
                    if (requireTerminal) {
                        len--;
                    }
                    for (; i < len; i++) {
                        stack = compiler.nameLookup(stack, parts[i], type);
                    }
                    if (requireTerminal) {
                        return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ')'];
                    } else {
                        return stack;
                    }
                }

                exports['default'] = JavaScriptCompiler;
                module.exports = exports['default'];
                /***/
            }, /* 6 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                var _exception = __webpack_require__(12);
                var _exception2 = _interopRequireDefault(_exception);

                function Visitor() {
                    this.parents = [];
                }

                Visitor.prototype = {
                    constructor: Visitor,
                    mutating: false, // Visits a given value. If mutating, will replace the value if necessary.
                    acceptKey: function acceptKey(node, name) {
                        var value = this.accept(node[name]);
                        if (this.mutating) { // Hacky sanity check: This may have a few false positives for type for the helper
                            // methods but will generally do the right thing without a lot of overhead.
                            if (value && !Visitor.prototype[value.type]) {
                                throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
                            }
                            node[name] = value;
                        }
                    }, // Performs an accept operation with added sanity check to ensure
                    // required keys are not removed.
                    acceptRequired: function acceptRequired(node, name) {
                        this.acceptKey(node, name);
                        if (!node[name]) {
                            throw new _exception2['default'](node.type + ' requires ' + name);
                        }
                    }, // Traverses a given array. If mutating, empty respnses will be removed
                    // for child elements.
                    acceptArray: function acceptArray(array) {
                        for (var i = 0, l = array.length; i < l; i++) {
                            this.acceptKey(array, i);
                            if (!array[i]) {
                                array.splice(i, 1);
                                i--;
                                l--;
                            }
                        }
                    },
                    accept: function accept(object) {
                        if (!object) {
                            return;
                        }
                        /* istanbul ignore next: Sanity code */
                        if (!this[object.type]) {
                            throw new _exception2['default']('Unknown type: ' + object.type, object);
                        }
                        if (this.current) {
                            this.parents.unshift(this.current);
                        }
                        this.current = object;
                        var ret = this[object.type](object);
                        this.current = this.parents.shift();
                        if (!this.mutating || ret) {
                            return ret;
                        } else if (ret !== false) {
                            return object;
                        }
                    },
                    Program: function Program(program) {
                        this.acceptArray(program.body);
                    },
                    MustacheStatement: visitSubExpression,
                    Decorator: visitSubExpression,
                    BlockStatement: visitBlock,
                    DecoratorBlock: visitBlock,
                    PartialStatement: visitPartial,
                    PartialBlockStatement: function PartialBlockStatement(partial) {
                        visitPartial.call(this, partial);
                        this.acceptKey(partial, 'program');
                    },
                    ContentStatement: function ContentStatement() /* content */ {
                    },
                    CommentStatement: function CommentStatement() /* comment */ {
                    },
                    SubExpression: visitSubExpression,
                    PathExpression: function PathExpression() /* path */ {
                    },
                    StringLiteral: function StringLiteral() /* string */ {
                    },
                    NumberLiteral: function NumberLiteral() /* number */ {
                    },
                    BooleanLiteral: function BooleanLiteral() /* bool */ {
                    },
                    UndefinedLiteral: function UndefinedLiteral() /* literal */ {
                    },
                    NullLiteral: function NullLiteral() /* literal */ {
                    },
                    Hash: function Hash(hash) {
                        this.acceptArray(hash.pairs);
                    },
                    HashPair: function HashPair(pair) {
                        this.acceptRequired(pair, 'value');
                    }
                };
                function visitSubExpression(mustache) {
                    this.acceptRequired(mustache, 'path');
                    this.acceptArray(mustache.params);
                    this.acceptKey(mustache, 'hash');
                }

                function visitBlock(block) {
                    visitSubExpression.call(this, block);
                    this.acceptKey(block, 'program');
                    this.acceptKey(block, 'inverse');
                }

                function visitPartial(partial) {
                    this.acceptRequired(partial, 'name');
                    this.acceptArray(partial.params);
                    this.acceptKey(partial, 'hash');
                }

                exports['default'] = Visitor;
                module.exports = exports['default'];
                /***/
            }, /* 7 */function (module, exports, __webpack_require__) { /* WEBPACK VAR INJECTION */
                (function (global) { /* global window */
                    'use strict';
                    exports.__esModule = true;
                    exports['default'] = function (Handlebars) { /* istanbul ignore next */
                        var root = typeof global !== 'undefined' ? global : window, $Handlebars = root.Handlebars;
                        /* istanbul ignore next */
                        Handlebars.noConflict = function () {
                            if (root.Handlebars === Handlebars) {
                                root.Handlebars = $Handlebars;
                            }
                        };
                    };
                    module.exports = exports['default'];
                    /* WEBPACK VAR INJECTION */
                }).call(exports, (function () {
                    return this;
                })());
                /***/
            }, /* 8 */function (module, exports, __webpack_require__) {
                "use strict";
                exports["default"] = function (obj) {
                    return obj && obj.__esModule ? obj : {"default": obj};
                };
                exports.__esModule = true;
                /***/
            }, /* 9 */function (module, exports, __webpack_require__) {
                "use strict";
                exports["default"] = function (obj) {
                    if (obj && obj.__esModule) {
                        return obj;
                    } else {
                        var newObj = {};
                        if (obj != null) {
                            for (var key in obj) {
                                if (Object.prototype.hasOwnProperty.call(obj, key))newObj[key] = obj[key];
                            }
                        }
                        newObj["default"] = obj;
                        return newObj;
                    }
                };
                exports.__esModule = true;
                /***/
            }, /* 10 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                exports.HandlebarsEnvironment = HandlebarsEnvironment;
                var _utils = __webpack_require__(13);
                var _exception = __webpack_require__(12);
                var _exception2 = _interopRequireDefault(_exception);
                var _helpers = __webpack_require__(19);
                var _decorators = __webpack_require__(20);
                var _logger = __webpack_require__(21);
                var _logger2 = _interopRequireDefault(_logger);
                var VERSION = '4.0.4';
                exports.VERSION = VERSION;
                var COMPILER_REVISION = 7;
                exports.COMPILER_REVISION = COMPILER_REVISION;
                var REVISION_CHANGES = {
                    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
                    2: '== 1.0.0-rc.3',
                    3: '== 1.0.0-rc.4',
                    4: '== 1.x.x',
                    5: '== 2.0.0-alpha.x',
                    6: '>= 2.0.0-beta.1',
                    7: '>= 4.0.0'
                };
                exports.REVISION_CHANGES = REVISION_CHANGES;
                var objectType = '[object Object]';

                function HandlebarsEnvironment(helpers, partials, decorators) {
                    this.helpers = helpers || {};
                    this.partials = partials || {};
                    this.decorators = decorators || {};
                    _helpers.registerDefaultHelpers(this);
                    _decorators.registerDefaultDecorators(this);
                }

                HandlebarsEnvironment.prototype = {
                    constructor: HandlebarsEnvironment,
                    logger: _logger2['default'],
                    log: _logger2['default'].log,
                    registerHelper: function registerHelper(name, fn) {
                        if (_utils.toString.call(name) === objectType) {
                            if (fn) {
                                throw new _exception2['default']('Arg not supported with multiple helpers');
                            }
                            _utils.extend(this.helpers, name);
                        } else {
                            this.helpers[name] = fn;
                        }
                    },
                    unregisterHelper: function unregisterHelper(name) {
                        delete this.helpers[name];
                    },
                    registerPartial: function registerPartial(name, partial) {
                        if (_utils.toString.call(name) === objectType) {
                            _utils.extend(this.partials, name);
                        } else {
                            if (typeof partial === 'undefined') {
                                throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
                            }
                            this.partials[name] = partial;
                        }
                    },
                    unregisterPartial: function unregisterPartial(name) {
                        delete this.partials[name];
                    },
                    registerDecorator: function registerDecorator(name, fn) {
                        if (_utils.toString.call(name) === objectType) {
                            if (fn) {
                                throw new _exception2['default']('Arg not supported with multiple decorators');
                            }
                            _utils.extend(this.decorators, name);
                        } else {
                            this.decorators[name] = fn;
                        }
                    },
                    unregisterDecorator: function unregisterDecorator(name) {
                        delete this.decorators[name];
                    }
                };
                var log = _logger2['default'].log;
                exports.log = log;
                exports.createFrame = _utils.createFrame;
                exports.logger = _logger2['default'];
                /***/
            }, /* 11 */function (module, exports, __webpack_require__) { // Build out our basic SafeString type
                'use strict';
                exports.__esModule = true;
                function SafeString(string) {
                    this.string = string;
                }

                SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
                    return '' + this.string;
                };
                exports['default'] = SafeString;
                module.exports = exports['default'];
                /***/
            }, /* 12 */function (module, exports, __webpack_require__) {
                'use strict';
                exports.__esModule = true;
                var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

                function Exception(message, node) {
                    var loc = node && node.loc, line = undefined, column = undefined;
                    if (loc) {
                        line = loc.start.line;
                        column = loc.start.column;
                        message += ' - ' + line + ':' + column;
                    }
                    var tmp = Error.prototype.constructor.call(this, message); // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
                    for (var idx = 0; idx < errorProps.length; idx++) {
                        this[errorProps[idx]] = tmp[errorProps[idx]];
                    }
                    /* istanbul ignore else */
                    if (Error.captureStackTrace) {
                        Error.captureStackTrace(this, Exception);
                    }
                    if (loc) {
                        this.lineNumber = line;
                        this.column = column;
                    }
                }

                Exception.prototype = new Error();
                exports['default'] = Exception;
                module.exports = exports['default'];
                /***/
            }, /* 13 */function (module, exports, __webpack_require__) {
                'use strict';
                exports.__esModule = true;
                exports.extend = extend;
                exports.indexOf = indexOf;
                exports.escapeExpression = escapeExpression;
                exports.isEmpty = isEmpty;
                exports.createFrame = createFrame;
                exports.blockParams = blockParams;
                exports.appendContextPath = appendContextPath;
                var escape = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#x27;',
                    '`': '&#x60;',
                    '=': '&#x3D;'
                };
                var badChars = /[&<>"'`=]/g, possible = /[&<>"'`=]/;

                function escapeChar(chr) {
                    return escape[chr];
                }

                function extend(obj /* , ...source */) {
                    for (var i = 1; i < arguments.length; i++) {
                        for (var key in arguments[i]) {
                            if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                                obj[key] = arguments[i][key];
                            }
                        }
                    }
                    return obj;
                }

                var toString = Object.prototype.toString; // Sourced from lodash
                // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
                /* eslint-disable func-style */
                exports.toString = toString;
                var isFunction = function isFunction(value) {
                    return typeof value === 'function';
                }; // fallback for older versions of Chrome and Safari
                /* istanbul ignore next */
                if (isFunction(/x/)) {
                    exports.isFunction = isFunction = function (value) {
                        return typeof value === 'function' && toString.call(value) === '[object Function]';
                    };
                }
                exports.isFunction = isFunction;
                /* eslint-enable func-style */
                /* istanbul ignore next */
                var isArray = Array.isArray || function (value) {
                        return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
                    }; // Older IE versions do not directly support indexOf so we must implement our own, sadly.
                exports.isArray = isArray;
                function indexOf(array, value) {
                    for (var i = 0, len = array.length; i < len; i++) {
                        if (array[i] === value) {
                            return i;
                        }
                    }
                    return -1;
                }

                function escapeExpression(string) {
                    if (typeof string !== 'string') { // don't escape SafeStrings, since they're already safe
                        if (string && string.toHTML) {
                            return string.toHTML();
                        } else if (string == null) {
                            return '';
                        } else if (!string) {
                            return string + '';
                        } // Force a string conversion as this will be done by the append regardless and
                        // the regex test will do this transparently behind the scenes, causing issues if
                        // an object's to string has escaped characters in it.
                        string = '' + string;
                    }
                    if (!possible.test(string)) {
                        return string;
                    }
                    return string.replace(badChars, escapeChar);
                }

                function isEmpty(value) {
                    if (!value && value !== 0) {
                        return true;
                    } else if (isArray(value) && value.length === 0) {
                        return true;
                    } else {
                        return false;
                    }
                }

                function createFrame(object) {
                    var frame = extend({}, object);
                    frame._parent = object;
                    return frame;
                }

                function blockParams(params, ids) {
                    params.path = ids;
                    return params;
                }

                function appendContextPath(contextPath, id) {
                    return (contextPath ? contextPath + '.' : '') + id;
                }

                /***/
            }, /* 14 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireWildcard = __webpack_require__(9)['default'];
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                exports.checkRevision = checkRevision;
                exports.template = template;
                exports.wrapProgram = wrapProgram;
                exports.resolvePartial = resolvePartial;
                exports.invokePartial = invokePartial;
                exports.noop = noop;
                var _utils = __webpack_require__(13);
                var Utils = _interopRequireWildcard(_utils);
                var _exception = __webpack_require__(12);
                var _exception2 = _interopRequireDefault(_exception);
                var _base = __webpack_require__(10);

                function checkRevision(compilerInfo) {
                    var compilerRevision = compilerInfo && compilerInfo[0] || 1, currentRevision = _base.COMPILER_REVISION;
                    if (compilerRevision !== currentRevision) {
                        if (compilerRevision < currentRevision) {
                            var runtimeVersions = _base.REVISION_CHANGES[currentRevision], compilerVersions = _base.REVISION_CHANGES[compilerRevision];
                            throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
                        } else { // Use the embedded version info since the runtime doesn't know about this revision yet
                            throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
                        }
                    }
                }

                function template(templateSpec, env) { /* istanbul ignore next */
                    if (!env) {
                        throw new _exception2['default']('No environment passed to template');
                    }
                    if (!templateSpec || !templateSpec.main) {
                        throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
                    }
                    templateSpec.main.decorator = templateSpec.main_d; // Note: Using env.VM references rather than local var references throughout this section to allow
                    // for external users to override these as psuedo-supported APIs.
                    env.VM.checkRevision(templateSpec.compiler);
                    function invokePartialWrapper(partial, context, options) {
                        if (options.hash) {
                            context = Utils.extend({}, context, options.hash);
                            if (options.ids) {
                                options.ids[0] = true;
                            }
                        }
                        partial = env.VM.resolvePartial.call(this, partial, context, options);
                        var result = env.VM.invokePartial.call(this, partial, context, options);
                        if (result == null && env.compile) {
                            options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
                            result = options.partials[options.name](context, options);
                        }
                        if (result != null) {
                            if (options.indent) {
                                var lines = result.split('\n');
                                for (var i = 0, l = lines.length; i < l; i++) {
                                    if (!lines[i] && i + 1 === l) {
                                        break;
                                    }
                                    lines[i] = options.indent + lines[i];
                                }
                                result = lines.join('\n');
                            }
                            return result;
                        } else {
                            throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
                        }
                    } // Just add water
                    var container = {
                        strict: function strict(obj, name) {
                            if (!(name in obj)) {
                                throw new _exception2['default']('"' + name + '" not defined in ' + obj);
                            }
                            return obj[name];
                        },
                        lookup: function lookup(depths, name) {
                            var len = depths.length;
                            for (var i = 0; i < len; i++) {
                                if (depths[i] && depths[i][name] != null) {
                                    return depths[i][name];
                                }
                            }
                        },
                        lambda: function lambda(current, context) {
                            return typeof current === 'function' ? current.call(context) : current;
                        },
                        escapeExpression: Utils.escapeExpression,
                        invokePartial: invokePartialWrapper,
                        fn: function fn(i) {
                            var ret = templateSpec[i];
                            ret.decorator = templateSpec[i + '_d'];
                            return ret;
                        },
                        programs: [],
                        program: function program(i, data, declaredBlockParams, blockParams, depths) {
                            var programWrapper = this.programs[i], fn = this.fn(i);
                            if (data || depths || blockParams || declaredBlockParams) {
                                programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
                            } else if (!programWrapper) {
                                programWrapper = this.programs[i] = wrapProgram(this, i, fn);
                            }
                            return programWrapper;
                        },
                        data: function data(value, depth) {
                            while (value && depth--) {
                                value = value._parent;
                            }
                            return value;
                        },
                        merge: function merge(param, common) {
                            var obj = param || common;
                            if (param && common && param !== common) {
                                obj = Utils.extend({}, common, param);
                            }
                            return obj;
                        },
                        noop: env.VM.noop,
                        compilerInfo: templateSpec.compiler
                    };

                    function ret(context) {
                        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                        var data = options.data;
                        ret._setup(options);
                        if (!options.partial && templateSpec.useData) {
                            data = initData(context, data);
                        }
                        var depths = undefined, blockParams = templateSpec.useBlockParams ? [] : undefined;
                        if (templateSpec.useDepths) {
                            if (options.depths) {
                                depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;
                            } else {
                                depths = [context];
                            }
                        }
                        function main(context /*, options*/) {
                            return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
                        }

                        main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
                        return main(context, options);
                    }

                    ret.isTop = true;
                    ret._setup = function (options) {
                        if (!options.partial) {
                            container.helpers = container.merge(options.helpers, env.helpers);
                            if (templateSpec.usePartial) {
                                container.partials = container.merge(options.partials, env.partials);
                            }
                            if (templateSpec.usePartial || templateSpec.useDecorators) {
                                container.decorators = container.merge(options.decorators, env.decorators);
                            }
                        } else {
                            container.helpers = options.helpers;
                            container.partials = options.partials;
                            container.decorators = options.decorators;
                        }
                    };
                    ret._child = function (i, data, blockParams, depths) {
                        if (templateSpec.useBlockParams && !blockParams) {
                            throw new _exception2['default']('must pass block params');
                        }
                        if (templateSpec.useDepths && !depths) {
                            throw new _exception2['default']('must pass parent depths');
                        }
                        return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
                    };
                    return ret;
                }

                function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
                    function prog(context) {
                        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                        var currentDepths = depths;
                        if (depths && context !== depths[0]) {
                            currentDepths = [context].concat(depths);
                        }
                        return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
                    }

                    prog = executeDecorators(fn, prog, container, depths, data, blockParams);
                    prog.program = i;
                    prog.depth = depths ? depths.length : 0;
                    prog.blockParams = declaredBlockParams || 0;
                    return prog;
                }

                function resolvePartial(partial, context, options) {
                    if (!partial) {
                        if (options.name === '@partial-block') {
                            partial = options.data['partial-block'];
                        } else {
                            partial = options.partials[options.name];
                        }
                    } else if (!partial.call && !options.name) { // This is a dynamic partial that returned a string
                        options.name = partial;
                        partial = options.partials[partial];
                    }
                    return partial;
                }

                function invokePartial(partial, context, options) {
                    options.partial = true;
                    if (options.ids) {
                        options.data.contextPath = options.ids[0] || options.data.contextPath;
                    }
                    var partialBlock = undefined;
                    if (options.fn && options.fn !== noop) {
                        options.data = _base.createFrame(options.data);
                        partialBlock = options.data['partial-block'] = options.fn;
                        if (partialBlock.partials) {
                            options.partials = Utils.extend({}, options.partials, partialBlock.partials);
                        }
                    }
                    if (partial === undefined && partialBlock) {
                        partial = partialBlock;
                    }
                    if (partial === undefined) {
                        throw new _exception2['default']('The partial ' + options.name + ' could not be found');
                    } else if (partial instanceof Function) {
                        return partial(context, options);
                    }
                }

                function noop() {
                    return '';
                }

                function initData(context, data) {
                    if (!data || !('root' in data)) {
                        data = data ? _base.createFrame(data) : {};
                        data.root = context;
                    }
                    return data;
                }

                function executeDecorators(fn, prog, container, depths, data, blockParams) {
                    if (fn.decorator) {
                        var props = {};
                        prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
                        Utils.extend(prog, props);
                    }
                    return prog;
                }

                /***/
            }, /* 15 */function (module, exports, __webpack_require__) { /* istanbul ignore next */
                /* Jison generated parser */
                "use strict";
                var handlebars = (function () {
                    var parser = {
                        trace: function trace() {
                        },
                        yy: {},
                        symbols_: {
                            "error": 2,
                            "root": 3,
                            "program": 4,
                            "EOF": 5,
                            "program_repetition0": 6,
                            "statement": 7,
                            "mustache": 8,
                            "block": 9,
                            "rawBlock": 10,
                            "partial": 11,
                            "partialBlock": 12,
                            "content": 13,
                            "COMMENT": 14,
                            "CONTENT": 15,
                            "openRawBlock": 16,
                            "rawBlock_repetition_plus0": 17,
                            "END_RAW_BLOCK": 18,
                            "OPEN_RAW_BLOCK": 19,
                            "helperName": 20,
                            "openRawBlock_repetition0": 21,
                            "openRawBlock_option0": 22,
                            "CLOSE_RAW_BLOCK": 23,
                            "openBlock": 24,
                            "block_option0": 25,
                            "closeBlock": 26,
                            "openInverse": 27,
                            "block_option1": 28,
                            "OPEN_BLOCK": 29,
                            "openBlock_repetition0": 30,
                            "openBlock_option0": 31,
                            "openBlock_option1": 32,
                            "CLOSE": 33,
                            "OPEN_INVERSE": 34,
                            "openInverse_repetition0": 35,
                            "openInverse_option0": 36,
                            "openInverse_option1": 37,
                            "openInverseChain": 38,
                            "OPEN_INVERSE_CHAIN": 39,
                            "openInverseChain_repetition0": 40,
                            "openInverseChain_option0": 41,
                            "openInverseChain_option1": 42,
                            "inverseAndProgram": 43,
                            "INVERSE": 44,
                            "inverseChain": 45,
                            "inverseChain_option0": 46,
                            "OPEN_ENDBLOCK": 47,
                            "OPEN": 48,
                            "mustache_repetition0": 49,
                            "mustache_option0": 50,
                            "OPEN_UNESCAPED": 51,
                            "mustache_repetition1": 52,
                            "mustache_option1": 53,
                            "CLOSE_UNESCAPED": 54,
                            "OPEN_PARTIAL": 55,
                            "partialName": 56,
                            "partial_repetition0": 57,
                            "partial_option0": 58,
                            "openPartialBlock": 59,
                            "OPEN_PARTIAL_BLOCK": 60,
                            "openPartialBlock_repetition0": 61,
                            "openPartialBlock_option0": 62,
                            "param": 63,
                            "sexpr": 64,
                            "OPEN_SEXPR": 65,
                            "sexpr_repetition0": 66,
                            "sexpr_option0": 67,
                            "CLOSE_SEXPR": 68,
                            "hash": 69,
                            "hash_repetition_plus0": 70,
                            "hashSegment": 71,
                            "ID": 72,
                            "EQUALS": 73,
                            "blockParams": 74,
                            "OPEN_BLOCK_PARAMS": 75,
                            "blockParams_repetition_plus0": 76,
                            "CLOSE_BLOCK_PARAMS": 77,
                            "path": 78,
                            "dataName": 79,
                            "STRING": 80,
                            "NUMBER": 81,
                            "BOOLEAN": 82,
                            "UNDEFINED": 83,
                            "NULL": 84,
                            "DATA": 85,
                            "pathSegments": 86,
                            "SEP": 87,
                            "$accept": 0,
                            "$end": 1
                        },
                        terminals_: {
                            2: "error",
                            5: "EOF",
                            14: "COMMENT",
                            15: "CONTENT",
                            18: "END_RAW_BLOCK",
                            19: "OPEN_RAW_BLOCK",
                            23: "CLOSE_RAW_BLOCK",
                            29: "OPEN_BLOCK",
                            33: "CLOSE",
                            34: "OPEN_INVERSE",
                            39: "OPEN_INVERSE_CHAIN",
                            44: "INVERSE",
                            47: "OPEN_ENDBLOCK",
                            48: "OPEN",
                            51: "OPEN_UNESCAPED",
                            54: "CLOSE_UNESCAPED",
                            55: "OPEN_PARTIAL",
                            60: "OPEN_PARTIAL_BLOCK",
                            65: "OPEN_SEXPR",
                            68: "CLOSE_SEXPR",
                            72: "ID",
                            73: "EQUALS",
                            75: "OPEN_BLOCK_PARAMS",
                            77: "CLOSE_BLOCK_PARAMS",
                            80: "STRING",
                            81: "NUMBER",
                            82: "BOOLEAN",
                            83: "UNDEFINED",
                            84: "NULL",
                            85: "DATA",
                            87: "SEP"
                        },
                        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
                        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$ /**/) {
                            var $0 = $$.length - 1;
                            switch (yystate) {
                                case 1:
                                    return $$[$0 - 1];
                                    break;
                                case 2:
                                    this.$ = yy.prepareProgram($$[$0]);
                                    break;
                                case 3:
                                    this.$ = $$[$0];
                                    break;
                                case 4:
                                    this.$ = $$[$0];
                                    break;
                                case 5:
                                    this.$ = $$[$0];
                                    break;
                                case 6:
                                    this.$ = $$[$0];
                                    break;
                                case 7:
                                    this.$ = $$[$0];
                                    break;
                                case 8:
                                    this.$ = $$[$0];
                                    break;
                                case 9:
                                    this.$ = {
                                        type: 'CommentStatement',
                                        value: yy.stripComment($$[$0]),
                                        strip: yy.stripFlags($$[$0], $$[$0]),
                                        loc: yy.locInfo(this._$)
                                    };
                                    break;
                                case 10:
                                    this.$ = {
                                        type: 'ContentStatement',
                                        original: $$[$0],
                                        value: $$[$0],
                                        loc: yy.locInfo(this._$)
                                    };
                                    break;
                                case 11:
                                    this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                                    break;
                                case 12:
                                    this.$ = {path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1]};
                                    break;
                                case 13:
                                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
                                    break;
                                case 14:
                                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
                                    break;
                                case 15:
                                    this.$ = {
                                        open: $$[$0 - 5],
                                        path: $$[$0 - 4],
                                        params: $$[$0 - 3],
                                        hash: $$[$0 - 2],
                                        blockParams: $$[$0 - 1],
                                        strip: yy.stripFlags($$[$0 - 5], $$[$0])
                                    };
                                    break;
                                case 16:
                                    this.$ = {
                                        path: $$[$0 - 4],
                                        params: $$[$0 - 3],
                                        hash: $$[$0 - 2],
                                        blockParams: $$[$0 - 1],
                                        strip: yy.stripFlags($$[$0 - 5], $$[$0])
                                    };
                                    break;
                                case 17:
                                    this.$ = {
                                        path: $$[$0 - 4],
                                        params: $$[$0 - 3],
                                        hash: $$[$0 - 2],
                                        blockParams: $$[$0 - 1],
                                        strip: yy.stripFlags($$[$0 - 5], $$[$0])
                                    };
                                    break;
                                case 18:
                                    this.$ = {strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0]};
                                    break;
                                case 19:
                                    var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$), program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
                                    program.chained = true;
                                    this.$ = {strip: $$[$0 - 2].strip, program: program, chain: true};
                                    break;
                                case 20:
                                    this.$ = $$[$0];
                                    break;
                                case 21:
                                    this.$ = {path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0])};
                                    break;
                                case 22:
                                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                                    break;
                                case 23:
                                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                                    break;
                                case 24:
                                    this.$ = {
                                        type: 'PartialStatement',
                                        name: $$[$0 - 3],
                                        params: $$[$0 - 2],
                                        hash: $$[$0 - 1],
                                        indent: '',
                                        strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                                        loc: yy.locInfo(this._$)
                                    };
                                    break;
                                case 25:
                                    this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                                    break;
                                case 26:
                                    this.$ = {
                                        path: $$[$0 - 3],
                                        params: $$[$0 - 2],
                                        hash: $$[$0 - 1],
                                        strip: yy.stripFlags($$[$0 - 4], $$[$0])
                                    };
                                    break;
                                case 27:
                                    this.$ = $$[$0];
                                    break;
                                case 28:
                                    this.$ = $$[$0];
                                    break;
                                case 29:
                                    this.$ = {
                                        type: 'SubExpression',
                                        path: $$[$0 - 3],
                                        params: $$[$0 - 2],
                                        hash: $$[$0 - 1],
                                        loc: yy.locInfo(this._$)
                                    };
                                    break;
                                case 30:
                                    this.$ = {type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$)};
                                    break;
                                case 31:
                                    this.$ = {
                                        type: 'HashPair',
                                        key: yy.id($$[$0 - 2]),
                                        value: $$[$0],
                                        loc: yy.locInfo(this._$)
                                    };
                                    break;
                                case 32:
                                    this.$ = yy.id($$[$0 - 1]);
                                    break;
                                case 33:
                                    this.$ = $$[$0];
                                    break;
                                case 34:
                                    this.$ = $$[$0];
                                    break;
                                case 35:
                                    this.$ = {
                                        type: 'StringLiteral',
                                        value: $$[$0],
                                        original: $$[$0],
                                        loc: yy.locInfo(this._$)
                                    };
                                    break;
                                case 36:
                                    this.$ = {
                                        type: 'NumberLiteral',
                                        value: Number($$[$0]),
                                        original: Number($$[$0]),
                                        loc: yy.locInfo(this._$)
                                    };
                                    break;
                                case 37:
                                    this.$ = {
                                        type: 'BooleanLiteral',
                                        value: $$[$0] === 'true',
                                        original: $$[$0] === 'true',
                                        loc: yy.locInfo(this._$)
                                    };
                                    break;
                                case 38:
                                    this.$ = {
                                        type: 'UndefinedLiteral',
                                        original: undefined,
                                        value: undefined,
                                        loc: yy.locInfo(this._$)
                                    };
                                    break;
                                case 39:
                                    this.$ = {
                                        type: 'NullLiteral',
                                        original: null,
                                        value: null,
                                        loc: yy.locInfo(this._$)
                                    };
                                    break;
                                case 40:
                                    this.$ = $$[$0];
                                    break;
                                case 41:
                                    this.$ = $$[$0];
                                    break;
                                case 42:
                                    this.$ = yy.preparePath(true, $$[$0], this._$);
                                    break;
                                case 43:
                                    this.$ = yy.preparePath(false, $$[$0], this._$);
                                    break;
                                case 44:
                                    $$[$0 - 2].push({part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1]});
                                    this.$ = $$[$0 - 2];
                                    break;
                                case 45:
                                    this.$ = [{part: yy.id($$[$0]), original: $$[$0]}];
                                    break;
                                case 46:
                                    this.$ = [];
                                    break;
                                case 47:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                                case 48:
                                    this.$ = [$$[$0]];
                                    break;
                                case 49:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                                case 50:
                                    this.$ = [];
                                    break;
                                case 51:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                                case 58:
                                    this.$ = [];
                                    break;
                                case 59:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                                case 64:
                                    this.$ = [];
                                    break;
                                case 65:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                                case 70:
                                    this.$ = [];
                                    break;
                                case 71:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                                case 78:
                                    this.$ = [];
                                    break;
                                case 79:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                                case 82:
                                    this.$ = [];
                                    break;
                                case 83:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                                case 86:
                                    this.$ = [];
                                    break;
                                case 87:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                                case 90:
                                    this.$ = [];
                                    break;
                                case 91:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                                case 94:
                                    this.$ = [];
                                    break;
                                case 95:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                                case 98:
                                    this.$ = [$$[$0]];
                                    break;
                                case 99:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                                case 100:
                                    this.$ = [$$[$0]];
                                    break;
                                case 101:
                                    $$[$0 - 1].push($$[$0]);
                                    break;
                            }
                        },
                        table: [{
                            3: 1,
                            4: 2,
                            5: [2, 46],
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {1: [3]}, {5: [1, 4]}, {
                            5: [2, 2],
                            7: 5,
                            8: 6,
                            9: 7,
                            10: 8,
                            11: 9,
                            12: 10,
                            13: 11,
                            14: [1, 12],
                            15: [1, 20],
                            16: 17,
                            19: [1, 23],
                            24: 15,
                            27: 16,
                            29: [1, 21],
                            34: [1, 22],
                            39: [2, 2],
                            44: [2, 2],
                            47: [2, 2],
                            48: [1, 13],
                            51: [1, 14],
                            55: [1, 18],
                            59: 19,
                            60: [1, 24]
                        }, {1: [2, 1]}, {
                            5: [2, 47],
                            14: [2, 47],
                            15: [2, 47],
                            19: [2, 47],
                            29: [2, 47],
                            34: [2, 47],
                            39: [2, 47],
                            44: [2, 47],
                            47: [2, 47],
                            48: [2, 47],
                            51: [2, 47],
                            55: [2, 47],
                            60: [2, 47]
                        }, {
                            5: [2, 3],
                            14: [2, 3],
                            15: [2, 3],
                            19: [2, 3],
                            29: [2, 3],
                            34: [2, 3],
                            39: [2, 3],
                            44: [2, 3],
                            47: [2, 3],
                            48: [2, 3],
                            51: [2, 3],
                            55: [2, 3],
                            60: [2, 3]
                        }, {
                            5: [2, 4],
                            14: [2, 4],
                            15: [2, 4],
                            19: [2, 4],
                            29: [2, 4],
                            34: [2, 4],
                            39: [2, 4],
                            44: [2, 4],
                            47: [2, 4],
                            48: [2, 4],
                            51: [2, 4],
                            55: [2, 4],
                            60: [2, 4]
                        }, {
                            5: [2, 5],
                            14: [2, 5],
                            15: [2, 5],
                            19: [2, 5],
                            29: [2, 5],
                            34: [2, 5],
                            39: [2, 5],
                            44: [2, 5],
                            47: [2, 5],
                            48: [2, 5],
                            51: [2, 5],
                            55: [2, 5],
                            60: [2, 5]
                        }, {
                            5: [2, 6],
                            14: [2, 6],
                            15: [2, 6],
                            19: [2, 6],
                            29: [2, 6],
                            34: [2, 6],
                            39: [2, 6],
                            44: [2, 6],
                            47: [2, 6],
                            48: [2, 6],
                            51: [2, 6],
                            55: [2, 6],
                            60: [2, 6]
                        }, {
                            5: [2, 7],
                            14: [2, 7],
                            15: [2, 7],
                            19: [2, 7],
                            29: [2, 7],
                            34: [2, 7],
                            39: [2, 7],
                            44: [2, 7],
                            47: [2, 7],
                            48: [2, 7],
                            51: [2, 7],
                            55: [2, 7],
                            60: [2, 7]
                        }, {
                            5: [2, 8],
                            14: [2, 8],
                            15: [2, 8],
                            19: [2, 8],
                            29: [2, 8],
                            34: [2, 8],
                            39: [2, 8],
                            44: [2, 8],
                            47: [2, 8],
                            48: [2, 8],
                            51: [2, 8],
                            55: [2, 8],
                            60: [2, 8]
                        }, {
                            5: [2, 9],
                            14: [2, 9],
                            15: [2, 9],
                            19: [2, 9],
                            29: [2, 9],
                            34: [2, 9],
                            39: [2, 9],
                            44: [2, 9],
                            47: [2, 9],
                            48: [2, 9],
                            51: [2, 9],
                            55: [2, 9],
                            60: [2, 9]
                        }, {
                            20: 25,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 36,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            4: 37,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            39: [2, 46],
                            44: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            4: 38,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            44: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {13: 40, 15: [1, 20], 17: 39}, {
                            20: 42,
                            56: 41,
                            64: 43,
                            65: [1, 44],
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            4: 45,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            5: [2, 10],
                            14: [2, 10],
                            15: [2, 10],
                            18: [2, 10],
                            19: [2, 10],
                            29: [2, 10],
                            34: [2, 10],
                            39: [2, 10],
                            44: [2, 10],
                            47: [2, 10],
                            48: [2, 10],
                            51: [2, 10],
                            55: [2, 10],
                            60: [2, 10]
                        }, {
                            20: 46,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 47,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 48,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 42,
                            56: 49,
                            64: 43,
                            65: [1, 44],
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            33: [2, 78],
                            49: 50,
                            65: [2, 78],
                            72: [2, 78],
                            80: [2, 78],
                            81: [2, 78],
                            82: [2, 78],
                            83: [2, 78],
                            84: [2, 78],
                            85: [2, 78]
                        }, {
                            23: [2, 33],
                            33: [2, 33],
                            54: [2, 33],
                            65: [2, 33],
                            68: [2, 33],
                            72: [2, 33],
                            75: [2, 33],
                            80: [2, 33],
                            81: [2, 33],
                            82: [2, 33],
                            83: [2, 33],
                            84: [2, 33],
                            85: [2, 33]
                        }, {
                            23: [2, 34],
                            33: [2, 34],
                            54: [2, 34],
                            65: [2, 34],
                            68: [2, 34],
                            72: [2, 34],
                            75: [2, 34],
                            80: [2, 34],
                            81: [2, 34],
                            82: [2, 34],
                            83: [2, 34],
                            84: [2, 34],
                            85: [2, 34]
                        }, {
                            23: [2, 35],
                            33: [2, 35],
                            54: [2, 35],
                            65: [2, 35],
                            68: [2, 35],
                            72: [2, 35],
                            75: [2, 35],
                            80: [2, 35],
                            81: [2, 35],
                            82: [2, 35],
                            83: [2, 35],
                            84: [2, 35],
                            85: [2, 35]
                        }, {
                            23: [2, 36],
                            33: [2, 36],
                            54: [2, 36],
                            65: [2, 36],
                            68: [2, 36],
                            72: [2, 36],
                            75: [2, 36],
                            80: [2, 36],
                            81: [2, 36],
                            82: [2, 36],
                            83: [2, 36],
                            84: [2, 36],
                            85: [2, 36]
                        }, {
                            23: [2, 37],
                            33: [2, 37],
                            54: [2, 37],
                            65: [2, 37],
                            68: [2, 37],
                            72: [2, 37],
                            75: [2, 37],
                            80: [2, 37],
                            81: [2, 37],
                            82: [2, 37],
                            83: [2, 37],
                            84: [2, 37],
                            85: [2, 37]
                        }, {
                            23: [2, 38],
                            33: [2, 38],
                            54: [2, 38],
                            65: [2, 38],
                            68: [2, 38],
                            72: [2, 38],
                            75: [2, 38],
                            80: [2, 38],
                            81: [2, 38],
                            82: [2, 38],
                            83: [2, 38],
                            84: [2, 38],
                            85: [2, 38]
                        }, {
                            23: [2, 39],
                            33: [2, 39],
                            54: [2, 39],
                            65: [2, 39],
                            68: [2, 39],
                            72: [2, 39],
                            75: [2, 39],
                            80: [2, 39],
                            81: [2, 39],
                            82: [2, 39],
                            83: [2, 39],
                            84: [2, 39],
                            85: [2, 39]
                        }, {
                            23: [2, 43],
                            33: [2, 43],
                            54: [2, 43],
                            65: [2, 43],
                            68: [2, 43],
                            72: [2, 43],
                            75: [2, 43],
                            80: [2, 43],
                            81: [2, 43],
                            82: [2, 43],
                            83: [2, 43],
                            84: [2, 43],
                            85: [2, 43],
                            87: [1, 51]
                        }, {72: [1, 35], 86: 52}, {
                            23: [2, 45],
                            33: [2, 45],
                            54: [2, 45],
                            65: [2, 45],
                            68: [2, 45],
                            72: [2, 45],
                            75: [2, 45],
                            80: [2, 45],
                            81: [2, 45],
                            82: [2, 45],
                            83: [2, 45],
                            84: [2, 45],
                            85: [2, 45],
                            87: [2, 45]
                        }, {
                            52: 53,
                            54: [2, 82],
                            65: [2, 82],
                            72: [2, 82],
                            80: [2, 82],
                            81: [2, 82],
                            82: [2, 82],
                            83: [2, 82],
                            84: [2, 82],
                            85: [2, 82]
                        }, {25: 54, 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 55, 47: [2, 54]}, {
                            28: 60,
                            43: 61,
                            44: [1, 59],
                            47: [2, 56]
                        }, {13: 63, 15: [1, 20], 18: [1, 62]}, {15: [2, 48], 18: [2, 48]}, {
                            33: [2, 86],
                            57: 64,
                            65: [2, 86],
                            72: [2, 86],
                            80: [2, 86],
                            81: [2, 86],
                            82: [2, 86],
                            83: [2, 86],
                            84: [2, 86],
                            85: [2, 86]
                        }, {
                            33: [2, 40],
                            65: [2, 40],
                            72: [2, 40],
                            80: [2, 40],
                            81: [2, 40],
                            82: [2, 40],
                            83: [2, 40],
                            84: [2, 40],
                            85: [2, 40]
                        }, {
                            33: [2, 41],
                            65: [2, 41],
                            72: [2, 41],
                            80: [2, 41],
                            81: [2, 41],
                            82: [2, 41],
                            83: [2, 41],
                            84: [2, 41],
                            85: [2, 41]
                        }, {
                            20: 65,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {26: 66, 47: [1, 67]}, {
                            30: 68,
                            33: [2, 58],
                            65: [2, 58],
                            72: [2, 58],
                            75: [2, 58],
                            80: [2, 58],
                            81: [2, 58],
                            82: [2, 58],
                            83: [2, 58],
                            84: [2, 58],
                            85: [2, 58]
                        }, {
                            33: [2, 64],
                            35: 69,
                            65: [2, 64],
                            72: [2, 64],
                            75: [2, 64],
                            80: [2, 64],
                            81: [2, 64],
                            82: [2, 64],
                            83: [2, 64],
                            84: [2, 64],
                            85: [2, 64]
                        }, {
                            21: 70,
                            23: [2, 50],
                            65: [2, 50],
                            72: [2, 50],
                            80: [2, 50],
                            81: [2, 50],
                            82: [2, 50],
                            83: [2, 50],
                            84: [2, 50],
                            85: [2, 50]
                        }, {
                            33: [2, 90],
                            61: 71,
                            65: [2, 90],
                            72: [2, 90],
                            80: [2, 90],
                            81: [2, 90],
                            82: [2, 90],
                            83: [2, 90],
                            84: [2, 90],
                            85: [2, 90]
                        }, {
                            20: 75,
                            33: [2, 80],
                            50: 72,
                            63: 73,
                            64: 76,
                            65: [1, 44],
                            69: 74,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {72: [1, 80]}, {
                            23: [2, 42],
                            33: [2, 42],
                            54: [2, 42],
                            65: [2, 42],
                            68: [2, 42],
                            72: [2, 42],
                            75: [2, 42],
                            80: [2, 42],
                            81: [2, 42],
                            82: [2, 42],
                            83: [2, 42],
                            84: [2, 42],
                            85: [2, 42],
                            87: [1, 51]
                        }, {
                            20: 75,
                            53: 81,
                            54: [2, 84],
                            63: 82,
                            64: 76,
                            65: [1, 44],
                            69: 83,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {26: 84, 47: [1, 67]}, {47: [2, 55]}, {
                            4: 85,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            39: [2, 46],
                            44: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {47: [2, 20]}, {
                            20: 86,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            4: 87,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {26: 88, 47: [1, 67]}, {47: [2, 57]}, {
                            5: [2, 11],
                            14: [2, 11],
                            15: [2, 11],
                            19: [2, 11],
                            29: [2, 11],
                            34: [2, 11],
                            39: [2, 11],
                            44: [2, 11],
                            47: [2, 11],
                            48: [2, 11],
                            51: [2, 11],
                            55: [2, 11],
                            60: [2, 11]
                        }, {15: [2, 49], 18: [2, 49]}, {
                            20: 75,
                            33: [2, 88],
                            58: 89,
                            63: 90,
                            64: 76,
                            65: [1, 44],
                            69: 91,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            65: [2, 94],
                            66: 92,
                            68: [2, 94],
                            72: [2, 94],
                            80: [2, 94],
                            81: [2, 94],
                            82: [2, 94],
                            83: [2, 94],
                            84: [2, 94],
                            85: [2, 94]
                        }, {
                            5: [2, 25],
                            14: [2, 25],
                            15: [2, 25],
                            19: [2, 25],
                            29: [2, 25],
                            34: [2, 25],
                            39: [2, 25],
                            44: [2, 25],
                            47: [2, 25],
                            48: [2, 25],
                            51: [2, 25],
                            55: [2, 25],
                            60: [2, 25]
                        }, {
                            20: 93,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 75,
                            31: 94,
                            33: [2, 60],
                            63: 95,
                            64: 76,
                            65: [1, 44],
                            69: 96,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            75: [2, 60],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 75,
                            33: [2, 66],
                            36: 97,
                            63: 98,
                            64: 76,
                            65: [1, 44],
                            69: 99,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            75: [2, 66],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 75,
                            22: 100,
                            23: [2, 52],
                            63: 101,
                            64: 76,
                            65: [1, 44],
                            69: 102,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 75,
                            33: [2, 92],
                            62: 103,
                            63: 104,
                            64: 76,
                            65: [1, 44],
                            69: 105,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {33: [1, 106]}, {
                            33: [2, 79],
                            65: [2, 79],
                            72: [2, 79],
                            80: [2, 79],
                            81: [2, 79],
                            82: [2, 79],
                            83: [2, 79],
                            84: [2, 79],
                            85: [2, 79]
                        }, {33: [2, 81]}, {
                            23: [2, 27],
                            33: [2, 27],
                            54: [2, 27],
                            65: [2, 27],
                            68: [2, 27],
                            72: [2, 27],
                            75: [2, 27],
                            80: [2, 27],
                            81: [2, 27],
                            82: [2, 27],
                            83: [2, 27],
                            84: [2, 27],
                            85: [2, 27]
                        }, {
                            23: [2, 28],
                            33: [2, 28],
                            54: [2, 28],
                            65: [2, 28],
                            68: [2, 28],
                            72: [2, 28],
                            75: [2, 28],
                            80: [2, 28],
                            81: [2, 28],
                            82: [2, 28],
                            83: [2, 28],
                            84: [2, 28],
                            85: [2, 28]
                        }, {
                            23: [2, 30],
                            33: [2, 30],
                            54: [2, 30],
                            68: [2, 30],
                            71: 107,
                            72: [1, 108],
                            75: [2, 30]
                        }, {23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98]}, {
                            23: [2, 45],
                            33: [2, 45],
                            54: [2, 45],
                            65: [2, 45],
                            68: [2, 45],
                            72: [2, 45],
                            73: [1, 109],
                            75: [2, 45],
                            80: [2, 45],
                            81: [2, 45],
                            82: [2, 45],
                            83: [2, 45],
                            84: [2, 45],
                            85: [2, 45],
                            87: [2, 45]
                        }, {
                            23: [2, 44],
                            33: [2, 44],
                            54: [2, 44],
                            65: [2, 44],
                            68: [2, 44],
                            72: [2, 44],
                            75: [2, 44],
                            80: [2, 44],
                            81: [2, 44],
                            82: [2, 44],
                            83: [2, 44],
                            84: [2, 44],
                            85: [2, 44],
                            87: [2, 44]
                        }, {54: [1, 110]}, {
                            54: [2, 83],
                            65: [2, 83],
                            72: [2, 83],
                            80: [2, 83],
                            81: [2, 83],
                            82: [2, 83],
                            83: [2, 83],
                            84: [2, 83],
                            85: [2, 83]
                        }, {54: [2, 85]}, {
                            5: [2, 13],
                            14: [2, 13],
                            15: [2, 13],
                            19: [2, 13],
                            29: [2, 13],
                            34: [2, 13],
                            39: [2, 13],
                            44: [2, 13],
                            47: [2, 13],
                            48: [2, 13],
                            51: [2, 13],
                            55: [2, 13],
                            60: [2, 13]
                        }, {38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 112, 46: 111, 47: [2, 76]}, {
                            33: [2, 70],
                            40: 113,
                            65: [2, 70],
                            72: [2, 70],
                            75: [2, 70],
                            80: [2, 70],
                            81: [2, 70],
                            82: [2, 70],
                            83: [2, 70],
                            84: [2, 70],
                            85: [2, 70]
                        }, {47: [2, 18]}, {
                            5: [2, 14],
                            14: [2, 14],
                            15: [2, 14],
                            19: [2, 14],
                            29: [2, 14],
                            34: [2, 14],
                            39: [2, 14],
                            44: [2, 14],
                            47: [2, 14],
                            48: [2, 14],
                            51: [2, 14],
                            55: [2, 14],
                            60: [2, 14]
                        }, {33: [1, 114]}, {
                            33: [2, 87],
                            65: [2, 87],
                            72: [2, 87],
                            80: [2, 87],
                            81: [2, 87],
                            82: [2, 87],
                            83: [2, 87],
                            84: [2, 87],
                            85: [2, 87]
                        }, {33: [2, 89]}, {
                            20: 75,
                            63: 116,
                            64: 76,
                            65: [1, 44],
                            67: 115,
                            68: [2, 96],
                            69: 117,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {33: [1, 118]}, {32: 119, 33: [2, 62], 74: 120, 75: [1, 121]}, {
                            33: [2, 59],
                            65: [2, 59],
                            72: [2, 59],
                            75: [2, 59],
                            80: [2, 59],
                            81: [2, 59],
                            82: [2, 59],
                            83: [2, 59],
                            84: [2, 59],
                            85: [2, 59]
                        }, {33: [2, 61], 75: [2, 61]}, {33: [2, 68], 37: 122, 74: 123, 75: [1, 121]}, {
                            33: [2, 65],
                            65: [2, 65],
                            72: [2, 65],
                            75: [2, 65],
                            80: [2, 65],
                            81: [2, 65],
                            82: [2, 65],
                            83: [2, 65],
                            84: [2, 65],
                            85: [2, 65]
                        }, {33: [2, 67], 75: [2, 67]}, {23: [1, 124]}, {
                            23: [2, 51],
                            65: [2, 51],
                            72: [2, 51],
                            80: [2, 51],
                            81: [2, 51],
                            82: [2, 51],
                            83: [2, 51],
                            84: [2, 51],
                            85: [2, 51]
                        }, {23: [2, 53]}, {33: [1, 125]}, {
                            33: [2, 91],
                            65: [2, 91],
                            72: [2, 91],
                            80: [2, 91],
                            81: [2, 91],
                            82: [2, 91],
                            83: [2, 91],
                            84: [2, 91],
                            85: [2, 91]
                        }, {33: [2, 93]}, {
                            5: [2, 22],
                            14: [2, 22],
                            15: [2, 22],
                            19: [2, 22],
                            29: [2, 22],
                            34: [2, 22],
                            39: [2, 22],
                            44: [2, 22],
                            47: [2, 22],
                            48: [2, 22],
                            51: [2, 22],
                            55: [2, 22],
                            60: [2, 22]
                        }, {
                            23: [2, 99],
                            33: [2, 99],
                            54: [2, 99],
                            68: [2, 99],
                            72: [2, 99],
                            75: [2, 99]
                        }, {73: [1, 109]}, {
                            20: 75,
                            63: 126,
                            64: 76,
                            65: [1, 44],
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            5: [2, 23],
                            14: [2, 23],
                            15: [2, 23],
                            19: [2, 23],
                            29: [2, 23],
                            34: [2, 23],
                            39: [2, 23],
                            44: [2, 23],
                            47: [2, 23],
                            48: [2, 23],
                            51: [2, 23],
                            55: [2, 23],
                            60: [2, 23]
                        }, {47: [2, 19]}, {47: [2, 77]}, {
                            20: 75,
                            33: [2, 72],
                            41: 127,
                            63: 128,
                            64: 76,
                            65: [1, 44],
                            69: 129,
                            70: 77,
                            71: 78,
                            72: [1, 79],
                            75: [2, 72],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            5: [2, 24],
                            14: [2, 24],
                            15: [2, 24],
                            19: [2, 24],
                            29: [2, 24],
                            34: [2, 24],
                            39: [2, 24],
                            44: [2, 24],
                            47: [2, 24],
                            48: [2, 24],
                            51: [2, 24],
                            55: [2, 24],
                            60: [2, 24]
                        }, {68: [1, 130]}, {
                            65: [2, 95],
                            68: [2, 95],
                            72: [2, 95],
                            80: [2, 95],
                            81: [2, 95],
                            82: [2, 95],
                            83: [2, 95],
                            84: [2, 95],
                            85: [2, 95]
                        }, {68: [2, 97]}, {
                            5: [2, 21],
                            14: [2, 21],
                            15: [2, 21],
                            19: [2, 21],
                            29: [2, 21],
                            34: [2, 21],
                            39: [2, 21],
                            44: [2, 21],
                            47: [2, 21],
                            48: [2, 21],
                            51: [2, 21],
                            55: [2, 21],
                            60: [2, 21]
                        }, {33: [1, 131]}, {33: [2, 63]}, {
                            72: [1, 133],
                            76: 132
                        }, {33: [1, 134]}, {33: [2, 69]}, {15: [2, 12]}, {
                            14: [2, 26],
                            15: [2, 26],
                            19: [2, 26],
                            29: [2, 26],
                            34: [2, 26],
                            47: [2, 26],
                            48: [2, 26],
                            51: [2, 26],
                            55: [2, 26],
                            60: [2, 26]
                        }, {23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31]}, {
                            33: [2, 74],
                            42: 135,
                            74: 136,
                            75: [1, 121]
                        }, {
                            33: [2, 71],
                            65: [2, 71],
                            72: [2, 71],
                            75: [2, 71],
                            80: [2, 71],
                            81: [2, 71],
                            82: [2, 71],
                            83: [2, 71],
                            84: [2, 71],
                            85: [2, 71]
                        }, {33: [2, 73], 75: [2, 73]}, {
                            23: [2, 29],
                            33: [2, 29],
                            54: [2, 29],
                            65: [2, 29],
                            68: [2, 29],
                            72: [2, 29],
                            75: [2, 29],
                            80: [2, 29],
                            81: [2, 29],
                            82: [2, 29],
                            83: [2, 29],
                            84: [2, 29],
                            85: [2, 29]
                        }, {
                            14: [2, 15],
                            15: [2, 15],
                            19: [2, 15],
                            29: [2, 15],
                            34: [2, 15],
                            39: [2, 15],
                            44: [2, 15],
                            47: [2, 15],
                            48: [2, 15],
                            51: [2, 15],
                            55: [2, 15],
                            60: [2, 15]
                        }, {72: [1, 138], 77: [1, 137]}, {72: [2, 100], 77: [2, 100]}, {
                            14: [2, 16],
                            15: [2, 16],
                            19: [2, 16],
                            29: [2, 16],
                            34: [2, 16],
                            44: [2, 16],
                            47: [2, 16],
                            48: [2, 16],
                            51: [2, 16],
                            55: [2, 16],
                            60: [2, 16]
                        }, {33: [1, 139]}, {33: [2, 75]}, {33: [2, 32]}, {72: [2, 101], 77: [2, 101]}, {
                            14: [2, 17],
                            15: [2, 17],
                            19: [2, 17],
                            29: [2, 17],
                            34: [2, 17],
                            39: [2, 17],
                            44: [2, 17],
                            47: [2, 17],
                            48: [2, 17],
                            51: [2, 17],
                            55: [2, 17],
                            60: [2, 17]
                        }],
                        defaultActions: {
                            4: [2, 1],
                            55: [2, 55],
                            57: [2, 20],
                            61: [2, 57],
                            74: [2, 81],
                            83: [2, 85],
                            87: [2, 18],
                            91: [2, 89],
                            102: [2, 53],
                            105: [2, 93],
                            111: [2, 19],
                            112: [2, 77],
                            117: [2, 97],
                            120: [2, 63],
                            123: [2, 69],
                            124: [2, 12],
                            136: [2, 75],
                            137: [2, 32]
                        },
                        parseError: function parseError(str, hash) {
                            throw new Error(str);
                        },
                        parse: function parse(input) {
                            var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
                            this.lexer.setInput(input);
                            this.lexer.yy = this.yy;
                            this.yy.lexer = this.lexer;
                            this.yy.parser = this;
                            if (typeof this.lexer.yylloc == "undefined")this.lexer.yylloc = {};
                            var yyloc = this.lexer.yylloc;
                            lstack.push(yyloc);
                            var ranges = this.lexer.options && this.lexer.options.ranges;
                            if (typeof this.yy.parseError === "function")this.parseError = this.yy.parseError;
                            function popStack(n) {
                                stack.length = stack.length - 2 * n;
                                vstack.length = vstack.length - n;
                                lstack.length = lstack.length - n;
                            }

                            function lex() {
                                var token;
                                token = self.lexer.lex() || 1;
                                if (typeof token !== "number") {
                                    token = self.symbols_[token] || token;
                                }
                                return token;
                            }

                            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
                            while (true) {
                                state = stack[stack.length - 1];
                                if (this.defaultActions[state]) {
                                    action = this.defaultActions[state];
                                } else {
                                    if (symbol === null || typeof symbol == "undefined") {
                                        symbol = lex();
                                    }
                                    action = table[state] && table[state][symbol];
                                }
                                if (typeof action === "undefined" || !action.length || !action[0]) {
                                    var errStr = "";
                                    if (!recovering) {
                                        expected = [];
                                        for (p in table[state]) if (this.terminals_[p] && p > 2) {
                                            expected.push("'" + this.terminals_[p] + "'");
                                        }
                                        if (this.lexer.showPosition) {
                                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                                        } else {
                                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                                        }
                                        this.parseError(errStr, {
                                            text: this.lexer.match,
                                            token: this.terminals_[symbol] || symbol,
                                            line: this.lexer.yylineno,
                                            loc: yyloc,
                                            expected: expected
                                        });
                                    }
                                }
                                if (action[0] instanceof Array && action.length > 1) {
                                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                                }
                                switch (action[0]) {
                                    case 1:
                                        stack.push(symbol);
                                        vstack.push(this.lexer.yytext);
                                        lstack.push(this.lexer.yylloc);
                                        stack.push(action[1]);
                                        symbol = null;
                                        if (!preErrorSymbol) {
                                            yyleng = this.lexer.yyleng;
                                            yytext = this.lexer.yytext;
                                            yylineno = this.lexer.yylineno;
                                            yyloc = this.lexer.yylloc;
                                            if (recovering > 0)recovering--;
                                        } else {
                                            symbol = preErrorSymbol;
                                            preErrorSymbol = null;
                                        }
                                        break;
                                    case 2:
                                        len = this.productions_[action[1]][1];
                                        yyval.$ = vstack[vstack.length - len];
                                        yyval._$ = {
                                            first_line: lstack[lstack.length - (len || 1)].first_line,
                                            last_line: lstack[lstack.length - 1].last_line,
                                            first_column: lstack[lstack.length - (len || 1)].first_column,
                                            last_column: lstack[lstack.length - 1].last_column
                                        };
                                        if (ranges) {
                                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                                        }
                                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                                        if (typeof r !== "undefined") {
                                            return r;
                                        }
                                        if (len) {
                                            stack = stack.slice(0, -1 * len * 2);
                                            vstack = vstack.slice(0, -1 * len);
                                            lstack = lstack.slice(0, -1 * len);
                                        }
                                        stack.push(this.productions_[action[1]][0]);
                                        vstack.push(yyval.$);
                                        lstack.push(yyval._$);
                                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                                        stack.push(newState);
                                        break;
                                    case 3:
                                        return true;
                                }
                            }
                            return true;
                        }
                    };
                    /* Jison generated lexer */
                    var lexer = (function () {
                        var lexer = {
                            EOF: 1, parseError: function parseError(str, hash) {
                                if (this.yy.parser) {
                                    this.yy.parser.parseError(str, hash);
                                } else {
                                    throw new Error(str);
                                }
                            }, setInput: function setInput(input) {
                                this._input = input;
                                this._more = this._less = this.done = false;
                                this.yylineno = this.yyleng = 0;
                                this.yytext = this.matched = this.match = '';
                                this.conditionStack = ['INITIAL'];
                                this.yylloc = {first_line: 1, first_column: 0, last_line: 1, last_column: 0};
                                if (this.options.ranges)this.yylloc.range = [0, 0];
                                this.offset = 0;
                                return this;
                            }, input: function input() {
                                var ch = this._input[0];
                                this.yytext += ch;
                                this.yyleng++;
                                this.offset++;
                                this.match += ch;
                                this.matched += ch;
                                var lines = ch.match(/(?:\r\n?|\n).*/g);
                                if (lines) {
                                    this.yylineno++;
                                    this.yylloc.last_line++;
                                } else {
                                    this.yylloc.last_column++;
                                }
                                if (this.options.ranges)this.yylloc.range[1]++;
                                this._input = this._input.slice(1);
                                return ch;
                            }, unput: function unput(ch) {
                                var len = ch.length;
                                var lines = ch.split(/(?:\r\n?|\n)/g);
                                this._input = ch + this._input;
                                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1); //this.yyleng -= len;
                                this.offset -= len;
                                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                                this.match = this.match.substr(0, this.match.length - 1);
                                this.matched = this.matched.substr(0, this.matched.length - 1);
                                if (lines.length - 1)this.yylineno -= lines.length - 1;
                                var r = this.yylloc.range;
                                this.yylloc = {
                                    first_line: this.yylloc.first_line,
                                    last_line: this.yylineno + 1,
                                    first_column: this.yylloc.first_column,
                                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                                };
                                if (this.options.ranges) {
                                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                                }
                                return this;
                            }, more: function more() {
                                this._more = true;
                                return this;
                            }, less: function less(n) {
                                this.unput(this.match.slice(n));
                            }, pastInput: function pastInput() {
                                var past = this.matched.substr(0, this.matched.length - this.match.length);
                                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
                            }, upcomingInput: function upcomingInput() {
                                var next = this.match;
                                if (next.length < 20) {
                                    next += this._input.substr(0, 20 - next.length);
                                }
                                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
                            }, showPosition: function showPosition() {
                                var pre = this.pastInput();
                                var c = new Array(pre.length + 1).join("-");
                                return pre + this.upcomingInput() + "\n" + c + "^";
                            }, next: function next() {
                                if (this.done) {
                                    return this.EOF;
                                }
                                if (!this._input)this.done = true;
                                var token, match, tempMatch, index, col, lines;
                                if (!this._more) {
                                    this.yytext = '';
                                    this.match = '';
                                }
                                var rules = this._currentRules();
                                for (var i = 0; i < rules.length; i++) {
                                    tempMatch = this._input.match(this.rules[rules[i]]);
                                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                                        match = tempMatch;
                                        index = i;
                                        if (!this.options.flex)break;
                                    }
                                }
                                if (match) {
                                    lines = match[0].match(/(?:\r\n?|\n).*/g);
                                    if (lines)this.yylineno += lines.length;
                                    this.yylloc = {
                                        first_line: this.yylloc.last_line,
                                        last_line: this.yylineno + 1,
                                        first_column: this.yylloc.last_column,
                                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                                    };
                                    this.yytext += match[0];
                                    this.match += match[0];
                                    this.matches = match;
                                    this.yyleng = this.yytext.length;
                                    if (this.options.ranges) {
                                        this.yylloc.range = [this.offset, this.offset += this.yyleng];
                                    }
                                    this._more = false;
                                    this._input = this._input.slice(match[0].length);
                                    this.matched += match[0];
                                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
                                    if (this.done && this._input)this.done = false;
                                    if (token)return token; else return;
                                }
                                if (this._input === "") {
                                    return this.EOF;
                                } else {
                                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                                        text: "",
                                        token: null,
                                        line: this.yylineno
                                    });
                                }
                            }, lex: function lex() {
                                var r = this.next();
                                if (typeof r !== 'undefined') {
                                    return r;
                                } else {
                                    return this.lex();
                                }
                            }, begin: function begin(condition) {
                                this.conditionStack.push(condition);
                            }, popState: function popState() {
                                return this.conditionStack.pop();
                            }, _currentRules: function _currentRules() {
                                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                            }, topState: function topState() {
                                return this.conditionStack[this.conditionStack.length - 2];
                            }, pushState: function begin(condition) {
                                this.begin(condition);
                            }
                        };
                        lexer.options = {};
                        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START /**/) {
                            function strip(start, end) {
                                return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end);
                            }

                            var YYSTATE = YY_START;
                            switch ($avoiding_name_collisions) {
                                case 0:
                                    if (yy_.yytext.slice(-2) === "\\\\") {
                                        strip(0, 1);
                                        this.begin("mu");
                                    } else if (yy_.yytext.slice(-1) === "\\") {
                                        strip(0, 1);
                                        this.begin("emu");
                                    } else {
                                        this.begin("mu");
                                    }
                                    if (yy_.yytext)return 15;
                                    break;
                                case 1:
                                    return 15;
                                    break;
                                case 2:
                                    this.popState();
                                    return 15;
                                    break;
                                case 3:
                                    this.begin('raw');
                                    return 15;
                                    break;
                                case 4:
                                    this.popState(); // Should be using `this.topState()` below, but it currently
                                    // returns the second top instead of the first top. Opened an
                                    // issue about it at https://github.com/zaach/jison/issues/291
                                    if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
                                        return 15;
                                    } else {
                                        yy_.yytext = yy_.yytext.substr(5, yy_.yyleng - 9);
                                        return 'END_RAW_BLOCK';
                                    }
                                    break;
                                case 5:
                                    return 15;
                                    break;
                                case 6:
                                    this.popState();
                                    return 14;
                                    break;
                                case 7:
                                    return 65;
                                    break;
                                case 8:
                                    return 68;
                                    break;
                                case 9:
                                    return 19;
                                    break;
                                case 10:
                                    this.popState();
                                    this.begin('raw');
                                    return 23;
                                    break;
                                case 11:
                                    return 55;
                                    break;
                                case 12:
                                    return 60;
                                    break;
                                case 13:
                                    return 29;
                                    break;
                                case 14:
                                    return 47;
                                    break;
                                case 15:
                                    this.popState();
                                    return 44;
                                    break;
                                case 16:
                                    this.popState();
                                    return 44;
                                    break;
                                case 17:
                                    return 34;
                                    break;
                                case 18:
                                    return 39;
                                    break;
                                case 19:
                                    return 51;
                                    break;
                                case 20:
                                    return 48;
                                    break;
                                case 21:
                                    this.unput(yy_.yytext);
                                    this.popState();
                                    this.begin('com');
                                    break;
                                case 22:
                                    this.popState();
                                    return 14;
                                    break;
                                case 23:
                                    return 48;
                                    break;
                                case 24:
                                    return 73;
                                    break;
                                case 25:
                                    return 72;
                                    break;
                                case 26:
                                    return 72;
                                    break;
                                case 27:
                                    return 87;
                                    break;
                                case 28: // ignore whitespace
                                    break;
                                case 29:
                                    this.popState();
                                    return 54;
                                    break;
                                case 30:
                                    this.popState();
                                    return 33;
                                    break;
                                case 31:
                                    yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
                                    return 80;
                                    break;
                                case 32:
                                    yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
                                    return 80;
                                    break;
                                case 33:
                                    return 85;
                                    break;
                                case 34:
                                    return 82;
                                    break;
                                case 35:
                                    return 82;
                                    break;
                                case 36:
                                    return 83;
                                    break;
                                case 37:
                                    return 84;
                                    break;
                                case 38:
                                    return 81;
                                    break;
                                case 39:
                                    return 75;
                                    break;
                                case 40:
                                    return 77;
                                    break;
                                case 41:
                                    return 72;
                                    break;
                                case 42:
                                    yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');
                                    return 72;
                                    break;
                                case 43:
                                    return 'INVALID';
                                    break;
                                case 44:
                                    return 5;
                                    break;
                            }
                        };
                        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
                        lexer.conditions = {
                            "mu": {
                                "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
                                "inclusive": false
                            },
                            "emu": {"rules": [2], "inclusive": false},
                            "com": {"rules": [6], "inclusive": false},
                            "raw": {"rules": [3, 4, 5], "inclusive": false},
                            "INITIAL": {"rules": [0, 1, 44], "inclusive": true}
                        };
                        return lexer;
                    })();
                    parser.lexer = lexer;
                    function Parser() {
                        this.yy = {};
                    }

                    Parser.prototype = parser;
                    parser.Parser = Parser;
                    return new Parser();
                })();
                exports.__esModule = true;
                exports['default'] = handlebars;
                /***/
            }, /* 16 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                var _visitor = __webpack_require__(6);
                var _visitor2 = _interopRequireDefault(_visitor);

                function WhitespaceControl() {
                    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    this.options = options;
                }

                WhitespaceControl.prototype = new _visitor2['default']();
                WhitespaceControl.prototype.Program = function (program) {
                    var doStandalone = !this.options.ignoreStandalone;
                    var isRoot = !this.isRootSeen;
                    this.isRootSeen = true;
                    var body = program.body;
                    for (var i = 0, l = body.length; i < l; i++) {
                        var current = body[i], strip = this.accept(current);
                        if (!strip) {
                            continue;
                        }
                        var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot), _isNextWhitespace = isNextWhitespace(body, i, isRoot), openStandalone = strip.openStandalone && _isPrevWhitespace, closeStandalone = strip.closeStandalone && _isNextWhitespace, inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
                        if (strip.close) {
                            omitRight(body, i, true);
                        }
                        if (strip.open) {
                            omitLeft(body, i, true);
                        }
                        if (doStandalone && inlineStandalone) {
                            omitRight(body, i);
                            if (omitLeft(body, i)) { // If we are on a standalone node, save the indent info for partials
                                if (current.type === 'PartialStatement') { // Pull out the whitespace from the final line
                                    current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
                                }
                            }
                        }
                        if (doStandalone && openStandalone) {
                            omitRight((current.program || current.inverse).body); // Strip out the previous content node if it's whitespace only
                            omitLeft(body, i);
                        }
                        if (doStandalone && closeStandalone) { // Always strip the next node
                            omitRight(body, i);
                            omitLeft((current.inverse || current.program).body);
                        }
                    }
                    return program;
                };
                WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
                    this.accept(block.program);
                    this.accept(block.inverse); // Find the inverse program that is involed with whitespace stripping.
                    var program = block.program || block.inverse, inverse = block.program && block.inverse, firstInverse = inverse, lastInverse = inverse;
                    if (inverse && inverse.chained) {
                        firstInverse = inverse.body[0].program; // Walk the inverse chain to find the last inverse that is actually in the chain.
                        while (lastInverse.chained) {
                            lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
                        }
                    }
                    var strip = {
                        open: block.openStrip.open,
                        close: block.closeStrip.close, // Determine the standalone candiacy. Basically flag our content as being possibly standalone
                        // so our parent can determine if we actually are standalone
                        openStandalone: isNextWhitespace(program.body),
                        closeStandalone: isPrevWhitespace((firstInverse || program).body)
                    };
                    if (block.openStrip.close) {
                        omitRight(program.body, null, true);
                    }
                    if (inverse) {
                        var inverseStrip = block.inverseStrip;
                        if (inverseStrip.open) {
                            omitLeft(program.body, null, true);
                        }
                        if (inverseStrip.close) {
                            omitRight(firstInverse.body, null, true);
                        }
                        if (block.closeStrip.open) {
                            omitLeft(lastInverse.body, null, true);
                        } // Find standalone else statments
                        if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
                            omitLeft(program.body);
                            omitRight(firstInverse.body);
                        }
                    } else if (block.closeStrip.open) {
                        omitLeft(program.body, null, true);
                    }
                    return strip;
                };
                WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
                    return mustache.strip;
                };
                WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) { /* istanbul ignore next */
                    var strip = node.strip || {};
                    return {inlineStandalone: true, open: strip.open, close: strip.close};
                };
                function isPrevWhitespace(body, i, isRoot) {
                    if (i === undefined) {
                        i = body.length;
                    } // Nodes that end with newlines are considered whitespace (but are special
                    // cased for strip operations)
                    var prev = body[i - 1], sibling = body[i - 2];
                    if (!prev) {
                        return isRoot;
                    }
                    if (prev.type === 'ContentStatement') {
                        return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
                    }
                }

                function isNextWhitespace(body, i, isRoot) {
                    if (i === undefined) {
                        i = -1;
                    }
                    var next = body[i + 1], sibling = body[i + 2];
                    if (!next) {
                        return isRoot;
                    }
                    if (next.type === 'ContentStatement') {
                        return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
                    }
                } // Marks the node to the right of the position as omitted.
                // I.e. {{foo}}' ' will mark the ' ' node as omitted.
                //
                // If i is undefined, then the first child will be marked as such.
                //
                // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
                // content is met.
                function omitRight(body, i, multiple) {
                    var current = body[i == null ? 0 : i + 1];
                    if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
                        return;
                    }
                    var original = current.value;
                    current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
                    current.rightStripped = current.value !== original;
                } // Marks the node to the left of the position as omitted.
                // I.e. ' '{{foo}} will mark the ' ' node as omitted.
                //
                // If i is undefined then the last child will be marked as such.
                //
                // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
                // content is met.
                function omitLeft(body, i, multiple) {
                    var current = body[i == null ? body.length - 1 : i - 1];
                    if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
                        return;
                    } // We omit the last node if it's whitespace only and not preceeded by a non-content node.
                    var original = current.value;
                    current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
                    current.leftStripped = current.value !== original;
                    return current.leftStripped;
                }

                exports['default'] = WhitespaceControl;
                module.exports = exports['default'];
                /***/
            }, /* 17 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                exports.SourceLocation = SourceLocation;
                exports.id = id;
                exports.stripFlags = stripFlags;
                exports.stripComment = stripComment;
                exports.preparePath = preparePath;
                exports.prepareMustache = prepareMustache;
                exports.prepareRawBlock = prepareRawBlock;
                exports.prepareBlock = prepareBlock;
                exports.prepareProgram = prepareProgram;
                exports.preparePartialBlock = preparePartialBlock;
                var _exception = __webpack_require__(12);
                var _exception2 = _interopRequireDefault(_exception);

                function validateClose(open, close) {
                    close = close.path ? close.path.original : close;
                    if (open.path.original !== close) {
                        var errorNode = {loc: open.path.loc};
                        throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
                    }
                }

                function SourceLocation(source, locInfo) {
                    this.source = source;
                    this.start = {line: locInfo.first_line, column: locInfo.first_column};
                    this.end = {line: locInfo.last_line, column: locInfo.last_column};
                }

                function id(token) {
                    if (/^\[.*\]$/.test(token)) {
                        return token.substr(1, token.length - 2);
                    } else {
                        return token;
                    }
                }

                function stripFlags(open, close) {
                    return {open: open.charAt(2) === '~', close: close.charAt(close.length - 3) === '~'};
                }

                function stripComment(comment) {
                    return comment.replace(/^\{\{~?\!-?-?/, '').replace(/-?-?~?\}\}$/, '');
                }

                function preparePath(data, parts, loc) {
                    loc = this.locInfo(loc);
                    var original = data ? '@' : '', dig = [], depth = 0, depthString = '';
                    for (var i = 0, l = parts.length; i < l; i++) {
                        var part = parts[i].part, // If we have [] syntax then we do not treat path references as operators,
                        // i.e. foo.[this] resolves to approximately context.foo['this']
                            isLiteral = parts[i].original !== part;
                        original += (parts[i].separator || '') + part;
                        if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
                            if (dig.length > 0) {
                                throw new _exception2['default']('Invalid path: ' + original, {loc: loc});
                            } else if (part === '..') {
                                depth++;
                                depthString += '../';
                            }
                        } else {
                            dig.push(part);
                        }
                    }
                    return {type: 'PathExpression', data: data, depth: depth, parts: dig, original: original, loc: loc};
                }

                function prepareMustache(path, params, hash, open, strip, locInfo) { // Must use charAt to support IE pre-10
                    var escapeFlag = open.charAt(3) || open.charAt(2), escaped = escapeFlag !== '{' && escapeFlag !== '&';
                    var decorator = /\*/.test(open);
                    return {
                        type: decorator ? 'Decorator' : 'MustacheStatement',
                        path: path,
                        params: params,
                        hash: hash,
                        escaped: escaped,
                        strip: strip,
                        loc: this.locInfo(locInfo)
                    };
                }

                function prepareRawBlock(openRawBlock, contents, close, locInfo) {
                    validateClose(openRawBlock, close);
                    locInfo = this.locInfo(locInfo);
                    var program = {type: 'Program', body: contents, strip: {}, loc: locInfo};
                    return {
                        type: 'BlockStatement',
                        path: openRawBlock.path,
                        params: openRawBlock.params,
                        hash: openRawBlock.hash,
                        program: program,
                        openStrip: {},
                        inverseStrip: {},
                        closeStrip: {},
                        loc: locInfo
                    };
                }

                function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
                    if (close && close.path) {
                        validateClose(openBlock, close);
                    }
                    var decorator = /\*/.test(openBlock.open);
                    program.blockParams = openBlock.blockParams;
                    var inverse = undefined, inverseStrip = undefined;
                    if (inverseAndProgram) {
                        if (decorator) {
                            throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
                        }
                        if (inverseAndProgram.chain) {
                            inverseAndProgram.program.body[0].closeStrip = close.strip;
                        }
                        inverseStrip = inverseAndProgram.strip;
                        inverse = inverseAndProgram.program;
                    }
                    if (inverted) {
                        inverted = inverse;
                        inverse = program;
                        program = inverted;
                    }
                    return {
                        type: decorator ? 'DecoratorBlock' : 'BlockStatement',
                        path: openBlock.path,
                        params: openBlock.params,
                        hash: openBlock.hash,
                        program: program,
                        inverse: inverse,
                        openStrip: openBlock.strip,
                        inverseStrip: inverseStrip,
                        closeStrip: close && close.strip,
                        loc: this.locInfo(locInfo)
                    };
                }

                function prepareProgram(statements, loc) {
                    if (!loc && statements.length) {
                        var firstLoc = statements[0].loc, lastLoc = statements[statements.length - 1].loc;
                        /* istanbul ignore else */
                        if (firstLoc && lastLoc) {
                            loc = {
                                source: firstLoc.source,
                                start: {line: firstLoc.start.line, column: firstLoc.start.column},
                                end: {line: lastLoc.end.line, column: lastLoc.end.column}
                            };
                        }
                    }
                    return {type: 'Program', body: statements, strip: {}, loc: loc};
                }

                function preparePartialBlock(open, program, close, locInfo) {
                    validateClose(open, close);
                    return {
                        type: 'PartialBlockStatement',
                        name: open.path,
                        params: open.params,
                        hash: open.hash,
                        program: program,
                        openStrip: open.strip,
                        closeStrip: close && close.strip,
                        loc: this.locInfo(locInfo)
                    };
                }

                /***/
            }, /* 18 */function (module, exports, __webpack_require__) { /* global define */
                'use strict';
                exports.__esModule = true;
                var _utils = __webpack_require__(13);
                var SourceNode = undefined;
                try { /* istanbul ignore next */
                    if (false) { // We don't support this in AMD environments. For these environments, we asusme that
                        // they are running on the browser and thus have no need for the source-map library.
                        var SourceMap = require('source-map');
                        SourceNode = SourceMap.SourceNode;
                    }
                } catch (err) {
                }
                /* NOP */
                /* istanbul ignore if: tested but not covered in istanbul due to dist build  */
                if (!SourceNode) {
                    SourceNode = function (line, column, srcFile, chunks) {
                        this.src = '';
                        if (chunks) {
                            this.add(chunks);
                        }
                    };
                    /* istanbul ignore next */
                    SourceNode.prototype = {
                        add: function add(chunks) {
                            if (_utils.isArray(chunks)) {
                                chunks = chunks.join('');
                            }
                            this.src += chunks;
                        }, prepend: function prepend(chunks) {
                            if (_utils.isArray(chunks)) {
                                chunks = chunks.join('');
                            }
                            this.src = chunks + this.src;
                        }, toStringWithSourceMap: function toStringWithSourceMap() {
                            return {code: this.toString()};
                        }, toString: function toString() {
                            return this.src;
                        }
                    };
                }
                function castChunk(chunk, codeGen, loc) {
                    if (_utils.isArray(chunk)) {
                        var ret = [];
                        for (var i = 0, len = chunk.length; i < len; i++) {
                            ret.push(codeGen.wrap(chunk[i], loc));
                        }
                        return ret;
                    } else if (typeof chunk === 'boolean' || typeof chunk === 'number') { // Handle primitives that the SourceNode will throw up on
                        return chunk + '';
                    }
                    return chunk;
                }

                function CodeGen(srcFile) {
                    this.srcFile = srcFile;
                    this.source = [];
                }

                CodeGen.prototype = {
                    isEmpty: function isEmpty() {
                        return !this.source.length;
                    }, prepend: function prepend(source, loc) {
                        this.source.unshift(this.wrap(source, loc));
                    }, push: function push(source, loc) {
                        this.source.push(this.wrap(source, loc));
                    }, merge: function merge() {
                        var source = this.empty();
                        this.each(function (line) {
                            source.add(['  ', line, '\n']);
                        });
                        return source;
                    }, each: function each(iter) {
                        for (var i = 0, len = this.source.length; i < len; i++) {
                            iter(this.source[i]);
                        }
                    }, empty: function empty() {
                        var loc = this.currentLocation || {start: {}};
                        return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
                    }, wrap: function wrap(chunk) {
                        var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || {start: {}} : arguments[1];
                        if (chunk instanceof SourceNode) {
                            return chunk;
                        }
                        chunk = castChunk(chunk, this, loc);
                        return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
                    }, functionCall: function functionCall(fn, type, params) {
                        params = this.generateList(params);
                        return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
                    }, quotedString: function quotedString(str) {
                        return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
                                .replace(/\u2029/g, '\\u2029') + '"';
                    }, objectLiteral: function objectLiteral(obj) {
                        var pairs = [];
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                var value = castChunk(obj[key], this);
                                if (value !== 'undefined') {
                                    pairs.push([this.quotedString(key), ':', value]);
                                }
                            }
                        }
                        var ret = this.generateList(pairs);
                        ret.prepend('{');
                        ret.add('}');
                        return ret;
                    }, generateList: function generateList(entries) {
                        var ret = this.empty();
                        for (var i = 0, len = entries.length; i < len; i++) {
                            if (i) {
                                ret.add(',');
                            }
                            ret.add(castChunk(entries[i], this));
                        }
                        return ret;
                    }, generateArray: function generateArray(entries) {
                        var ret = this.generateList(entries);
                        ret.prepend('[');
                        ret.add(']');
                        return ret;
                    }
                };
                exports['default'] = CodeGen;
                module.exports = exports['default'];
                /***/
            }, /* 19 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                exports.registerDefaultHelpers = registerDefaultHelpers;
                var _helpersBlockHelperMissing = __webpack_require__(22);
                var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
                var _helpersEach = __webpack_require__(23);
                var _helpersEach2 = _interopRequireDefault(_helpersEach);
                var _helpersHelperMissing = __webpack_require__(24);
                var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
                var _helpersIf = __webpack_require__(25);
                var _helpersIf2 = _interopRequireDefault(_helpersIf);
                var _helpersLog = __webpack_require__(26);
                var _helpersLog2 = _interopRequireDefault(_helpersLog);
                var _helpersLookup = __webpack_require__(27);
                var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
                var _helpersWith = __webpack_require__(28);
                var _helpersWith2 = _interopRequireDefault(_helpersWith);

                function registerDefaultHelpers(instance) {
                    _helpersBlockHelperMissing2['default'](instance);
                    _helpersEach2['default'](instance);
                    _helpersHelperMissing2['default'](instance);
                    _helpersIf2['default'](instance);
                    _helpersLog2['default'](instance);
                    _helpersLookup2['default'](instance);
                    _helpersWith2['default'](instance);
                }

                /***/
            }, /* 20 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                exports.registerDefaultDecorators = registerDefaultDecorators;
                var _decoratorsInline = __webpack_require__(29);
                var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

                function registerDefaultDecorators(instance) {
                    _decoratorsInline2['default'](instance);
                }

                /***/
            }, /* 21 */function (module, exports, __webpack_require__) {
                'use strict';
                exports.__esModule = true;
                var _utils = __webpack_require__(13);
                var logger = {
                    methodMap: ['debug', 'info', 'warn', 'error'], level: 'info', // Maps a given level value to the `methodMap` indexes above.
                    lookupLevel: function lookupLevel(level) {
                        if (typeof level === 'string') {
                            var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
                            if (levelMap >= 0) {
                                level = levelMap;
                            } else {
                                level = parseInt(level, 10);
                            }
                        }
                        return level;
                    }, // Can be overridden in the host environment
                    log: function log(level) {
                        level = logger.lookupLevel(level);
                        if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
                            var method = logger.methodMap[level];
                            if (!console[method]) { // eslint-disable-line no-console
                                method = 'log';
                            }
                            for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                                message[_key - 1] = arguments[_key];
                            }
                            console[method].apply(console, message); // eslint-disable-line no-console
                        }
                    }
                };
                exports['default'] = logger;
                module.exports = exports['default'];
                /***/
            }, /* 22 */function (module, exports, __webpack_require__) {
                'use strict';
                exports.__esModule = true;
                var _utils = __webpack_require__(13);
                exports['default'] = function (instance) {
                    instance.registerHelper('blockHelperMissing', function (context, options) {
                        var inverse = options.inverse, fn = options.fn;
                        if (context === true) {
                            return fn(this);
                        } else if (context === false || context == null) {
                            return inverse(this);
                        } else if (_utils.isArray(context)) {
                            if (context.length > 0) {
                                if (options.ids) {
                                    options.ids = [options.name];
                                }
                                return instance.helpers.each(context, options);
                            } else {
                                return inverse(this);
                            }
                        } else {
                            if (options.data && options.ids) {
                                var data = _utils.createFrame(options.data);
                                data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
                                options = {data: data};
                            }
                            return fn(context, options);
                        }
                    });
                };
                module.exports = exports['default'];
                /***/
            }, /* 23 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                var _utils = __webpack_require__(13);
                var _exception = __webpack_require__(12);
                var _exception2 = _interopRequireDefault(_exception);
                exports['default'] = function (instance) {
                    instance.registerHelper('each', function (context, options) {
                        if (!options) {
                            throw new _exception2['default']('Must pass iterator to #each');
                        }
                        var fn = options.fn, inverse = options.inverse, i = 0, ret = '', data = undefined, contextPath = undefined;
                        if (options.data && options.ids) {
                            contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
                        }
                        if (_utils.isFunction(context)) {
                            context = context.call(this);
                        }
                        if (options.data) {
                            data = _utils.createFrame(options.data);
                        }
                        function execIteration(field, index, last) {
                            if (data) {
                                data.key = field;
                                data.index = index;
                                data.first = index === 0;
                                data.last = !!last;
                                if (contextPath) {
                                    data.contextPath = contextPath + field;
                                }
                            }
                            ret = ret + fn(context[field], {
                                    data: data,
                                    blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
                                });
                        }

                        if (context && typeof context === 'object') {
                            if (_utils.isArray(context)) {
                                for (var j = context.length; i < j; i++) {
                                    if (i in context) {
                                        execIteration(i, i, i === context.length - 1);
                                    }
                                }
                            } else {
                                var priorKey = undefined;
                                for (var key in context) {
                                    if (context.hasOwnProperty(key)) { // We're running the iterations one step out of sync so we can detect
                                        // the last iteration without have to scan the object twice and create
                                        // an itermediate keys array.
                                        if (priorKey !== undefined) {
                                            execIteration(priorKey, i - 1);
                                        }
                                        priorKey = key;
                                        i++;
                                    }
                                }
                                if (priorKey !== undefined) {
                                    execIteration(priorKey, i - 1, true);
                                }
                            }
                        }
                        if (i === 0) {
                            ret = inverse(this);
                        }
                        return ret;
                    });
                };
                module.exports = exports['default'];
                /***/
            }, /* 24 */function (module, exports, __webpack_require__) {
                'use strict';
                var _interopRequireDefault = __webpack_require__(8)['default'];
                exports.__esModule = true;
                var _exception = __webpack_require__(12);
                var _exception2 = _interopRequireDefault(_exception);
                exports['default'] = function (instance) {
                    instance.registerHelper('helperMissing', function () /* [args, ]options */ {
                        if (arguments.length === 1) { // A missing field in a {{foo}} construct.
                            return undefined;
                        } else { // Someone is actually trying to call something, blow up.
                            throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
                        }
                    });
                };
                module.exports = exports['default'];
                /***/
            }, /* 25 */function (module, exports, __webpack_require__) {
                'use strict';
                exports.__esModule = true;
                var _utils = __webpack_require__(13);
                exports['default'] = function (instance) {
                    instance.registerHelper('if', function (conditional, options) {
                        if (_utils.isFunction(conditional)) {
                            conditional = conditional.call(this);
                        } // Default behavior is to render the positive path if the value is truthy and not empty.
                        // The `includeZero` option may be set to treat the condtional as purely not empty based on the
                        // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
                        if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
                            return options.inverse(this);
                        } else {
                            return options.fn(this);
                        }
                    });
                    instance.registerHelper('unless', function (conditional, options) {
                        return instance.helpers['if'].call(this, conditional, {
                            fn: options.inverse,
                            inverse: options.fn,
                            hash: options.hash
                        });
                    });
                };
                module.exports = exports['default'];
                /***/
            }, /* 26 */function (module, exports, __webpack_require__) {
                'use strict';
                exports.__esModule = true;
                exports['default'] = function (instance) {
                    instance.registerHelper('log', function () /* message, options */ {
                        var args = [undefined], options = arguments[arguments.length - 1];
                        for (var i = 0; i < arguments.length - 1; i++) {
                            args.push(arguments[i]);
                        }
                        var level = 1;
                        if (options.hash.level != null) {
                            level = options.hash.level;
                        } else if (options.data && options.data.level != null) {
                            level = options.data.level;
                        }
                        args[0] = level;
                        instance.log.apply(instance, args);
                    });
                };
                module.exports = exports['default'];
                /***/
            }, /* 27 */function (module, exports, __webpack_require__) {
                'use strict';
                exports.__esModule = true;
                exports['default'] = function (instance) {
                    instance.registerHelper('lookup', function (obj, field) {
                        return obj && obj[field];
                    });
                };
                module.exports = exports['default'];
                /***/
            }, /* 28 */function (module, exports, __webpack_require__) {
                'use strict';
                exports.__esModule = true;
                var _utils = __webpack_require__(13);
                exports['default'] = function (instance) {
                    instance.registerHelper('with', function (context, options) {
                        if (_utils.isFunction(context)) {
                            context = context.call(this);
                        }
                        var fn = options.fn;
                        if (!_utils.isEmpty(context)) {
                            var data = options.data;
                            if (options.data && options.ids) {
                                data = _utils.createFrame(options.data);
                                data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
                            }
                            return fn(context, {
                                data: data,
                                blockParams: _utils.blockParams([context], [data && data.contextPath])
                            });
                        } else {
                            return options.inverse(this);
                        }
                    });
                };
                module.exports = exports['default'];
                /***/
            }, /* 29 */function (module, exports, __webpack_require__) {
                'use strict';
                exports.__esModule = true;
                var _utils = __webpack_require__(13);
                exports['default'] = function (instance) {
                    instance.registerDecorator('inline', function (fn, props, container, options) {
                        var ret = fn;
                        if (!props.partials) {
                            props.partials = {};
                            ret = function (context, options) { // Create a new partials stack frame prior to exec.
                                var original = container.partials;
                                container.partials = _utils.extend({}, original, props.partials);
                                var ret = fn(context, options);
                                container.partials = original;
                                return ret;
                            };
                        }
                        props.partials[options.args[0]] = options.fn;
                        return ret;
                    });
                };
                module.exports = exports['default'];
                /***/
            } /******/]));
        });
        ;
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/
        /***/

        /***/
    },
    /* 49 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function ($) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true
            });

            var _createClass = (function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ('value' in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            })();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                }
            }

            var userName = $('.saya-script #user-info').data('nickname');
            exports.userName = userName;
            var userId = $('.saya-script #user-info').data('id');
            exports.userId = userId;
            var userAvatar = $('.saya-script #user-info').data('avatar');

            exports.userAvatar = userAvatar;

            var Common = (function () {
                function Common() {
                    _classCallCheck(this, Common);
                }

                /**
                 * 点赞
                 * @param  {selector} el 点赞元素
                 * @method  like
                 * @memberOf Common
                 */

                /**
                 * 收藏或取消收藏
                 * @param  {selector} el 收藏按钮
                 * @method  favorite
                 * @memberOf Common
                 */

                /**
                 * 点赞和收藏动画
                 * @param  {selector} el 点赞和收藏的element
                 * @method  animateLikeFavIcon
                 * @memberOf Common
                 */

                _createClass(Common, [{
                    key: 'like',
                    value: function like(el) {
                        var objectId = el.data('id');
                        var objectType = el.data('type');
                        var self = el;
                        var animateEl = el.find('i');
                        var token = $('input[name=_token]').val();

                        animateEl.addClass('animated zoom-big');
                        /** 讓動畫只抖動一次 */
                        animateEl.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            animateEl.removeClass('animated zoom-big');
                        });

                        $.ajax({
                            type: 'post',
                            url: '/ipa/like',
                            data: {
                                owner_id: objectId,
                                owner_type: objectType,
                                _token: token
                            },
                            beforeSend: function beforeSend() {
                                self.removeClass('do-like');
                            },
                            error: function error() {
                                alert('服务器错误');
                            },
                            success: function success(data) {
                                self.addClass('do-like');

                                animateEl.addClass('animated zoom');
                                /** 讓動畫只抖動一次 */
                                animateEl.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                    animateEl.removeClass('animated zoom');
                                });

                                if (data.errCode > 0) {
                                    alert(data.msg);
                                } else {
                                    var number = self.find('.like-count').text();

                                    if (number.indexOf('喜欢') > -1) {
                                        number = 0;
                                    } else {
                                        number = Number(self.find('.like-count').text());
                                    }

                                    // var userName = userName;
                                    // var userAvatar = userAvatar;
                                    // var userId = userId;
                                    var $likedUser = $('.liked-user');
                                    var $users = $('.liked-user .users');

                                    if (data.status == 1) {
                                        self.addClass('liked');
                                        self.find('i').addClass('fa-heart').removeClass('fa-heart-o');
                                        self.find('.like-status').text('已喜欢');
                                        self.find('.like-count').text(++number);

                                        if (self.find('.like-count').length && $users.length && self.data('type') !== 'comment') {
                                            $users.prepend('<li class="user" data-tooltip="tooltip" data-placement="bottom" title=' + userName + '><a href="/user/' + userId + '"><img class="avatar" src="' + userAvatar + '"alt="' + userName + '" ></a></li>');
                                            var favCount = Number($users.find('.all .count').text());
                                            // $users.find('.all .count').text(favCount + 1);
                                        } else if (!$users.length) {
                                            $likedUser.append('<ul><li class="user" data-tooltip="tooltip" data-placement="bottom" title=' + userName + '><a href="/user/' + userId + '"><img class="avatar" src="' + userAvatar + '"alt="' + userName + '" ></a></li></ul>');
                                        }

                                        $('.liked-user .users').find('[data-tooltip="tooltip"]').tooltip();
                                    } else if (data.status === 0) {
                                        self.removeClass('liked');
                                        self.find('i').addClass('fa-heart-o').removeClass('fa-heart');
                                        number = --number > 0 ? number : 0;

                                        if (number === 0 && self.find('.like-count').data('type') === 'post-like') {
                                            self.find('.like-count').text('喜欢');
                                        } else {
                                            self.find('.like-count').text(number);
                                        }

                                        self.find('.like-status').text('喜欢');

                                        if (self.find('.like-count').length && $users.length) {
                                            $users.children().each(function (index, item) {
                                                if ($(item).data('original-title') === userName) {
                                                    $(item).remove();

                                                    if ($users.children().length === 1) {
                                                        $likedUser.addClass('hidden');
                                                    }
                                                }
                                            });

                                            var count = Number($users.find('.all .count').text());
                                            // $users.find('.all .count').text(count - 1);
                                        }
                                    }
                                }
                            }
                        });
                    }
                }, {
                    key: 'favorite',
                    value: function favorite(el) {
                        var self = el;
                        var objectType = el.data('type');
                        var objectId = el.data('id');
                        var token = $('input[name=_token]').val();

                        $.ajax({
                            type: 'post',
                            url: '/ipa/favorite',
                            data: {
                                owner_id: objectId,
                                owner_type: objectType,
                                _token: token
                            },
                            beforeSend: function beforeSend() {
                                self.removeClass('do-fav');
                            },
                            error: function error() {
                                alert('服务器错误');
                            },
                            success: function success(data) {
                                self.addClass('do-fav');
                                if (data.errCode > 0) {
                                    alert('服务器错误');
                                } else {

                                    /** 添加收藏 */
                                    if (data.status == 1) {
                                        self.addClass('faved');
                                        self.find('i').addClass('fa-bookmark').removeClass('fa-bookmark-o');
                                    }

                                    /** 取消收藏 */
                                    if (data.status === 0) {
                                        self.removeClass('faved');
                                        self.find('i').removeClass('fa-bookmark').addClass('fa-bookmark-o');
                                        // self.find('.txt').text('收藏');
                                    }
                                }
                            }
                        });
                    }
                }, {
                    key: 'animateFavIcon',
                    value: function animateFavIcon(el) {
                        el.addClass('animated rubberBand');
                        /** 讓動畫只抖動一次 */
                        el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            el.removeClass('animated rubberBand');
                        });
                    }
                }]);

                return Common;
            })();

            exports['default'] = Common;
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 50 */,
    /* 51 */,
    /* 52 */,
    /* 53 */,
    /* 54 */,
    /* 55 */,
    /* 56 */,
    /* 57 */,
    /* 58 */,
    /* 59 */,
    /* 60 */,
    /* 61 */,
    /* 62 */,
    /* 63 */,
    /* 64 */,
    /* 65 */,
    /* 66 */,
    /* 67 */,
    /* 68 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function ($) {
            'use strict';

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {'default': obj};
            }

            var _widget = __webpack_require__(69);

            var _widget2 = _interopRequireDefault(_widget);

            var widget = new _widget2['default']();
            var $phoneNumber = $('.order-traffic .phone-number');
            var $numberPrompt = $('.order-traffic .number-err');
            var $captchaPrompt = $('.order-traffic .captcha-err');
            var $getCode = $('.order-traffic .get-code');
            var $captchaInput = $('.order-traffic .captcha-input');
            var phoneNumberRegex = /^1(33|53|8[019]|77|86)\d{8}$/;

            // 广告点击统计
            $('.colors .item a').on('click', function () {
                var id = $(this).parents('.widget-color').data('id');
                var index = $(this).parents('.colors').index();
                widget.countAd(id, index);
            });

            $('.widget-color-bns-article-03 .wandoujia_qr').on('click', function () {
                var id = $(this).parents('.widget-color').data('id');
                var index = $(this).data('index');

                widget.countAd(id, index);
            });

            // banner 点击统计
            $('.swiper-wrapper .swiper-slide').on('click', function () {
                var id = $(this).data('id');
                var index = $(this).data('index');

                widget.countAd(id, index);
            });

            $('.order-traffic .get-code').on('click', function () {
                var phoneNumber = $phoneNumber.val();
                var time = 60;

                // $numberPrompt.text(packageName);
                // $('.phone').removeClass('has-error');

                if (!phoneNumberRegex.test(phoneNumber)) {
                    $numberPrompt.addClass('text-warning');
                    $numberPrompt.text('请填写正确的手机号');
                    $phoneNumber.val('');
                    $phoneNumber.focus();
                    // $('.phone').addClass('has-error');
                    return false;
                } else {
                    $numberPrompt.addClass('text-process');
                    $numberPrompt.text('正在发送验证码...');
                    /** 订购流量包 */
                    $.ajax({
                        type: 'get',
                        data: {
                            phone: phoneNumber,
                            procode: 301
                        },
                        url: '/ipa/activity/trafficpackage/getcode',
                        success: function success(data) {
                            if (data.errCode == 1) {
                                clearInterval(timer);
                                $numberPrompt.text(data.msg);
                                // $('.get-code').removeAttr('disabled').text('获取验证码');
                                // $('.order .help-block').addClass('warn');
                                // $('.order .help-block').text('*请填写正确的手机号');
                                // $phoneNumber.val('');
                            } else {
                                $numberPrompt.removeClass('text-process').addClass('text-success');
                                $numberPrompt.text('验证码已发送');
                                $('input[name=response]').val(data.response);
                                $getCode.attr('disabled', 'disabled');
                            }
                        }
                    });
                }

                $(this).attr('disabled', 'disabled');
                $('.get-code').text(time + ' 秒后重新获取');

                /** 重新获取验证码倒计时开始 */
                var timer = setInterval(function () {
                    time--;
                    $('.get-code').text(time + ' 秒后重新获取');
                    if (time === 0) {
                        $('.get-code').removeAttr('disabled').text('获取验证码');
                        clearInterval(timer);
                    }
                }, 1000);
            });

            $('.order-traffic .order-now').on('click', function () {
                var response = $('.order-traffic input[name=response]').val();
                var phoneNumber = $phoneNumber.val();
                var captchaValue = $captchaInput.val();

                if (!phoneNumber) {
                    $phoneNumber.focus();
                    $numberPrompt.addClass('text-warning');
                    $numberPrompt.text('请输入手机号');
                } else if (!phoneNumberRegex.test(phoneNumber)) {
                    $numberPrompt.addClass('text-warning');
                    $numberPrompt.text('请填写正确的手机号');
                    $phoneNumber.val('');
                    $phoneNumber.focus();
                    // $('.phone').addClass('has-error');
                    return false;
                } else {
                    $captchaPrompt.addClass('text-warning');
                    $captchaPrompt.text('请稍候，订购中...');
                    $.ajax({
                        type: 'get',
                        data: {
                            phone: phoneNumber,
                            response: response,
                            code: captchaValue,
                            procode: 301
                        },
                        url: '/ipa/activity/trafficpackage/confirm',
                        success: function success(data) {
                            // console.log(data);
                            /** 暂定为总会订购成功，以进行下一步 */
                            // var success = 1;
                            // console.log(data.errCode);
                            if (data.errCode == 0) {
                                $('.go-lottery').removeClass('not-lottery');
                                // $('.order .captcha-err').addClass('warn');
                                $captchaPrompt.text('已成功订购一次性5元包，请注意查收短信');
                                $('.phone-number').attr('disabled', 'disabled');
                                setTimeout(function () {
                                    $.fn.fullpage.moveTo(3);
                                    $('.section03 .lottery').addClass('animated bounceInDown');
                                }, 1500);
                            } else {
                                $captchaPrompt.addClass('text-warning');
                                $captchaPrompt.text(data.msg);
                            }
                        }
                    });
                }
            });
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    },
    /* 69 */
    /***/ function (module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */
        (function ($) {
            /**
             * Widget
             * @constructor
             * @classdesc Widget Class Constructor
             */

            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true
            });

            var _createClass = (function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ('value' in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            })();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                }
            }

            var Widget = (function () {
                function Widget() {
                    _classCallCheck(this, Widget);
                }

                _createClass(Widget, [{
                    key: 'countAd',
                    value: function countAd(id, index) {
                        $.post('/ipa/ad', {
                            id: id,
                            index: index
                        });
                    }
                }]);

                return Widget;
            })();

            exports['default'] = Widget;
            ;
            module.exports = exports['default'];
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(8)))

        /***/
    }
]);