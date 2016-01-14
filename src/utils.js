import stampit from 'stampit';


/**
 * Used as a manager for *Config* base object. **Not** meant to be used directly.
 * @constructor
 * @type {ConfigMixin}

 * @example {@lang javascript}
 * var MyStamp = stampit().compose(ConfigMixin);
 */
export const ConfigMixin = stampit({
  methods: {

    /**
    * Sets config.

    * @memberOf ConfigMixin
    * @instance

    * @param {Object} config instance of *Syncano* object
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
    * @returns {Object}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(ConfigMixin);
    * var config = MyStamp().getConfig();

    */
    getConfig() {
      return this._config;
    }
  },

  static: {

    /**
    * Sets config and returns new stampit definition.

    * @memberOf ConfigMixin
    * @static

    * @param {Object} config instance of *Syncano* object
    * @returns {stampit}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(ConfigMixin).setConfig({});

    */
    setConfig(config) {
      return this.refs({_config: config});
    },

    /**
    * Gets config from stampit definition.

    * @memberOf ConfigMixin
    * @static
    * @returns {Object}

    * @example {@lang javascript}
    * var config = stampit().compose(ConfigMixin).getConfig();

    */
    getConfig() {
      return this.fixed.refs._config;
    }
  }
});

/**
 * Used as a manager for *Meta* object. **Not** meant to be used directly.
 * @constructor
 * @type {MetaMixin}

 * @example {@lang javascript}
 * var MyStamp = stampit().compose(MetaMixin);
 */
export const MetaMixin = stampit({
  methods: {

    /**
    * Sets meta.

    * @memberOf MetaMixin
    * @instance

    * @param {Object} meta instance of *Meta* object
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
    * @returns {Object}

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
    * Sets meta and returns new stampit definition.

    * @memberOf MetaMixin
    * @static

    * @param {Object} meta instance of *Meta* object
    * @returns {stampit}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(MetaMixin).setMeta({});

    */
    setMeta(meta) {
      return this.refs({_meta: meta});
    },

    /**
    * Gets meta from stampit definition.

    * @memberOf MetaMixin
    * @static
    * @returns {Object}

    * @example {@lang javascript}
    * var meta = stampit().compose(MetaMixin).getMeta();

    */
    getMeta() {
      return this.fixed.refs._meta;
    }
  }
});

/**
 * Used as a manager for *Constraints* object (validation). **Not** meant to be used directly.
 * @constructor
 * @type {ConstraintsMixin}

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
    * Sets constraints in stamp definition used for validation.

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
    * Gets constraints from stampit definition.

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
        /*eslint-disable no-console */
        console.log(...args);
        /*eslint-enable no-console */
      }
    }
  }
});
