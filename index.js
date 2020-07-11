const fastify = require('fastify')();
require('dotenv').config();

fastify.register(require('./routes'));
fastify.register(require('fastify-redis'), {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

const start = async () => {
    try {
        await fastify.listen(8080);
    } catch (err) {
        console.log('err', JSON.stringify(err, null, 4));
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
