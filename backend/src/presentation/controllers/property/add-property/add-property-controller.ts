import { badRequest } from '../../../helpers/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './add-property-controller-protocols';

export default class AddPropertyController implements Controller {
  constructor(private readonly validation: Validation) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    return new Promise(resolve => resolve(null));
  }
}
