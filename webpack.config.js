let webpack = require('vortex-api/bin/webpack').default;

const config = webpack('game-projectwingman', __dirname, 4);

// webpack 4 defaults to MD4 for module hashing; OpenSSL 3 (Node 17+)
// rejects MD4 outright (ERR_OSSL_EVP_UNSUPPORTED). sha256 is universally
// available, so the build works on modern Node without legacy flags.
config.output = { ...config.output, hashFunction: 'sha256' };

// The source-map plugin hashes filenames with raw md4 regardless of
// hashFunction, which keeps the build broken on modern Node. The extension
// doesn't need source maps, so switch them off.
config.devtool = false;

module.exports = config;
