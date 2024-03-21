import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: '101.35.223.219',
        port: 3306,
        username: 'ahayo',
        password: 'Pass@word12!',
        database: 'app',
        entities: [User],
        /** 指示是否应在每次应用程序启动时自动创建数据库架构（千万不要改为 true，尤其在生产中） */
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
