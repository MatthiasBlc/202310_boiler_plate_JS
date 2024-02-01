# README

Docker commands:

npm run docker:build  
npm run docker:  
npm run docker:upd for detached version  
npm run docker:down

need a docker-compose.yml for dev env

```
services:
  postgresdev:
    extends:
      file: common.yml
      service: postgres
    ports:
      - '5432:5432'
  backenddev:
    extends:
      file: common.yml
      service: backend
    ports:
      - "3000:3000"
  frontenddev:
    extends:
      file: common.yml
      service: frontend
    ports:
      - "8080:8080"
networks:
  proxy:
    external: true
```
