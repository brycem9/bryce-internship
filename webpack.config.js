const webpack = require('webpack');

module.exports = {
    // other configuration options...

    plugins: [
        // other plugins,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],

    // other configuration options...
}