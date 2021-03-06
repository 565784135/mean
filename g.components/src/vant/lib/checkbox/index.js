'use strict';

exports.__esModule = true;

var _components;

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _findParent = require('../mixins/findParent');

var _findParent2 = _interopRequireDefault(_findParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: ['van-checkbox', "van-checkbox--" + _vm.shape, {
        'van-checkbox--disabled': _vm.isDisabled
      }] }, [_c('span', { staticClass: "van-checkbox__input" }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.currentValue, expression: "currentValue" }], staticClass: "van-checkbox__control", attrs: { "type": "checkbox", "disabled": _vm.isDisabled }, domProps: { "checked": Array.isArray(_vm.currentValue) ? _vm._i(_vm.currentValue, null) > -1 : _vm.currentValue }, on: { "change": function change($event) {
          var $$a = _vm.currentValue,
              $$el = $event.target,
              $$c = $$el.checked ? true : false;if (Array.isArray($$a)) {
            var $$v = null,
                $$i = _vm._i($$a, $$v);if ($$el.checked) {
              $$i < 0 && (_vm.currentValue = $$a.concat([$$v]));
            } else {
              $$i > -1 && (_vm.currentValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.currentValue = $$c;
          }
        } } }), _c('van-icon', { attrs: { "name": "success" } })], 1), _c('span', { staticClass: "van-checkbox__label", on: { "click": _vm.onClickLabel } }, [_vm._t("default")], 2)]);
  },

  name: 'van-checkbox',

  components: (_components = {}, _components[_icon2.default.name] = _icon2.default, _components),

  mixins: [_findParent2.default],

  props: {
    value: {},
    disabled: Boolean,
    name: [String, Number],
    shape: {
      type: String,
      default: 'round'
    }
  },

  watch: {
    value: function value(val) {
      this.$emit('change', val);
    }
  },

  computed: {
    // checkbox 是否在 van-checkbox-group 中
    isGroup: function isGroup() {
      return !!this.findParentByComponentName('van-checkbox-group');
    },


    currentValue: {
      get: function get() {
        return this.isGroup && this.parentGroup ? this.parentGroup.value.indexOf(this.name) !== -1 : this.value;
      },
      set: function set(val) {
        if (this.isGroup && this.parentGroup) {
          var parentValue = this.parentGroup.value.slice();
          if (val) {
            /* istanbul ignore else */
            if (parentValue.indexOf(this.name) === -1) {
              parentValue.push(this.name);
              this.parentGroup.$emit('input', parentValue);
            }
          } else {
            var index = parentValue.indexOf(this.name);
            /* istanbul ignore else */
            if (index !== -1) {
              parentValue.splice(index, 1);
              this.parentGroup.$emit('input', parentValue);
            }
          }
        } else {
          this.$emit('input', val);
        }
      }
    },

    isChecked: function isChecked() {
      var currentValue = this.currentValue;

      if ({}.toString.call(currentValue) === '[object Boolean]') {
        return currentValue;
      } else if (currentValue !== null && currentValue !== undefined) {
        return currentValue === this.name;
      }
    },
    isDisabled: function isDisabled() {
      return this.isGroup && this.parentGroup ? this.parentGroup.disabled : this.disabled;
    }
  },

  methods: {
    onClickLabel: function onClickLabel() {
      if (this.isDisabled) {
        return;
      }
      this.currentValue = !this.currentValue;
    }
  }
};