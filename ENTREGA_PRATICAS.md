# ENTREGA UNIFICADA - PRATICA 1 E PRATICA 2

Aluno:Luis Henrique Costa Dias

---

## Sumario

1. Introducao
2. Pratica 1 - Front-end com Vue.js
2.1 Objetivo
2.2 Estrutura implementada
2.3 Comunicacao entre componentes
2.4 Wireframes iniciais (baixa fidelidade)
2.5 Decisoes de UX, usabilidade e acessibilidade
3. Pratica 2 - API REST com Node.js + Express + TypeScript
3.1 Objetivo
3.2 Estrutura implementada
3.3 Rotas HTTP definidas
3.4 Cabecalhos e respostas HTTP aplicados
3.5 Tipagem TypeScript (interfaces)
3.6 Como executar
3.7 Exemplos de requisicoes para teste (curl)
3.8 Roteiro equivalente no Postman
3.9 Resultados esperados por status code
4. Conclusao

---

## 1. Introducao

Este material reune, em um unico documento, as duas praticas solicitadas:

- Pratica 1: Prototipo front-end de painel de usuarios com Vue.js.
- Pratica 2: API REST de gerenciamento de usuarios com Node.js + Express + TypeScript.

---

## 2. Pratica 1 - Front-end com Vue.js

### 2.1 Objetivo

Desenvolver um painel de usuarios para uma plataforma educacional, com foco em:

- Componentizacao reutilizavel.
- Comunicacao entre componentes.
- UX, usabilidade e acessibilidade desde os wireframes.

### 2.2 Estrutura implementada

Pasta: frontend-vue/

Componentes principais:

- StatsCard.vue: cartao reutilizavel para indicadores.
- FilterBar.vue: filtro por busca textual e status.
- UserCard.vue: visualizacao de usuario com acao para alternar status.
- App.vue: orquestra dados, filtros e comunicacao entre componentes.

### 2.3 Comunicacao entre componentes

- Pai para filho (props):
  - App.vue envia dados para StatsCard, FilterBar e UserCard.
- Filho para pai (events):
  - FilterBar emite update:search, update:status e clear.
  - UserCard emite toggle-status com o identificador do usuario.

### 2.4 Wireframes iniciais (baixa fidelidade)

#### 2.4.1 Wireframe 1 - Desktop

```text
+--------------------------------------------------------------+
| [Plataforma Educacional] Painel de Usuarios                 |
| Subtitulo explicativo                                       |
+------------------+------------------+-----------------------+
| Card Total       | Card Ativos      | Card Media Progresso  |
+--------------------------------------------------------------+
| Buscar [.................] | Status [Todos v] | [Limpar]    |
+--------------------------------------------------------------+
| 4 resultado(s)                                              |
| +------------------+  +------------------+                  |
| | Nome + Status    |  | Nome + Status    |                  |
| | e-mail           |  | e-mail           |                  |
| | curso            |  | curso            |                  |
| | progresso [====] |  | progresso [=== ] |                  |
| | [Alternar]       |  | [Alternar]       |                  |
| +------------------+  +------------------+                  |
+--------------------------------------------------------------+
```

#### 2.4.2 Wireframe 2 - Mobile

```text
+-----------------------------+
| Painel de Usuarios          |
| Subtitulo                   |
+-----------------------------+
| Card Total                  |
| Card Ativos                 |
| Card Media                  |
+-----------------------------+
| Buscar [...............]    |
| Status [Todos v]            |
| [Limpar filtros]            |
+-----------------------------+
| Card de usuario             |
| Card de usuario             |
| Card de usuario             |
+-----------------------------+
```

### 2.5 Decisoes de UX, usabilidade e acessibilidade

- Contraste visual consistente entre texto e fundo.
- Estados de foco visiveis via :focus-visible.
- Campos com label explicita.
- Area de resultados com aria-live="polite" para atualizar leitores de tela.
- Componentes semanticos: uso de main, section, article, header.
- Responsividade para desktop e mobile com grade adaptativa.

---

## 3. Pratica 2 - API REST com Node.js + Express + TypeScript

### 3.1 Objetivo

Criar API para gerenciamento de usuarios com:

- Ambiente configurado em TypeScript.
- Rotas HTTP completas.
- Tipagem por interfaces.
- Controle adequado de requests/responses e cabecalhos HTTP.

### 3.2 Estrutura implementada

Pasta: backend-api/

Arquivos principais:

- src/types/user.ts: interfaces User, CreateUserDTO, UpdateUserDTO.
- src/repositories/userRepository.ts: camada de dados em memoria.
- src/controllers/usersController.ts: regras das rotas e validacoes.
- src/routes/usersRoutes.ts: definicao de endpoints REST.
- src/middlewares/requestContext.ts: cabecalhos globais (x-request-id, x-api-version).
- src/app.ts e src/server.ts: bootstrap da aplicacao.

### 3.3 Rotas HTTP definidas

- GET /users: lista usuarios.
- GET /users/:id: busca usuario por id.
- POST /users: cria usuario.
- PUT /users/:id: atualiza usuario.
- DELETE /users/:id: remove usuario.
- GET /health: healthcheck.

### 3.4 Cabecalhos e respostas HTTP aplicados

- GET /users
  - 200 OK
  - Header: x-total-count

- GET /users/:id
  - 200 OK com body do usuario
  - 404 Not Found quando inexistente
  - 304 Not Modified quando if-none-match coincide com etag
  - Headers: etag, last-modified

- POST /users
  - 201 Created
  - Header: location apontando para /users/:id
  - 400 Bad Request para payload invalido

- PUT /users/:id
  - 200 OK quando atualizado
  - 404 Not Found se usuario nao existir
  - 400 Bad Request para role invalido

- DELETE /users/:id
  - 204 No Content quando removido
  - 404 Not Found se inexistente

Cabecalhos globais no middleware:

- x-request-id: rastreabilidade de requisicao.
- x-api-version: versionamento simples da API.

### 3.5 Tipagem TypeScript (interfaces)

```ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 3.6 Como executar

#### 3.6.1 Front-end (Vue)

```bash
cd frontend-vue
npm install
npm run dev
```

#### 3.6.2 Back-end (Express + TS)

```bash
cd backend-api
npm install
npm run dev
```

### 3.7 Exemplos de requisicoes para teste (curl)

Base URL:

```text
http://localhost:3333
```

1. Healthcheck

```bash
curl -i http://localhost:3333/health
```

2. Listar usuarios

```bash
curl -i http://localhost:3333/users
```

3. Buscar usuario por id

```bash
curl -i http://localhost:3333/users/1
```

4. Criar usuario

```bash
curl -i -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -H "x-request-id: pratica2-post-001" \
  -d '{
    "name": "Joana Reis",
    "email": "joana.reis@plataforma.edu",
    "role": "student"
  }'
```

5. Atualizar usuario

```bash
curl -i -X PUT http://localhost:3333/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "active": false,
    "role": "student"
  }'
```

6. Remover usuario

```bash
curl -i -X DELETE http://localhost:3333/users/2
```

7. Testar cache com ETag (fluxo 200 -> 304)

Primeira chamada para capturar o valor de etag no header:

```bash
curl -i http://localhost:3333/users/1
```

Depois, repetir a chamada enviando if-none-match com o valor retornado:

```bash
curl -i http://localhost:3333/users/1 \
  -H 'if-none-match: W/"1-1710810000000"'
```

Observacao: substitua o valor de exemplo pelo etag real retornado na etapa anterior.

### 3.8 Roteiro equivalente no Postman

Colecao sugerida: Pratica2-Usuarios

1. Request GET /health
   - Metodo: GET
   - URL: {{baseUrl}}/health

2. Request GET /users
   - Metodo: GET
   - URL: {{baseUrl}}/users

3. Request GET /users/:id
   - Metodo: GET
   - URL: {{baseUrl}}/users/1

4. Request POST /users
   - Metodo: POST
   - URL: {{baseUrl}}/users
   - Headers: Content-Type: application/json, x-request-id: pratica2-postman-001
   - Body (raw JSON):

```json
{
  "name": "Marcos Nunes",
  "email": "marcos.nunes@plataforma.edu",
  "role": "teacher"
}
```

5. Request PUT /users/:id
   - Metodo: PUT
   - URL: {{baseUrl}}/users/1
   - Header: Content-Type: application/json
   - Body (raw JSON):

```json
{
  "active": true,
  "role": "teacher"
}
```

6. Request DELETE /users/:id
   - Metodo: DELETE
   - URL: {{baseUrl}}/users/2

7. Request GET /users/:id com cache
   - Primeiro faca GET /users/1 e copie o header etag da resposta.
   - Depois repita GET /users/1 enviando o header if-none-match com o valor copiado.
   - Resultado esperado: 304 Not Modified.

### 3.9 Resultados esperados por status code

| Endpoint | Cenario | Status esperado | Observacoes |
|---|---|---|---|
| GET /health | API em execucao | 200 OK | Retorna { "status": "ok" }. |
| GET /users | Consulta da lista | 200 OK | Header x-total-count presente. |
| GET /users/:id | Usuario existente | 200 OK | Retorna usuario + headers etag e last-modified. |
| GET /users/:id | Usuario inexistente | 404 Not Found | Mensagem de erro em JSON. |
| GET /users/:id | ETag igual ao if-none-match | 304 Not Modified | Sem body de resposta. |
| GET /users/:id | id invalido/vazio | 400 Bad Request | Validacao de parametro de rota. |
| POST /users | Payload valido | 201 Created | Header location com rota do recurso criado. |
| POST /users | Payload invalido | 400 Bad Request | Falta de campos obrigatorios ou role invalido. |
| PUT /users/:id | Atualizacao valida | 200 OK | Retorna usuario atualizado. |
| PUT /users/:id | Usuario inexistente | 404 Not Found | Mensagem de erro em JSON. |
| PUT /users/:id | role invalido ou id invalido | 400 Bad Request | Erro de validacao da requisicao. |
| DELETE /users/:id | Usuario existente | 204 No Content | Exclusao realizada sem body. |
| DELETE /users/:id | Usuario inexistente | 404 Not Found | Mensagem de erro em JSON. |
| DELETE /users/:id | id invalido/vazio | 400 Bad Request | Validacao de parametro de rota. |

---

## 4. Conclusao

As duas praticas foram implementadas e consolidadas neste documento unico, cobrindo os requisitos de componentizacao, comunicacao e acessibilidade no front-end, alem de tipagem, rotas REST e uso apropriado de cabecalhos HTTP no back-end.
