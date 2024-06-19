
0. Inicie o Docker

1. Construa os contêineres utilizando o docker-compose:

   ```shell
   docker-compose up -d --build
   ```

2. Gere o Prisma Client:

   ```shell
   npx prisma generate
   ```

3. Execute a primeira migração do banco de dados:

   ```shell
   npx prisma migrate dev
   ```

4. Inicie o projeto:
   ```shell
   npm run start:dev
   ```

# Documentação da API
Acesse a documentação da API via Swagger Localmente em:
[http://localhost:3000/documentation#/](http://localhost:3000/documentation#/)
