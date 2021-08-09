import { container } from 'tsyringe';

import '@modules/accounts/providers';

import { ICEPProvider } from './CEPProvider/models/ICEPProvider';
import { ViaCEPProvider } from './CEPProvider/implementations/ViaCEPProvider';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';
import { PropertiesRepository } from '@modules/properties/infra/typeorm/repositories/PropertiesRepository';

container.registerSingleton<ICEPProvider>('CEPProvider', ViaCEPProvider);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IPropertiesRepository>('PropertiesRepository', PropertiesRepository);