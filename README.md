# postcss-px2vw

一款 [PostCSS](https://github.com/ai/postcss) 插件，将 `px` 转换成 `vw` 和 `rem`。

该插件主要结合了 [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 和 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 的功能，精简了不常用的配置。默认将 `vw` 作为优选单位使用，以 `rem` 作为回退模式。考虑到 `vw` 在一些老旧设备上支持不够理想，这款插件很好的解决了该问题。

## 安装

```bash
$ npm install @moohng/postcss-px2vw --save-dev
```

## 使用

```js
// .postcssrc.js
module.exports = {
  plugins: {
    'postcss-px2vw': {}
  }
}
```

举例：

```scss
// input
.class {
  border: 1px solid black;
  margin-bottom: 1px;
  font-size: 20px;
  line-height: 30px;
}
// output
.class {
  border: 1px solid black;
  margin-bottom: 1px;
  font-size: 0.625rem;
  font-size: 6.25vw;
  line-height: 0.9375rem;
  line-height: 9.375vw;
}
```

## 配置

- `viewportWidth`：对应设计图的宽度，用于计算 `vw`。默认 `750`，指定 `0` 或 `false` 时禁用
- `rootValue`：根字体大小，用于计算 `rem`。默认 `75`，指定 `0` 或 `false` 时禁用
- `unitPrecision`：计算结果的精度，默认 `5`
- `minPixelValue`：小于等于该值的 `px` 单位不作处理，默认 `1`

> 注意：该插件只会转换 `px` 单位。`rootValue` 一般建议设置成 `viewportWidth / 10` 的大小，将设计图分成10等分。由于浏览器有最小字体限制，如果设置得过小，页面可能跟预期不一致

如果要使用 `rem` 单位，需要自己通过 `js` 来动态计算根字体的大小。如果将设计图分成 10 等分计算，那么根字体的大小应该是 `window.innerWidth / 10`。

## 致谢

如果你觉得对你有帮助，欢迎 star 和 issue

![微信支付](http://static.moohng.com/FrEihC8JSWMtsxtnDUpQiuaL9ZbE?imageView2/1/w/320/h/320/format/webp/q/75|imageslim)
