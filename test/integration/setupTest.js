import mlog from 'mocha-logger';
import Promise from 'bluebird';
import Syncano from '../../src/syncano';
import {suffix, credentials} from './utils';

before(function() {
  this.timeout(20000);

  mlog.pending('Creating account for test run...');

  if (credentials.isAuthenticated()) {
    mlog.success('Test run already authenticated');
    return;
  }

  return Syncano(credentials)
    .Account
    .register({
      email: `syncano.bot+${suffix.value}@syncano.com`,
      password: suffix.value,
      first_name: 'bot',
      last_name: 'js'
    }).then((user) => {
      mlog.success('New account created!');
      mlog.success('Email:', user.email);
      mlog.success('Account key:', user.account_key);

      credentials.setCredentials({
        user,
        accountKey: user.account_key
      });
    });
});

after(function() {
  if (!credentials.isAuthenticated()) {
    return;
  }

  mlog.pending('Removing instances...');
  const Instance = Syncano(credentials).Instance;

  return Instance.please().list().then((instances) => {
    return Promise.mapSeries(instances, (instance) => Instance.please().delete({name: instance.name}));
  }).then((instances) => {
    mlog.success(`${instances.length} instances removed.`);
  });
});