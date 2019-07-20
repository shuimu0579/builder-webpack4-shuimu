// 引入断言库 assert
// const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base.js');

  it('entry', () => {
    console.log(baseConfig);
    // assert.equal(
    //   baseConfig.entry.index,
    //   '/Users/apple/builder-webpack/test/smoke/template/src/index/index.js'
    // );
    // assert.equal(
    //   baseConfig.entry.search,
    //   '/Users/apple/builder-webpack/test/smoke/template/src/search/index.js'
    // );
  });
});
