const moment = require('moment');
const fastJson = require('fast-json-stringify');

exports.calculateValuesInLastHour = (requestTime, parsedMetrics) => {
    let totalInLastHour = 0;
    const timeOneHourAgo = moment.utc(requestTime).subtract(1, 'hour');
    parsedMetrics.forEach((metric) => {
        timeOneHourAgo.isBefore(moment.utc(metric.date))
            ? (totalInLastHour += metric.value)
            : 0;
    });
    return totalInLastHour;
};

exports.stringify = fastJson({
    title: 'Metric values',
    type: 'object',
    properties: {
        date: {
            type: 'string',
            format: 'date-time',
        },
        value: {
            type: 'integer',
        },
    },
});

const bodyJsonSchema = {
    type: 'object',
    required: ['value'],
    properties: {
        value: { type: 'integer' },
    },
};

const paramsJsonSchema = {
    type: 'object',
    properties: {
        key: true,
    },
};

exports.postRequestSchema = {
    body: bodyJsonSchema,
    params: paramsJsonSchema,
};
