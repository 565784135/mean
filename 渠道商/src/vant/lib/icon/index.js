'use strict';

exports.__esModule = true;
exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('i', { class: ['van-icon', 'van-icon-' + _vm.name], on: { "click": function click($event) {
          _vm.$emit('click', $event);
        } } }, [_vm._t("default")], 2);
  },

  name: 'van-icon',

  props: {
    name: {
      type: String,
      required: true
    }
  }
};