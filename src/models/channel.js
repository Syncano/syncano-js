import stampit from 'stampit';
import {Meta, Model} from './base';

const ChannelMeta = Meta({
  name: 'channel',
  pluralName: 'channels',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instance/{instance}/channels/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instance/{instance}/channels/'
    },
    'poll': {
      'methods': ['get'],
      'path': '/v1/instance/{instance}/channels/{name}/poll/'
    },
    'publish': {
      'methods': ['post'],
      'path': '/v1/instance/{instance}/channels/{name}/publish/'
    },
    'history': {
      'methods': ['get'],
      'path': '/v1/instance/{instance}/channels/{name}/history/'
    }
  }
});

const Channel = stampit()
  .compose(Model)
  .setMeta(ChannelMeta);

export default Channel;
