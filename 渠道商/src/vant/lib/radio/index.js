'use strict';

exports.__esModule = true;

var _findParent = require('../mixins/findParent');

var _findParent2 = _interopRequireDefault(_findParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-radio", class: {
        'van-radio--disabled': _vm.isDisabled
      }, on: { "click": _vm.handleRadioClick } }, [_c('span', { staticClass: "van-radio__input" }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.currentValue, expression: "currentValue" }], staticClass: "van-radio__control", attrs: { "type": "radio", "disabled": _vm.isDisabled }, domProps: { "value": _vm.name, "checked": _vm._q(_vm.currentValue, _vm.name) }, on: { "change": function change($event) {
          _vm.currentValue = _vm.name;
        } } }), _c('span', { staticClass: "van-icon", class: {
        'van-icon-checked': _vm.currentValue === _vm.name,
        'van-icon-check': _vm.currentValue !== _vm.name
      } })]), _c('span', { staticClass: "van-radio__label", on: { "click": _vm.handleLabelClick } }, [_vm._t("default")], 2)]);
  },

  name: 'van-radio',

  mixins: [_findParent2.default],

  props: {
    disabled: Boolean,
    value: {},
    name: [String, Number]
  },

  computed: {
    isGroup: function isGroup() {
      return !!this.findParentByComponentName('van-radio-group');
    },


    currentValue: {
      get: function get() {
        return this.isGroup && this.parentGroup ? this.parentGroup.value : this.value;
      },
      set: function set(val) {
        if (this.isGroup && this.parentGroup) {
          this.parentGroup.$emit('input', val);
        } else {
          this.$emit('input', val);
        }
      }
    },

    isDisabled: function isDisabled() {
      return this.isGroup && this.parentGroup ? this.parentGroup.disabled || this.disabled : this.disabled;
    }
  },

  methods: {
    handleLabelClick: function handleLabelClick() {
      if (this.isDisabled) {
        return;
      }
      this.currentValue = this.name;
    },
    handleRadioClick: function handleRadioClick() {
      this.$emit('click');
    }
  }
};