module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],

        files: [
        'src/**/*.spec.js',
        ],

        preprocessors: {
        'src/**/*.spec.js': ['webpack'],
        },

        webpack: {
        module: {
            rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            }
            ]
        }
        },

        resolve: {
        extensions: ['.js', '.jsx'],
        },

        reporters: ['spec'],

        browsers: ['ChromeHeadless'],

        singleRun: true,
    });
};

