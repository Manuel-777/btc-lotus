const eslintConfig = require("./.eslintrc");

// https://www.npmjs.com/package/@craco/craco
module.exports = {
  webpack: {
    configure: {
      target: "web",
    },
  },
  eslint: {
    configure: eslintConfig,
  },
};
