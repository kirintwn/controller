import 'source-map-support/register';
import path from 'path';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-body';
import host from 'koa-static';
import mongoose from 'mongoose';
import config from './config/config';
import router from './routes/root';
import { logger, koaErrorCatcher, koaErrorLogger } from './logger';

const { PORT = 3000 } = process.env;
const NODE_ENV = config.get('NODE_ENV');
const MONGOOSE_OPTS = config.get('MONGOOSE_OPTS');
const MONGODB_URI = config.get('MONGODB_URI');
const distPath = path.resolve(__dirname, './../client');
const isTest = !!module.parent;
const isProd = NODE_ENV === 'production';

const server = new Koa();

server.proxy = true;
server.use(koaErrorCatcher);
server.on('error', koaErrorLogger);

server.use(bodyParser({ multipart: true }));

if (!isTest) {
  mongoose.connect(MONGODB_URI, MONGOOSE_OPTS, (err) => {
    if (err) logger.error(`Mongoose Error: ${err}`);
    else logger.info('Connected with Mongoose.');
  });
  server.use(koaLogger());
  server.listen(PORT, () => {
    logger.info(`Server Listens on port: ${PORT}`);
  });
}

if (!isProd) {
  // do not use koa to serve static files when prod.
  logger.info(`Files in ${distPath} is being served.`);
  server.use(
    host(distPath, {
      extensions: ['html'],
    }),
  );
}
server.use(router.routes());
server.use(router.allowedMethods());

export default server;
