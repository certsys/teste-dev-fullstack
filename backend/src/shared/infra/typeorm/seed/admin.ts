import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');
  const id = uuidV4();
  const password = await hash('admin_test', 8);
  await connection.query(`
    INSERT INTO users(id, name, email, password, created_at)
    VALUES('${id}', 'admin', 'admin@certimoveis.com.br', '${password}', 'now()') 
  `);
  connection.close;
}

create().then(() => console.log('User admin created!'));