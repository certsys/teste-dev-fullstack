import { MissingParamError } from '../../../errors/missing-param-error';
import { badRequest, noContent, serverError } from '../../../helpers/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  DeleteProperty,
} from './delete-property-controller-protocols';

export class DeletePropertyController implements Controller {
  constructor(private readonly deleteProperty: DeleteProperty) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id;
      if (!id) {
        console.log(httpRequest.params);
        return badRequest(new MissingParamError('id'));
      }
      await this.deleteProperty.delete(id);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
