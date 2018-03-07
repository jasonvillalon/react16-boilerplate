require('regenerator-runtime/runtime');
/*eslint-disable*/
console.log('EMVO', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
