export const propertiesPath = {
  get: {
    tags: ['Properties'],
    summary: 'API para listar todos os imóveis',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'aplication/json': {
            schema: {
              $ref: '#/schemas/property',
            },
          },
        },
      },
      204: {
        description: 'Nenhum imóvel encontrado',
        content: {
          'aplication/json': {
            schema: {
              $ref: '#/schemas/error',
            },
          },
        },
      },
      500: {
        description: 'Erro interno do servidor',
        content: {
          'aplication/json': {
            schema: {
              $ref: '#/schemas/error',
            },
          },
        },
      },
    },
  },
  post: {
    tags: ['Properties'],
    summary: 'API para inserir imóveis',
    requestBody: {
      content: {
        'aplication/json': {
          schema: {
            $ref: '#/schemas/property',
          },
        },
      },
    },
    responses: {
      204: {
        description: 'Sucesso, mas sem resultados para exibir',
      },
      400: {
        description: 'Erro de requisição',
        content: {
          'aplication/json': {
            schema: {
              $ref: '#/schemas/error',
            },
          },
        },
      },
      500: {
        description: 'Erro interno do servidor',
        content: {
          'aplication/json': {
            schema: {
              $ref: '#/schemas/error',
            },
          },
        },
      },
    },
  },
};
