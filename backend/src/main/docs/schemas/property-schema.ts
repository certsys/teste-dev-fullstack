export const propertyShema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    publication_date: {
      type: 'date',
    },
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    value: {
      type: 'string',
    },
    area: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    public_place: {
      type: 'string',
    },
    number: {
      type: 'string',
    },
    adjunct: {
      type: 'string',
    },
    neighborhood: {
      type: 'string',
    },
    zip_code: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
  },
  required: true,
};
