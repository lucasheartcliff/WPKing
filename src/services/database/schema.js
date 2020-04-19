const image = {
  name: 'image',
  primaryKey: 'id',
  properties: {
    id: 'int',
    uri: 'string',
  },
};

const settings = {
  name: 'settings',
  properties: {
    language: 'string',
    order: 'int[]',
    backgroundService: 'bool',
    theme: 'string',
    timeToChange: 'int', //Time in 'ms'
  },
};

export { image, settings };
