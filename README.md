## Metric Logger

The following API allows for the logging of metrics. It provides and endpoint to create a metric based on key and value.
The summation of the metric reported for the last hour is available also through an endpoint as outlined below.

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
