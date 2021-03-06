'use strict';

exports.__esModule = true;

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-stepper", class: { 'van-stepper--disabled': _vm.disabled } }, [_c('button', { staticClass: "van-stepper__stepper van-stepper__minus", class: { 'van-stepper__minus--disabled': _vm.isMinusDisabled }, on: { "click": function click($event) {
          _vm.onChange('minus');
        } } }), _c('input', { staticClass: "van-stepper__input", attrs: { "type": "number", "disabled": _vm.disabled || _vm.disableInput }, domProps: { "value": _vm.currentValue }, on: { "input": _vm.onInput } }), _c('button', { staticClass: "van-stepper__stepper van-stepper__plus", class: { 'van-stepper__plus--disabled': _vm.isPlusDisabled }, on: { "click": function click($event) {
          _vm.onChange('plus');
        } } })]);
  },

  name: 'van-stepper',

  props: {
    value: {},
    disabled: Boolean,
    disableInput: Boolean,
    min: {
      type: [String, Number],
      default: 1
    },
    max: {
      type: [String, Number],
      default: Infinity
    },
    step: {
      type: [String, Number],
      default: 1
    },
    defaultValue: {
      type: [String, Number],
      default: 1
    }
  },

  data: function data() {
    var value = this.value ? +this.value : +this.defaultValue;
    var correctedValue = this.correctValue(value);
    if (value !== correctedValue) {
      value = correctedValue;
      this.$emit('input', value);
    }

    return {
      currentValue: value
    };
  },


  computed: {
    isMinusDisabled: function isMinusDisabled() {
      var min = +this.min;
      var step = +this.step;
      var currentValue = +this.currentValue;
      return min === currentValue || currentValue - step < min || this.disabled;
    },
    isPlusDisabled: function isPlusDisabled() {
      var max = +this.max;
      var step = +this.step;
      var currentValue = +this.currentValue;
      return max === currentValue || currentValue + step > max || this.disabled;
    }
  },

  watch: {
    currentValue: function currentValue(val) {
      this.$emit('input', val);
      this.$emit('change', val);
    },
    value: function value(val) {
      val = this.correctValue(+val);
      if (val !== this.currentValue) {
        this.currentValue = val;
      }
    }
  },

  methods: {
    correctValue: function correctValue(value) {
      if ((0, _isNan2.default)(value)) {
        value = this.min;
      } else {
        value = Math.max(this.min, value);
        value = Math.min(this.max, value);
      }

      return value;
    },
    onInput: function onInput(event) {
      var val = +event.target.value;
      this.currentValue = this.correctValue(val);
    },
    onChange: function onChange(type) {
      if (this.isMinusDisabled && type === 'minus' || this.isPlusDisabled && type === 'plus') {
        this.$emit('overlimit', type);
        return;
      }

      var step = +this.step;
      var currentValue = +this.currentValue;
      this.currentValue = type === 'minus' ? currentValue - step : currentValue + step;
      this.$emit(type);
    }
  }
};