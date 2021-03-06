const withSass = require("@zeit/next-sass");
const withTypescript = require("@zeit/next-typescript");

module.exports = withTypescript(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[name]__[local]___[hash:base64:5]"
    }
  })
);
