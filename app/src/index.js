const express = require('express');
const client = require('prom-client');
const winston = require('winston');

//Logger - ELK toma los logs con filebeat/logstach
 const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [50, 100, 200, 300, 500, 1000]
});

app.get('/', (req, res) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.send('Hello World!');
    end({ method: req.method, route: '/', code: res.statusCode });
    logger.info('request_home', { route: '/', code: res.statusCode });
})

app.get('/api/time', (req, res) => {
const end = httpRequestDurationMicroseconds.startTimer();
res.json({ time: new Date().toISOString() });
end({ method: req.method, route: '/api/time', code: res.statusCode });
logger.info('request_time', { route: '/api/time', code: res.statusCode });
});


// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
res.set('Content-Type', client.register.contentType);
res.end(await client.register.metrics());
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
logger.info(`ms-sample listening on ${PORT}`);
});