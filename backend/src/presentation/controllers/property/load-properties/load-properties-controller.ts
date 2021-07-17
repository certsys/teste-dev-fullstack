import { ok } from '../../../helpers/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadProperties,
} from './load-properties-controller-protocols';

export class LoadPropertiesController implements Controller {
  constructor(private readonly loadProperties: LoadProperties) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const properties = await this.loadProperties.load();
    return ok(properties);
  }
}
