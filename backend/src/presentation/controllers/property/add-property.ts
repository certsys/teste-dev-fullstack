export default class AddPropertyController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.publication_date) {
      return {
        statusCode: 400,
        body: new Error('Missing param: Publication date'),
      };
    }

    if (!httpRequest.body.title) {
      return {
        statusCode: 400,
        body: new Error('Missing param: Title'),
      };
    }
  }
}
