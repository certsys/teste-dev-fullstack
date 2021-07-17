import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadProperties,
} from './load-properties-controller-protocols';

export class LoadPropertiesController implements Controller {
  constructor(private readonly loadProperties: LoadProperties) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadProperties.load();
    return null;
  }
}
