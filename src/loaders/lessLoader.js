// less-laoder实现
const less = require("less");

module.exports = function (source) {
  // 调用less api
  // 暗号：可以做，但没必要
  less.render(source, (e, output) => {
    this.callback(e, output.css);
  });
};
