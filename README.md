## Metric Logger

The following API allows for the logging of metrics. It provides and endpoint to create a metric based on key and value.
The summation of the metric reported for the last hour is available also through an endpoint as outlined below.

### Motivation
[Fastify](https://www.fastify.io/) was chosen as the code has been optimized for performance. Fastify is light weight and highly performant. One of the fastest frameworks in the NodeJS ecosystem.
See [benchmarks](https://www.fastify.io/benchmarks/) for a few comparisons of frameworks.
[Fast-json-stringify](https://github.com/fastify/fast-json-stringify) was used as it is faster than a normal JSON.stringify. It is excellent in situations when you already know the structure of your schema.

The API code has been seperated into isolated modules, keeping in the spirit of NodeJS. I have kept it simple and clean. [Redis](https://redis.io/) has been used to perist the data. I chose this over file storage purely as it is more real world than using the file storage when in absence of a database.

### API

* **URL**
<_/metric/:key_>

* **Method:**
`POST`

*  **URL Params**

 **Required:**
    `key=[string]`
 **Example:**
 <_/metric/active_visitors_>

* **Body**

 **Required:**
    `value=[integer]`
 ```
 {
	  "value": 10
 }
 ```

* **URL**
<_/metric/:key/sum_>

* **Method:**
`GET`

*  **URL Params**

 **Required:**
    `key=[string]`
 **Example:**
 <_/metric/active_visitors/sum_>

* **Example response**

 ```
 33
 ```
