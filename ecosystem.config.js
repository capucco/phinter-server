module.exports = {
    apps: [
        {
            name: 'nodejs-server',
            script: 'node index.js',
            cwd: 'build/nodejs',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'staging',
            }
        }
    ]
};
