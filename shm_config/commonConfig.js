const path = require('path')
const getParentPath = require('./utils').getParentPath
const ROOT = getParentPath('html')
const SOHU_PUBLIC_PATH = path.resolve(ROOT, 'sohu_public')
const STATIC_PATH = path.resolve(ROOT, 'static/v7')

module.exports = {
  resolve: {
    alias: {
      sohu_public: SOHU_PUBLIC_PATH,
      static: STATIC_PATH
    }
  }
}
