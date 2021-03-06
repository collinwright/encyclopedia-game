const express = require("express");
const proxy = require("http-proxy-middleware");
const Bundler = require("parcel-bundler");

const LOG_LEVEL = process.env.LOG_LEVEL || "info";
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const WIKIMEDIA_ROOT_URL =
  process.env.WIKIMEDIA_ROOT_URL || "https://en.m.wikipedia.org";

const parcel = new Bundler("src/index.html");
const application = express();

["/wiki/", "/w/", "/api/", "/static/"].forEach(stub => {
  application.use(
    stub,
    proxy({
      changeOrigin: true,
      logLevel: LOG_LEVEL,
      target: WIKIMEDIA_ROOT_URL + stub,
      pathRewrite: { [`^${stub}`]: "" }
    })
  );
});

console.log(`Starting development server at http://localhost:${PORT}`);
application.use(parcel.middleware());
application.listen(PORT);
