import request from 'supertest';
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Property Controller', () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin_test', 8);
    await connection.query(`
      INSERT INTO users(id, name, email, password, created_at)
      VALUES('${id}', 'admin', 'admin@certimoveis.com.br', '${password}', 'now()') 
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new property', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@certimoveis.com.br',
        password: 'admin_test'
      });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/properties')
      .send({
        title: 'Title Supertest',
        description: 'Description Supertest',
        value: 16156,
        area: 3464,
        address: 'Address Supertest',
        house_number: 6161,
        cep: 59930000,
      }).set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new property with title exists', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@certimoveis.com.br',
        password: 'admin_test'
      });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/properties')
      .send({
        title: 'Title Supertest',
        description: 'Description Supertest',
        value: 16156,
        area: 3464,
        address: 'Address Supertest',
        public_place: 'Public Place Supertest',
        house_number: 6161,
        complement: 'Fazenda',
        district: 'Supertest',
        cep: 59930000,
        city: 'Supertest',
        uf: 'SU'
      }).set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});