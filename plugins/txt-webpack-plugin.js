class TxtWebpackPlugin {
  constructor(options) {
    // console.log('options: ', options);
  }
  // 暗号：做人嘛，最重要的是开心
  apply(compiler) {
    compiler.hooks.emit.tapAsync('TxtWebpackPlugin', (compilation, callback) => {
      // console.log('assets===========: ', compilation.assets);
      const assets = compilation.assets;

      const len = Object.keys(assets).length;
      let content = `一共有${len}个文件，文件名称：\n`;

      for (let filename in assets) {
        // console.log('文件名称：', filename);
        content += `${filename}\n`;
      }
      // console.log('length: ', len);

      assets['README.txt'] = {
        source() {
          return content;
        },
        size() {
          return 1024;
        }
      };

      // 执行回调
      callback();
    });
  }
}

module.exports = TxtWebpackPlugin;