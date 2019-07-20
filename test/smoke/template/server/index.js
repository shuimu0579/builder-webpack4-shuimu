//首先有一个疑问，没有任何地方引用了server里面的这个index.js，
//那么说，在这里server 里面的index 是会自动执行的，
//服务器端的配置就是在 这里面执行的

// 采用express即插即用，如果用koa的话，还需要一大堆的配置

if (typeof window === "undefined") {
  // node环境里面的全局对象是 global  浏览器环境中的全局对象就是 window
  global.window = {};
}

const fs = require("fs"); // 文件读取模块
const path = require("path");
const express = require("express"); // 1.引入 express
// 2. 引入renderToString方法，这个方法就在react-dom/server 里面
// 把客户端的组件 通过 renderToString， 渲染成为一个字符串。
const { renderToString } = require("react-dom/server");

// 7.1 加载 待渲染成字符串的  客服端的组件search-server
// 注意，search-server 这个js文件里面是无法加载 css的， 就需要用到下面的方法 fs.readFileSync
// 7.2获取到yarn run build:ssr 打包后输出的文件 search-server
const SSR = require("../dist/search-server");

// readFileSync 同步的方式读取内容 赋值给 template
const template = fs.readFileSync(
  path.join(__dirname, "../dist/search.html"),
  "utf-8" // 不加上utf-8的话,读出来的就仅仅是一个 二进制的buffer数据，所以需要utf-8
);
const data = require("./data.json");

// 8.2 将str包装起来的方法
const renderMarkup = str => {
  // 为什么要用这种方式，不用下面那种方式
  const dataStr = JSON.stringify(data); // JSON.stringify()将json对象 转换成为 字符串
  return template
    .replace("<html_placeholder>", str) // <html_placeholder> <initial_data_placeholder>动态标签替换
    .replace(
      "<initial_data_placeholder>",
      `<script>window.__initial_data=${dataStr}</script>`
    );

  // 下面这种方式 不能够加载出来css,所以需要上面这种方式
  // return `<!DOCTYPE html>
  //             <html lang="en">
  //             <head>
  //             <meta charset="UTF-8">
  //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //             <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //             <title>Document</title>
  //             </head>
  //             <body>
  //             <div id='root'>${str}</div>
  //             </body>
  //             </html>`
};

const server = port => {
  // 3.实例化一个express server
  const app = express();
  // 4.用express的static方法设置一个静态目录，静态目录为dist
  app.use(express.static("dist"));
  // 5. 写一个路由
  app.get("/search", (req, res) => {
    // 8 在这种情况下，返回的是一个字符串 renderToString(SSR)
    // res.status(200).send(renderToString(SSR))
    // 8.1 实际上应该返回的是一个html页面，所以需要一个模板把他包装起来
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });

  // 监听端口
  app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });
};

// 6. 调用 server  设置端口
server(process.env.PORT || 4000);
