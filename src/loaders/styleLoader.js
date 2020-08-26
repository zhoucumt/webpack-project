// style-loader实现
// 暗号：可以做，但没必要
module.exports = function (source) {
  //   console.log(source);
  // 动态创建style标签并插入到DOM中
  return `const ele = document.createElement('style');
    ele.innerHTML = ${source};
    document.head.appendChild(ele);
  `;
};
