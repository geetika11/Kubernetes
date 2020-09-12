const { initTracer: initJaegerTracer } = require("jaeger-client");
let collectorURL = process.env.collectorEndpoint || '34.71.80.104';
module.exports.initTracer = serviceName => {
  const config = {
    serviceName: serviceName,
    sampler: {
      type: "const",
      param: 1,
    },
    reporter: {
      logSpans: true,
      collectorEndpoint: `http://${collectorURL}:14268/api/traces`
    },
  };
  const options = {
    logger: {
      info(msg) {
        console.log("INFORMATION ", msg);
      },
      error(msg) {
        console.log("ERROR", msg);
      },
    },
  };
  return initJaegerTracer(config, options);
};
