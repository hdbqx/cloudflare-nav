/**
 * colorExtractor.js - 从图标中提取主色调
 * 用于悬停光晕效果的颜色自适应
 */

(function () {
  'use strict';

  // 颜色缓存，避免重复提取
  const colorCache = new Map();

  // 默认颜色
  const DEFAULT_COLOR = { hex: '#3b82f6', rgb: '59, 130, 246' };

  /**
   * RGB 转 HEX
   */
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(function (x) {
      var hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  /**
   * 从图片 URL 提取主色调
   * @param {string} imgUrl - 图标图片 URL
   * @returns {Promise<{hex: string, rgb: string}|null>}
   */
  function extractColorFromImage(imgUrl) {
    if (colorCache.has(imgUrl)) {
      return Promise.resolve(colorCache.get(imgUrl));
    }

    return new Promise(function (resolve) {
      var img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = function () {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(null);
          return;
        }

        // 缩小图片以提高性能（最大 50px）
        var scale = 50 / Math.max(img.width, img.height, 1);
        canvas.width = Math.max(1, Math.floor(img.width * scale));
        canvas.height = Math.max(1, Math.floor(img.height * scale));

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;

        // 分析颜色分布
        var colorMap = {};
        var maxCount = 0;
        var dominantColor = '';

        for (var i = 0; i < data.length; i += 4) {
          var r = data[i];
          var g = data[i + 1];
          var b = data[i + 2];
          var a = data[i + 3];

          // 跳过透明像素
          if (a < 128) continue;

          // 跳过白色/灰色像素（通常是背景）
          var brightness = (r + g + b) / 3;
          var isGrayish = Math.abs(r - g) < 30 && Math.abs(g - b) < 30 && Math.abs(r - b) < 30;

          if (brightness > 240 || isGrayish) continue;

          // 颜色量化
          var qR = Math.round(r / 20) * 20;
          var qG = Math.round(g / 20) * 20;
          var qB = Math.round(b / 20) * 20;
          var key = qR + ',' + qG + ',' + qB;

          colorMap[key] = (colorMap[key] || 0) + 1;
          if (colorMap[key] > maxCount) {
            maxCount = colorMap[key];
            dominantColor = key;
          }
        }

        var result;
        if (dominantColor) {
          var parts = dominantColor.split(',').map(Number);
          result = {
            hex: rgbToHex(parts[0], parts[1], parts[2]),
            rgb: parts[0] + ', ' + parts[1] + ', ' + parts[2]
          };
        } else {
          result = DEFAULT_COLOR;
        }

        colorCache.set(imgUrl, result);
        resolve(result);
      };

      img.onerror = function () {
        reject(new Error('image load failed'));
      };

      img.src = imgUrl;
    });
  }

  /**
   * 从文本生成颜色（用于 Emoji 或无图标时）
   * DJB2 哈希变体 → HSL → RGB
   * @param {string} text - 标题或 emoji 字符
   * @returns {{hex: string, rgb: string}}
   */
  function generateColorFromText(text) {
    var hash = 0;
    for (var i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }

    var hue = ((hash % 360) + 360) % 360; // 保证正数
    var saturation = 65 + (Math.abs(hash) % 15); // 65-80%
    var lightness = 45 + (Math.abs(hash >> 8) % 10); // 45-55%

    // HSL → RGB
    var s = saturation / 100;
    var l = lightness / 100;
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    var m = l - c / 2;

    var r1, g1, b1;
    if (hue < 60) { r1 = c; g1 = x; b1 = 0; }
    else if (hue < 120) { r1 = x; g1 = c; b1 = 0; }
    else if (hue < 180) { r1 = 0; g1 = c; b1 = x; }
    else if (hue < 240) { r1 = 0; g1 = x; b1 = c; }
    else if (hue < 300) { r1 = x; g1 = 0; b1 = c; }
    else { r1 = c; g1 = 0; b1 = x; }

    var r = Math.round((r1 + m) * 255);
    var g = Math.round((g1 + m) * 255);
    var b = Math.round((b1 + m) * 255);

    return {
      hex: rgbToHex(r, g, b),
      rgb: r + ', ' + g + ', ' + b
    };
  }

  // 挂载到全局
  window.colorExtractor = {
    extractColorFromImage: extractColorFromImage,
    generateColorFromText: generateColorFromText
  };
})();
