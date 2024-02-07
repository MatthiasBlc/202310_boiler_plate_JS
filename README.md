# README

Docker commands:

npm run docker:build  
npm run docker:  
npm run docker:upd for detached version  
npm run docker:down

need a docker-compose.yml for dev env

```
services:
  postgres:
    image: postgres:13
    restart: always
    container_name: postgres
    hostname: postgres
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - ./postgresql/data:/var/lib/postgresql/data
    networks:
      - proxy
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

Content of the .env file:

```
# Postgres
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

# Backend
PORT=
DATABASE_URL=postgresql://POSTGRES_USER:POSTGRES_PASSWORD@postgres:5432/POSTGRES_DB?schema=backend
SESSION_SECRET=
CORS_ORIGIN=

# Frontend
VITE_BACKEND_URL=
```

The postgresDB must exist in Postgres

The docker network "proxy" must exist
