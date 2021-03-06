'use strict';

exports.__esModule = true;

var _popupManager = require('./popup-manager');

var _popupManager2 = _interopRequireDefault(_popupManager);

var _popupContext = require('./popup-context');

var _popupContext2 = _interopRequireDefault(_popupContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    // popup 当前显示状态
    value: {
      type: Boolean,
      default: false
    },
    // 是否显示遮罩层
    overlay: {
      type: Boolean,
      default: false
    },
    // 点击遮罩层是否关闭 popup
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    },
    zIndex: [String, Number],
    // popup 滚动时是否禁用 body 滚动
    lockOnScroll: {
      type: Boolean,
      default: true
    },
    // 防止滚动穿透
    preventScroll: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    value: function value(val) {
      this[val ? 'open' : 'close']();
    }
  },

  beforeMount: function beforeMount() {
    this._popupId = 'popup-' + _popupContext2.default.plusKeyByOne('idSeed');
    _popupContext2.default.instances[this._popupId] = this;
  },
  data: function data() {
    return {
      opened: false,
      pos: {
        x: 0,
        y: 0
      }
    };
  },


  methods: {
    recordPosition: function recordPosition(e) {
      this.pos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    },
    watchTouchMove: function watchTouchMove(e) {
      var pos = this.pos;
      var dx = e.touches[0].clientX - pos.x;
      var dy = e.touches[0].clientY - pos.y;
      var direction = dy > 0 ? '10' : '01';
      var el = this.$el.querySelector('.scroller') || this.$el;
      var scrollTop = el.scrollTop;
      var scrollHeight = el.scrollHeight;
      var offsetHeight = el.offsetHeight;
      var isVertical = Math.abs(dx) < Math.abs(dy);

      var status = '11';

      if (scrollTop === 0) {
        status = offsetHeight >= scrollHeight ? '00' : '01';
      } else if (scrollTop + offsetHeight >= scrollHeight) {
        status = '10';
      }

      if (status !== '11' && isVertical && !(parseInt(status, 2) & parseInt(direction, 2))) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    open: function open() {
      if (this.opened || this.$isServer) {
        return;
      }

      this.$emit('input', true);

      // 如果属性中传入了`zIndex`，则覆盖`context`中对应的`zIndex`
      if (this.zIndex !== undefined) {
        _popupContext2.default.zIndex = this.zIndex;
      }

      if (this.overlay) {
        _popupManager2.default.openModal(this._popupId, _popupContext2.default.plusKeyByOne('zIndex'), this.$el);
        if (this.lockOnScroll) {
          document.body.classList.add('van-overflow-hidden');
        }
      }

      this.$el.style.zIndex = _popupContext2.default.plusKeyByOne('zIndex');
      this.opened = true;

      if (this.preventScroll) {
        document.addEventListener('touchstart', this.recordPosition, false);
        document.addEventListener('touchmove', this.watchTouchMove, false);
      }
    },
    close: function close() {
      if (!this.opened || this.$isServer) {
        return;
      }

      this.$emit('input', false);

      if (this.lockOnScroll) {
        document.body.classList.remove('van-overflow-hidden');
      }

      this.opened = false;
      this.doAfterClose();
    },
    doAfterClose: function doAfterClose() {
      _popupManager2.default.closeModal(this._popupId);

      if (this.preventScroll) {
        document.removeEventListener('touchstart', this.recordPosition, false);
        document.removeEventListener('touchmove', this.watchTouchMove, false);
      }
    }
  },

  beforeDestroy: function beforeDestroy() {
    _popupContext2.default.instances[this._popupId] = null;
    _popupManager2.default.closeModal(this._popupId);
    if (this.lockOnScroll) {
      document.body.classList.remove('van-overflow-hidden');
    }
  }
};