import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

let connection: Connection;
let id: string;

describe('Update Property Controller', () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    id = uuidV4();
    const password = await hash('admin_test', 8);
    await connection.query(`
      INSERT INTO users(id, name, email, password, created_at)
      VALUES('${id}', 'admin', 'admin@certimoveis.com.br', '${password}', 'now()') 
    `);

    await connection.query(`
      INSERT INTO properties(id, title, description, value, area, address, public_place, 
        house_number, complement, district, cep, city, uf, created_at)
      VALUES('${id}', 'Fazenda Martins', 'Fazenda Martins da zona leste', 
      ${1651}, ${16131}, 'Test', 'Test', ${46163}, 'Test', 'Test', ${656161}, 
      'fwefewf', 'rn', 'now()'); 
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to update a property', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@certimoveis.com.br',
        password: 'admin_test'
      });

    const { token } = responseToken.body;

    const response = await request(app)
      .put(`/properties/${id}`)
      .send({
        title: 'Title Change Supertest',
        description: 'Description Change Supertest',
        value: 16156,
        area: 3464,
        address: 'Address Supertest',
        public_place: 'Public Place Supertest',
        house_number: 6161,
        complement: 'Fazenda',
        district: 'Supertest',
        cep: 8461036,
        city: 'Supertest',
        uf: 'SU'
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to update property by id, because id non-exists', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@certimoveis.com.br',
        password: 'admin_test'
      });

    const { token } = responseToken.body;

    const response = await request(app)
      .post(`/properties/non-id`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(404);
  });
});