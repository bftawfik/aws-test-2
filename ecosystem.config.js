module.exports = {
    apps: [
        {
            name: 'estatebook.com',
            script: './start.js',
            env: {
                HOST: 'localhost',
                PORT: 5000
            }
        }
    ],
}
