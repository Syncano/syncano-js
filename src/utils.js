import stampit from 'stampit';


export const ConfigMixin = stampit({
  methods: {
    setConfig(config) {
      this._config = config;
      return this;
    },

    getConfig() {
      return this._config;
    }
  },

  static: {
    setConfig(config) {
      return this.refs({_config: config});
    },

    getConfig() {
      return this.fixed.refs._config;
    }
  }
});

export const MetaMixin = stampit({
  methods: {
    setMeta(meta) {
      this._meta = meta;
      return this;
    },

    getMeta() {
      return this._meta;
    }
  },

  static: {
    setMeta(meta) {
      return this.refs({_meta: meta});
    },

    getMeta() {
      return this.fixed.refs._meta;
    }
  }
});

export const ConstraintsMixin = stampit({
  methods: {
    setConstraints(constraints) {
      this._constraints = constraints;
      return this;
    },

    getConstraints() {
      return this._constraints;
    }
  },

  static: {
    setConstraints(constraints) {
      return this.refs({_constraints: constraints});
    },

    getConstraints() {
      return this.fixed.refs._constraints;
    }
  }
});


export const Logger = stampit({
  methods: {
    log(...args) {
      if (process.env.SYNCANO_DEBUG) {
        /*eslint-disable no-console */
        console.log(...args);
        /*eslint-enable no-console */
      }
    }
  }
});
