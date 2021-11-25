module.exports = {
    plugins: [
        {
            plugin: require('craco-alias'),
            options: {
                source: 'tsconfig',
                tsConfigPath: './tsconfig.extend.json',
            }
        }
    ]
}