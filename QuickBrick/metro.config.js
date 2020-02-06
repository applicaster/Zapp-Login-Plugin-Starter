const { resolve } = require('path');
const R = require('ramda');
const fs = require('fs');

const packages = fs.readdirSync('./plugins');

const buildExtraNodeModules = (extraNodeModules, packageName) => R.assoc(
  `@applicaster/${packageName}`,
  resolve(__dirname, './plugins/', packageName),
  extraNodeModules
);

const resolveLocalPackages = (packageName) => resolve(__dirname, `./plugins/${packageName}`);

const config = {
  resolver: {
    extraNodeModules: {
      'react-native': resolve(__dirname, './node_modules/react-native'),
      ...R.reduce(buildExtraNodeModules, {}, packages)
    }
  },
  watchFolders: R.compose(
    R.append(resolve(__dirname)),
    R.map(resolveLocalPackages)
  )(packages)
};

module.exports = config;
