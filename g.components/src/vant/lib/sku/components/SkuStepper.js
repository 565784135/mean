'use strict';

exports.__esModule = true;

var _components;

var _stepper = require('../../stepper');

var _stepper2 = _interopRequireDefault(_stepper);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QUOTA_LIMIT = _constants.LIMIT_TYPE.QUOTA_LIMIT,
    STOCK_LIMIT = _constants.LIMIT_TYPE.STOCK_LIMIT;
exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-sku-stepper-stock" }, [_c('div', { staticClass: "van-sku-stepper-container" }, [_c('div', { staticClass: "van-sku__stepper-title" }, [_vm._v(_vm._s(_vm.stepperTitle) + "：")]), _c('van-stepper', { staticClass: "van-sku__stepper", attrs: { "min": 1, "max": _vm.stepperLimit, "disableInput": _vm.disableStepperInput }, on: { "overlimit": _vm.handleOverLimit }, model: { value: _vm.currentNum, callback: function callback($$v) {
          _vm.currentNum = $$v;
        }, expression: "currentNum" } })], 1), !_vm.hideStock ? _c('div', { staticClass: "van-sku__stock" }, [_vm._v("剩余" + _vm._s(_vm.stock) + "件")]) : _vm._e(), _vm.quota > 0 ? _c('div', { staticClass: "van-sku__quota" }, [_vm._v("每人限购" + _vm._s(_vm.quota) + "件")]) : _vm._e()]);
  },

  name: 'van-sku-stepper',

  components: (_components = {}, _components[_stepper2.default.name] = _stepper2.default, _components),

  props: {
    skuEventBus: Object,
    skuStockNum: Number,
    selectedSku: Object,
    selectedSkuComb: Object,
    selectedNum: Number,
    quota: Number,
    quotaUsed: Number,
    hideStock: {
      type: Boolean,
      default: false
    },
    disableStepperInput: {
      type: Boolean,
      default: false
    },
    stepperTitle: {
      type: String,
      default: _constants.DEFAULT_BUY_TEXT
    }
  },

  data: function data() {
    return {
      currentNum: this.selectedNum,
      // 购买限制类型: 限购/库存
      limitType: STOCK_LIMIT
    };
  },


  watch: {
    currentNum: function currentNum(num) {
      this.skuEventBus.$emit('sku:numChange', num);
    },
    stepperLimit: function stepperLimit(limit) {
      if (limit < this.currentNum) {
        this.currentNum = limit;
      }
    }
  },

  computed: {
    stock: function stock() {
      if (this.selectedSkuComb) {
        return this.selectedSkuComb.stock_num;
      }
      return this.skuStockNum;
    },
    stepperLimit: function stepperLimit() {
      var quotaLimit = this.quota - this.quotaUsed;
      var limit = void 0;

      // 无限购时直接取库存，有限购时取限购数和库存数中小的那个
      if (this.quota > 0 && quotaLimit <= this.stock) {
        // 修正负的limit
        limit = quotaLimit < 0 ? 0 : quotaLimit;
        this.limitType = QUOTA_LIMIT;
      } else {
        limit = this.stock;
      }

      return limit;
    }
  },

  methods: {
    setCurrentNum: function setCurrentNum(num) {
      this.currentNum = num;
    },
    handleOverLimit: function handleOverLimit(action) {
      this.skuEventBus.$emit('sku:overLimit', {
        action: action,
        limitType: this.limitType,
        quota: this.quota,
        quotaUsed: this.quotaUsed
      });
    }
  }
};