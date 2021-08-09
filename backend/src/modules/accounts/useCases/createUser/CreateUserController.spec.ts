import request from 'supertest';
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create User Controller', () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    // const id = uuidV4();
    // const password = await hash('admin_test', 8);
    // await connection.query(`
    //   INSERT INTO users(id, name, email, password, created_at)
    //   VALUES('${id}', 'admin', 'admin@certimoveis.com.br', '${password}', 'now()') 
    // `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: "Admin",
        email: 'admin@certimoveis.com.br',
        password: 'admin_test'
      })

    expect(response.status).toBe(201);
  });

  it('should not be able to create new user, because email already exists', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: "Admin 1",
        email: 'admin@certimoveis.com.br',
        password: 'admin_test'
      })

    expect(response.status).toBe(400);
  });
});