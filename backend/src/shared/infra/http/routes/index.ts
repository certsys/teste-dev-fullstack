import { Router } from 'express';
import { usersRoutes } from '@modules/accounts/infra/http/routes/users.routes';
import { authenticateRouter } from '@modules/accounts/infra/http/routes/authenticate.routes';
import { propertiesRoutes } from '@modules/properties/infra/http/routes/properties.routes';
const router = Router();

router.use('/users', usersRoutes);
router.use('/sessions', authenticateRouter);
router.use('/properties', propertiesRoutes);

export { router }