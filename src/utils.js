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
