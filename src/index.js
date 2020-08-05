//index.js
//src/index.js
// if(module && module.hot) {
//     module.hot.accept()
// }
import './index.less';

// class Animal {
//     constructor(name) {
//         this.name = name;
//     }
//     getName() {
//         return this.name;
//     }
// }

// const dog = new Animal('dog');
console.log('aaaa');

document.getElementById('btn').onclick = function() {
    // 按需加载
    import('./handle.js').then(fn => fn.default());
}
