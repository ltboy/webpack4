const path = require('path')

module.exports = {
  resolve() {
    return path.resolve(__dirname, '..', ...arguments)
  }
}
