module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    alias: {
                        '@': './',
                        '@components': './src/components',
                        '@assets': './assets',
                    },
                },
            ],
        ],
    };
};
