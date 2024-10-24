// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = {
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs', 'glb'],
    assetExts: ['glb', 'gltf', 'png', 'jpg', 'mtl', 'obj', 'ttf']
  }
};

module.exports = config;
