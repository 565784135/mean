'use strict';

exports.__esModule = true;

var _components;

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _cell = require('../cell');

var _cell2 = _interopRequireDefault(_cell);

var _radio = require('../radio');

var _radio2 = _interopRequireDefault(_radio);

var _cellGroup = require('../cell-group');

var _cellGroup2 = _interopRequireDefault(_cellGroup);

var _radioGroup = require('../radio-group');

var _radioGroup2 = _interopRequireDefault(_radioGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-contact-list" }, [_c('van-radio-group', { attrs: { "value": _vm.value }, on: { "input": function input($event) {
          _vm.$emit('input', $event);
        } } }, [_c('van-cell-group', _vm._l(_vm.list, function (item, index) {
      return _c('van-cell', { key: item.id }, [_c('van-radio', { attrs: { "name": item.id }, on: { "click": function click($event) {
            _vm.$emit('select', item, index);
          } } }, [_c('p', { staticClass: "van-contact-list__text" }, [_vm._v("联系人：" + _vm._s(item.name))]), _c('p', { staticClass: "van-contact-list__text" }, [_vm._v("联系电话：" + _vm._s(item.tel))])]), _c('van-icon', { staticClass: "van-contact-list__edit", attrs: { "name": "edit" }, on: { "click": function click($event) {
            _vm.$emit('edit', item, index);
          } } })], 1);
    }))], 1), _c('van-cell', { staticClass: "van-contact-list__add van-hairline--top", attrs: { "icon": "add", "title": _vm.addText, "isLink": "" }, on: { "click": function click($event) {
          _vm.$emit('add');
        } } })], 1);
  },

  name: 'van-contact-list',

  components: (_components = {}, _components[_icon2.default.name] = _icon2.default, _components[_cell2.default.name] = _cell2.default, _components[_radio2.default.name] = _radio2.default, _components[_cellGroup2.default.name] = _cellGroup2.default, _components[_radioGroup2.default.name] = _radioGroup2.default, _components),

  props: {
    value: {},
    addText: {
      type: String,
      default: '新建联系人'
    },
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  }
};