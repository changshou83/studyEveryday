const createDevProxy = (proxyOption, proxyTargets) => {
  return function (proxys) {
    const proxyObj = {};
    Object.entries(proxys).forEach(([name, option]) => {
      const pathRewrite = Object.assign(
        {},
        proxyOption.pathRewrite,
        option.pathRewrite
      );
      Object.entries(pathRewrite).forEach(([k, v]) => {
        if (/%proxyName%/.test(k)) {
          pathRewrite[`^${name}`] = v;
          delete pathRewrite[k];
        } else {
          pathRewrite[k] = v;
        }
      });

      proxyObj[name] = {
        ...proxyOption,
        ...option,
        pathRewrite,
        target:
          proxyTargets[option.target || proxyOption.target] || option.target,
      };
    });
    return proxyObj;
  };
};

const createDemoProxy = createDevProxy(
  {
    changeOrigin: true,
    pathRewrite: { "^/%proxyName%": "" },
    target: "dev",
  },
  {
    dev: "http://127.0.0.1:3001",
    prod: "http://10.6.9.32:1100",
  }
);

const demoProxy = createDemoProxy({
  "/v1": {},
  "/socket": { target: "http://10.6.55.32:9012", ws: true },
});
// {
//   "/v1": {
//     changeOrigin: true,
//     pathRewrite: { "^/v1": "" },
//     target: "http://127.0.0.1:3001",
//   },
//   "/socket": {
//     changeOrigin: true,
//     pathRewrite: { "^/socket": "" },
//     target: "http://10.6.55.32:9012",
//     ws: true,
//   },
// };
