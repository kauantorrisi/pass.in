# pass.in

O pass.in é uma aplicação de **gestão de participantes em eventos presenciais**.

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

<strong>Esse repositório é apenas o back-end desta aplicação.</strong>

## Requisitos

### Requisitos funcionais

- [X] O organizador deve poder cadastrar um novo evento;
- [X] O organizador deve poder visualizar dados de um evento;
- [X] O organizador deve poser visualizar a lista de participantes;
- [X] O participante deve poder se inscrever em um evento;
- [X] O participante deve poder visualizar seu crachá de inscrição;
- [X] O participante deve poder realizar check-in no evento;

### Regras de negócio

- [X] O participante só pode se inscrever em um evento uma única vez;
- [X] O participante só pode se inscrever em eventos com vagas disponíveis;
- [X] O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [X] O check-in no evento será realizado através de um QRCode;

## Documentação da API (Swagger)

Para documentação da API, acesse o link: https://nlw-unite-nodejs.onrender.com/docs

## Banco de dados

Nessa aplicação vamos utilizar banco de dados relacional (SQL). Para ambiente de desenvolvimento seguiremos com o SQLite pela facilidade do ambiente.

### Diagrama ERD

<img src="https://raw.githubusercontent.com/rocketseat-education/nlw-unite-nodejs/61445f96837f42bcfff03bbc16640d87ae0902e5/.github/erd.svg" width="600" alt="Diagrama ERD do banco de dados" />

### Estrutura do banco (SQL)

```sql
-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum_attendees" INTEGER
);

-- CreateTable
CREATE TABLE "attendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendeeId" INTEGER NOT NULL,
    CONSTRAINT "check_ins_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "attendees_event_id_email_key" ON "attendees"("event_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_attendeeId_key" ON "check_ins"("attendeeId");
```

## Anotações

Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD,OPTIONS...

Corpo da requisição
Parâmetros de busca (Search Params / Query params) `http://localhost:3333/users?name=kauan`
Parâmetros de rota (Route params) -> Identificação de recursos `DELETE http://localhost:3333/users/5`
Cabeçalhos (Headers) -> Enviar algo como contexto da requisição

Semânticos == Significado

Drivers nativos | Query Builders | ORM's

Object Relational Mapping (Hibernate / Doctrine / ActiveRecord / Sequelize / Prisma / Drizzle (Cai na mesma ideia do "Bun", muito embrionário))
Os ORM's automatizam vários processos do banco de dados ao mesmo tempo, adicionam também o versionamento do banco de dados (migration).

JSON = JavaScript Object Notation

20x => Success
30x => Redirecionamento
40x => Erro do cliente (Erro em alguma informação enviada por QUEM está fazendo a chamada p/ API)
50x => Erro do servidor (Um erro que está acontecendo INDEPENDENTE do que está sendo enviado p/ o servidor)
