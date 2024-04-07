## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

<!-- module.exports = {
  apps : [{
    script: 'index.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  },
],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}; -->


<!-- ALTER USER 'root'@'localhost' IDENTIFIED BY 'tcxwcc190715'; -->
<!-- ALTER USER 'root'@'101.35.223.219' IDENTIFIED BY 'tcxwcc190715'; -->
<!-- CREATE USER 'admin'@'localhost' IDENTIFIED BY 'tcxwcc190715';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost'; -->

<!-- ALTER USER 'root'@'101.35.223.219' IDENTIFIED BY 'tcxwcc190715'; -->
<!-- GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' IDENTIFIED BY 'tcxwcc190715' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' IDENTIFIED BY "tcxwcc190715" WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
update user set host = '%' where user='admin';


CREATE USER 'ahayo'@'%' IDENTIFIED BY 'Pass@word12!';
GRANT ALL PRIVILEGES ON *.* TO 'ahayo'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
sudo service mysql restart -->

<!-- ACL SETUSER admin nopass ~* +@all -@dangerous -->

<!-- redis -->
<!-- sudo vi /etc/redis/redis.conf redis配置文件 -->
<!-- 进入redis redis-cli -->
<!-- 密码登录 AUTH xxx -->
<!-- 重启 sudo service redis-server restart -->

 <!-- 快速生成实体类 -->
<!-- npx typeorm-model-generator -h localhost -p 3306 -u root -x 12345678 -e mysql -o ./entities --noConfig true --ce pascal --cp camel -d game --tables user -->