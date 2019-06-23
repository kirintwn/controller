import path from 'path';
import nconf from 'nconf';
import * as evilDns from 'evil-dns';
import { logger } from '../logger';

class Config {
  env: string;

  constructor() {
    nconf.argv({ parseValues: true });
    nconf.env({ parseValues: true, whitelist: ['NODE_ENV', 'STAGING'] });
    this.env = nconf.get('NODE_ENV') || 'dev';
    if (this.env === 'production' && !!this.get('STAGING')) {
      this.env = 'staging';
    }

    nconf.file(
      this.env,
      path.join(__dirname, `${this.env.toLowerCase()}.json`),
    );
    nconf.file('default', path.join(__dirname, 'default.json'));

    logger.info('USING THE FOLLOWING CONFIG:');
    logger.info(JSON.stringify(nconf.get(), null, 2));
    logger.info('-------------------------------------------------');

    this.setCustomDNS();
  }

  get(key: string) {
    return nconf.get(key);
  }

  setCustomDNS() {
    const hosts = this.get('HOSTS');
    if (hosts) {
      for (let i = 0; i < hosts.length; i += 1) {
        evilDns.add(hosts[i].name, hosts[i].addr);
      }
    }
  }
}

export default new Config();
