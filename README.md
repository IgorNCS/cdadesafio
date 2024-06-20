# Como rodar o projeto

1. Crie um .env na sua maquina utilizando como base o .env-example

2. Inicie o Docker

3. Construa os contêineres utilizando o docker-compose:

   ```shell
   docker-compose up -d --build
   ```

4. Gere o Prisma Client:

   ```shell
   npx prisma generate
   ```

5. Execute a primeira migração do banco de dados:

   ```shell
   npx prisma migrate dev
   ```

6. Inicie o projeto:
   ```shell
   npm run start:dev
   ```

# Documentação da API
Acesse a documentação da API via Swagger Localmente em:
[http://localhost:3000/documentation#/](http://localhost:3000/documentation#/)


# Postman teste

O Postman para teste segue em anexo para facilitar testar as funcionalidades do código
