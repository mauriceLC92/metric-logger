const moment = require('moment');
const {
    calculateValuesInLastHour,
    postRequestSchema,
    stringify,
    generateNotFoundError,
} = require('./helpers');

async function routes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        return { hello: 'world' }
    })
    /**
     * If you cannot find he key - send a not found error
     */
    fastify.get(
        '/metric/:key/sum',
        { schema: { params: { key: true } } },
        async (request, reply) => {
            const { redis } = fastify;
            const requestTime = moment().clone();
            const rawMetrics = await redis.lrange(
                `${request.params.key}`,
                0,
                -1
            );
            if(rawMetrics.length === 0) {
                return generateNotFoundError(reply, request.params.key)
            }
            const parsedMetrics = rawMetrics.map((metric) =>
                JSON.parse(metric)
            );
            const totalInLastHour = calculateValuesInLastHour(
                requestTime,
                parsedMetrics
            );
            return reply.send({
                value: totalInLastHour
            });
        }
    );

    fastify.post(
        '/metric/:key',
        { schema: postRequestSchema },
        async (request, reply) => {
            const { redis } = fastify;
            await redis.rpush(
                `${request.params.key}`,
                stringify({
                    date: moment.utc(),
                    value: request.body.value,
                })
            );
            reply.send({});
        }
    );
}

module.exports = routes;
