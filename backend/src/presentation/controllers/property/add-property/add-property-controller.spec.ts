import { HttpRequest, Validation } from './add-property-controller-protocols';

import AddPropertyController from './add-property-controller';

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      publication_date: 'any_publication_date',
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
};

describe('AddProperty Controller', () => {
  test('Should call Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate(input: any): Error {
        return null;
      }
    }
    const validationStub = new ValidationStub();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const sut = new AddPropertyController(validationStub);
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
