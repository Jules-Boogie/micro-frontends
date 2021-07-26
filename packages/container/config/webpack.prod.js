const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    // javascript files are minified and optimized
    mode:'production',
    output:{
        filename:'[name].[contenthash].js' //template for naming files and hash the contents of the files
    },
    plugins:[
        new ModuleFederationPlugin({
            name:'container',
            remotes:{
                marketing:`marketing@${domain}/marketing/remoteEntry.js`
            },
            shared:packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig,prodConfig);