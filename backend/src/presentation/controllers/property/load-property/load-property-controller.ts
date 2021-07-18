import { notFound, ok, serverError } from '../../../helpers/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadProperty,
} from './load-property-controller-protocols';

export class LoadPropertyController implements Controller {
  constructor(private readonly loadProperties: LoadProperty) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id;
      const properties = await this.loadProperties.load(id);
      return properties ? ok(properties) : notFound();
    } catch (error) {
      return serverError(error);
    }
  }
}
