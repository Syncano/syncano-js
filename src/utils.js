import stampit from 'stampit';
import EventEmitter from './eventemitter';

/**
 * Simple wrapper around `EventEmitter`
 * @constructor
 * @type {EventEmittable}

 * @example {@lang javascript}
 * var EmittableModel = stampit().compose(EventEmittable);
 */
export const EventEmittable = stampit.convertConstructor(EventEmitter);


/**
 * Used as a manager for {@link Syncano} base object. **Not** meant to be used directly.
 * @constructor
 * @type {ConfigMixin}

 * @property {Syncano} _config private attribute which holds {@link Syncano} object

 * @example {@lang javascript}
 * var MyStamp = stampit().compose(ConfigMixin);
 */
export const ConfigMixin = stampit({
  methods: {
    /**
    * Gets default properties.

    * @memberOf ConfigMixin
    * @instance
    * @returns {Object}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(ConfigMixin);
    * var config = MyStamp().getDefaultProperties();

    */
    getDefaultProperties() {
      return this._config.defaults;
    },

    /**
    * Sets config.

    * @memberOf ConfigMixin
    * @instance

    * @param {Syncano} config instance of {@link Syncano} object
    * @returns {ConfigMixin}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(ConfigMixin);
    * var newObject = MyStamp().setConfig({});

    */
    setConfig(config) {
      this._config = config;
      return this;
    },

    /**
    * Gets config.

    * @memberOf ConfigMixin
    * @instance
    * @returns {Syncano}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(ConfigMixin);
    * var config = MyStamp().getConfig();

    */
    getConfig() {
      return this._config;
    }
  },

  static: {

    getDefaultProperties() {
      return this.fixed.refs._config.defaults;
    },

    /**
    * Sets config and returns new {@link https://github.com/stampit-org/stampit|stampit} definition.

    * @memberOf ConfigMixin
    * @static

    * @param {Syncano} config instance of {@link Syncano} object
    * @returns {stampit}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(ConfigMixin).setConfig({});

    */
    setConfig(config) {
      return this.refs({_config: config});
    },

    /**
    * Gets config from {@link https://github.com/stampit-org/stampit|stampit} definition.

    * @memberOf ConfigMixin
    * @static
    * @returns {Syncano}

    * @example {@lang javascript}
    * var config = stampit().compose(ConfigMixin).getConfig();

    */
    getConfig() {
      return this.fixed.refs._config;
    }
  }
});

/**
 * Used as a manager for {@link Meta} object. **Not** meant to be used directly.
 * @constructor
 * @type {MetaMixin}

 * @property {Object} _meta private attribute which holds {@link Meta} object

 * @example {@lang javascript}
 * var MyStamp = stampit().compose(MetaMixin);
 */
export const MetaMixin = stampit({
  methods: {

    /**
    * Sets meta.

    * @memberOf MetaMixin
    * @instance

    * @param {Meta} meta instance of {@link Meta} object
    * @returns {MetaMixin}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(MetaMixin);
    * var newObject = MyStamp().setMeta({});

    */
    setMeta(meta) {
      this._meta = meta;
      return this;
    },

    /**
    * Gets meta.

    * @memberOf MetaMixin
    * @instance
    * @returns {Meta}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(MetaMixin);
    * var meta = MyStamp().getMeta();

    */
    getMeta() {
      return this._meta;
    }
  },

  static: {

    /**
    * Sets meta and returns new {@link https://github.com/stampit-org/stampit|stampit} definition.

    * @memberOf MetaMixin
    * @static

    * @param {Meta} meta instance of {@link Meta} object
    * @returns {stampit}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(MetaMixin).setMeta({});

    */
    setMeta(meta) {
      return this.refs({_meta: meta});
    },

    /**
    * Gets meta from {@link https://github.com/stampit-org/stampit|stampit} definition.

    * @memberOf MetaMixin
    * @static
    * @returns {Meta}

    * @example {@lang javascript}
    * var meta = stampit().compose(MetaMixin).getMeta();

    */
    getMeta() {
      return this.fixed.refs._meta;
    }
  }
});

/**
 * Used as a manager for {@link http://validatejs.org/#constraints|Constraints} object (validation). **Not** meant to be used directly.
 * @constructor
 * @type {ConstraintsMixin}

 * @property {Object} _constraints private attribute which holds constraints object

 * @example {@lang javascript}
 * var MyStamp = stampit().compose(ConstraintsMixin);
 */
export const ConstraintsMixin = stampit({
  methods: {

    /**
    * Sets constraints used for validation.

    * @memberOf ConstraintsMixin
    * @instance

    * @param {Object} constraints plain JavaScript object
    * @returns {ConstraintsMixin}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(ConstraintsMixin);
    * var newObject = MyStamp().setConstraints({});

    */
    setConstraints(constraints) {
      this._constraints = constraints;
      return this;
    },

    /**
    * Gets constraints from object instance.

    * @memberOf ConstraintsMixin
    * @instance
    * @returns {Object}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(ConstraintsMixinn);
    * var constraints = MyStamp().getConstraints();

    */
    getConstraints() {
      return this._constraints;
    }
  },

  static: {

    /**
    * Sets constraints in {@link https://github.com/stampit-org/stampit|stampit} definition used for validation.

    * @memberOf ConstraintsMixin
    * @static

    * @param {Object} constraints plain JavaScript object
    * @returns {stampit}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(ConstraintsMixin).setConstraints({});

    */
    setConstraints(constraints) {
      return this.refs({_constraints: constraints});
    },

    /**
    * Gets constraints from {@link https://github.com/stampit-org/stampit|stampit} definition.

    * @memberOf ConstraintsMixin
    * @static
    * @returns {Object}

    * @example {@lang javascript}
    * var constraints = stampit().compose(ConstraintsMixin).getConstraints();

    */
    getConstraints() {
      return this.fixed.refs._constraints;
    }
  }
});

/**
 * Adds logging functionality.
 * @constructor
 * @type {Logger}

 * @example {@lang javascript}
 * var MyStamp = stampit().compose(Logger);
 */
export const Logger = stampit({
  methods: {

    /**
    * Wrapper around *console.log*.
    * @memberOf Logger
    * @instance
    */
    log(...args) {
      const env = process.env.BABEL_ENV || process.env.NODE_ENV;
      if (env === 'development') {
        /* eslint-disable no-console */
        console.log(...args);
        /* eslint-enable no-console */
      }
    }
  }
});
