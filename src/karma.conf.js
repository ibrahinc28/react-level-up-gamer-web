module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],

        files: [
        'src/**/*.spec.js',  // Todas las pruebas dentro de src con extensión .spec.js
        ],

        preprocessors: {
        'src/**/*.spec.js': ['webpack'], // Usa webpack para procesar JSX
        },

        webpack: {
        module: {
            rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                },
            },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        },

        reporters: ['spec'], // Informe sencillo en consola

        browsers: ['ChromeHeadless'], // Ejecuta pruebas en Chrome sin interfaz

        singleRun: true, // Ejecutar pruebas y salir
    });
};
