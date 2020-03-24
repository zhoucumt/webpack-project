//index.js
//src/index.js
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
    import('./handle.js').then(fn => fn.default());
}
