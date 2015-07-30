/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var SingleObj  = require('./methods.js').SingleObj;
var PluralObj  = require('./methods.js').PluralObj;
var _        = require('lodash');


var Account = function(config) {

  var opts = _.merge({}, config);
  if (opts && opts.accountKey) {
    SingleObj.call(this, opts, ['detail', 'update', 'resetKey', 'changePw', 'setPw']);
    this.invitation = classBuilder(Invitation, opts);
    this.instance = classBuilder(Instance, opts);
  } else {
    PluralObj.call(this, opts, ['login', 'register', 'resendEmail', 'resetPw', 'confirmResetPw', 'activate']);
  }

  return this;

};

Account.prototype.type = 'account';

var Admin = function Admin(config, id) {

  var opts = _.merge({}, config);

  if (id) {
    opts.adminId = id;
    SingleObj.call(this, opts);
  } else {
    PluralObj.call(this, opts, ['list', 'detail', 'update', 'delete']);
  }
  return this;
};

Admin.prototype.constructor = Admin;
Admin.prototype.type = 'admin';

var ApiKey = function ApiKey(config, id) {

  var opts = _.merge({}, config);

  if (id) {
    opts.apikeyId = id;
    SingleObj.call(this, opts, ['detail', 'resetKey', 'delete']);
  } else {
    PluralObj.call(this, opts, ['list', 'detail', 'add', 'resetKey', 'delete']);
  }
  return this;
};

ApiKey.prototype.constructor = ApiKey;
ApiKey.prototype.type = 'apikey';

var Channel = function Channel(config, id) {

  var singleFunc, pluralFunc;
  var opts = _.merge({}, config);

  if (opts && opts.apiKey) {
    singleFunc = ['detail', 'history', 'publish', 'poll'];
    pluralFunc = ['list', 'detail', 'history', 'publish', 'poll'];
  }

  if (id) {
    opts.channelId = id;
    SingleObj.call(this, opts, singleFunc);
  } else {
    PluralObj.call(this, opts, pluralFunc);
  }

  return this;
};

Channel.prototype.constructor = Channel;
Channel.prototype.type = 'channel';

var Class = function Class(config, id) {

  var singleFunc, pluralFunc;
  var opts = _.merge({}, config);

  if (opts && opts.apiKey) {
    singleFunc = ['detail'];
    pluralFunc = ['list', 'detail'];
  }

  if (id) {
    opts.className = id;
    SingleObj.call(this, opts, singleFunc);
    this.dataobject = classBuilder(DataObject, opts);

  } else {
    PluralObj.call(this, opts, pluralFunc);
  }

  return this;
};

Class.prototype.constructor = Class;
Class.prototype.type = 'class';

// TODO Add runtimes() to codebox;

var CodeBox = function CodeBox(config, id) {
  var opts = _.merge({}, config);

  if (id) {
    opts.codeboxId = id;
    SingleObj.call(this, opts, ['detail', 'update', 'delete', 'run', 'traces', 'trace', 'runtimes']);
  } else {
    PluralObj.call(this, opts, ['list', 'detail', 'add', 'update', 'delete', 'runtimes']);
  }
  return this;
};

CodeBox.prototype.constructor = CodeBox;
CodeBox.prototype.type = 'codebox';

var DataObject = function DataObject(config, id) {

  var singleFunc, pluralFunc;
  var opts = _.merge({}, config);

  if (id) {
    opts.dataobjectId = id;
    SingleObj.call(this, opts);
  } else {
    PluralObj.call(this, opts);
  }

  return this;
};

DataObject.prototype.constructor = DataObject;
DataObject.prototype.type = 'dataobject';

//TODO Remove the single constructors when INSTANCE/USER scoped
var Instance = function(config, id) {

  var self = this;
  var singleFunc, pluralFunc;

  var opts = _.merge({}, config);

  if (opts && opts.apiKey) {
    singleFunc = ['detail'];
    pluralFunc = ['list', 'detail'];
  }

  if (id || opts.instance) {

    opts.instance = id || opts.instance;
    SingleObj.call(this, opts, singleFunc);
    var objArr;

    // TODO evaluate arrays to ensure you have the right classes and constructors.
    if (opts && opts.accountKey) {
      objArr = [Admin, ApiKey, Channel, Class, CodeBox, Invitation, Group, Schedule, Trigger, WebHook, User];
    } else {
      objArr = [Channel, Class, Group, User];
    }

    _.forEach(objArr, function(Obj) {
      var name = Obj.toString().match(/^function\s*([^\s(]+)/)[1];
      self[name.toLowerCase()] = classBuilder(Obj, opts);
    });

  } else {
    PluralObj.call(this, opts, pluralFunc);
  }

  return this;
};

Instance.prototype.constructor = Instance;
Instance.prototype.type = 'instance';

var Group = function Group(config, id) {

  var singleFunc, pluralFunc;
  var opts = _.merge({}, config);

  if (opts && opts.apiKey) {
    singleFunc = ['detail'];
    pluralFunc = ['list', 'detail'];
  }

  if (opts && opts.userId) {
    pluralFunc = ['list', 'detail', 'add', 'delete'];
  }

  if (id) {
    opts.groupId = id;
    SingleObj.call(this, opts, singleFunc);
    if (opts.accountKey) {
      this.user = new User(opts);
    }
  } else {
    PluralObj.call(this, opts, pluralFunc);
  }

  return this;
};

Group.prototype.constructor = Group;
Group.prototype.type = 'group';

var Invitation = function Invitation(config, id) {

  var singleFunc = ['detail', 'delete'];
  var pluralFunc;
  var opts = _.merge({}, config);

  if (opts && opts.instance) {
    pluralFunc = ['list', 'detail', 'sendEmail', 'resendEmail', 'delete'];
  } else {
    pluralFunc = ['list', 'detail', 'accept', 'delete'];
  }

  if (id) {
    opts.inviteId = id;
    SingleObj.call(this, opts, singleFunc);
  } else {
    PluralObj.call(this, opts, pluralFunc);
  }

  return this;
};

Invitation.prototype.constructor = Invitation;
Invitation.prototype.type = 'invitation';

var Schedule = function Schedule(config, id) {
  var opts = _.merge({}, config);

  if (id) {
    opts.scheduleId = id;
    SingleObj.call(this, opts, ['detail', 'update', 'delete', 'traces', 'trace']);
  } else {
    PluralObj.call(this, opts);
  }
  return this;
};

Schedule.prototype.constructor = Schedule;
Schedule.prototype.type = 'schedule';

var Trigger = function Trigger(config, id) {
  var opts = _.merge({}, config);

  if (id) {
    opts.triggerId = id;
    SingleObj.call(this, opts, ['detail', 'update', 'delete', 'traces', 'trace']);
  } else {
    PluralObj.call(this, opts);
  }
  return this;
};

Trigger.prototype.constructor = Trigger;
Trigger.prototype.type = 'trigger';

var WebHook = function WebHook(config, id) {
  var opts = _.merge({}, config);

  if (id) {
    opts.webhookId = id;
    SingleObj.call(this, opts, ['detail', 'update', 'delete', 'run', 'traces', 'trace']);
  } else {
    PluralObj.call(this, opts);
  }
  return this;
};

WebHook.prototype.constructor = WebHook;
WebHook.prototype.type = 'webhook';

var User = function User(config, id) {

  var singleFunc, pluralFunc;
  var opts = _.merge({}, config);

  pluralFunc = ['list', 'add', 'detail', 'update', 'delete', 'resetKey'];

  if (opts && opts.apiKey) {
    if (opts.userKey) {
      pluralFunc = ['add', 'detail', 'update'];
    } else {
      pluralFunc = ['add', 'login'];
    }
  }

  if (opts && opts.groupId) {
    pluralFunc = ['list', 'detail', 'add', 'delete'];
  }

  if (id) {
    opts.userId = id;
    SingleObj.call(this, opts, ['detail', 'update', 'resetKey', 'delete']);
    this.group = new Group(opts);
  } else {
    PluralObj.call(this, opts, pluralFunc);
  }

  return this;
};

User.prototype.constructor = User;
User.prototype.type = 'user';

var classBuilder = function classBuilder(ClassName, config) {
  return (
    function(id) { return new ClassName(config, id); }
  );
};

var objects = {
  Account: Account,
  Channel: Channel,
  Class: Class,
  classBuilder: classBuilder,
  DataObject: DataObject,
  Group: Group,
  Instance: Instance,
  Invitation: Invitation,
  User: User
};

module.exports = objects;
