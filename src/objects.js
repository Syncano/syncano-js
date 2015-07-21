/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var SingleObj  = require('./core.js').SingleObj;
var PluralObj  = require('./core.js').PluralObj;
var _        = require('lodash');


var Account = function(config) {

  var opts = _.merge({}, config);

  if (opts && opts.accountKey) {
    SingleObj.call(this, opts, ['detail', 'update', 'resetKey', 'changePw', 'setPw']);
  } else {
    PluralObj.call(this, {}, ['login', 'register', 'resendEmail', 'resetPw', 'confirmResetPw', 'activate']);
  }

  return this;

};

Account.prototype.constructor = Account;
Account.prototype.type = 'account';

var Admin = function Admin(config, id) {

  var opts = _.merge({}, config);

  if (id) {
    opts.id = id;
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
    opts.id = id;
    SingleObj.call(this, opts, ['detail', 'resetKey', 'delete']);
  } else {
    PluralObj.call(this, opts, ['list', 'detail', 'add', 'resetKey', 'delete']);
  }
  return this;
};

ApiKey.prototype.constructor = ApiKey;
ApiKey.prototype.type = 'apiKey';

var Channel = function Channel(config, id) {

  var singleFunc, pluralFunc;
  var opts = _.merge({}, config);

  if (opts && opts.apiKey) {
    singleFunc = ['detail', 'history', 'publish', 'poll'];
    pluralFunc = ['list', 'detail', 'detail', 'history', 'publish', 'poll'];
  }

  if (id) {
    opts.id = id;
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
    opts.id = id;
    SingleObj.call(this, opts, singleFunc);
    this.dataObjects = new DataObject(opts);
    this.DataObject = classBuilder(DataObject, opts);

  } else {
    PluralObj.call(this, opts, pluralFunc);
  }

  return this;
};

Class.prototype.constructor = Class;
Class.prototype.type = 'class';

var CodeBox = function CodeBox(config, id) {
  var opts = _.merge({}, config);

  if (id) {
    opts.id = id;

    SingleObj.call(this, opts, ['detail', 'update', 'delete', 'run', 'traces', 'trace']);
  } else {
    PluralObj.call(this, opts);
  }
  return this;
};

CodeBox.prototype.constructor = CodeBox;
CodeBox.prototype.type = 'codeBox';

var DataObject = function DataObject(config, id) {

  var singleFunc, pluralFunc;
  var opts = _.merge({}, config);

  if (config && config.apiKey) {
    singleFunc = ['detail'];
    pluralFunc = ['list', 'detail'];
  }

  if (id) {
    opts.id = id;
    SingleObj.call(this, opts);
  } else {
    PluralObj.call(this, opts);
  }

  return this;
};

DataObject.prototype.constructor = DataObject;
DataObject.prototype.type = 'dataObject';

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
      objArr = [Admin, ApiKey, Channel, Class, CodeBox, DataObject, Invitation, Group, Schedule, Trigger, WebHook, User];
    } else {
      objArr = [Channel, Class, DataObject, Group, User];
    }

    _.forEach(objArr, function(obj) {
      var name = obj.toString().match(/^function\s*([^\s(]+)/)[1];
      self[name.toLowerCase()] = new obj(opts);
    });

    _.forEach(objArr, function(obj) {
      var name = obj.toString().match(/^function\s*([^\s(]+)/)[1];
      self[name] = classBuilder(obj, opts);
    });


  } else {

    PluralObj.call(this, opts, pluralFunc);
  }

  return this;

}

Instance.prototype.constructor = Instance;
Instance.prototype.type = 'instance';

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
    opts.id = id;
    SingleObj.call(this, opts, singleFunc);
  } else {
    PluralObj.call(this, opts, pluralFunc);
  }

  return this;
};

Invitation.prototype.constructor = Invitation;
Invitation.prototype.type = 'invitation';

var Group = function Group(config, id) {

  var singleFunc, pluralFunc;
  var opts = _.merge({}, config);

  if (opts && opts.apiKey) {
    singleFunc = ['detail'];
    pluralFunc = ['list', 'detail'];
  }

  if (id) {
    opts.id = id;
    SingleObj.call(this, opts, singleFunc);
    //add methods for user/group membership

  } else {
    PluralObj.call(this, opts, pluralFunc);
  }

  return this;
};

Group.prototype.constructor = Group;
Group.prototype.type = 'group';

var Schedule = function Schedule(config, id) {
  var opts = _.merge({}, config);

  if (id) {
    opts.id = id;
    SingleObj.call(this, opts);
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
    opts.id = id;
    SingleObj.call(this, opts);
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
    opts.id = id;
    SingleObj.call(this, opts);
  } else {
    PluralObj.call(this, opts);
  }
  return this;
};

WebHook.prototype.constructor = WebHook;
WebHook.prototype.type = 'webHook';

var User = function User(config, id) {

  var singleFunc, pluralFunc;
  var opts = _.merge({}, config);

  if (opts && opts.userKey) {
    pluralFunc = ['add', 'detail', 'update', 'resetKey'];
  }

  if (opts && opts.apiKey && !opts.userKey) {
    pluralFunc = ['add', 'login'];
  }

  if (id) {
    opts.id = id;

    SingleObj.call(this, opts, singleFunc);
  } else {
    PluralObj.call(this, opts, pluralFunc);
  }

  return this;
};

User.prototype.constructor = User;
User.prototype.type = 'user';

var classBuilder = function classBuilder(className, config) {
  return(
    function(id) { return new className(config, id)}
  )
};

var Objects = {
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

module.exports = Objects;
