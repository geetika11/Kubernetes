const { Router } = require('express')
const router = Router();
let ordersData=require('../data/orders.json')
const { initTracer } = require("../trace/tracing");
const serviceName="OrdersService"
const tracer = initTracer(serviceName);
const ordersinformation = "OrdersService Info"
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing');

router.get('/orders/:id', async (request, response) => {

    try 
    {
        let id = parseInt(request.params.id);
        const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, request.headers)
        const span = tracer.startSpan('http_GetOrdersByUserID', {
            childOf: parentSpanContext,
            tags: {
                [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER
            }
        });

        
        span.setTag("TAG:", ordersinformation);
        const infoStr = `This is, ${ordersinformation}!`;
        span.log({
          event: "JSON-format",
          value: infoStr,
        });
        
        span.log({ event: "Orders information:" });
        span.finish();

        console.log("order Id :"+id);
        response.status(200).send(ordersData);

    }

    catch (error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }

});

module.exports = router;