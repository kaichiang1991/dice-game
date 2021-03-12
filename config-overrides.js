const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = function override(config, env){

    config.plugins = [ ...config.plugins,
        new ImageMinimizerPlugin({
            minimizerOptions: {
              plugins: [
                ['optipng', { optimizationLevel: 7 }]
              ]
            }
        })
    ]

    return config
}