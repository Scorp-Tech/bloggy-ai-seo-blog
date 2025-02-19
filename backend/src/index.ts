import 'reflect-metadata';
import { DataSource } from 'typeorm';
import app from './app';
import { config } from './config';

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

// const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: config.db.host,
//   port: config.db.port,
//   username: config.db.username,
//   password: config.db.password,
//   database: config.db.database,
//   synchronize: config.nodeEnv === 'development',
//   logging: config.nodeEnv === 'development',
//   entities: [__dirname + '/api/v1/**/*.entity.{js,ts}'],
//   migrations: [__dirname + '/migrations/**/*.{js,ts}'],
//   subscribers: [__dirname + '/subscribers/**/*.{js,ts}'],
// });

// AppDataSource.initialize()
//   .then(() => {
//     console.log('Database connected successfully');
    
    // app.listen(config.port, () => {
    //   console.log(`Server is running on port ${config.port}`);
    // });
//   })
//   .catch((error) => console.log('TypeORM connection error: ', error));