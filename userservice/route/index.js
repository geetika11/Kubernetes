const { Router } = require('express')
const router = Router();
const {User} = require('../db/dbindex')

const { initTracer } = require("../trace/tracing");
const serviceName="UserService"
const tracer = initTracer(serviceName);
const userinformation = "UserService Info"

const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing');

router.get('/user/:id', async (request, response) => {

    try
    {
        let id = parseInt(request.params.id);

        const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, request.headers)
        const span = tracer.startSpan('http_GetUserByID', {
            childOf: parentSpanContext,
            tags: {[Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER}
        });

        
        span.setTag("TAG:", userinformation);
        const infoStr = `This is, ${userinformation}!`;
        span.log({
          event: "JSON-format",
          value: infoStr,
        });
       
        span.log({ event: "User information" });
        span.finish();

        
        
        User.findByPk(id).then(function (user) {
            if (!user) {
                return response.sendStatus(404);
            }
            return response.status(200).send({
                name : user.name,
                age : user.age,
                email : user.email
            });
        });

    } 
    catch (error) 
    {
        console.log(error);
        response.status(500).send("Internal Server error.");
    }

});

module.exports = router;
