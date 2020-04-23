const image = {
  name: 'image',
  primaryKey: 'id',
  properties: {
    id: {type:'int', indexed: true},
    uri: 'string',
  },
};

const settings = {
  name: 'settings',
  properties: {
    language: 'string',
    order: 'int[]',
    backgroundService: 'string',
    theme: 'string',
    timeToChange: 'int', //Time in 'ms'
  },
};

export { image, settings };
