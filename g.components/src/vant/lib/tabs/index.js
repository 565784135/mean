'use strict';

exports.__esModule = true;

var _swipe = require('./swipe');

var _swipe2 = _interopRequireDefault(_swipe);

var _transition = require('../utils/transition');

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-tabs", class: ["van-tabs--" + _vm.type] }, [_vm.type === 'line' && _vm.tabs.length > _vm.swipeThreshold ? _c('div', { staticClass: "van-tabs__nav-wrap" }, [_c('div', { ref: "swipe", staticClass: "van-tabs__swipe" }, [_c('div', { staticClass: "van-tabs__nav van-tabs__nav--line" }, [_c('div', { staticClass: "van-tabs__nav-bar", style: _vm.navBarStyle }), _vm._l(_vm.tabs, function (tab, index) {
      return _c('div', { key: index, ref: "tabkey", refInFor: true, staticClass: "van-tab van-hairline", class: { 'van-tab--active': index === _vm.curActive }, on: { "click": function click($event) {
            _vm.handleTabClick(index);
          } } }, [_c('span', [_vm._v(_vm._s(tab.title))])]);
    })], 2)])]) : _c('div', { staticClass: "van-tabs__nav", class: ["van-tabs__nav--" + this.type] }, [_vm.type === 'line' ? _c('div', { staticClass: "van-tabs__nav-bar", style: _vm.navBarStyle }) : _vm._e(), _vm._l(_vm.tabs, function (tab, index) {
      return _c('div', { key: index, ref: "tabkey", refInFor: true, staticClass: "van-tab van-hairline", class: { 'van-tab--active': index === _vm.curActive }, on: { "click": function click($event) {
            _vm.handleTabClick(index);
          } } }, [_c('span', [_vm._v(_vm._s(tab.title))])]);
    })], 2), _c('div', { staticClass: "van-tabs__content" }, [_vm._t("default")], 2)]);
  },

  name: 'van-tabs',

  props: {
    // 外部传入的激活的tab标签
    active: {
      type: [Number, String],
      default: 0
    },
    // 是默认的line还是card
    type: {
      type: String,
      default: 'line'
    },
    // 切换tab的动画时间
    duration: {
      type: Number,
      default: 0.3
    },
    swipeThreshold: {
      type: Number,
      default: 4
    }
  },

  data: function data() {
    return {
      tabs: [],
      curActive: +this.active,
      isSwiping: false,
      isInitEvents: false,
      navBarStyle: {}
    };
  },


  watch: {
    active: function active(val) {
      this.curActive = +val;
    },
    curActive: function curActive() {
      this.setNavBarStyle();
      /* istanbul ignore else */
      if (this.tabs.length > this.swipeThreshold) {
        this.doOnValueChange();
      }
    },
    tabs: function tabs(val) {
      var _this = this;

      this.$nextTick(function () {
        _this.setNavBarStyle();
        if (val.length > _this.swipeThreshold) {
          _this.initEvents();
          _this.doOnValueChange();
        } else {
          _this.isInitEvents = false;
        }
      });
    }
  },

  computed: {
    swipeWidth: function swipeWidth() {
      return this.$refs.swipe && this.$refs.swipe.getBoundingClientRect().width;
    },
    maxTranslate: function maxTranslate() {
      /* istanbul ignore if */
      if (!this.$refs.tabkey) return;

      var lastTab = this.$refs.tabkey[this.tabs.length - 1];
      var lastTabWidth = lastTab.offsetWidth;
      var lastTabOffsetLeft = lastTab.offsetLeft;

      return lastTabOffsetLeft + lastTabWidth - this.swipeWidth;
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    // 页面载入完成
    this.$nextTick(function () {
      _this2.setNavBarStyle();

      if (_this2.tabs.length > _this2.swipeThreshold) {
        _this2.initEvents();
        _this2.doOnValueChange();
      }
    });
  },


  methods: {
    /**
     * `type`为`line`时，tab下方的横线的样式
     */
    setNavBarStyle: function setNavBarStyle() {
      if (this.type !== 'line' || !this.$refs.tabkey) return {};

      var tabKey = this.curActive;
      var elem = this.$refs.tabkey[tabKey];
      var offsetWidth = (elem.offsetWidth || 0) + 'px';
      var offsetLeft = (elem.offsetLeft || 0) + 'px';

      this.navBarStyle = {
        width: offsetWidth,
        transform: 'translate3d(' + offsetLeft + ', 0, 0)',
        transitionDuration: this.duration + 's'
      };
    },
    handleTabClick: function handleTabClick(index) {
      if (this.tabs[index].disabled) {
        this.$emit('disabled', index);
        return;
      }

      this.$emit('click', index);
      this.curActive = index;
    },


    /**
     * 将当前value值转换为需要translate的值
     */
    value2Translate: function value2Translate(value) {
      /* istanbul ignore if */
      if (!this.$refs.tabkey) return 0;

      var tab = this.$refs.tabkey[value];
      var maxTranslate = this.maxTranslate;
      var tabWidth = tab.offsetWidth;
      var tabOffsetLeft = tab.offsetLeft;
      var translate = tabOffsetLeft + tabWidth * 2.7 - this.swipeWidth;
      if (translate < 0) {
        translate = 0;
      }

      return -1 * (translate > maxTranslate ? maxTranslate : translate);
    },
    initEvents: function initEvents() {
      var _this3 = this;

      var el = this.$refs.swipe;
      if (!el || this.isInitEvents) return;

      this.isInitEvents = true;
      var swipeState = {};

      (0, _swipe2.default)(el, {
        start: function start(event) {
          swipeState = {
            start: new Date(),
            startLeft: event.pageX,
            startTranslateLeft: _transition2.default.getElementTranslate(el).left
          };
        },

        drag: function drag(event) {
          _this3.isSwiping = true;

          swipeState.left = event.pageX;
          var deltaX = swipeState.left - swipeState.startLeft;
          var translate = swipeState.startTranslateLeft + deltaX;

          /* istanbul ignore else */
          if (translate > 0 || translate * -1 > _this3.maxTranslate) return;

          _transition2.default.translateElement(el, translate, null);
        },

        end: function end() {
          _this3.isSwiping = false;
        }
      });
    },
    doOnValueChange: function doOnValueChange() {
      var value = +this.curActive;
      var swipe = this.$refs.swipe;

      _transition2.default.translateElement(swipe, this.value2Translate(value), null);
    }
  }
};