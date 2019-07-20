// 与 框架无关的  最基础配置
// module.exports = {
//   parser: 'babel-eslint',
//   extends: 'airbnb-base',
//   env: {
//     browser: true,
//     node: true,
//   },
// }

//

module.exports = {
  parser: "babel-eslint", //指定一个解析器
  //   extends: 'airbnb', //继承自 airbnb 规范
  extends: "airbnb-base", // 最基础的配置
  env: {
    //指定浏览器和 node 环境
    browser: true,
    node: true
  },
  //下面parserOptions 和 plugins 都是 react 的相关配置
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  //   ecmaVersion: 2018,
  //   sourceType: 'module',
  // },
  // plugins: ['react'],
  rules: {
    //自定义的规则
    "no-undef": 0,
    "no-with": 2,
    "react/jsx-no-bind": 0,
    indent: [2, 2],
    "no-multiple-empty-lines": [
      1,
      {
        max: 1
      }
    ],
    "no-use-before-define": 2,
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": 0,
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0,
    "no-shadow": 0,
    "react/sort-comp": 0,
    "no-else-return": 0,
    "react/prop-types": 0,
    "no-unused-vars": [
      2,
      {
        vars: "all",
        args: "after-used"
      }
    ],
    camelcase: 0,
    "no-console": 0,
    "react/require-default-props": 0,
    "no-return-assign": 0,
    "react/no-array-index-key": 0,
    "max-len": 0,
    "react/no-multi-comp": 0,
    "react/forbid-prop-types": 0,
    "import/extensions": 0,
    "guard-for-in": 0,
    "no-restricted-syntax": 0,
    "dot-notation": 0,
    "class-methods-use-this": 0,
    "padded-blocks": 0,
    "one-var": 0,
    "no-trailing-spaces": 0,
    "arrow-body-style": 0,
    "no-mixed-operators": 0,
    "brace-style": 0,
    "no-mixed-spaces-and-tabs": [2, false],
    "no-multiple-empty-lines": [
      1,
      {
        max: 2
      }
    ],
    "no-nested-ternary": 1,
    "no-redeclare": 2,
    "no-multi-spaces": 1,
    "no-plusplus": 0,
    "no-dupe-keys": 0,
    radix: 0,
    "comma-dangle": 0,
    "func-names": 0,
    semi: 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0
  }
};
