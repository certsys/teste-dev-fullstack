import { container } from 'tsyringe';

import '@modules/accounts/providers';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';
import { PropertiesRepository } from '@modules/properties/infra/typeorm/repositories/PropertiesRepository';


container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IPropertiesRepository>('PropertiesRepository', PropertiesRepository);