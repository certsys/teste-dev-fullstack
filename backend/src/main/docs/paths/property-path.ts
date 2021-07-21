export const propertyPath = {
  get: {
    tags: ['Properties'],
    summary: 'Retorna um imóvel com o ID passado',
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
      404: {
        description: 'Nenhum imóvel encontrado com o ID passado',
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
  patch: {
    tags: ['Properties'],
    summary: 'Atualiza os campos do imóvel com o ID passado',
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
      400: {
        description: 'Erro de campo inválido',
        content: {
          'aplication/json': {
            schema: {
              $ref: '#/schemas/error',
            },
          },
        },
      },
      404: {
        description: 'Nenhum imóvel encontrado com o ID passado',
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
  delete: {
    tags: ['Properties'],
    summary: 'Atualiza os campos do imóvel com o ID passado',
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
