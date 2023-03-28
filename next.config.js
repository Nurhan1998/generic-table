/**
 * @type {import('next').NextConfig}
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')([
  '@babel/preset-react',
]);

const env = {
  API_BASE_URL: process.env.API_BASE_URL
};

module.exports = withTM({ env });
