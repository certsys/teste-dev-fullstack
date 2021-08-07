import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreatePropertyController } from '@modules/properties/useCases/createProperty/createPropertyController';
import { ListPropertyController } from '@modules/properties/useCases/listProperties/listPropertiesController';
import { ShowPropertyByIdController } from '@modules/properties/useCases/showPropertyById/showPropertyByIdController';
import { UpdatePropertyController } from '@modules/properties/useCases/updateProperty/updatePropertyController';
import { DeletePropertyByIdController } from '@modules/properties/useCases/deletePropertyById/deletePropertyByIdController';

const propertiesRoutes = Router();

const createPropertyController = new CreatePropertyController();
const listPropertyController = new ListPropertyController();
const showPropertyByIdController = new ShowPropertyByIdController();
const updatePropertyController = new UpdatePropertyController();
const deletePropertyByIdController = new DeletePropertyByIdController();

propertiesRoutes.post('/', ensureAuthenticated, createPropertyController.handle);
propertiesRoutes.get('/', ensureAuthenticated, listPropertyController.handle);
propertiesRoutes.get('/:id', ensureAuthenticated, showPropertyByIdController.handle);
propertiesRoutes.put('/:id', ensureAuthenticated, updatePropertyController.handle);
propertiesRoutes.delete('/:id', ensureAuthenticated, deletePropertyByIdController.handle);

export { propertiesRoutes }