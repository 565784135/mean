'use strict';

exports.__esModule = true;

var _components;

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _loading = require('../loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOAST_TYPES = ['text', 'html', 'loading', 'success', 'fail'];
var DEFAULT_STYLE_LIST = ['success', 'fail', 'loading'];

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": "van-toast-fade" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "van-toast-wrapper" }, [_c('div', { class: ['van-toast', "van-toast--" + _vm.displayStyle, "van-toast--" + _vm.position] }, [_vm.displayStyle === 'text' ? _c('div', [_vm._v(_vm._s(_vm.message))]) : _vm._e(), _vm.displayStyle === 'html' ? _c('div', { domProps: { "innerHTML": _vm._s(_vm.message) } }) : _vm._e(), _vm.displayStyle === 'default' ? [_vm.type === 'loading' ? _c('van-loading', { attrs: { "color": "white" } }) : _c('van-icon', { staticClass: "van-toast__icon", attrs: { "name": _vm.type } }), _vm.message ? _c('div', { staticClass: "van-toast__text" }, [_vm._v(_vm._s(_vm.message))]) : _vm._e()] : _vm._e()], 2), _vm.forbidClick || _vm.mask ? _c('div', { class: ['van-toast__overlay', { 'van-toast__overlay--mask': _vm.mask }] }) : _vm._e()])]);
  },

  name: 'van-toast',

  components: (_components = {}, _components[_icon2.default.name] = _icon2.default, _components[_loading2.default.name] = _loading2.default, _components),

  props: {
    type: {
      type: String,
      default: 'text',
      validator: function validator(value) {
        return TOAST_TYPES.indexOf(value) > -1;
      }
    },
    message: {
      type: String,
      default: ''
    },
    forbidClick: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'middle'
    },
    mask: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      visible: false
    };
  },


  computed: {
    displayStyle: function displayStyle() {
      return DEFAULT_STYLE_LIST.indexOf(this.type) !== -1 ? 'default' : this.type;
    }
  }
};