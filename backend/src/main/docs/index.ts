/* eslint-disable prettier/prettier */
import { propertiesPath } from './paths/properties-path';
import { propertyPath } from './paths/property-path';
import { errorShema } from './schemas/error-schema';
import { propertyShema } from './schemas/property-schema';
export default {
  openapi: '3.0.0',
  info: {
    title: 'CertImóveis API',
    description:
      'Aplicação de venda de imóveis feita em Nodejs e Reactjs com Typescript, TDD, clean arquitecture e Docker no backend, para o processo seletivo de Desenvolvedor Fullstack da Certsys.',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [
    {
      name: 'Properties',
    },
  ],
  paths: {
    '/properties': propertiesPath,
    '/properties/{userId}': propertyPath,
  },
  schemas: {
    property: propertyShema,
    error: errorShema,
  },
};
