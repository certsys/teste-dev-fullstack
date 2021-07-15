import AddPropertyController from './add-property';

describe('Add Imovel', () => {
  test('Should return 400 if no Publication date is provided', () => {
    const sut = new AddPropertyController();
    const httpRequest = {
      body: {
        title: 'any_title',
        description: 'any_description',
        value: 'any_value',
        area: 'any_area',
        address: 'any_address',
        public_place: 'any_public_place',
        number: 'any_number',
        adjunct: 'any_adjunct',
        neighborhood: 'any_neighborhood',
        zip_code: 'any_zip_code',
        city: 'any_city',
        state: 'any_state',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new Error('Missing param: Publication date'),
    );
  });

  test('Should return 400 if no title is provided', () => {
    const sut = new AddPropertyController();
    const httpRequest = {
      body: {
        publication_date: 'any_publication_date',
        description: 'any_description',
        value: 'any_value',
        area: 'any_area',
        address: 'any_address',
        public_place: 'any_public_place',
        number: 'any_number',
        adjunct: 'any_adjunct',
        neighborhood: 'any_neighborhood',
        zip_code: 'any_zip_code',
        city: 'any_city',
        state: 'any_state',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: Title'));
  });
});
