import { options, Dropdown } from 'floating-vue';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var textareaCaret = createCommonjsModule(function (module) {
/* jshint browser: true */
(function () {
  // We'll copy the properties below into the mirror div.
  // Note that some browsers, such as Firefox, do not concatenate properties
  // into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
  // so we have to list every single property explicitly.
  var properties = ['direction', // RTL support
  'boxSizing', 'width', // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  'height', 'overflowX', 'overflowY', // copy the scrollbar for IE
  'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderStyle', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', // might not make a difference, but better be safe
  'letterSpacing', 'wordSpacing', 'tabSize', 'MozTabSize'];
  var isBrowser = typeof window !== 'undefined';
  var isFirefox = isBrowser && window.mozInnerScreenX != null;

  function getCaretCoordinates(element, position, options) {
    if (!isBrowser) {
      throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
    }

    var debug = options && options.debug || false;

    if (debug) {
      var el = document.querySelector('#input-textarea-caret-position-mirror-div');
      if (el) el.parentNode.removeChild(el);
    } // The mirror div will replicate the textarea's style


    var div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);
    var style = div.style;
    var computed = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle; // currentStyle for IE < 9

    var isInput = element.nodeName === 'INPUT'; // Default textarea styles

    style.whiteSpace = 'pre-wrap';
    if (!isInput) style.wordWrap = 'break-word'; // only for textarea-s
    // Position off-screen

    style.position = 'absolute'; // required to return coordinates properly

    if (!debug) style.visibility = 'hidden'; // not 'display: none' because we want rendering
    // Transfer the element's properties to the div

    properties.forEach(function (prop) {
      if (isInput && prop === 'lineHeight') {
        // Special case for <input>s because text is rendered centered and line height may be != height
        style.lineHeight = computed.height;
      } else {
        style[prop] = computed[prop];
      }
    });

    if (isFirefox) {
      // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
      if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
    } else {
      style.overflow = 'hidden'; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
    }

    div.textContent = element.value.substring(0, position); // The second special handling for input type="text" vs textarea:
    // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037

    if (isInput) div.textContent = div.textContent.replace(/\s/g, "\xA0");
    var span = document.createElement('span'); // Wrapping must be replicated *exactly*, including when a long word gets
    // onto the next line, with whitespace at the end of the line before (#7).
    // The  *only* reliable way to do that is to copy the *entire* rest of the
    // textarea's content into the <span> created at the caret position.
    // For inputs, just '.' would be enough, but no need to bother.

    span.textContent = element.value.substring(position) || '.'; // || because a completely empty faux span doesn't render at all

    div.appendChild(span);
    var coordinates = {
      top: span.offsetTop + parseInt(computed['borderTopWidth']),
      left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
      height: parseInt(computed['lineHeight'])
    };

    if (debug) {
      span.style.backgroundColor = '#aaa';
    } else {
      document.body.removeChild(div);
    }

    return coordinates;
  }

  {
    module.exports = getCaretCoordinates;
  }
})();
});

options.themes.mentionable = {
  $extend: 'dropdown',
  placement: 'top-start',
  arrowPadding: 6,
  arrowOverflow: false
};
var userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
var isIe = userAgent.indexOf('MSIE ') !== -1 || userAgent.indexOf('Trident/') !== -1;
var script = {
  components: {
    VDropdown: Dropdown
  },
  inheritAttrs: false,
  props: {
    keys: {
      type: Array,
      required: true
    },
    placement: {
      type: String,
      default: 'top-start'
    },
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    omitKey: {
      type: Boolean,
      default: false
    },
    filteringDisabled: {
      type: Boolean,
      default: false
    },
    insertSpace: {
      type: Boolean,
      default: false
    },
    mapInsert: {
      type: Function,
      default: null
    },
    limit: {
      type: Number,
      default: 8
    },
    theme: {
      type: String,
      default: 'mentionable'
    },
    caretHeight: {
      type: Number,
      default: 0
    },
    hideNoResult: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      key: null,
      oldKey: null,
      searchText: null,
      caretPosition: null,
      selectedIndex: 0
    };
  },
  computed: {
    filteredItems: function filteredItems() {
      if (!this.searchText || this.filteringDisabled) {
        return this.items;
      }

      var searchText = this.searchText.toLowerCase();
      return this.items.filter(function (item) {
        /** @type {string} */
        var text;

        if (item.searchText) {
          text = item.searchText;
        } else if (item.label) {
          text = item.label;
        } else {
          text = '';

          for (var key in item) {
            text += item[key];
          }
        }

        return text.toLowerCase().includes(searchText);
      });
    },
    displayedItems: function displayedItems() {
      return this.filteredItems.slice(0, this.limit);
    }
  },
  watch: {
    displayedItems: function displayedItems() {
      this.selectedIndex = 0;
    },
    searchText: function searchText(value, oldValue) {
      if (value) {
        this.$emit('search', value, oldValue);
      }
    }
  },
  mounted: function mounted() {
    this.input = this.getInput();
    this.attach();
  },
  updated: function updated() {
    var input = this.getInput();

    if (input !== this.input) {
      this.detach();
      this.input = input;
      this.attach();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.detach();
  },
  methods: {
    getInput: function getInput() {
      var _this$$scopedSlots$de = this.$scopedSlots.default(),
          _this$$scopedSlots$de2 = _slicedToArray(_this$$scopedSlots$de, 1),
          vnode = _this$$scopedSlots$de2[0];

      if (vnode) {
        if (vnode.elm.tagName === 'INPUT' || vnode.elm.tagName === 'TEXTAREA' || vnode.elm.isContentEditable) {
          return vnode.elm;
        } else {
          return vnode.elm.querySelector('input') || vnode.elm.querySelector('textarea') || vnode.elm.querySelector('[contenteditable="true"]');
        }
      }

      return null;
    },
    attach: function attach() {
      if (this.input) {
        this.input.addEventListener('input', this.onInput);
        this.input.addEventListener('keydown', this.onKeyDown);
        this.input.addEventListener('keyup', this.onKeyUp);
        this.input.addEventListener('scroll', this.onScroll);
        this.input.addEventListener('blur', this.onBlur);
      }
    },
    detach: function detach() {
      if (this.input) {
        this.input.removeEventListener('input', this.onInput);
        this.input.removeEventListener('keydown', this.onKeyDown);
        this.input.removeEventListener('keyup', this.onKeyUp);
        this.input.removeEventListener('scroll', this.onScroll);
        this.input.removeEventListener('blur', this.onBlur);
      }
    },
    onInput: function onInput() {
      this.checkKey();
    },
    onBlur: function onBlur() {
      this.closeMenu();
    },
    onKeyDown: function onKeyDown(e) {
      if (this.key) {
        if (e.key === 'ArrowDown' || e.keyCode === 40) {
          this.selectedIndex++;

          if (this.selectedIndex >= this.displayedItems.length) {
            this.selectedIndex = 0;
          }

          this.cancelEvent(e);
        }

        if (e.key === 'ArrowUp' || e.keyCode === 38) {
          this.selectedIndex--;

          if (this.selectedIndex < 0) {
            this.selectedIndex = this.displayedItems.length - 1;
          }

          this.cancelEvent(e);
        }

        if ((e.key === 'Enter' || e.key === 'Tab' || e.keyCode === 13 || e.keyCode === 9) && this.displayedItems.length > 0) {
          this.applyMention(this.selectedIndex);
          this.cancelEvent(e);
        }

        if (e.key === 'Escape' || e.keyCode === 27) {
          this.closeMenu();
          this.cancelEvent(e);
        }
      }
    },
    onKeyUp: function onKeyUp(e) {
      if (this.cancelKeyUp && (e.key === this.cancelKeyUp || e.keyCode === this.cancelKeyCode)) {
        this.cancelEvent(e);
      }

      this.cancelKeyUp = null; // IE

      this.cancelKeyCode = null;
    },
    cancelEvent: function cancelEvent(e) {
      e.preventDefault();
      e.stopPropagation();
      this.cancelKeyUp = e.key; // IE

      this.cancelKeyCode = e.keyCode;
    },
    onScroll: function onScroll() {
      this.updateCaretPosition();
    },
    getSelectionStart: function getSelectionStart() {
      return this.input.isContentEditable ? window.getSelection().anchorOffset : this.input.selectionStart;
    },
    setCaretPosition: function setCaretPosition(index) {
      var _this = this;

      this.$nextTick(function () {
        _this.input.selectionEnd = index;
      });
    },
    getValue: function getValue() {
      if (this.input.isContentEditable) {
        var node = window.getSelection().anchorNode;

        if (!node.children) {
          return node.textContent;
        }

        return '';
      }

      return this.input.value;
    },
    setValue: function setValue(value) {
      this.input.value = value;
      this.emitInputEvent('input');
    },
    emitInputEvent: function emitInputEvent(type) {
      var event;

      if (isIe) {
        event = document.createEvent('Event');
        event.initEvent(type, true, true);
      } else {
        event = new Event(type);
      }

      this.input.dispatchEvent(event);
    },
    checkKey: function checkKey() {
      var index = this.getSelectionStart();

      if (index >= 0) {
        var _this$getLastKeyBefor = this.getLastKeyBeforeCaret(index),
            key = _this$getLastKeyBefor.key,
            keyIndex = _this$getLastKeyBefor.keyIndex;

        var searchText = this.lastSearchText = this.getLastSearchText(index, keyIndex);

        if (!(keyIndex < 1 || /\s/.test(this.getValue()[keyIndex - 1]))) {
          return false;
        }

        if (searchText != null) {
          this.openMenu(key, keyIndex);
          this.searchText = searchText;
          return true;
        }
      }

      this.closeMenu();
      return false;
    },
    getLastKeyBeforeCaret: function getLastKeyBeforeCaret(caretIndex) {
      var _this2 = this;

      var _this$keys$map$sort = this.keys.map(function (key) {
        return {
          key: key,
          keyIndex: _this2.getValue().lastIndexOf(key, caretIndex - 1)
        };
      }).sort(function (a, b) {
        return b.keyIndex - a.keyIndex;
      }),
          _this$keys$map$sort2 = _slicedToArray(_this$keys$map$sort, 1),
          keyData = _this$keys$map$sort2[0];

      return keyData;
    },
    getLastSearchText: function getLastSearchText(caretIndex, keyIndex) {
      if (keyIndex !== -1) {
        var searchText = this.getValue().substring(keyIndex + 1, caretIndex); // If there is a space we close the menu

        if (!/\s/.test(searchText)) {
          return searchText;
        }
      }

      return null;
    },
    openMenu: function openMenu(key, keyIndex) {
      if (this.key !== key) {
        this.key = key;
        this.keyIndex = keyIndex;
        this.updateCaretPosition();
        this.selectedIndex = 0;
        this.$emit('open', key);
      }
    },
    closeMenu: function closeMenu() {
      if (this.key != null) {
        this.oldKey = this.key;
        this.key = null;
        this.$emit('close', this.oldKey);
      }
    },
    updateCaretPosition: function updateCaretPosition() {
      if (this.key) {
        if (this.input.isContentEditable) {
          var rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
          var inputRect = this.input.getBoundingClientRect();
          this.caretPosition = {
            left: rect.left - inputRect.left,
            top: rect.top - inputRect.top,
            height: rect.height
          };
        } else {
          this.caretPosition = textareaCaret(this.input, this.keyIndex);
        }

        this.caretPosition.top -= this.input.scrollTop;

        if (this.caretHeight) {
          this.caretPosition.height = this.caretHeight;
        } else if (isNaN(this.caretPosition.height)) {
          this.caretPosition.height = 16;
        }
      }
    },
    applyMention: function applyMention(itemIndex) {
      var item = this.displayedItems[itemIndex];
      var value = (this.omitKey ? '' : this.key) + String(this.mapInsert ? this.mapInsert(item, this.key) : item.value) + (this.insertSpace ? ' ' : '');

      if (this.input.isContentEditable) {
        var range = window.getSelection().getRangeAt(0);
        range.setStart(range.startContainer, range.startOffset - this.key.length - (this.lastSearchText ? this.lastSearchText.length : 0));
        range.deleteContents();
        range.insertNode(document.createTextNode(value));
        range.setStart(range.endContainer, range.endOffset);
        this.emitInputEvent('input');
      } else {
        this.setValue(this.replaceText(this.getValue(), this.searchText, value, this.keyIndex));
        this.setCaretPosition(this.keyIndex + value.length);
      }

      this.$emit('apply', item, this.key, value);
      this.closeMenu();
    },
    replaceText: function replaceText(text, searchText, newText, index) {
      return text.slice(0, index) + newText + text.slice(index + searchText.length + 1, text.length);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "mentionable", staticStyle: { position: "relative" } },
    [
      _vm._t("default"),
      _vm._v(" "),
      _c(
        "VDropdown",
        _vm._b(
          {
            ref: "popper",
            staticClass: "popper",
            staticStyle: { position: "absolute" },
            style: _vm.caretPosition
              ? {
                  top: _vm.caretPosition.top + "px",
                  left: _vm.caretPosition.left + "px"
                }
              : {},
            attrs: {
              placement: _vm.placement,
              shown: !!_vm.key,
              triggers: [],
              "auto-hide": false,
              theme: _vm.theme
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "popper",
                  fn: function() {
                    return [
                      !_vm.displayedItems.length && !_vm.hideNoResult
                        ? _c(
                            "div",
                            [
                              _vm._t("no-result", [
                                _vm._v("\n          No result\n        ")
                              ])
                            ],
                            2
                          )
                        : _vm.displayedItems.length > 0
                        ? _vm._l(_vm.displayedItems, function(item, index) {
                            return _c(
                              "div",
                              {
                                key: index,
                                staticClass: "mention-item",
                                class: {
                                  "mention-selected":
                                    _vm.selectedIndex === index
                                },
                                on: {
                                  mouseover: function($event) {
                                    _vm.selectedIndex = index;
                                  },
                                  mousedown: function($event) {
                                    return _vm.applyMention(index)
                                  }
                                }
                              },
                              [
                                _vm._t(
                                  "item-" + (_vm.key || _vm.oldKey),
                                  [
                                    _vm._t(
                                      "item",
                                      [
                                        _vm._v(
                                          "\n              " +
                                            _vm._s(item.label || item.value) +
                                            "\n            "
                                        )
                                      ],
                                      { item: item, index: index }
                                    )
                                  ],
                                  { item: item, index: index }
                                )
                              ],
                              2
                            )
                          })
                        : _vm._e()
                    ]
                  },
                  proxy: true
                }
              ],
              null,
              true
            )
          },
          "VDropdown",
          _vm.$attrs,
          false
        ),
        [
          _c("div", {
            style: _vm.caretPosition
              ? {
                  height: _vm.caretPosition.height + "px"
                }
              : {}
          })
        ]
      )
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

function registerComponents(Vue, prefix) {
  Vue.component("".concat(prefix, "mentionable"), __vue_component__);
  Vue.component("".concat(prefix, "Mentionable"), __vue_component__);
}

var plugin = {
  // eslint-disable-next-line no-undef
  version: "1.0.0-floating-vue1",
  install: function install(Vue, options) {
    var finalOptions = Object.assign({}, {
      installComponents: true,
      componentsPrefix: ''
    }, options);

    if (finalOptions.installComponents) {
      registerComponents(Vue, finalOptions.componentsPrefix);
    }
  }
};

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
export { __vue_component__ as Mentionable };
