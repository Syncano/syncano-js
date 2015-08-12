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

    if (opts && opts.accountKey) {
      this.admin = classBuilder(Admin, opts);
      this.apikey = classBuilder(ApiKey, opts);
      this.channel = classBuilder(Channel, opts);
      this.class = classBuilder(Class, opts);
      this.codebox = classBuilder(CodeBox, opts);
      this.invitation = classBuilder(Invitation, opts);
      this.group = classBuilder(Group, opts);
      this.schedule = classBuilder(Schedule, opts);
      this.trigger = classBuilder(Trigger, opts);
      this.webhook = classBuilder(WebHook, opts);
      this.user = classBuilder(User, opts);
    } else {
      this.channel = classBuilder(Channel, opts);
      this.class = classBuilder(Class, opts);
      this.group = classBuilder(Group, opts);
      this.user = classBuilder(User, opts);
    }

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


  if (id) {
    opts.groupId = id;
    if (opts && opts.userId) {
      singleFunc = ['detail', 'delete'];
    }
    SingleObj.call(this, opts, singleFunc);
    if (opts.accountKey && !opts.userId) {
      this.user = classBuilder(User, opts);
    }
  } else {
    if (opts && opts.userId) {
      pluralFunc = ['list', 'detail', 'add', 'delete'];
    }
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
  singleFunc = ['detail', 'update', 'resetKey', 'delete'];

  if (opts && opts.apiKey) {
    if (opts.userKey) {
      pluralFunc = ['add', 'detail', 'update'];
    } else {
      pluralFunc = ['add', 'login'];
    }
  }

  if (id) {
    opts.userId = id;
    if (opts && opts.groupId) {
      singleFunc = ['detail', 'delete'];
    }
    SingleObj.call(this, opts, singleFunc);
    if (opts.accountKey && !opts.groupId) {
      this.group = classBuilder(Group, opts);
    }
  } else {
    if (opts && opts.groupId) {
      pluralFunc = ['list', 'detail', 'add', 'delete'];
    }
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
