# Publicy For Good Test

## Dependences and Tools
- fastify
- Postgres
- Zod
- Prisma
- Dotenv
- Vitest
- Supertest
- Eslint
- TsNode
- TSX
- TSUP
- Typescript
- NPM Run All
- SOLID
- Docker
- Github Actions

## Instructions
1. create .env file and copy files from .env_example to new file
2. Run `npm install` to install all dependences
3. Run `npm run build` to install database, run prisma commands, create seed and create dist file
4. Run `npm run start` to run the API
5. To login is: username: `jhon` and password: `123456`

## Interesting commands
1. With `npm run prisma:studio` you can see database tables
2. With `npm run test` you can run unity tests
3. With `npm run test:e2e` you can run e2e tests

## Routs
| TYPE  |                 ROUTE                | DESCRIPTION |           EXEMPLE              |
| ----  | ----------------------------------- | --------- | --------------------------------- |
| POST  | /api/login                          | login   |                                   
                                                            {                                 
                                                              "username": string,
                                                              "password": string
                                                              
                                                            }
| TYPE  |                 ROUTE                | DESCRIPTION |           EXEMPLE              |
| ----  | ----------------------------------- | --------- | --------------------------------- |
| POST  | /api/products                       | create   |                                   
                                                            {                                 
                                                              "name": string
                                                              "description": string
                                                              "price": number
                                                              "availability": boolean
                                                              
                                                            }

| TIPO  |                 ROTA                | DESCRIÇÃO |           EXEMPLO                 |
| ----- | --------------------------------- | ----------- | --------------------------------  |
| PATCH | /api/products/:id                 |   Edit    |
                                                            {                                 
                                                              "name": string
                                                              "description": string
                                                              "price": number
                                                              "availability": boolean
                                                              
                                                            }

| TIPO   |                 ROTA                | DESCRIÇÃO   |           EXEMPLO                 |
| -----  | ---------------------------------   | ----------- | --------------------------------  |
| DELETE | /api/products/:id                   |   Delete   |

| TIPO  |                 ROTA              | DESCRIÇÃO     |           EXEMPLO                 |
| ----- | --------------------------------- | -----------   | --------------------------------  |
| GET   | /api/products                     | Get All       |

| TIPO  |                 ROTA              | DESCRIÇÃO     |           EXEMPLO                 |
| ----- | --------------------------------- | -----------   | --------------------------------  |
| GET   | /api/products/:id                 | Get One       |