import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker';

type Property = {
  id: string;
  title: string;
  description: string;
  value: number;
  area: number;
  address: string;
  public_place: string;
  house_number: number;
  complement: string;
  district: string;
  cep: number;
  city: string;
  uf: string;
  created_at: Date;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      property: Model.extend<Partial<Property>>({})
    },

    factories: {
      property: Factory.extend({
        id() {
          return faker.datatype.uuid();
        },
        title(index: number) {
          return `Title ${index}`;
        },
        description() {
          return faker.lorem.paragraph();
        },
        value(index: number) {
          return faker.commerce.price();
        },
        area() {
          return faker.finance.amount;
        },
        address() {
          return faker.address.streetAddress();
        },
        public_place() {
          return faker.address.streetAddress();
        },
        house_number() {
          return faker.finance.amount();
        },
        complement(index: string) {
          return `Case ${index}`;
        },
        district() {
          return faker.address.secondaryAddress();
        },
        cep() {
          return faker.finance.amount();
        },
        city() {
          return faker.address.city();
        },
        uf() {
          return faker.address.stateAbbr();
        },
        created_at() {
          return faker.date.recent(10);
        },
      })
    },

    seeds(server) {
      server.createList('property', 200);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/properties', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('property').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const properties = this.serialize(schema.all('property'))
          .properties.slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { properties }
        );
      });
      this.get('/properties/:id');
      this.post('/properties');

      this.namespace = '';
      this.passthrough();
    }
  });

  return server;
}