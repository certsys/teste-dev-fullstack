import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest } from '../../helpers/http-helper';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export default class AddPropertyController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'publication_date',
      'title',
      'description',
      'value',
      'area',
      'address',
      'public_place',
      'number',
      'adjunct',
      'neighborhood',
      'zip_code',
      'city',
      'state',
    ];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
