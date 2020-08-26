// css-loader实现
// 暗号：可以做，但没必要
module.exports = function (source) {
  // console.log(source);
  return JSON.stringify(source);
};
