'use strict';

var postcss = require('postcss');
var objectAssign = require('object-assign');

module.exports = postcss.plugin('postcss-px2vw', function (options) {
  var opts = objectAssign({
    viewportWidth: 750,
    unitPrecision: 5,
    rootValue: 75,
  }, options);

  var pxRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/ig;

  return function (css) {
    css.walkDecls(function (decl, i) {
      if (decl.value.indexOf('px') === -1) return;
      var value = decl.value;
      if (opts.viewportWidth) {
        var pxReplaceForVw = createPxReplace(opts.viewportWidth / 100, opts.unitPrecision, 'vw');
        decl.value = value.replace(pxRegex, pxReplaceForVw);
      }
      if (opts.rootValue) {
        var pxReplaceForRem = createPxReplace(opts.rootValue, opts.unitPrecision, 'rem');
        decl.parent.insertBefore(i, decl.clone({
          value: value.replace(pxRegex, pxReplaceForRem)
        }));
      }
    });
  };
});

function createPxReplace(perRatio, unitPrecision, unit) {
  return function (m, $1) {
    if (!$1) return m;
    var pixels = parseFloat($1);
    if (pixels <= 1) return m;
    return toFixed((pixels / perRatio), unitPrecision) + unit;
  };
}

function toFixed(number, precision) {
  var multiplier = Math.pow(10, precision + 1);
  var wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
}
