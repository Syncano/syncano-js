import stampit from 'stampit';
import QuerySet from '../querySet';

export const Meta = stampit().props({
  name: null,
  pluralName: null,
  endpoints: {}
});

export const Please = stampit().static({
  please() {
    return QuerySet({model: this});
  }
});

export const Model = stampit()
  .methods({
    save() {
      console.log('save');
    },
    delete() {
      console.log('delete');
    }
  })
  .static({
    setMeta(meta) {
      this.fixed._meta = Meta(meta);
      return this;
    },

    getMeta() {
      return this.fixed._meta;
    }
  })
  .compose(Please);

export default Model;