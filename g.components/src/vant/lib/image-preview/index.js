'use strict';

exports.__esModule = true;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _imagePreview = require('./image-preview');

var _imagePreview2 = _interopRequireDefault(_imagePreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = void 0;

var ImagePreviewConstructor = _vue2.default.extend(_imagePreview2.default);

var initInstance = function initInstance() {
  instance = new ImagePreviewConstructor({
    el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
};

var ImagePreviewBox = function ImagePreviewBox(images) {
  var startPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!instance) {
    initInstance();
  }

  instance.images = images;
  instance.startPosition = startPosition;
  instance.value = true;
};

exports.default = ImagePreviewBox;