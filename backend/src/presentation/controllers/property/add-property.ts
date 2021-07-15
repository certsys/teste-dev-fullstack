import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest } from '../../helpers/http-helper';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export default class AddPropertyController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.publication_date) {
      return badRequest(new MissingParamError('Publication date'));
    }

    if (!httpRequest.body.title) {
      return badRequest(new MissingParamError('Title'));
    }
  }
}
