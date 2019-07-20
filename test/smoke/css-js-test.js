// Provides a similar API to glob, however instead of a single pattern, you may also use arrays of patterns.
// glob库 可以对  多文件路径进行处理， 匹配出对应的 文件名
const glob = require('glob-all')

// mocha的用法 describe it
describe('Checking generated css js files', () => {
  it('should generate css js files', (done) => {
    const files = glob.sync([
      './dist/index_*.js',
      './dist/index_*.css',
      './dist/search_*.js',
      './dist/search_*.css',
    ])

    if (files.length > 0) {
      done()
    } else {
      throw new Error('no css js files generated')
    }
  })
})
