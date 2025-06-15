<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Video Eliel

- [Vídeo Explicativo](https://youtu.be/NQycn8zNfWE)

## Descrição

API base simples para gerenciamento de User e Task

- Autenticação (JWT)
- Autorização (RBAC)
- Documentação (Swagger)
- Tratamento de exceções
- Paginação
- ORM (Prisma com PostgreSQL)
- Testes

### User

Representa a entidade que possui acesso ao sistema

- **id:** Identificador único CUID para o user, gerado automaticamente pelo Prisma.
- **name:** Nome do user, opcional.
- **email:** E-mail do user, deve ser único.
- **password:** Senha do user, armazenada criptografada no banco de dados.
- **role:** Papel do user, o valor padrão é `USER`. Um user com `ADMIN` só pode ser criado diretamente no banco de dados.
- **created_at:** Data e hora em que a entidade foi criada, valor padrão é now().
- **updated_at:** Data e hora da última atualização da entidade, atualizada automaticamente.

### Task

Representa uma entidade de tarefa que pertence a um user

- **id:** Identificador único CUID para a task, gerado automaticamente pelo Prisma.
- **title:** Título da task, obrigatório.
- **description:** Descrição da task, opcional.
- **completed:** Status de conclusão da task, valor padrão é `false`.
- **user_id:** Referência ao user dono da task.
- **created_at:** Data e hora em que a entidade foi criada, valor padrão é now().
- **updated_at:** Data e hora da última atualização da entidade, atualizada automaticamente.

### Endpoints da API

#### Authentication

- `POST /v1/auth/signin` - Login com email e senha
- `POST /v1/auth/signup` - Criar uma nova conta de user
- `GET /v1/auth/profile` - Obter perfil do user atual (requer autenticação)

#### Users (apenas Admin)

- `POST /v1/users` - Criar um novo user (apenas admin)
- `GET /v1/users` - Listar todos os users com paginação (apenas admin)
- `GET /v1/users/:id` - Buscar user por ID (apenas admin)
- `PATCH /v1/users/:id` - Atualizar user por ID (apenas admin)
- `DELETE /v1/users/:id` - Deletar user por ID (apenas admin)
- `PATCH /v1/users/update/me` - Atualizar o próprio perfil

#### Tasks (Users autenticados)

- `POST /v1/tasks` - Criar uma nova task
- `GET /v1/tasks` - Listar tasks do user com paginação e filtros
- `GET /v1/tasks/:id` - Buscar task por ID
- `PATCH /v1/tasks/:id` - Atualizar task por ID
- `DELETE /v1/tasks/:id` - Deletar task por ID

## Documentação da API

### 1. Etapas de Instalação

#### 1.1 Clonar o Repositório

Clone o repositório da API usando o comando abaixo:

```bash
git clone https://github.com/matheushb/nestjs-base-project.git
```

Depois, entre no diretório do projeto:

```bash
cd nestjs-base-project
```

#### 1.2 Instalar Dependências

```bash
npm install
```

#### 1.3 Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para um novo arquivo chamado `.env`:

```bash
cp .env.example .env
```

#### 1.4 Inicializar Docker

Certifique-se de que o Docker esteja em execução, então execute:

```bash
docker-compose up -d
```

#### 1.5 Rodar as Migrations

Para aplicar as migrations no banco de dados, execute:

```bash
npx prisma migrate dev
```

### 2. Iniciando a API

Para rodar a API, execute:

```bash
# ambiente de desenvolvimento
$ npm run start

# modo watch
$ npm run start:dev

# modo produção
$ npm run start:prod
```

### 3. Rodando os Testes

Com o Docker em execução, execute o comando abaixo:

```bash
npm run test
```

### 4. Documentação Swagger

```bash
GET /api
```
