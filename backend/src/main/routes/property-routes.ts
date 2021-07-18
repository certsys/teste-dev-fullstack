import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddPropertyController } from '../factories/controllers/add-property/add-property-controller-factory';
import { makeLoadPropertiesController } from '../factories/controllers/load-properties/load-properties-controller-factory';
import { makeLoadPropertyController } from '../factories/controllers/load-property/load-property-controller-factory';

export default (router: Router): void => {
  router.post('/properties', adaptRoute(makeAddPropertyController()));
  router.get('/properties', adaptRoute(makeLoadPropertiesController()));
  router.get('/properties/:id', adaptRoute(makeLoadPropertyController()));
};
