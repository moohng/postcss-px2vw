module.exports = (options = {}) => {
  const opts = {
    viewportWidth: 750,
    unitPrecision: 5,
    rootValue: 75,
    minPixelValue: 1,
    ...options,
  };

  const pxRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/ig;

  return {
    postcssPlugin: 'postcss-px2vw',
    Declaration (decl) {
      if (decl.value.indexOf('px') === -1) return;
      const value = decl.value;
      if (opts.viewportWidth) {
        const pxReplaceForVw = createPxReplace(opts.viewportWidth / 100, opts.minPixelValue, opts.unitPrecision, 'vw');
        decl.value = value.replace(pxRegex, pxReplaceForVw);
      }
      if (opts.rootValue) {
        const pxReplaceForRem = createPxReplace(opts.rootValue, opts.minPixelValue, opts.unitPrecision, 'rem');
        if (opts.viewportWidth) {
          var newValue = value.replace(pxRegex, pxReplaceForRem);
          if (newValue !== value) {
            decl.cloneBefore({ value: newValue });
          }
        } else {
          decl.value = value.replace(pxRegex, pxReplaceForRem);
        }
      }
    },
  };
};

function createPxReplace(perRatio, minPixelValue, unitPrecision, unit) {
  return function (m, $1) {
    if (!$1) return m;
    const pixels = parseFloat($1);
    if (pixels <= minPixelValue) return m;
    return toFixed((pixels / perRatio), unitPrecision) + unit;
  };
}

function toFixed(number, precision) {
  const multiplier = 10 ** (precision + 1);
  const wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
}

module.exports.postcss = true;
