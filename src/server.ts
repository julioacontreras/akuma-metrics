import {printStartService} from 'akuma-microservice-framework/lib/infrastructure/display';
import {Metric} from 'akuma-microservice-framework/lib/adapters/action-protocol/metrics/metric';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

export interface Config {
  port: string;
}

export const initializeMetrics = (
  config: Config,
  metric: Metric
) => {
  connect(config, metric);
};

const connect = (
  config: Config,
  metric: Metric
) => {
  const server = startServer(metric);
  server.listen(config.port, () => {
    printStartService('Server metrics on port', String(config.port));
  });
};

function startServer(metric: Metric) {
  const server = express();
  server.use(cors()); // Enable to crosssites
  server.use(bodyParser.urlencoded({extended: false}));
  server.use(bodyParser.json());
  server.all('/metrics', async (_:any, res: any) => {
    res.set('Content-Type', metric.metricsContentType);
    res.end(await metric.getMetrics());    
  });
  return server;
}
